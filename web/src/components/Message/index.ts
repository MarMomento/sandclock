import { IMessageType } from "@/typings";
import { createApp } from "vue";
import Message from "./index.vue";

/**
 * $message({
 *    type: 'success',
 *    message: '...'
 * })
 */

interface IMessageOptions {
  type: IMessageType;
  message: string;
  timeout?: number;
}

const $message = (options: IMessageOptions): void => {
  const { type, message, timeout = 2000 } = options;
  const instance = createApp(Message, {
    type,
    message,
  });

  const oDiv = document.createElement("div");
  oDiv.id = "message";
  document.body.appendChild(oDiv);
  instance.mount(oDiv);

  setTimeout(() => {
    instance.unmount();
    oDiv.remove();
  }, timeout);
};

export default $message;
