import React, { useState, useEffect } from 'react';
import { UserCirclePlus, Trash, UploadSimple } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";

export default function PhotoModal({
  isOpen,
  setIsOpen,
  titulo,
  photoSrc,
  onPhotoUpload,
  onDeletePhoto,
  onContinue,
  onExit
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    console.log("Photo URL:", photoSrc);
  }, [photoSrc]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log("File selected:", event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      onPhotoUpload(selectedFile);
    } else {
      console.error("No file selected for upload.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    console.log("File dropped:", file);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)} 
          className="bg-slate-900/30 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()} 
            className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <UserCirclePlus className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-center mb-2 py-3">{titulo}</h3>

              {photoSrc ? (
                <img
                  src={photoSrc}
                  alt="Foto de Perfil"
                  className="w-full h-56 object-cover rounded-lg mb-4 shadow-inner"
                  onError={(e) => { e.target.onerror = null; e.target.src = "fallback-image-url"; }}
                />
              ) : (
                <div
                  className={`w-full h-56 bg-gray-200 flex items-center justify-center mb-4 rounded-lg transition-all ${
                    isDragging ? "bg-blue-100" : ""
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onDragLeave={handleDragLeave}
                >
                  {isDragging ? (
                    <p className="absolute text-gray-500">Solte a imagem aqui</p>
                  ) : (
                    <UserCirclePlus size={80} className="text-gray-500" />
                  )}
                </div>
              )}

              <div className="flex justify-between gap-4 mb-4">
                <label
                  htmlFor="photo-upload"
                  className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-500 transition"
                >
                  <UploadSimple size={20} />
                  {photoSrc ? "Alterar Foto" : "Adicionar Foto"}
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {photoSrc && (
                  <button
                    onClick={() => onDeletePhoto(photoSrc.split('/').pop())} // Passa apenas o nome do arquivo
                    className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg flex items-center justify-center hover:bg-red-500 transition"
                  >
                    <Trash size={20} />
                    Deletar
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onExit} 
                  className="bg-red-600 hover:bg-red-500 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Voltar
                </button>
                <button
                  onClick={handleUpload}
                  className="bg-[#00bfa6] text-white transition-colors border-2 border-[#00bfa6]  font-semibold w-full py-2 rounded"
                >
                  Continuar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}