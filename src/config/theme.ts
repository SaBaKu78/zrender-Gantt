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
  shiftLaneFill: string
  shiftLaneStroke: string
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
  1: { border: '#BFAE86', background: '#F5F2E9', accent: '#A58E5F', text: '#62553D' },
  2: { border: '#A9BEC7', background: '#EDF3F5', accent: '#728FA0', text: '#3D5965' },
  3: { border: '#A3BBB6', background: '#EFF5F3', accent: '#6E918A', text: '#3C5E58' },
  4: { border: '#A9C1B5', background: '#F1F6F3', accent: '#739582', text: '#496653' },
  5: { border: '#CDAEAC', background: '#F8F1F1', accent: '#B47C7E', text: '#704848' },
  6: { border: '#A3BBB6', background: '#EFF5F3', accent: '#6E918A', text: '#3C5E58' },
  7: { border: '#C3CDD2', background: '#F2F5F6', accent: '#8D9CA2', text: '#4D5C61' },
  8: { border: '#A9BEC7', background: '#EDF3F5', accent: '#728FA0', text: '#3D5965' },
  9: { border: '#BFAE86', background: '#F5F2E9', accent: '#A58E5F', text: '#62553D' },
  10: { border: '#C3CDD2', background: '#F2F5F6', accent: '#8D9CA2', text: '#4D5C61' },
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
  background: '#EDF1F3',
  panel: '#EFF3F4',
  surface: '#F7F9F9',
  surfaceSoft: '#F2F5F6',
  surfaceRaised: '#FAFBFB',
  text: '#29373D',
  textSecondary: '#4D5E64',
  muted: '#68787D',
  faint: '#96A1A4',
  border: '#D3DDE1',
  borderSoft: '#E2E9EC',
  primary: '#5F7F90',
  primarySoft: '#E3EBEF',
  shiftLaneFill: 'rgba(95,127,144,0.09)',
  shiftLaneStroke: 'rgba(95,127,144,0.26)',
  success: '#688F8A',
  warn: '#AD9364',
  danger: '#B4777B',
  info: '#718DA0',
  rowEven: '#F4F7F8',
  rowOdd: '#EBF0F2',
  rowActive: '#E2EDF0',
  gridBackground: '#F0F4F5',
  gridMinor: '#E0E7EA',
  gridMajor: '#C8D3D8',
  axisText: '#4D5E64',
  axisMuted: '#68787D',
  axisLine: '#C9D5DA',
  currentTime: '#5F7F90',
  scrollTrack: '#DDE5E8',
  scrollThumb: '#9BA9AE',
  scrollThumbHover: '#73858C',
  ghostFill: 'rgba(95,127,144,0.10)',
  ghostStroke: '#5F7F90',
  taskText: '#35464D',
  taskMetaText: '#6D7D82',
  taskStatus: LIGHT_TASK_STATUS,
  outsideShift: {
    border: '#CBB7A9',
    background: '#F6F1EB',
    accent: '#AA8F7B',
    text: '#5F4E43',
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
  shiftLaneFill: 'rgba(95,198,210,0.10)',
  shiftLaneStroke: 'rgba(95,198,210,0.42)',
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
    '--gantt-shift-lane-fill': theme.shiftLaneFill,
    '--gantt-shift-lane-stroke': theme.shiftLaneStroke,
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
