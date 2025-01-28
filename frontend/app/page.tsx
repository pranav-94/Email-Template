"use client";

import axios from "axios";
import { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("Meeting Request");
  const [key, setKey] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL


  const handleGenerate = async () => {
    console.log(name, purpose, key);

    const response = await axios.post(`${API_URL}/api/chat`, {
      name: name,
      purpose: purpose,
      keyPoints: key,
    });

    console.log(response)
    setGeneratedEmail(response.data.data.content);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-2xl font-semibold mb-6">Professional Email Generator</h1>
      <div className="md:w-[70%] bg-white w-[90%] rounded-lg shadow-md p-6">
        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium">
              Recipient Name
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 p-2 border-b border-gray-300 rounded"
              placeholder="Enter recipient's name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="purpose" className="text-sm font-medium">
              Email Purpose
            </label>
            <select
              id="purpose"
              className="mt-1 p-2 border-b border-gray-300 rounded"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            >
              <option value="Meeting Request">Meeting Request</option>
              <option value="Follow Up">Follow Up</option>
              <option value="Thank You">Thank You</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label  className="text-sm font-medium">
              Key Points
            </label>
            <textarea
              id="key"
              className="mt-1 p-2 border-b border-gray-300 rounded"
              rows={3}
              placeholder="Enter key points for the email"
              onChange={(e) => setKey(e.target.value)}
            ></textarea>
          </div>

          <button
            type="button"
            className="mt-4 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            onClick={handleGenerate}
          >
            Generate Template
          </button>
        </form>

        {generatedEmail && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Generated Email</h3>
            <div className="mt-2 p-4 bg-gray-100 rounded whitespace-pre-wrap">
              {generatedEmail}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
