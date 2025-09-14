const createPrompt = (userInput: string): string => {
  return `You are an expert app requirements analyst. Your task is to extract the core components of a simple web application from a user's natural language description.

Analyze the user's input and identify the following elements:
- App Name: A concise, descriptive name for the application.
- Entities: The main nouns or data objects the app will manage (e.g., Product, User, Order).
- Roles: The different types of users who will interact with the app (e.g., Admin, Customer, Employee).
- Features: The key actions or functionalities the app provides (e.g., Add new product, View sales report).
- For each entity, suggest a few basic form fields (name, label, type) that would typically be used to manage that entity.

Your response must be a single JSON object with the following keys: appName (string), entities (array of objects; each has name and fields array), roles (array of strings), and features (array of strings). Do not include any other text, explanations, or code formatting besides the JSON itself.

---
Example 1:
User input: "I want an app to manage student courses and grades. Teachers add courses, students enrol, and admins manage reports."
Expected output:
{
  "appName": "Course Manager",
  "entities": [
    {
      "name": "Student",
      "fields": [
        { "name": "name", "label": "Name", "type": "text" },
        { "name": "email", "label": "Email", "type": "email" },
        { "name": "age", "label": "Age", "type": "number" }
      ]
    },
    {
      "name": "Course",
      "fields": [
        { "name": "title", "label": "Title", "type": "text" },
        { "name": "code", "label": "Code", "type": "text" },
        { "name": "credits", "label": "Credits", "type": "number" }
      ]
    },
    {
      "name": "Grade",
      "fields": [
        { "name": "student", "label": "Student", "type": "text" },
        { "name": "course", "label": "Course", "type": "text" },
        { "name": "grade", "label": "Grade", "type": "text" }
      ]
    }
  ],
  "roles": ["Teacher", "Student", "Admin"],
  "features": ["Add courses", "Enrol students", "Manage reports"]
}
---

Now, process the following user description.
User input: "${userInput}"`;
};

export default createPrompt;
