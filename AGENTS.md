# Agent Rules

## Code Organization

- **No barrel exports**: Do not create `index.ts` files to re-export everything from a module. Import directly from the source file instead.
  
  ```typescript
  // ❌ Bad - barrel export
  // modules/ui/index.ts
  export { Card } from "./Card";
  export { Container } from "./Container";
  
  // ❌ Bad - importing from barrel
  import { Card, Container } from "@/modules/ui";
  
  // ✅ Good - direct imports
  import { Card } from "@/modules/ui/Card";
  import { Container } from "@/modules/ui/Container";
  ```

## Module Structure

Each experiment module should be self-contained:

```
modules/
├── [experiment-name]/
│   ├── Screen.tsx      # Main screen component
│   ├── Layout.tsx      # Experiment-specific layout/providers
│   └── [components]    # Experiment-specific components
├── experiments/
│   └── types.ts        # Shared experiment type definitions
└── ui/
    └── [shared components]  # Reusable UI components
```

## Experiments

- Each experiment defines its own `Layout.tsx` for experiment-specific providers
- Shared UI components go in `modules/ui/`
- Experiment-specific components stay within the experiment module

