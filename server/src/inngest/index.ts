import { Inngest } from "inngest";
import { openai, createAgent } from "@inngest/agent-kit";

export const inngest = new Inngest({ id: "aiAppBuilder" });
const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const writer = createAgent({
      name: "writer",
      system: "You are an expert writer.  You summarize in two words",
      model: openai({ model: "gpt-4o" }),
    });
    const output = await writer.run(
      `summarize the following: ${event.data.email}`
    );
    console.log("output is", output);
    return { message: `Hello ${event.data.email}!` };
  }
);

// Add the function to the exported array:
export const functions = [helloWorld];
