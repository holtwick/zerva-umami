export {}

declare global {
  interface ZContextEvents {
    counterIncrement(counter: number): void
  }
}
