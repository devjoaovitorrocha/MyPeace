import { motion } from "framer-motion";
import {  ChatCircle, Chats } from "@phosphor-icons/react";

export default function ModalChatAviso({ isOpen, setIsOpen, onContinue }) {
    return (
      isOpen && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="bg-slate-900/30 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
      >
          <motion.div
                initial={{ scale: 0, rotate: "12.5deg" }}
                animate={{ scale: 1, rotate: "0deg" }}
                exit={{ scale: 0, rotate: "0deg" }}
                onClick={(e) => e.stopPropagation()}
                className="bg-green-500 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
              >

            <Chats className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
                <div className="relative z-10">
                  <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-green-500 grid place-items-center mx-auto">
                    <ChatCircle />
                  </div>
                  <h3 className="text-3xl font-bold text-center mb-2">
                    Aviso
                  </h3>
                  <p className="text-center mb-6">Você será direcionado para outro site. Deseja continuar?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-red-700 text-white transition-colors border-2 border-red-700  font-semibold w-full py-2 rounded"
                    >
                      Sair
                    </button>
                    <button
                      onClick={onContinue}
                      className="bg-[#00bfa6] text-white transition-colors border-2 border-[#00bfa6] hover:text-white font-semibold w-full py-2 rounded"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
          </motion.div>
        </motion.div>
      )
    );
  }