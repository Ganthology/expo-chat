import { Layout as BasicChatLayout } from "@/modules/basic-chat/Layout";
import { Screen as BasicChatScreen } from "@/modules/basic-chat/Screen";
import type { Experiment } from "./types";

/**
 * Registry of all experiments.
 * Add new experiments here to make them available in the menu.
 */
export const experiments: Experiment[] = [
  {
    id: "basic-chat",
    name: "Basic Chat",
    description:
      "Whatsapp like chat experience",
    tags: ["chat", "flatlist"],
    Screen: BasicChatScreen,
    Layout: BasicChatLayout,
  },
];

/**
 * Get an experiment by its ID.
 */
export function getExperimentById(id: string): Experiment | undefined {
  return experiments.find((exp) => exp.id === id);
}

