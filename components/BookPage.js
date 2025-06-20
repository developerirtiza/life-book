import React from "react";

export default function BookPage({ pageData, onDelete }) {
  const {
    story = "No story written.",
    image = null,
    achievements = [],
    embarrassments = [],
  } = pageData || {};

  return (
    <div className="h-full w-full bg-[#fef3c7] border-[8px] border-[#e0c084] rounded-xl shadow-[inset_0_0_20px_#c8a75d] p-6 space-y-4 font-serif text-[#3e2c15] overflow-auto">
      {/* Header Image */}
      <div className="w-full h-52 relative rounded-md overflow-hidden border border-yellow-300 shadow-inner">
        {image ? (
          <img
            src={image}
            alt="Story Illustration"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
            No Image Available
          </div>
        )}
      </div>

      {/* Story Text */}
      <div className="text-[17px] leading-relaxed whitespace-pre-line">
        {story}
      </div>

      {/* Sections: Achievements & Embarrassments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-4">
        <div>
          <h3 className="text-lg text-green-800 font-bold mb-1">
            🏆 Achievements
          </h3>
          {achievements.length > 0 ? (
            achievements.map((ach, i) => (
              <p key={i} className="text-green-900">
                {ach}
              </p>
            ))
          ) : (
            <p className="text-gray-500 italic">None</p>
          )}
        </div>

        <div>
          <h3 className="text-lg text-red-800 font-bold mb-1">
            😳 Embarrassments
          </h3>
          {embarrassments.length > 0 ? (
            embarrassments.map((emb, i) => (
              <p key={i} className="text-red-900">
                {emb}
              </p>
            ))
          ) : (
            <p className="text-gray-500 italic">None</p>
          )}
        </div>
      </div>

      {/* Delete Button */}
      {onDelete && (
        <div className="flex justify-end mt-4">
          <button
            onClick={onDelete}
            className="text-sm px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete Page
          </button>
        </div>
      )}
    </div>
  );
}
