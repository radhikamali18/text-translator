import { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [language, setLanguage] = useState("");

  const translateText = async () => {
    if (!inputText || !language) {
      alert("Please enter text and select language");
      return;
    }

    const response = await fetch(
      "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": "494310fe6bmsh34d2019310ccf1fp10f700jsn6efb637b02a4",
          "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
        },
        body: JSON.stringify({
          from: "auto",
          to: language,
          text: inputText,
        }),
      }
    );

    const data = await response.json();
    setOutputText(data.trans);
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center">
      <div className="bg-white w-[700px] rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-slate-700 mb-6">
          Text Translator
        </h1>

        {/* Input */}
        <textarea
          placeholder="Enter text in English"
          className="w-full h-32 border border-slate-400 rounded-lg p-4 mb-4"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        {/* Output */}
        <textarea
          placeholder="Translated text"
          className="w-full h-32 border border-slate-400 rounded-lg p-4 mb-4"
          value={outputText}
          readOnly
        />

        {/* Language */}
        <label className="block mb-2 font-medium text-slate-600">
          Converted Into
        </label>
        <select
          className="w-full border border-slate-400 rounded-lg p-2 mb-6"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">Select Language</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
          <option value="gu">Gujarati</option>
          <option value="pa">Punjabi</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
        </select>

        {/* Button */}
        <button
          onClick={translateText}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700"
        >
          Translate
        </button>
      </div>
    </div>
  );
}

export default App;
