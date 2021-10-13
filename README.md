# 🌱 Zerva Module Template

**This is a side project of [Zerva](https://github.com/holtwick/zerva)** 

Start writing a module for Zerva by using this project as a template.

## Checklist

- [ ] Adjust name and author in `package.json`
- [ ] In `src/index.ts` change the event definitions and write your own `useXYZModule`

You can build using 

```sh
npm run build
```

## ZContextEvents

Define your own Zerva Context events, which will be available for autocompletion in any good Typescript IDE to be used in `on` and `emit`:

```ts
declare global {
  interface ZContextEvents {
    counterIncrement(counter: number): void
  }
}
```

### useXYZModules

Export your `useXYZModule`. Good practice is to add a `register` call to set the modules name and its dependencies:

```ts
export function useXYZModule() {
  register("xyzmodule", ["http"])
  // ... your code
}
```