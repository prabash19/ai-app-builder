const createPrompt = (userInput: string): string => {
  return `You are an expert app requirements analyst. Your task is to extract the core components of a simple web application from a user's natural language description.

Analyze the user's input and identify the following elements:
- **App Name**: A concise, descriptive name for the application.
- **Entities**: The main nouns or data objects the app will manage (e.g., \`Product\`, \`User\`, \`Order\`).
- **Roles**: The different types of users who will interact with the app (e.g., \`Admin\`, \`Customer\`, \`Employee\`).
- **Features**: The key actions or functionalities the app provides (e.g., \`Add new product\`, \`View sales report\`).

Your response **must be a single JSON object** with the following keys: \`appName\` (string), \`entities\` (array of strings), \`roles\` (array of strings), and \`features\` (array of strings). Do not include any other text, explanations, or code formatting besides the JSON itself.

---
Example 1:
User input: "I want an app to manage student courses and grades. Teachers add courses, students enrol, and admins manage reports."
Expected JSON output:
{
  "appName": "Course Manager",
  "entities": ["Student", "Course", "Grade"],
  "roles": ["Teacher", "Student", "Admin"],
  "features": ["Add courses", "Enrol students", "Manage reports"]
}
---
Example 2:
User input: "Build me a portal where I can track my personal projects. I want to create projects and add tasks to them. I'll be the only user."
Expected JSON output:
{
  "appName": "Project Tracker",
  "entities": ["Project", "Task"],
  "roles": ["User"],
  "features": ["Create projects", "Add tasks"]
}
---

Now, process the following user description.
User input: "${userInput}"`;
};

export default createPrompt;
