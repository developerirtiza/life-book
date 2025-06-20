import React, { useState } from "react";

const JournalInput = ({ onSubmit }) => {
  const [entry, setEntry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entry.trim()) return;
    onSubmit(entry);
    setEntry("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto mt-4 bg-white p-6 rounded-2xl shadow-md border border-gray-200"
    >
      <textarea
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-base resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
        rows={6}
        placeholder="Dear LifeBook, today I..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />
      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-all duration-200"
      >
        ✨ Add to Book
      </button>
    </form>
  );
};

export default JournalInput;
