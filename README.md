# Expo Chat Experiments 💬

A playground repository for exploring different chat implementations and AI chat experiences in React Native with Expo.

## Purpose

This repo serves as an experimental sandbox to:

- Explore various chat UI/UX patterns
- Experiment with AI chat interfaces
- Test smooth animations and gestures for chat interactions
- Build performant, delightful chat experiences

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the development server

   ```bash
   npx expo start
   ```

3. Run on your preferred platform

   ```bash
   # iOS Simulator
   npx expo start --ios

   # Android Emulator
   npx expo start --android

   # Web
   npx expo start --web
   ```

## Project Structure

```
app/           # File-based routing screens
├── _layout.tsx   # Root layout with providers
└── index.tsx     # Home screen
```

## Setup Notes

- **Gesture Handler**: Wrap root with `GestureHandlerRootView`
- **Keyboard Controller**: Wrap with `KeyboardProvider` for keyboard-aware views
- **Reanimated**: Plugin is auto-configured in Expo SDK 54+

## Experiments

_Document your experiments here as you build them._

- [ ] Basic chat UI
- [ ] AI streaming response animation
- [ ] Message bubble animations
- [ ] Swipe-to-reply gesture
- [ ] Typing indicators
- [ ] Glass morphism chat bubbles
- [ ] Custom keyboard accessories

## License

MIT
