export type GanttThemeMode = 'light' | 'dark'

export interface GanttTaskTheme {
  background: string
  border: string
  accent: string
  text: string
}

export interface GanttTheme {
  mode: GanttThemeMode
  background: string
  panel: string
  surface: string
  surfaceSoft: string
  surfaceRaised: string
  text: string
  textSecondary: string
  muted: string
  faint: string
  border: string
  borderSoft: string
  primary: string
  primarySoft: string
  success: string
  warn: string
  danger: string
  info: string
  rowEven: string
  rowOdd: string
  rowActive: string
  gridBackground: string
  gridMinor: string
  gridMajor: string
  axisText: string
  axisMuted: string
  axisLine: string
  currentTime: string
  scrollTrack: string
  scrollThumb: string
  scrollThumbHover: string
  ghostFill: string
  ghostStroke: string
  taskText: string
  taskMetaText: string
  taskStatus: Record<number, GanttTaskTheme>
  outsideShift: GanttTaskTheme
}

const LIGHT_TASK_STATUS: Record<number, GanttTaskTheme> = {
  1: { border: '#CDBD99', background: '#FAF8F1', accent: '#B39C68', text: '#4F4737' },
  2: { border: '#91B4CA', background: '#F1F6FA', accent: '#719AB5', text: '#33566B' },
  3: { border: '#99BDB8', background: '#F0F7F5', accent: '#6E9F96', text: '#345E57' },
  4: { border: '#A9C5B4', background: '#F4F8F5', accent: '#7CA88E', text: '#3E604D' },
  5: { border: '#D1AAA6', background: '#FBF3F2', accent: '#BC8580', text: '#72423E' },
  6: { border: '#99BDB8', background: '#F0F7F5', accent: '#6E9F96', text: '#345E57' },
  7: { border: '#C3CAD2', background: '#F5F6F8', accent: '#96A1AF', text: '#4B5563' },
  8: { border: '#91B4CA', background: '#F1F6FA', accent: '#719AB5', text: '#33566B' },
  9: { border: '#CDBD99', background: '#FAF8F1', accent: '#B39C68', text: '#4F4737' },
  10: { border: '#C3CAD2', background: '#F5F6F8', accent: '#96A1AF', text: '#4B5563' },
}

const DARK_TASK_STATUS: Record<number, GanttTaskTheme> = {
  1: { border: '#8B754D', background: '#3B3428', accent: '#D1B77A', text: '#F0E6D5' },
  2: { border: '#547C96', background: '#263B49', accent: '#78ACD9', text: '#DFEEF8' },
  3: { border: '#4D827A', background: '#24413E', accent: '#72C4B6', text: '#E0F5F1' },
  4: { border: '#5E9E75', background: '#2C4938', accent: '#77C79B', text: '#DBEDDF' },
  5: { border: '#A45C58', background: '#452C2F', accent: '#E47A73', text: '#F4DAD7' },
  6: { border: '#4D827A', background: '#24413E', accent: '#72C4B6', text: '#E0F5F1' },
  7: { border: '#536577', background: '#2A3541', accent: '#8FA2B5', text: '#D6E0E9' },
  8: { border: '#547C96', background: '#263B49', accent: '#78ACD9', text: '#DFEEF8' },
  9: { border: '#8B754D', background: '#3B3428', accent: '#D1B77A', text: '#F0E6D5' },
  10: { border: '#536577', background: '#2A3541', accent: '#8FA2B5', text: '#D6E0E9' },
}

export const LIGHT_THEME: GanttTheme = {
  mode: 'light',
  background: '#F0F3F7',
  panel: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSoft: '#F7F9FC',
  surfaceRaised: '#FFFFFF',
  text: '#1F2937',
  textSecondary: '#475569',
  muted: '#64748B',
  faint: '#94A3B8',
  border: '#D8E0E8',
  borderSoft: '#E8EDF3',
  primary: '#2F9EEB',
  primarySoft: '#E8F4FF',
  success: '#20C7B5',
  warn: '#F3B33D',
  danger: '#EF4444',
  info: '#3391E6',
  rowEven: '#FFFFFF',
  rowOdd: '#F8FAFC',
  rowActive: '#EFF7FD',
  gridBackground: '#F8FAFC',
  gridMinor: '#E7ECF2',
  gridMajor: '#C8D4E0',
  axisText: '#475569',
  axisMuted: '#64748B',
  axisLine: '#CBD5E1',
  currentTime: '#2F9EEB',
  scrollTrack: '#E2E8F0',
  scrollThumb: '#94A3B8',
  scrollThumbHover: '#64748B',
  ghostFill: 'rgba(47,158,235,0.10)',
  ghostStroke: '#2F9EEB',
  taskText: '#34485E',
  taskMetaText: '#64748B',
  taskStatus: LIGHT_TASK_STATUS,
  outsideShift: {
    border: '#CCB19E',
    background: '#FAF5F0',
    accent: '#B28F70',
    text: '#5D4B3D',
  },
}

export const DARK_THEME: GanttTheme = {
  mode: 'dark',
  background: '#141C24',
  panel: '#1A242E',
  surface: '#202B36',
  surfaceSoft: '#1E2933',
  surfaceRaised: '#24313C',
  text: '#E2E9EF',
  textSecondary: '#B9C6D2',
  muted: '#91A3B3',
  faint: '#6E8090',
  border: '#394957',
  borderSoft: 'rgba(187,204,220,0.13)',
  primary: '#5FC6D2',
  primarySoft: '#234851',
  success: '#77C79B',
  warn: '#E0B35F',
  danger: '#E47A73',
  info: '#78ACD9',
  rowEven: '#202B36',
  rowOdd: '#1E2933',
  rowActive: '#263E49',
  gridBackground: '#1D2731',
  gridMinor: '#34434F',
  gridMajor: '#465865',
  axisText: '#B9C6D2',
  axisMuted: '#7F91A3',
  axisLine: '#3C4C59',
  currentTime: '#5FC6D2',
  scrollTrack: '#30404D',
  scrollThumb: '#718392',
  scrollThumbHover: '#9DB0C0',
  ghostFill: 'rgba(95,198,210,0.14)',
  ghostStroke: '#5FC6D2',
  taskText: '#E2EAF0',
  taskMetaText: '#A7B8C8',
  taskStatus: DARK_TASK_STATUS,
  outsideShift: {
    border: '#8F7766',
    background: '#3B3128',
    accent: '#C69D7C',
    text: '#EFE2D5',
  },
}

const STORAGE_KEY = 'gantt-theme-mode'
const listeners = new Set<(mode: GanttThemeMode) => void>()
let currentMode: GanttThemeMode | null = null

function isThemeMode(value: unknown): value is GanttThemeMode {
  return value === 'light' || value === 'dark'
}

export function getThemeMode(): GanttThemeMode {
  if (currentMode) return currentMode
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      currentMode = isThemeMode(stored) ? stored : 'light'
    } catch (_error) {
      currentMode = 'light'
    }
  } else {
    currentMode = 'light'
  }
  return currentMode
}

export function getTheme(): GanttTheme {
  return getThemeMode() === 'dark' ? DARK_THEME : LIGHT_THEME
}

export function applyThemeToDocument(mode: GanttThemeMode): void {
  if (typeof document === 'undefined') return
  const theme = mode === 'dark' ? DARK_THEME : LIGHT_THEME
  const root = document.documentElement
  root.dataset.ganttTheme = mode
  root.style.colorScheme = mode

  const values: Record<string, string> = {
    '--gantt-bg': theme.background,
    '--gantt-panel': theme.panel,
    '--gantt-surface': theme.surface,
    '--gantt-surface-soft': theme.surfaceSoft,
    '--gantt-surface-raised': theme.surfaceRaised,
    '--gantt-text': theme.text,
    '--gantt-text-secondary': theme.textSecondary,
    '--gantt-muted': theme.muted,
    '--gantt-faint': theme.faint,
    '--gantt-border': theme.border,
    '--gantt-border-soft': theme.borderSoft,
    '--gantt-primary': theme.primary,
    '--gantt-primary-soft': theme.primarySoft,
    '--gantt-success': theme.success,
    '--gantt-warn': theme.warn,
    '--gantt-danger': theme.danger,
    '--gantt-info': theme.info,
    '--gantt-row-even': theme.rowEven,
    '--gantt-row-odd': theme.rowOdd,
    '--gantt-row-active': theme.rowActive,
    '--gantt-grid-bg': theme.gridBackground,
    '--gantt-grid-minor': theme.gridMinor,
    '--gantt-grid-major': theme.gridMajor,
    '--gantt-axis-text': theme.axisText,
    '--gantt-axis-muted': theme.axisMuted,
    '--gantt-axis-line': theme.axisLine,
    '--gantt-current-time': theme.currentTime,
    '--gantt-scroll-track': theme.scrollTrack,
    '--gantt-scroll-thumb': theme.scrollThumb,
    '--gantt-scroll-thumb-hover': theme.scrollThumbHover,
  }

  for (const name in values) {
    if (Object.prototype.hasOwnProperty.call(values, name)) {
      root.style.setProperty(name, values[name])
    }
  }
}

export function setThemeMode(mode: GanttThemeMode): void {
  currentMode = mode
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode)
    } catch (_error) {
      // Persistence failure must not block the visual switch.
    }
  }
  applyThemeToDocument(mode)
  listeners.forEach((listener) => listener(mode))
}

export function subscribeThemeChange(
  listener: (mode: GanttThemeMode) => void
): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

applyThemeToDocument(getThemeMode())
