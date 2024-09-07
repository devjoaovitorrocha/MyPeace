import React, { useState } from "react";

const EmotionRegister = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [comment, setComment] = useState("");

  const emotions = [
    { emoji: "😄", label: "Feliz" },
    { emoji: "😢", label: "Triste" },
    { emoji: "😠", label: "Bravo" },
    { emoji: "😨", label: "Assustado" },
    { emoji: "😐", label: "Neutro" },
  ];

  const handleSave = () => {
    if (!selectedEmotion) {
      alert("Por favor, selecione uma emoção!");
      return;
    }

    const emotionData = {
      emotion: selectedEmotion,
      comment: comment,
    };

    console.log("Emoção salva: ", emotionData);
    alert("Emoção registrada com sucesso!");

    setSelectedEmotion(null);
    setComment("");
  };

  return (
    <div className="max-w-md mx-auto my-6 p-5 bg-gray-100 rounded-lg shadow-md text-center">
      <h2 className="text-2xl mb-6">Como você está se sentindo hoje?</h2>
      <div className="flex justify-between mb-6">
        {emotions.map((emotion) => (
          <button
            key={emotion.label}
            className={`text-4xl p-2 transform transition duration-300 ${
              selectedEmotion === emotion.label ? "border-2 border-blue-500 rounded-full" : ""
            }`}
            onClick={() => setSelectedEmotion(emotion.label)}
          >
            {emotion.emoji}
            <span className="block text-sm mt-1">{emotion.label}</span>
          </button>
        ))}
      </div>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-md mb-4 resize-none h-20"
        placeholder="Deixe um comentário (opcional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        onClick={handleSave}
      >
        Salvar
      </button>
    </div>
  );
};

export default EmotionRegister;
