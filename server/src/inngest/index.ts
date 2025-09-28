import { Inngest } from "inngest";
import { Sandbox } from "@e2b/code-interpreter";
import { openai, createAgent } from "@inngest/agent-kit";
import getSandBox from "./utils.js";
export const inngest = new Inngest({ id: "aiAppBuilder" });
const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("getting-sandbox-id", async () => {
      const sandbox = await Sandbox.create("miniaiappbuilder24");
      return sandbox.sandboxId;
    });
    const writer = createAgent({
      name: "writer",
      system:
        "You are an expert react developer. You write readable, maintainable code. You write simple react snippets.",
      model: openai({ model: "gpt-4o" }),
    });
    const output = await writer.run(
      `write the following snippet: ${event.data.prompt}`
    );
    const sandboxUrl = await step.run("getting-sandbox-url", async () => {
      const sandbox = await getSandBox(sandboxId);
      sandbox.commands.run("bash /home/user/start-dev.sh");

      // Wait a bit for the server to start
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const hostUrl = sandbox.getHost(5173);
      console.log("host here is", hostUrl);
      return hostUrl;
    });
    return { message: `Hello ${event.data.email}!`, sandboxUrl };
  }
);

// Add the function to the exported array:
export const functions = [helloWorld];
