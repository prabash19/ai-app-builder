import { Sandbox } from "@e2b/code-interpreter";
import { AgentResult, TextMessage } from "@inngest/agent-kit";
const getSandBox = async (sandboxId: string) => {
  const sandbox = await Sandbox.connect(sandboxId);
  return sandbox;
};

const lastAssistantTextMessageContent = (result: AgentResult) => {
  const lastAssistantTextMessageIndex = findLastIndexArray(
    result.output,
    (message: { role: string }) => message.role === "assistant"
  );

  const message = result.output[lastAssistantTextMessageIndex] as
    | TextMessage
    | undefined;

  return message?.content
    ? typeof message.content === "string"
      ? message.content
      : message.content.map((c) => c.text).join("")
    : undefined;
};

function findLastIndexArray<T>(
  array: T[],
  callback: (value: T, index: number, array: T[]) => boolean
): number {
  for (let i = array.length - 1; i >= 0; i--) {
    if (callback(array[i], i, array)) {
      return i;
    }
  }
  return -1;
}
export { getSandBox, lastAssistantTextMessageContent };
