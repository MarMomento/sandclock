export * from "./state";
export * from "./form";
export * from "./api";
export * from "./model";

export type IMessageType = "primary" | "success" | "error" | "warn";

/**
 * tab
 */
export interface ITab {
  type: string;
  text: string;
}
