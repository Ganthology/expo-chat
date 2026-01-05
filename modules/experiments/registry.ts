import { Layout as BasicChatLayout } from "@/modules/basic-chat/Layout";
import { Screen as BasicChatScreen } from "@/modules/basic-chat/Screen";
import { Layout as V0ChatLayout } from "@/modules/v0-chat/Layout";
import { Screen as V0ChatScreen } from "@/modules/v0-chat/Screen";
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
  {
    id: "v0-chat",
    name: "V0 Chat",
    description:
      "Whatsapp like chat experience",
    tags: ["chat", "flatlist"],
    Screen: V0ChatScreen,
    Layout: V0ChatLayout,
  },
];

/**
 * Get an experiment by its ID.
 */
export function getExperimentById(id: string): Experiment | undefined {
  return experiments.find((exp) => exp.id === id);
}

