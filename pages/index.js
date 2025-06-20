import React, { useState, useEffect } from "react";
import JournalInput from "../components/JournalInput";
import BookPage from "../components/BookPage";

export default function JournalToBookPage() {
  const [entry, setEntry] = useState("");
  const [pages, setPages] = useState([]);
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lifebook_pages");
    if (saved) {
      const parsed = JSON.parse(saved);
      setPages(parsed);
      setCurrentSpreadIndex(Math.floor((parsed.length - 1) / 2));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lifebook_pages", JSON.stringify(pages));
  }, [pages]);

  const handleJournalSubmit = async (entryText) => {
    try {
      setLoading(true);
      const response = await fetch("/api/generatePage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ journalEntry: entryText }),
      });

      const data = await response.json();
      const updatedPages = [...pages, data];
      setPages(updatedPages);
      setEntry("");
      setCurrentSpreadIndex(Math.floor(updatedPages.length / 2));
    } catch (error) {
      console.error("Error submitting entry:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePage = (pageIndex) => {
    const confirmDelete = window.confirm("Delete this page permanently?");
    if (!confirmDelete) return;

    const updated = pages.filter((_, i) => i !== pageIndex);
    setPages(updated);
    setCurrentSpreadIndex((prev) =>
      Math.min(Math.floor((updated.length - 1) / 2), prev)
    );
  };

  const goToPreviousSpread = () => {
    if (currentSpreadIndex > 0) {
      setCurrentSpreadIndex(currentSpreadIndex - 1);
    }
  };

  const goToNextSpread = () => {
    if (currentSpreadIndex < Math.floor(pages.length / 2)) {
      setCurrentSpreadIndex(currentSpreadIndex + 1);
    }
  };

  const leftPageIndex = currentSpreadIndex * 2;
  const rightPageIndex = leftPageIndex + 1;

  const leftPage = pages[leftPageIndex] || null;
  const rightPage = pages[rightPageIndex] || null;

  // ✅ Fix: input page appears exactly where next page would be created
  const isLastSpread =
    leftPageIndex >= pages.length || rightPageIndex >= pages.length;
  const showInputOnLeft = isLastSpread && !leftPage;
  const showInputOnRight = isLastSpread && !!leftPage && !rightPage;

  return (
    <main className="min-h-screen bg-[#fdf5e6] p-8 font-serif">
      <h1 className="text-3xl font-extrabold text-center mb-10 text-brown-700">
        📘 LifeBook - Your Journal in Book Form
      </h1>

      {/* Book Spread */}
      <div className="relative max-w-5xl mx-auto bg-[#fff9ef] shadow-2xl border-4 border-yellow-200 rounded-[20px] flex overflow-hidden aspect-[4/3]">
        {/* Left Page */}
        <div className="w-1/2 p-6 border-r-2 border-yellow-300 bg-[#fef7dd]">
          {leftPage ? (
            <BookPage
              pageData={leftPage}
              onDelete={() => handleDeletePage(leftPageIndex)}
            />
          ) : showInputOnLeft ? (
            <>
              <h2 className="text-xl font-bold text-center mb-4 text-purple-800">
                ✍️ Write Today’s Entry
              </h2>
              <JournalInput
                entry={entry}
                setEntry={setEntry}
                loading={loading}
                onSubmit={handleJournalSubmit}
              />
            </>
          ) : (
            <div className="text-center text-gray-500 italic mt-20">
              (Blank Page)
            </div>
          )}
        </div>

        {/* Right Page */}
        <div className="w-1/2 p-6 bg-[#fffaf0]">
          {rightPage ? (
            <BookPage
              pageData={rightPage}
              onDelete={() => handleDeletePage(rightPageIndex)}
            />
          ) : showInputOnRight ? (
            <>
              <h2 className="text-xl font-bold text-center mb-4 text-purple-800">
                ✍️ Write Today’s Entry
              </h2>
              <JournalInput
                entry={entry}
                setEntry={setEntry}
                loading={loading}
                onSubmit={handleJournalSubmit}
              />
            </>
          ) : (
            <div className="text-center text-gray-500 italic mt-20">
              (Blank Page)
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-8 mt-6">
        <button
          onClick={goToPreviousSpread}
          disabled={currentSpreadIndex === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          ⬅️ Previous
        </button>
        <span className="text-sm text-gray-700 pt-1">
          Spread {currentSpreadIndex + 1} of {Math.ceil(pages.length / 2) || 1}
        </span>
        <button
          onClick={goToNextSpread}
          disabled={currentSpreadIndex >= Math.floor(pages.length / 2)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next ➡️
        </button>
      </div>
    </main>
  );
}
