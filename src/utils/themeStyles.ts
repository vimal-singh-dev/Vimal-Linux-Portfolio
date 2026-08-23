import { TerminalTheme } from '../types';

export interface ThemeConfig {
  id: TerminalTheme;
  name: string;
  badge: string;
  bg: string;
  border: string;
  text: string;
  promptUser: string;
  promptHost: string;
  promptPath: string;
  dirColor: string;
  fileColor: string;
  execColor: string;
  accent: string;
  headerBg: string;
  scanline: boolean;
}

export const THEMES: Record<TerminalTheme, ThemeConfig> = {
  'sophisticated-dark': {
    id: 'sophisticated-dark',
    name: 'Sophisticated Dark',
    badge: 'Arch Linux / Zsh',
    bg: 'bg-[#0A0B10] text-[#F8F8F2]',
    border: 'border-[#1e2337]',
    text: 'text-[#8BE9FD]',
    promptUser: 'text-[#50FA7B]',
    promptHost: 'text-[#FF79C6]',
    promptPath: 'text-[#8BE9FD]',
    dirColor: 'text-[#8BE9FD] font-bold',
    fileColor: 'text-[#F8F8F2]',
    execColor: 'text-[#50FA7B]',
    accent: '#50FA7B',
    headerBg: 'bg-[#0E1018]',
    scanline: false
  },
  ubuntu: {
    id: 'ubuntu',
    name: 'Ubuntu Aubergine',
    badge: 'Ubuntu 24.04',
    bg: 'bg-[#2c001e] text-[#f7f7f7]',
    border: 'border-[#77216f]/60',
    text: 'text-[#e95420]',
    promptUser: 'text-[#5ce479]',
    promptHost: 'text-[#dfdb74]',
    promptPath: 'text-[#729fcf]',
    dirColor: 'text-[#729fcf] font-bold',
    fileColor: 'text-[#f7f7f7]',
    execColor: 'text-[#5ce479]',
    accent: '#e95420',
    headerBg: 'bg-[#1e0014]',
    scanline: false
  },
  dracula: {
    id: 'dracula',
    name: 'Dracula Dark',
    badge: 'Zsh / Dracula',
    bg: 'bg-[#282a36] text-[#f8f8f2]',
    border: 'border-[#6272a4]/50',
    text: 'text-[#bd93f9]',
    promptUser: 'text-[#50fa7b]',
    promptHost: 'text-[#ff79c6]',
    promptPath: 'text-[#8be9fd]',
    dirColor: 'text-[#8be9fd] font-bold',
    fileColor: 'text-[#f8f8f2]',
    execColor: 'text-[#50fa7b]',
    accent: '#bd93f9',
    headerBg: 'bg-[#21222c]',
    scanline: false
  },
  matrix: {
    id: 'matrix',
    name: 'Matrix Hacker Green',
    badge: 'CRT Terminal',
    bg: 'bg-[#050d08] text-[#22c55e]',
    border: 'border-[#15803d]/60',
    text: 'text-[#4ade80]',
    promptUser: 'text-[#86efac]',
    promptHost: 'text-[#4ade80]',
    promptPath: 'text-[#22c55e]',
    dirColor: 'text-[#86efac] font-bold',
    fileColor: 'text-[#4ade80]',
    execColor: 'text-[#bbf7d0]',
    accent: '#22c55e',
    headerBg: 'bg-[#020503]',
    scanline: true
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    badge: 'Night City CLI',
    bg: 'bg-[#0b0816] text-[#00f0ff]',
    border: 'border-[#ff007f]/50',
    text: 'text-[#ff007f]',
    promptUser: 'text-[#ffe600]',
    promptHost: 'text-[#ff007f]',
    promptPath: 'text-[#00f0ff]',
    dirColor: 'text-[#ffe600] font-bold',
    fileColor: 'text-[#00f0ff]',
    execColor: 'text-[#ff007f]',
    accent: '#00f0ff',
    headerBg: 'bg-[#06040d]',
    scanline: true
  },
  monokai: {
    id: 'monokai',
    name: 'Monokai Pro',
    badge: 'Bash / Monokai',
    bg: 'bg-[#272822] text-[#f8f8f2]',
    border: 'border-[#49483e]/80',
    text: 'text-[#e6db74]',
    promptUser: 'text-[#a6e22e]',
    promptHost: 'text-[#fd971f]',
    promptPath: 'text-[#66d9ef]',
    dirColor: 'text-[#66d9ef] font-bold',
    fileColor: 'text-[#f8f8f2]',
    execColor: 'text-[#a6e22e]',
    accent: '#a6e22e',
    headerBg: 'bg-[#1e1f1c]',
    scanline: false
  },
  'retro-amber': {
    id: 'retro-amber',
    name: 'Retro Amber Phosphor',
    badge: 'VT220 Amber',
    bg: 'bg-[#120b02] text-[#ffb000]',
    border: 'border-[#ffb000]/40',
    text: 'text-[#ffb000]',
    promptUser: 'text-[#ffd269]',
    promptHost: 'text-[#ffb000]',
    promptPath: 'text-[#ff9000]',
    dirColor: 'text-[#ffd269] font-bold',
    fileColor: 'text-[#ffb000]',
    execColor: 'text-[#fff3cc]',
    accent: '#ffb000',
    headerBg: 'bg-[#0a0601]',
    scanline: true
  }
};
