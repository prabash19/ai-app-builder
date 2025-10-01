import { useEffect, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { config } from "../utils/config";
import LoadingSpinner from "./Loader";

interface LocationState {
  prompt?: string;
  mode?: string;
}
function BasicForm() {
  const [error, setError] = useState<string | null>(null);
  const [entity, setEntity] = useState<any>();
  const [formData, setFormData] = useState({});
  const [selectedRole, setSelectedRole] = useState<any>();
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);

  const { prompt, mode } = (state as LocationState) || {};

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!prompt || !mode) {
        setError("No prompt or mode provided");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${config.baseUrl}/generatebasic`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
          }),
        });
        const data = await response.json();
        setEntity(data);
      } catch (err) {
        console.error("Error during POST request:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [prompt, mode]);
  return (
    <>
      {loading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          {" "}
          <div className="max-w-4xl mx-auto p-6 font-sans">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              {entity.appName} - Dynamic Forms
            </h2>
            <div className="mb-10">
              <label className="block mb-2 text-gray-700 font-medium">
                Select Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {entity.roles.map((role: any, idx: number) => (
                  <option key={idx} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-10 w-full max-w-3xl">
              {Object.entries(entity.entities).map(
                ([entityName, entityData]) => (
                  <form
                    key={entityName}
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
                  >
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">
                      {entityName} Form
                    </h2>
                    <div className="grid gap-4">
                      {(entityData as any).formFields.map((field: any) => (
                        <div key={field.name} className="flex flex-col">
                          <label className="mb-1 text-gray-600 font-medium">
                            {field.label}
                          </label>
                          {field.type === "select" ? (
                            <select
                              name={field.name}
                              onChange={handleChange}
                              required={field.required}
                              className="px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                              <option value="">Select {field.label}</option>
                              {/* Placeholder options, could be populated dynamically */}
                              <option value="Option1">Option 1</option>
                              <option value="Option2">Option 2</option>
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              name={field.name}
                              placeholder={field.label}
                              required={field.required}
                              onChange={handleChange}
                              className="px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="submit"
                      className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                      Submit {entityName}
                    </button>
                  </form>
                )
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default BasicForm;
