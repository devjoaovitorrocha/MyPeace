import React, { useState } from "react";
import './EmotionRegister.css';

const EmotionRegister = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [comment, setComment] = useState("");
  
  const emotions = [
    { emoji: "😄", label: "Feliz" },
    { emoji: "😢", label: "Triste" },
    { emoji: "😠", label: "Bravo" },
    { emoji: "😨", label: "Assustado" },
    { emoji: "😐", label: "Neutro" }
  ];

  const handleSave = () => {
    if (!selectedEmotion) {
      alert("Por favor, selecione uma emoção!");
      return;
    }

    const emotionData = {
      emotion: selectedEmotion,
      comment: comment
    };

    // Aqui você pode salvar os dados, enviar para uma API, etc.
    console.log("Emoção salva: ", emotionData);
    alert("Emoção registrada com sucesso!");
    
   
    setSelectedEmotion(null);
    setComment("");
  };

  return (
    
    <div className="emotion-register">
      <Header />
      <Container>
      <h2>Como você está se sentindo hoje?</h2>
      <div className="emotion-list">
        {emotions.map((emotion) => (
          <button
            key={emotion.label}
            className={`emotion-btn ${selectedEmotion === emotion.label ? 'selected' : ''}`}
            onClick={() => setSelectedEmotion(emotion.label)}
          >
            {emotion.emoji}
            <span>{emotion.label}</span>
          </button>
        ))}
      </div>
      <textarea
        placeholder="Deixe um comentário (opcional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="save-btn" onClick={handleSave}>
        Salvar
      </button>
      </Container>
      <Footer />
    </div>
    
  );
};

export default EmotionRegister;
