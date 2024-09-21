import { UserPlus} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";

export default function Photo({
  isOpen,
  setIsOpen,
  titulo,
  photoSrc,
  onExit,
  onContinue,
  conteudo,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-green-900/30 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-green-500 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <UserPlus className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-green-500 grid place-items-center mx-auto">
                <UserPlus />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">{titulo}</h3>
              <p className="text-center mb-6">{conteudo}</p>
              {photoSrc ? (
                <img
                  src={photoSrc}
                  alt="Perfil"
                  className="w-full h-64 object-cover mb-4"
                />
              ) : (
                <div className="bg-gray-200 w-full h-64 flex items-center justify-center">
                  <UserPlus size={100} className="text-gray-500" />
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={onExit}
                  className="bg-green-700 text-white transition-colors border-2 border-green-700 font-semibold w-full py-2 rounded"
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
      )}
    </AnimatePresence>
  );
}
