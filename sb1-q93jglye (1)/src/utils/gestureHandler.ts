// Unified gesture handling for consistent touch and mouse interactions
export interface GestureState {
  scale: number
  rotation: number
  translation: { x: number; y: number }
  isActive: boolean
}

export interface PointerInfo {
  id: number
  x: number
  y: number
}

export class UnifiedGestureHandler {
  private pointers: Map<number, PointerInfo> = new Map()
  private initialDistance = 0
  private initialAngle = 0
  private initialScale = 1
  private initialRotation = 0
  private callbacks: {
    onGestureStart?: (state: GestureState) => void
    onGestureUpdate?: (state: GestureState) => void
    onGestureEnd?: (state: GestureState) => void
  } = {}

  constructor(element: HTMLElement, callbacks: typeof this.callbacks) {
    this.callbacks = callbacks
    this.setupEventListeners(element)
  }

  private setupEventListeners(element: HTMLElement) {
    // Unified pointer events for mouse and touch
    element.addEventListener('pointerdown', this.handlePointerDown.bind(this))
    element.addEventListener('pointermove', this.handlePointerMove.bind(this))
    element.addEventListener('pointerup', this.handlePointerUp.bind(this))
    element.addEventListener('pointercancel', this.handlePointerUp.bind(this))
    
    // Prevent default touch behaviors
    element.addEventListener('touchstart', (e) => e.preventDefault())
    element.addEventListener('touchmove', (e) => e.preventDefault())
  }

  private handlePointerDown(event: PointerEvent) {
    this.pointers.set(event.pointerId, {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY
    })

    if (this.pointers.size === 2) {
      const pointers = Array.from(this.pointers.values())
      this.initialDistance = this.getDistance(pointers[0], pointers[1])
      this.initialAngle = this.getAngle(pointers[0], pointers[1])
      this.callbacks.onGestureStart?.({
        scale: 1,
        rotation: 0,
        translation: { x: 0, y: 0 },
        isActive: true
      })
    }
  }

  private handlePointerMove(event: PointerEvent) {
    if (!this.pointers.has(event.pointerId)) return

    this.pointers.set(event.pointerId, {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY
    })

    if (this.pointers.size === 2) {
      const pointers = Array.from(this.pointers.values())
      const currentDistance = this.getDistance(pointers[0], pointers[1])
      const currentAngle = this.getAngle(pointers[0], pointers[1])
      
      const scale = currentDistance / this.initialDistance
      const rotation = currentAngle - this.initialAngle

      this.callbacks.onGestureUpdate?.({
        scale,
        rotation,
        translation: { x: 0, y: 0 }, // Simplified for now
        isActive: true
      })
    }
  }

  private handlePointerUp(event: PointerEvent) {
    this.pointers.delete(event.pointerId)
    
    if (this.pointers.size < 2) {
      this.callbacks.onGestureEnd?.({
        scale: 1,
        rotation: 0,
        translation: { x: 0, y: 0 },
        isActive: false
      })
    }
  }

  private getDistance(p1: PointerInfo, p2: PointerInfo): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
  }

  private getAngle(p1: PointerInfo, p2: PointerInfo): number {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x)
  }
}