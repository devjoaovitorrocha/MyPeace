import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container from "../../components/Container";

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
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container>
        <div className="flex-grow flex items-center justify-center my-6 sm:my-12">
          <div className="flex flex-col items-center shadow-3D p-6 sm:p-8 rounded-lg rounded-tl-none relative w-[90%] max-w-md sm:w-[400px] sm:h-[500px]">
            <div className="w-full bg-blue-600 absolute left-0 -translate-x-[180px] sm:-translate-x-[210px] -translate-y-1 top-[34%] -rotate-90 rounded-t-lg text-center sm:text-end text-white uppercase font-medium pr-4">
              Registro de Emoções
            </div>
            <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6 text-center">Como você está se sentindo hoje?</h2>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
              {emotions.map((emotion) => (
                <button
                  key={emotion.label}
                  className={`text-3xl sm:text-4xl p-2 transform transition duration-300 ${
                    selectedEmotion === emotion.label ? "border-2 border-blue-500 rounded-full" : ""
                  }`}
                  onClick={() => setSelectedEmotion(emotion.label)}
                >
                  {emotion.emoji}
                  <span className="block text-xs sm:text-sm mt-1">{emotion.label}</span>
                </button>
              ))}
            </div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md mb-4 resize-none h-24 sm:h-28"
              placeholder="Deixe um comentário (opcional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full"
              onClick={handleSave}
            >
              Salvar
            </button>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default EmotionRegister;
