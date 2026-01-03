import type { ComponentType, ReactNode } from "react";

export interface Experiment {
  /** Unique identifier for the experiment */
  id: string;
  /** Display name shown in the menu */
  name: string;
  /** Brief description of what this experiment explores */
  description: string;
  /** The main screen component for this experiment */
  Screen: ComponentType;
  /** Layout component that wraps the screen (for experiment-specific providers) */
  Layout: ComponentType<{ children: ReactNode }>;
  /** Optional tags for categorization */
  tags?: string[];
}

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}
