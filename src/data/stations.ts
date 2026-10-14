export type StationId = 'laptop' | 'phone' | 'poster' | 'playstation' | 'whiteboard'

export interface StationPreset {
  id: StationId
  label: string
  icon: string
  position: [number, number, number]
  lookAt: [number, number, number]
  cameraPosition: [number, number, number]
}

export const STATIONS: StationPreset[] = [
  {
    id: 'laptop',
    label: 'Projects',
    icon: 'laptop',
    position: [1.8, 1.25, -1.0],
    lookAt: [1.8, 1.2, -1.0],
    cameraPosition: [3.5, 1.7, 0.6],
  },
  {
    id: 'phone',
    label: 'Contact',
    icon: 'phone',
    position: [2.7, 1.05, -1.55],
    lookAt: [2.7, 1.0, -1.55],
    cameraPosition: [4.6, 1.5, -0.2],
  },
  {
    id: 'poster',
    label: 'About',
    icon: 'image',
    position: [1.6, 1.95, -5.9],
    lookAt: [1.6, 1.95, -5.9],
    cameraPosition: [2.6, 1.85, -2.6],
  },
  {
    id: 'playstation',
    label: 'Gaming',
    icon: 'gamepad-2',
    position: [-3.2, 0.85, -5.4],
    lookAt: [-3.2, 0.85, -5.4],
    cameraPosition: [-2.0, 1.45, -2.4],
  },
  {
    id: 'whiteboard',
    label: 'Services',
    icon: 'clipboard-list',
    position: [0, 1.2, -3.0],
    lookAt: [0, 1.2, -3.0],
    cameraPosition: [1.2, 1.65, -0.6],
  },
]

export const ROOM_OVERVIEW: StationPreset = {
  id: 'laptop',
  label: '',
  icon: '',
  position: [0, 1.9, 0],
  lookAt: [0, 1.9, 0],
  cameraPosition: [8, -10, 11],
}