import { Sandbox } from "@e2b/code-interpreter";
const getSandBox = async (sandboxId: string) => {
  const sandbox = await Sandbox.connect(sandboxId);
  return sandbox;
};
export default getSandBox;
