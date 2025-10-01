import { Inngest } from "inngest";
import { Sandbox } from "@e2b/code-interpreter";
import {
  openai,
  createAgent,
  createTool,
  createNetwork,
} from "@inngest/agent-kit";
import { getSandBox, lastAssistantTextMessageContent } from "./utils.js";
import * as z from "zod";
import { createAdvancedPrompt } from "../utils/prompt.js";
export const inngest = new Inngest({ id: "aiAppBuilder" });
const sequencer = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const prompt = createAdvancedPrompt(event.data.prompt);
    const sandboxId = await step.run("getting-sandbox-id", async () => {
      const sandbox = await Sandbox.create("miniaiappbuilder27");
      return sandbox.sandboxId;
    });
    const codeAgent = createAgent({
      name: "code-agent",
      system: prompt,
      model: openai({
        model: "gpt-4-turbo",
        defaultParameters: {
          temperature: 0.1,
        },
      }),
      tools: [
        createTool({
          name: "terminal",
          description: "Access of terminal by AI",
          parameters: z.object({
            command: z.string(),
          }),
          handler: async ({ command }, { step }) => {
            return await step?.run("terminal", async () => {
              const buffers = { stdout: "", stderr: "" };
              try {
                const sandbox = await getSandBox(sandboxId);
                const result = await sandbox.commands.run(command, {
                  onStdout: (data: string) => {
                    buffers.stdout = buffers.stdout + data;
                  },
                  onStderr: (data: string) => {
                    buffers.stderr = buffers.stderr + data;
                  },
                });
                return result.stdout;
              } catch (error) {
                console.error(
                  `failed command: ${error} \nstdout:${buffers.stdout} \nstderr:${buffers.stderr}`
                );
                return `failed command: ${error} \nstdout:${buffers.stdout} \nstderr:${buffers.stderr}`;
              }
            });
          },
        }),
        createTool({
          name: "CreateOrUpdateFiles",
          description: "Allow AI to create or update files in the sandbox",
          parameters: z.object({
            files: z.array(
              z.object({
                path: z.string(),
                content: z.string(),
              })
            ),
          }),
          handler: async ({ files }, { step, network }) => {
            const newFiles = await step?.run(
              "CreateOrUpdateFiles",
              async () => {
                try {
                  const updateFiles = network.state.data.files || {};
                  const sandbox = await getSandBox(sandboxId);
                  for (const file of files) {
                    await sandbox.files.write(file.path, file.content);
                    updateFiles[file.path] = file.content;
                  }
                  return updateFiles;
                } catch (error) {
                  console.error("error is", error);
                  return `error ${error}`;
                }
              }
            );

            if (typeof newFiles === "object") {
              network.state.data.files = newFiles;
            }
          },
        }),
        createTool({
          name: "readFiles",
          description: "Allow AI to read files in sandbox",
          parameters: z.object({
            files: z.array(z.string()),
          }),
          handler: async ({ files }, { step }) => {
            return await step?.run("readFiles", async () => {
              try {
                const sandbox = await getSandBox(sandboxId);
                const contents = [];
                for (const file of files) {
                  const content = await sandbox.files.read(file);
                  contents.push({ path: file, content });
                }
                return JSON.stringify(contents);
              } catch (error) {
                return `error ${error}`;
              }
            });
          },
        }),
      ],
      lifecycle: {
        onResponse: async ({ result, network }) => {
          const lastAssistantMessageText =
            lastAssistantTextMessageContent(result);
          if (lastAssistantMessageText && network) {
            if (lastAssistantMessageText.includes("<task_summary>")) {
              network.state.data.summary = lastAssistantMessageText;
            }
          }
          return result;
        },
      },
    });
    const network = createNetwork({
      name: "coding-agent-network",
      agents: [codeAgent],
      maxIter: 15,
      router: async ({ network }) => {
        const summary = network.state.data.summary;
        if (summary) {
          return;
        }
        return codeAgent;
      },
    });
    console.log("sandbox id is", sandboxId);
    const result = await network.run(event.data.prompt);
    const sandboxUrl = await step.run("getting-sandbox-url", async () => {
      const sandbox = await getSandBox(sandboxId);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const hostUrl = sandbox.getHost(5173);
      return `https://${hostUrl}`;
    });
    console.log("url is", sandboxUrl);
    return {
      url: sandboxUrl,
      title: "Fragment",
      files: result.state.data.files,
      summary: result.state.data.summary,
    };
  }
);

export const functions = [sequencer];
