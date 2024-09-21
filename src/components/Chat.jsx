import { X, ArrowsOut, ArrowsIn } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Warning } from "@phosphor-icons/react";

export default function Chat({ titulo = "Chat", children }) {
  const [isOpen, setIsOpen] = useState(true); 
  const [isExpanded, setIsExpanded] = useState(false); 
  const [messages, setMessages] = useState([]); 
  const [newMessage, setNewMessage] = useState("");


  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  
  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sent: true }]); 
      setNewMessage("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: "-5deg" }} 
            animate={{ opacity: 1, scale: 1, rotate: "0deg" }}    
            exit={{ opacity: 0, scale: 0.8, rotate: "-5deg" }}    
            transition={{ duration: 0.4, ease: "easeInOut" }}      
            className={`bg-white border-2 border-red-500 p-4 rounded-lg shadow-xl cursor-default relative ${
              isExpanded ? "w-full h-full p-8 backdrop-blur-lg" : "w-64 h-80"
            } fixed bottom-0 right-0 z-50 overflow-hidden`}
            style={{
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            
            {isExpanded && (
              <Warning className="text-red-500/10 rotate-12 text-[250px] absolute z-0 -top-20 -left-20" />
            )}

           
            <div className="flex justify-between items-center mb-2 relative z-10">
              <h3 className="font-semibold text-2xl text-red-500">{titulo}</h3>
              <div className="flex items-center space-x-2">
                <button onClick={toggleExpand} className="text-gray-500">
                  {isExpanded ? <ArrowsIn size={24} /> : <ArrowsOut size={24} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-gray-500">
                  <X size={24} />
                </button>
              </div>
            </div>

            
            <div className="flex flex-col justify-between h-full relative z-10">
              
              <div
                className={`overflow-y-auto flex-grow p-2 space-y-2 ${
                  isExpanded ? "h-full" : "h-60"
                }`}
              >
                {messages.length > 0 ? (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg max-w-[70%] ${
                        msg.sent
                          ? "bg-red-500 text-white self-end"
                          : "bg-gray-100 text-gray-900 self-start" 
                      } shadow-sm`}
                    >
                      {msg.text}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Nenhuma mensagem ainda...</p>
                )}
              </div>

            
              {isExpanded && (
                <div className="flex items-center border-t p-2 mt-2">
                  <input
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-lg"
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    onClick={sendMessage}
                    className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Enviar
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
