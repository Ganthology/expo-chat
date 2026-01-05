import { Message } from "./types";

export const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Hello! How can I help you today?",
    role: "assistant",
    timestamp: new Date(),
  },
];