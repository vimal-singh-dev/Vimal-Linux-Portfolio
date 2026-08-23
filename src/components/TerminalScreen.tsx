import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Palette,
  Eye,
  Trash2,
  Terminal as TerminalIcon,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Command,
  HelpCircle,
  Copy,
  Check,
  LogOut,
  Power,
  Keyboard,
  Folder,
  FolderGit2,
  GitBranch,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { CommandHistoryItem, TerminalTheme, FileNode } from '../types';
import { THEMES } from '../utils/themeStyles';
import { INITIAL_FILE_SYSTEM, getNeofetchText, getReadmeText } from '../utils/fileSystem';
import {
  playKeyClickSound,
  playEnterSound,
  playSuccessSound,
  playErrorSound,
  playShutdownSound,
  isAudioMuted,
  toggleAudioMute
} from '../utils/audio';
import { USER_PROFILE, CONTACT_DATA } from '../data/portfolioData';
import { AnimatedCatOutput } from './AnimatedCatOutput';

interface TerminalScreenProps {
  onOpenGuiModal: (tab?: string) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onTrackStep: (step: 'cd' | 'ls' | 'cat') => void;
  onExit: () => void;
  externalTrigger?: { cmd: string; timestamp: number } | null;
}

export const TerminalScreen: React.FC<TerminalScreenProps> = ({
  onOpenGuiModal,
  isFullscreen,
  onToggleFullscreen,
  onTrackStep,
  onExit,
  externalTrigger
}) => {
  const [currentPath, setCurrentPath] = useState<string>('~');
  const [currentDirNode, setCurrentDirNode] = useState<FileNode>(INITIAL_FILE_SYSTEM);
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [commandInput, setCommandInput] = useState<string>('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [savedCommands, setSavedCommands] = useState<string[]>([]);
  const [theme, setTheme] = useState<TerminalTheme>('sophisticated-dark');
  const [muted, setMuted] = useState<boolean>(false);
  const [showThemePicker, setShowThemePicker] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('sm');
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState<string[]>([]);
  const [enableTypingAnimation, setEnableTypingAnimation] = useState<boolean>(true);
  const [isTypingAnimated, setIsTypingAnimated] = useState<boolean>(false);
  const [lastCommandStatus, setLastCommandStatus] = useState<'initial' | 'success' | 'error'>('initial');
  const [lastExitCode, setLastExitCode] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const themeConfig = THEMES[theme];

  // Auto-scroll to bottom of terminal when history changes
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input when user clicks anywhere in terminal
  const handleTerminalClick = (e: React.MouseEvent) => {
    // Avoid stealing focus if user is selecting text
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  };

  // Initial Welcome Banner
  useEffect(() => {
    const welcomeOutput = (
      <div className="space-y-1.5 pb-1">
        <div className="font-mono text-xs sm:text-sm text-cyan-300 font-semibold leading-relaxed">
          {`Linux 6.10.8-arch1-1-zen x86_64 | Welcome to ${USER_PROFILE.name}'s Interactive Portfolio Shell`}
        </div>
      </div>
    );

    setHistory([
      {
        id: 'init-welcome',
        command: 'welcome',
        output: welcomeOutput,
        cwd: '~',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Handle external triggers from the hero guide chips
  useEffect(() => {
    if (externalTrigger) {
      typeAndExecute(externalTrigger.cmd);
    }
  }, [externalTrigger]);

  // Audio mute sync
  const handleToggleMute = () => {
    const nextMuted = toggleAudioMute();
    setMuted(nextMuted);
  };

  // Helper to resolve directory paths in our virtual FS
  const resolveNode = (pathStr: string): { node: FileNode | null; newPath: string } => {
    const trimmed = pathStr.trim();
    if (!trimmed || trimmed === '~' || trimmed === '/home/vimal') {
      return { node: INITIAL_FILE_SYSTEM, newPath: '~' };
    }

    if (trimmed === 'portfolio' || trimmed === '~/portfolio' || trimmed === './portfolio') {
      if (INITIAL_FILE_SYSTEM.children?.portfolio) {
        return { node: INITIAL_FILE_SYSTEM.children.portfolio, newPath: '~/portfolio' };
      }
    }

    if (trimmed === '..' || trimmed === '../') {
      if (currentPath === '~/portfolio') {
        return { node: INITIAL_FILE_SYSTEM, newPath: '~' };
      }
      return { node: INITIAL_FILE_SYSTEM, newPath: '~' };
    }

    if (trimmed === '.' || trimmed === './') {
      return { node: currentDirNode, newPath: currentPath };
    }

    // Direct check inside current node
    if (currentDirNode.children && currentDirNode.children[trimmed]) {
      const child = currentDirNode.children[trimmed];
      if (child.type === 'directory') {
        return { node: child, newPath: `${currentPath}/${trimmed}` };
      }
    }

    return { node: null, newPath: currentPath };
  };

  // Helper to resolve file content
  const resolveFileContent = (fileName: string): { file: FileNode | null; error?: string } => {
    const trimmed = fileName.trim();
    if (!trimmed) {
      return { file: null, error: 'cat: missing file operand' };
    }

    // Check if filename has .txt or not, try both
    const possibilities = [trimmed, `${trimmed}.txt`, `${trimmed}.md`];

    // Check in current dir
    for (const name of possibilities) {
      if (currentDirNode.children && currentDirNode.children[name]) {
        const item = currentDirNode.children[name];
        if (item.type === 'directory') {
          return { file: null, error: `cat: ${name}: Is a directory. Use 'cd ${name}' or 'ls ${name}'` };
        }
        return { file: item };
      }
    }

    // If currently at ~, check if user typed portfolio/skills.txt
    if (currentPath === '~' && INITIAL_FILE_SYSTEM.children?.portfolio?.children) {
      const subChildren = INITIAL_FILE_SYSTEM.children.portfolio.children;
      for (const name of possibilities) {
        const cleanName = name.replace(/^portfolio\//, '');
        if (subChildren[cleanName]) {
          return { file: subChildren[cleanName] };
        }
      }
    }

    // If currently at ~/portfolio, check root README.txt
    if (trimmed === '../README.txt' || trimmed === '~/README.txt') {
      if (INITIAL_FILE_SYSTEM.children && INITIAL_FILE_SYSTEM.children['README.txt']) {
        return { file: INITIAL_FILE_SYSTEM.children['README.txt'] };
      }
    }

    return { file: null, error: `cat: ${trimmed}: No such file or directory. Try 'ls' to see available files.` };
  };

  // Render clickable LS output with Linux file colors & icons
  const renderLsOutput = (targetNode: FileNode, pathName: string) => {
    const children = targetNode.children || {};
    const items = Object.values(children);

    if (items.length === 0) {
      return <div className="text-slate-400 font-mono text-xs italic">Directory is empty.</div>;
    }

    return (
      <div className="space-y-2 py-1 font-mono">
        <div className="text-xs text-slate-400 flex items-center justify-between pb-1 border-b border-slate-700/50">
          <span>total {items.length} files/dirs in {pathName}</span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">Click any item to open</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
          {items.map((item) => {
            const isDir = item.type === 'directory';
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  if (isDir) {
                    typeAndExecute(`cd ${item.name}`);
                  } else {
                    typeAndExecute(`cat ${item.name}`);
                  }
                }}
                className={`flex items-center justify-between p-2 rounded-lg text-left transition border cursor-pointer group ${
                  isDir
                    ? 'bg-blue-950/30 hover:bg-blue-900/40 border-blue-800/40 text-blue-300'
                    : 'bg-slate-800/50 hover:bg-slate-800/90 border-slate-700/60 text-slate-200 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-sm shrink-0">{isDir ? '📁' : '📄'}</span>
                  <span className={`text-xs font-semibold truncate ${isDir ? 'text-cyan-300 font-bold' : 'text-slate-200'}`}>
                    {item.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-1 group-hover:text-cyan-300">
                  {isDir ? 'cd' : 'cat'}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-[11px] text-slate-400 pt-1">
          Tip: Type <code className="text-amber-300 font-bold bg-slate-800/60 px-1 py-0.5 rounded">cat &lt;filename&gt;</code> (e.g. <code className="text-amber-300 font-bold">cat skills.txt</code>)
        </div>
      </div>
    );
  };

  // Render Cat Output with loading buffer animation, word-by-word streaming typing effect, syntax badges & clickable actions
  const renderCatOutput = (file: FileNode) => {
    return (
      <div className="space-y-3 font-mono py-1">
        <AnimatedCatOutput
          file={file}
          onOpenGuiModal={onOpenGuiModal}
          enableAnimation={enableTypingAnimation}
          onScrollToBottom={() => {
            terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Quick follow up shortcuts */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400 pt-1">
          <span>Related sections:</span>
          {['skills.txt', 'projects.txt', 'education.txt', 'certificates.txt', 'achievements.txt', 'strengths.txt', 'contact.txt']
            .filter((f) => f !== file.name)
            .map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => typeAndExecute(`cat ${f}`)}
                className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-400/50 transition cursor-pointer font-mono"
              >
                cat {f}
              </button>
            ))}
        </div>
      </div>
    );
  };

  // Helper to render dynamic directory path badge
  const renderPathBadge = (pathStr: string, isSmall?: boolean) => {
    const isRoot = pathStr === '~' || pathStr === '/home/vimal';
    const isPortfolio = pathStr === '~/portfolio' || pathStr.includes('portfolio');

    return (
      <span className="inline-flex items-center gap-1 shrink-0">
        <span
          className={`inline-flex items-center gap-1 font-bold font-mono transition-all duration-200 ${
            isPortfolio
              ? 'text-[#BD93F9] bg-[#BD93F9]/15 border border-[#BD93F9]/35 px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(189,147,249,0.2)]'
              : isRoot
              ? 'text-[#8BE9FD] bg-[#8BE9FD]/15 border border-[#8BE9FD]/35 px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(139,233,253,0.2)]'
              : 'text-amber-300 bg-amber-500/15 border border-amber-500/35 px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(245,158,11,0.2)]'
          } ${isSmall ? 'text-[10px]' : 'text-[11px]'}`}
        >
          {isPortfolio ? (
            <FolderGit2 className="w-3 h-3 text-[#BD93F9] shrink-0" />
          ) : (
            <Folder className="w-3 h-3 text-[#8BE9FD] shrink-0" />
          )}
          <span>{pathStr}</span>
        </span>

        {isPortfolio && (
          <span
            className={`inline-flex items-center gap-0.5 text-amber-300 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono ${
              isSmall ? 'text-[9px]' : 'text-[10px]'
            }`}
          >
            <GitBranch className="w-2.5 h-2.5 text-amber-400 shrink-0" />
            <span>main</span>
          </span>
        )}
      </span>
    );
  };

  // Clear & Reset Terminal Output Area
  const handleClearTerminal = () => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    setIsTypingAnimated(false);
    setHistory([]);
    setLastCommandStatus('initial');
    setLastExitCode(0);
    setCommandInput('');
    setHistoryIndex(-1);
    setAutoCompleteSuggestions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Automated Typewriter Simulation
  const typeAndExecute = (targetCmd: string) => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    if (!enableTypingAnimation) {
      executeCommand(targetCmd);
      return;
    }

    setIsTypingAnimated(true);
    setCommandInput('');
    inputRef.current?.focus();

    let currentIndex = 0;
    const chars = targetCmd.split('');

    const typeNextChar = () => {
      if (currentIndex < chars.length) {
        currentIndex++;
        setCommandInput(targetCmd.slice(0, currentIndex));
        playKeyClickSound();
        const delay = Math.max(16, Math.floor(Math.random() * 20 + 20));
        typingTimerRef.current = setTimeout(typeNextChar, delay);
      } else {
        typingTimerRef.current = setTimeout(() => {
          setIsTypingAnimated(false);
          executeCommand(targetCmd);
        }, 120);
      }
    };

    typeNextChar();
  };

  // Main Command Execution Engine
  const executeCommand = (cmdStr: string) => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    setIsTypingAnimated(false);
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    playEnterSound();

    // Check for clear command early
    const firstWord = rawCmd.split(/\s+/)[0].toLowerCase();
    if (firstWord === 'clear' || firstWord === 'cls' || firstWord === 'reset') {
      setSavedCommands((prev) => [...prev, rawCmd]);
      handleClearTerminal();
      return;
    }

    // Save to command history
    setSavedCommands((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const parts = rawCmd.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    const argString = args.join(' ');

    let outputNode: React.ReactNode = null;
    let isError = false;

    switch (command) {
      case 'cd': {
        if (!argString || argString === '~') {
          setCurrentPath('~');
          setCurrentDirNode(INITIAL_FILE_SYSTEM);
          outputNode = <div className="text-slate-300 font-mono text-xs">Returned to home directory (~)</div>;
        } else {
          const { node, newPath } = resolveNode(argString);
          if (node) {
            setCurrentDirNode(node);
            setCurrentPath(newPath);
            onTrackStep('cd');
            playSuccessSound();

            if (newPath === '~/portfolio') {
              outputNode = (
                <div className="space-y-1.5 font-mono text-xs text-emerald-300">
                  <div>📂 Successfully changed directory to <span className="font-bold text-white">~/portfolio</span></div>
                  <div className="text-slate-300">
                    Now type <span className="text-cyan-400 font-bold bg-slate-800 px-1.5 py-0.5 rounded">ls</span> to see all portfolio files (education, skills, projects, certificates, contact).
                  </div>
                </div>
              );
            } else {
              outputNode = <div className="text-slate-300 font-mono text-xs">Directory: {newPath}</div>;
            }
          } else {
            isError = true;
            outputNode = (
              <div className="text-rose-400 font-mono text-xs">
                cd: {argString}: No such directory. Try <code className="text-emerald-300 font-bold">cd portfolio</code>
              </div>
            );
          }
        }
        break;
      }

      case 'ls':
      case 'dir': {
        onTrackStep('ls');
        let targetNode = currentDirNode;
        let pathName = currentPath;

        if (args.length > 0 && !args[0].startsWith('-')) {
          const { node, newPath } = resolveNode(args[0]);
          if (node) {
            targetNode = node;
            pathName = newPath;
          } else {
            isError = true;
            outputNode = <div className="text-rose-400 font-mono text-xs">ls: cannot access '{args[0]}': No such directory</div>;
            break;
          }
        }

        outputNode = renderLsOutput(targetNode, pathName);
        break;
      }

      case 'cat':
      case 'open':
      case 'read':
      case 'view': {
        if (!argString) {
          isError = true;
          outputNode = (
            <div className="text-rose-400 font-mono text-xs">
              cat: missing file operand. Example: <code className="text-amber-300 font-bold">cat skills.txt</code> or <code className="text-amber-300 font-bold">cat projects.txt</code>
            </div>
          );
        } else {
          const { file, error } = resolveFileContent(argString);
          if (file) {
            onTrackStep('cat');
            playSuccessSound();
            outputNode = renderCatOutput(file);
          } else {
            isError = true;
            outputNode = <div className="text-rose-400 font-mono text-xs">{error}</div>;
          }
        }
        break;
      }

      case 'pwd': {
        outputNode = <div className="text-slate-200 font-mono text-xs">/home/vimal{currentPath === '~' ? '' : '/portfolio'}</div>;
        break;
      }

      case 'whoami': {
        outputNode = (
          <div className="font-mono text-xs space-y-1 text-slate-200">
            <div><span className="text-emerald-400 font-bold">User:</span> vimal (uid=1000, gid=1000)</div>
            <div><span className="text-cyan-400 font-bold">Name:</span> {USER_PROFILE.name}</div>
            <div><span className="text-amber-400 font-bold">Role:</span> {USER_PROFILE.title}</div>
            <div><span className="text-purple-400 font-bold">Status:</span> {USER_PROFILE.availability}</div>
          </div>
        );
        break;
      }

      case 'neofetch':
      case 'fastfetch': {
        playSuccessSound();
        outputNode = (
          <pre className="text-xs sm:text-sm font-mono text-emerald-400 whitespace-pre overflow-x-auto leading-tight bg-black/40 p-3 rounded-lg border border-slate-800">
            {getNeofetchText()}
          </pre>
        );
        break;
      }

      case 'help':
      case 'man': {
        outputNode = (
          <div className="space-y-3 font-mono text-xs sm:text-sm py-1">
            <div className="text-emerald-400 font-bold border-b border-slate-700 pb-1 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" /> Available Linux Terminal Commands
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-slate-300">
              <div>
                <span className="text-cyan-300 font-bold">cd &lt;dir&gt;</span>
                <p className="text-slate-400 text-xs">Change directory (e.g. <code>cd portfolio</code>, <code>cd ..</code>, <code>cd ~</code>)</p>
              </div>
              <div>
                <span className="text-cyan-300 font-bold">ls</span>
                <p className="text-slate-400 text-xs">List files and folders in current directory</p>
              </div>
              <div>
                <span className="text-cyan-300 font-bold">cat &lt;file&gt;</span>
                <p className="text-slate-400 text-xs">Display content of a file (e.g. <code>cat skills.txt</code>)</p>
              </div>
              <div>
                <span className="text-cyan-300 font-bold">pwd</span>
                <p className="text-slate-400 text-xs">Print current working directory</p>
              </div>
              <div>
                <span className="text-cyan-300 font-bold">gui / view</span>
                <p className="text-slate-400 text-xs">Open rich graphical visual card modal</p>
              </div>
              <div>
                <span className="text-cyan-300 font-bold">neofetch</span>
                <p className="text-slate-400 text-xs">Display system statistics & ASCII banner</p>
              </div>
              <div>
                <span className="text-cyan-300 font-bold">whoami</span>
                <p className="text-slate-400 text-xs">Display user profile & status</p>
              </div>
              <div>
                <span className="text-cyan-300 font-bold">theme &lt;name&gt;</span>
                <p className="text-slate-400 text-xs">Switch terminal theme (ubuntu, dracula, matrix, cyberpunk, monokai, retro-amber)</p>
              </div>
              <div>
                <span className="text-cyan-300 font-bold">mail / email</span>
                <p className="text-slate-400 text-xs">Send email to {CONTACT_DATA.email}</p>
              </div>
              <div>
                <span className="text-cyan-300 font-bold">hire / sudo hire</span>
                <p className="text-slate-400 text-xs">Trigger hiring celebration confetti!</p>
              </div>
              <div>
                <span className="text-cyan-300 font-bold">clear / cls</span>
                <p className="text-slate-400 text-xs">Clear the terminal screen</p>
              </div>
              <div>
                <span className="text-rose-400 font-bold">exit / quit / logout</span>
                <p className="text-slate-400 text-xs">Close terminal session with appreciation message</p>
              </div>
              <div>
                <span className="text-cyan-300 font-bold">history</span>
                <p className="text-slate-400 text-xs">Show previously executed commands</p>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
              Pro-tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">Tab</kbd> to auto-complete commands and filenames!
            </div>
          </div>
        );
        break;
      }

      case 'gui':
      case 'modal': {
        onOpenGuiModal(args[0] || 'projects');
        outputNode = <div className="text-emerald-400 font-mono text-xs">✨ Opened GUI Visual Card Viewer.</div>;
        break;
      }

      case 'theme': {
        const themeArg = args[0]?.toLowerCase() as TerminalTheme;
        if (themeArg && THEMES[themeArg]) {
          setTheme(themeArg);
          outputNode = <div className="text-emerald-400 font-mono text-xs">Theme switched to: {THEMES[themeArg].name}</div>;
        } else {
          outputNode = (
            <div className="space-y-1 font-mono text-xs text-slate-300">
              <div>Current theme: <span className="text-emerald-400 font-bold">{THEMES[theme].name}</span></div>
              <div>Available themes: {Object.keys(THEMES).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t as TerminalTheme)}
                  className="mr-2 text-cyan-300 underline hover:text-cyan-200 cursor-pointer"
                >
                  {t}
                </button>
              ))}</div>
            </div>
          );
        }
        break;
      }

      case 'hire':
      case 'sudo': {
        if (rawCmd.includes('hire') || command === 'hire') {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          });
          playSuccessSound();
          outputNode = (
            <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-200 font-mono space-y-2">
              <div className="text-sm sm:text-base font-bold flex items-center gap-2 text-emerald-300">
                🎉 ACCESS GRANTED! Welcome to the team!
              </div>
              <p className="text-xs leading-relaxed text-slate-200">
                Thank you for considering {USER_PROFILE.name}! Let's build remarkable engineering products together.
              </p>
              <div className="flex items-center gap-3 pt-1 text-xs">
                <a
                  href={`mailto:${CONTACT_DATA.email}?subject=Job%20Opportunity%20-%20Software%20Engineer`}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition"
                >
                  ✉️ Send Offer / Reach Out ({CONTACT_DATA.email})
                </a>
              </div>
            </div>
          );
        } else if (command === 'sudo') {
          outputNode = (
            <div className="text-amber-300 font-mono text-xs">
              [sudo] password for vimal: *******<br />
              vimal is already in the sudoers file. This incident will be reported to HR! (Try 'sudo hire')
            </div>
          );
        }
        break;
      }

      case 'skills': {
        const { file } = resolveFileContent('skills.txt');
        if (file) {
          onTrackStep('cat');
          playSuccessSound();
          outputNode = renderCatOutput(file);
        }
        break;
      }

      case 'projects': {
        const { file } = resolveFileContent('projects.txt');
        if (file) {
          onTrackStep('cat');
          playSuccessSound();
          outputNode = renderCatOutput(file);
        }
        break;
      }

      case 'education': {
        const { file } = resolveFileContent('education.txt');
        if (file) {
          onTrackStep('cat');
          playSuccessSound();
          outputNode = renderCatOutput(file);
        }
        break;
      }

      case 'certificates':
      case 'certs': {
        const { file } = resolveFileContent('certificates.txt');
        if (file) {
          onTrackStep('cat');
          playSuccessSound();
          outputNode = renderCatOutput(file);
        }
        break;
      }

      case 'achievements': {
        const { file } = resolveFileContent('achievements.txt');
        if (file) {
          onTrackStep('cat');
          playSuccessSound();
          outputNode = renderCatOutput(file);
        }
        break;
      }

      case 'strengths': {
        const { file } = resolveFileContent('strengths.txt');
        if (file) {
          onTrackStep('cat');
          playSuccessSound();
          outputNode = renderCatOutput(file);
        }
        break;
      }

      case 'about': {
        const { file } = resolveFileContent('about.txt');
        if (file) {
          onTrackStep('cat');
          playSuccessSound();
          outputNode = renderCatOutput(file);
        }
        break;
      }

      case 'phone':
      case 'call': {
        window.location.href = `tel:${CONTACT_DATA.phone}`;
        outputNode = (
          <div className="text-emerald-400 font-mono text-xs">
            Phone: {CONTACT_DATA.phone} (Initiating call handler...)
          </div>
        );
        break;
      }

      case 'mail':
      case 'email':
      case 'contact': {
        window.location.href = `mailto:${CONTACT_DATA.email}`;
        outputNode = (
          <div className="text-emerald-400 font-mono text-xs">
            Opening email client for {CONTACT_DATA.email}...
          </div>
        );
        break;
      }

      case 'github': {
        window.open(CONTACT_DATA.github, '_blank');
        outputNode = <div className="text-cyan-400 font-mono text-xs">Opening GitHub profile: {CONTACT_DATA.github}</div>;
        break;
      }

      case 'linkedin': {
        window.open(CONTACT_DATA.linkedin, '_blank');
        outputNode = <div className="text-cyan-400 font-mono text-xs">Opening LinkedIn profile: {CONTACT_DATA.linkedin}</div>;
        break;
      }

      case 'resume':
      case 'download': {
        onOpenGuiModal('projects');
        outputNode = (
          <div className="text-emerald-400 font-mono text-xs space-y-1">
            <div>📄 Opening printable resume viewer. Click 'Export PDF' inside the modal.</div>
          </div>
        );
        break;
      }

      case 'date': {
        outputNode = <div className="text-slate-200 font-mono text-xs">{new Date().toUTCString()}</div>;
        break;
      }

      case 'uptime': {
        outputNode = <div className="text-slate-200 font-mono text-xs">up 4 days, 13:37, 1 user, load average: 0.12, 0.08, 0.04</div>;
        break;
      }

      case 'uname': {
        outputNode = <div className="text-slate-200 font-mono text-xs">Linux vimal-thinkpad 6.10.8-arch1-1-zen #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux</div>;
        break;
      }

      case 'history': {
        outputNode = (
          <div className="font-mono text-xs text-slate-300 space-y-0.5">
            {savedCommands.map((c, i) => (
              <div key={i}>
                <span className="text-slate-500 mr-2">{i + 1}</span> {c}
              </div>
            ))}
          </div>
        );
        break;
      }

      case 'echo': {
        outputNode = <div className="text-slate-200 font-mono text-xs">{argString}</div>;
        break;
      }

      case 'typing':
      case 'typewriter':
      case 'animation': {
        const sub = args[0]?.toLowerCase();
        if (sub === 'off' || sub === 'disable' || sub === 'false') {
          setEnableTypingAnimation(false);
          outputNode = (
            <div className="text-amber-300 font-mono text-xs">
              ⚡ Typing animation disabled. Shortcut buttons will now execute commands instantaneously.
            </div>
          );
        } else if (sub === 'on' || sub === 'enable' || sub === 'true') {
          setEnableTypingAnimation(true);
          outputNode = (
            <div className="text-[#50FA7B] font-mono text-xs">
              ⌨️ Typing animation enabled. Quick buttons and shortcuts simulate realistic keystrokes with audio.
            </div>
          );
        } else if (sub === 'demo' || sub === 'test') {
          outputNode = (
            <div className="text-[#8BE9FD] font-mono text-xs space-y-1">
              <div className="font-bold">⌨️ Running simulated interactive typing demo...</div>
              <div className="text-slate-300">Watch the CLI prompt automatically simulate realistic keystrokes!</div>
            </div>
          );
          setTimeout(() => {
            typeAndExecute('cat skills.txt');
          }, 350);
        } else {
          outputNode = (
            <div className="font-mono text-xs space-y-2 text-slate-200">
              <div className="text-[#8BE9FD] font-bold flex items-center gap-1.5">
                <Keyboard className="w-4 h-4 text-[#50FA7B]" /> Terminal Typing Animation System
              </div>
              <div>
                Current Status:{' '}
                <span
                  className={`font-bold px-1.5 py-0.5 rounded ${
                    enableTypingAnimation
                      ? 'bg-[#50FA7B]/15 text-[#50FA7B] border border-[#50FA7B]/30'
                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {enableTypingAnimation ? 'ACTIVE (Realistic keystrokes)' : 'DISABLED (Instant execution)'}
                </span>
              </div>
              <div className="text-slate-400 text-xs">Commands:</div>
              <div className="text-xs pl-2 space-y-1">
                <div>
                  • <code className="text-[#50FA7B] font-semibold">typing on</code> — Enable keystroke animations for shortcuts & buttons
                </div>
                <div>
                  • <code className="text-amber-300 font-semibold">typing off</code> — Disable animations for instant fast mode
                </div>
                <div>
                  • <code className="text-cyan-300 font-semibold">typing demo</code> — Trigger a live keystroke demo
                </div>
              </div>
            </div>
          );
        }
        break;
      }

      case 'exit':
      case 'quit':
      case 'logout':
      case 'bye':
      case 'shutdown':
      case 'poweroff': {
        playShutdownSound();
        outputNode = (
          <div className="text-rose-400 font-mono text-xs space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span>Terminating session (PID 1042)...</span>
            </div>
            <div className="text-[#50FA7B]">Session closed cleanly. Thank you for visiting!</div>
          </div>
        );
        setTimeout(() => {
          onExit();
        }, 500);
        break;
      }

      default: {
        isError = true;
        outputNode = (
          <div className="text-rose-400 font-mono text-xs space-y-1">
            <div>zsh: command not found: {rawCmd}</div>
            <div className="text-slate-400">
              Type <code className="text-cyan-400 font-bold">help</code> for a list of valid commands or <code className="text-emerald-400 font-bold">cd portfolio</code> to begin.
            </div>
          </div>
        );
        break;
      }
    }

    const exitCode = isError ? (command === 'cd' || command === 'cat' || command === 'ls' ? 1 : 127) : 0;
    setLastCommandStatus(isError ? 'error' : 'success');
    setLastExitCode(exitCode);

    if (isError) {
      playErrorSound();
    }

    const newItem: CommandHistoryItem = {
      id: `${Date.now()}-${Math.random()}`,
      command: rawCmd,
      output: outputNode,
      cwd: currentPath,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isError,
      exitCode
    };

    setHistory((prev) => [...prev, newItem]);
    setCommandInput('');
  };

  // Keyboard navigation for History & Autocompletion
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playKeyClickSound();

    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(commandInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (savedCommands.length === 0) return;
      const nextIdx = historyIndex === -1 ? savedCommands.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setCommandInput(savedCommands[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= savedCommands.length) {
        setHistoryIndex(-1);
        setCommandInput('');
      } else {
        setHistoryIndex(nextIdx);
        setCommandInput(savedCommands[nextIdx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleAutoComplete();
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      handleClearTerminal();
    }
  };

  // Autocomplete logic
  const handleAutoComplete = () => {
    const trimmed = commandInput.trim();
    if (!trimmed) {
      // Suggest common initial commands
      setCommandInput('cd portfolio');
      return;
    }

    const parts = trimmed.split(/\s+/);

    if (parts.length === 1) {
      const matchCmd = [
        'cd portfolio',
        'ls',
        'cat',
        'neofetch',
        'whoami',
        'help',
        'clear',
        'cls',
        'reset',
        'gui',
        'theme',
        'contact'
      ].filter((c) => c.startsWith(parts[0]));

      if (matchCmd.length === 1) {
        setCommandInput(matchCmd[0]);
      } else if (matchCmd.length > 1) {
        setAutoCompleteSuggestions(matchCmd);
        setTimeout(() => setAutoCompleteSuggestions([]), 3000);
      }
    } else if (parts[0] === 'cd') {
      const dirs = ['portfolio', '..', '~'];
      const partial = parts[1] || '';
      const match = dirs.filter((d) => d.startsWith(partial));
      if (match.length > 0) {
        setCommandInput(`cd ${match[0]}`);
      }
    } else if (parts[0] === 'cat') {
      const files = currentDirNode.children ? Object.keys(currentDirNode.children) : [];
      const partial = parts[1] || '';
      const match = files.filter((f) => f.startsWith(partial));
      if (match.length === 1) {
        setCommandInput(`cat ${match[0]}`);
      } else if (match.length > 1) {
        setAutoCompleteSuggestions(match);
        setTimeout(() => setAutoCompleteSuggestions([]), 3000);
      }
    }
  };

  const handleCopyHistory = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleTerminalClick}
      className={`relative w-full rounded-2xl flex flex-col overflow-hidden shadow-2xl transition-all font-mono border ${themeConfig.border} ${themeConfig.bg} ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'min-h-[580px] h-[650px] max-h-[82vh]'
      }`}
    >
      {/* Scanline CRT overlay effect for Matrix / Retro themes */}
      {themeConfig.scanline && (
        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40"></div>
      )}

      {/* Terminal Title Bar */}
      <div className={`relative z-20 flex items-center justify-between px-4 py-3 select-none border-b border-white/10 ${themeConfig.headerBg}`}>
        {/* Linux / Mac style window buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onExit}
            title="Exit / Close Portfolio"
            className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition cursor-pointer shadow-[0_0_6px_rgba(244,63,94,0.6)]"
          ></button>
          <button
            onClick={() => handleToggleMute()}
            title={muted ? 'Unmute Audio' : 'Mute Audio'}
            className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition cursor-pointer"
          ></button>
          <button
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 transition cursor-pointer"
          ></button>

          <span className="ml-2 text-xs font-semibold text-slate-300 flex items-center gap-1.5 font-mono">
            <TerminalIcon className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">vimal@archlinux:</span>
            <span className={themeConfig.promptPath}>{currentPath}</span>
          </span>
        </div>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-1.5">
          {/* Typing FX Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setEnableTypingAnimation(!enableTypingAnimation);
            }}
            title={enableTypingAnimation ? 'Typing Animation: ACTIVE (Simulating realistic keystrokes)' : 'Typing Animation: DISABLED (Instant mode)'}
            className={`p-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 text-xs ${
              enableTypingAnimation
                ? 'text-[#50FA7B] bg-[#50FA7B]/10 hover:bg-[#50FA7B]/20 border border-[#50FA7B]/30'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Keyboard className="w-4 h-4" />
            <span className="hidden lg:inline text-[11px] font-mono">{enableTypingAnimation ? 'TypeFX' : 'Instant'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleMute();
            }}
            title={muted ? 'Enable Keyboard Sound' : 'Mute Keyboard Sound'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Theme Dropdown Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowThemePicker(!showThemePicker);
              }}
              title="Change Terminal Theme"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer flex items-center gap-1 text-xs"
            >
              <Palette className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline text-[11px] font-mono">{themeConfig.name.split(' ')[0]}</span>
            </button>

            {showThemePicker && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 mt-2 w-48 py-2 rounded-xl bg-[#0E1018] border border-[#1e2337] shadow-[0_15px_35px_rgba(0,0,0,0.85)] z-50 text-xs font-mono"
              >
                <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Terminal Themes
                </div>
                {(Object.keys(THEMES) as TerminalTheme[]).map((tKey) => (
                  <button
                    key={tKey}
                    onClick={() => {
                      setTheme(tKey);
                      setShowThemePicker(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-[#141724] transition ${
                      theme === tKey ? 'text-[#50FA7B] font-bold bg-[#50FA7B]/10' : 'text-slate-300'
                    }`}
                  >
                    <span>{THEMES[tKey].name}</span>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: THEMES[tKey].accent }}></span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Font Size Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setFontSize((prev) => (prev === 'sm' ? 'base' : prev === 'base' ? 'lg' : 'sm'));
            }}
            title="Cycle Font Size"
            className="px-2 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer text-[11px] font-mono"
          >
            Aa
          </button>

          {/* Clear Terminal Output */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClearTerminal();
            }}
            title="Clear Terminal Output (clear / Ctrl+L)"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/10 transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Graphical View Modal Trigger */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenGuiModal();
            }}
            title="Open Graphical Viewer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs transition cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GUI View</span>
          </button>

          {/* Exit Portfolio Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExit();
            }}
            title="Exit / Close Terminal Portfolio"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/40 text-xs transition cursor-pointer font-medium shadow-[0_0_10px_rgba(244,63,94,0.2)]"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Exit</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFullscreen();
            }}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Terminal'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Terminal Main Scroll Area */}
      <div
        className={`flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-mono select-text transition-all ${
          fontSize === 'sm' ? 'text-xs sm:text-sm' : fontSize === 'base' ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
        }`}
      >
        {/* Render Command History */}
        {history.map((item) => (
          <div
            key={item.id}
            className={`space-y-1.5 group/cmd rounded-xl p-2.5 transition-all ${
              item.isError
                ? 'bg-rose-950/20 border-l-2 border-l-rose-500 pl-3 shadow-[inset_0_0_15px_rgba(244,63,94,0.06)]'
                : 'bg-transparent border-l-2 border-l-[#50FA7B]/40 pl-3 hover:bg-white/[0.02]'
            }`}
          >
            {/* Prompt line */}
            <div className="flex items-center justify-between text-xs sm:text-sm flex-wrap gap-2">
              <div className="flex items-center flex-wrap gap-1.5">
                {/* Color-coded Status Indicator Badge */}
                {item.isError ? (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_8px_rgba(244,63,94,0.3)]"
                    title={`Command failed with exit code ${item.exitCode ?? 1}`}
                  >
                    <XCircle className="w-3 h-3 text-rose-400 shrink-0" />
                    <span>{item.exitCode ?? 1}</span>
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#50FA7B]/15 text-[#50FA7B] border border-[#50FA7B]/30 shadow-[0_0_6px_rgba(80,250,123,0.2)]"
                    title="Command completed successfully (exit code 0)"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#50FA7B] shrink-0" />
                    <span>0</span>
                  </span>
                )}

                <span className={`${themeConfig.promptUser} font-bold`}>vimal@portfolio</span>
                <span className="text-slate-500">:</span>
                {renderPathBadge(item.cwd, true)}
                <span className={`font-bold font-mono ${item.isError ? 'text-rose-400' : 'text-[#50FA7B]'}`}>
                  ➜
                </span>
                <span className={`font-semibold font-mono ${item.isError ? 'text-rose-200' : 'text-white'}`}>
                  {item.command}
                </span>
              </div>

              <span className="text-[10px] text-slate-500 opacity-0 group-hover/cmd:opacity-100 transition font-mono">
                {item.timestamp}
              </span>
            </div>

            {/* Output */}
            <div className="pl-1 sm:pl-2 pt-0.5">{item.output}</div>
          </div>
        ))}

        {/* Suggestions popup if tab pressed */}
        {autoCompleteSuggestions.length > 0 && (
          <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-700 text-xs font-mono text-cyan-300 flex flex-wrap gap-2 animate-in fade-in">
            <span className="text-slate-400">Suggestions:</span>
            {autoCompleteSuggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCommandInput(s);
                  setAutoCompleteSuggestions([]);
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Active Input Line */}
        <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm pt-2">
          {/* Status Indicator & Prompt Line */}
          <div className="flex items-center flex-wrap gap-1.5 shrink-0">
            {/* Real-time status indicator feedback for preceding command */}
            {lastCommandStatus === 'error' ? (
              <span
                className="inline-flex items-center gap-1 text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/50 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.4)] animate-pulse"
                title={`Previous command failed with exit code ${lastExitCode}`}
              >
                <XCircle className="w-3 h-3 text-rose-400 shrink-0" />
                <span>{lastExitCode}</span>
              </span>
            ) : lastCommandStatus === 'success' ? (
              <span
                className="inline-flex items-center gap-1 text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-[#50FA7B]/15 border border-[#50FA7B]/40 text-[#50FA7B] shadow-[0_0_8px_rgba(80,250,123,0.25)]"
                title="Previous command completed successfully (exit code 0)"
              >
                <CheckCircle2 className="w-3 h-3 text-[#50FA7B] shrink-0" />
                <span>0</span>
              </span>
            ) : (
              <span
                className="inline-flex items-center gap-1 text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                title="Interactive shell ready"
              >
                <TerminalIcon className="w-3 h-3 text-cyan-400 shrink-0" />
              </span>
            )}

            <span className={`${themeConfig.promptUser} font-bold shrink-0`}>vimal@portfolio</span>
            <span className="text-slate-500 shrink-0">:</span>
            {renderPathBadge(currentPath)}
            <span
              className={`font-bold font-mono text-sm shrink-0 transition-colors ${
                lastCommandStatus === 'error'
                  ? 'text-rose-400 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)] animate-pulse'
                  : 'text-[#50FA7B] drop-shadow-[0_0_6px_rgba(80,250,123,0.5)]'
              }`}
            >
              ➜
            </span>
          </div>

          <div className="relative min-w-[200px] flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={commandInput}
              onChange={(e) => {
                if (isTypingAnimated && typingTimerRef.current) {
                  clearTimeout(typingTimerRef.current);
                  setIsTypingAnimated(false);
                }
                setCommandInput(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              className="w-full bg-transparent text-white font-mono outline-none border-none p-0 focus:ring-0 text-xs sm:text-sm"
              placeholder={history.length <= 1 ? "type 'cd portfolio' or 'help'..." : ""}
            />
            {/* Blinking block cursor when input is focused */}
            <span
              className={`w-2 h-4 inline-block shrink-0 ml-0.5 ${
                isTypingAnimated
                  ? 'bg-cyan-400 animate-ping'
                  : lastCommandStatus === 'error'
                  ? 'bg-rose-400 animate-pulse'
                  : 'bg-[#50FA7B] animate-pulse'
              }`}
            ></span>
          </div>
        </div>

        <div ref={terminalEndRef} />
      </div>

      {/* Mobile Friendly Interactive Action Bar / Touch Shortcuts */}
      <div className="px-3 py-2 bg-[#0A0B10] border-t border-[#1e2337] flex items-center gap-1.5 overflow-x-auto select-none no-scrollbar">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
          Quick:
        </span>
        {[
          { label: 'cd portfolio', cmd: 'cd portfolio', highlight: currentPath === '~' },
          { label: 'ls', cmd: 'ls', highlight: false },
          { label: 'cat skills.txt', cmd: 'cat skills.txt', highlight: false },
          { label: 'cat projects.txt', cmd: 'cat projects.txt', highlight: false },
          { label: 'cat education.txt', cmd: 'cat education.txt', highlight: false },
          { label: 'cat certificates.txt', cmd: 'cat certificates.txt', highlight: false },
          { label: 'cat contact.txt', cmd: 'cat contact.txt', highlight: false },
          { label: 'neofetch', cmd: 'neofetch', highlight: false },
          { label: 'help', cmd: 'help', highlight: false },
          { label: 'clear', cmd: 'clear', highlight: false },
          { label: 'exit', cmd: 'exit', highlight: false, danger: true }
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => typeAndExecute(item.cmd)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition whitespace-nowrap cursor-pointer shrink-0 border ${
              item.danger
                ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border-rose-500/30 font-semibold hover:border-rose-500/60'
                : item.highlight
                ? 'bg-[#50FA7B]/15 text-[#50FA7B] border-[#50FA7B]/40 font-bold animate-pulse shadow-[0_0_8px_rgba(80,250,123,0.2)]'
                : 'bg-[#141724] hover:bg-[#1a1f30] text-slate-300 border-[#1e2337] hover:text-[#F8F8F2] hover:border-[#8BE9FD]/40'
            }`}
          >
            {item.label}
          </button>
        ))}

        {/* Tab Helper for touch mobile */}
        <button
          type="button"
          onClick={handleAutoComplete}
          className="px-2 py-1 rounded-md text-[11px] font-mono bg-[#8BE9FD]/10 text-[#8BE9FD] border border-[#8BE9FD]/30 hover:bg-[#8BE9FD]/20 transition cursor-pointer shrink-0"
        >
          [Tab]
        </button>
      </div>
    </div>
  );
};
