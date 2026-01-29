import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MessageCircle, Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";

interface AISpeakerProps {
  message: string;
  className?: string;
}

export function AISpeaker({ message, className = "" }: AISpeakerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (isExpanded && !isTyping) {
      setIsTyping(true);
      setCurrentText("");
      
      let index = 0;
      const timer = setInterval(() => {
        setCurrentText(message.slice(0, index + 1));
        index++;
        
        if (index >= message.length) {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 50);

      return () => clearInterval(timer);
    }
  }, [isExpanded, message, isTyping]);

  const speak = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* AI Speaker Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* AI Speaker Panel */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ 
          opacity: isExpanded ? 1 : 0, 
          y: isExpanded ? 0 : 100,
          scale: isExpanded ? 1 : 0.8
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-24 right-6 z-30 max-w-sm w-80"
        style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium">AI Travel Assistant</p>
                  <p className="text-xs opacity-80">Your Rajasthan Guide</p>
                </div>
              </div>
              <Button
                onClick={speak}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Message Content */}
          <div className="p-4">
            <div className="bg-gray-50 rounded-lg p-3 relative">
              <p className="text-gray-800 leading-relaxed">
                {currentText}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-blue-600 ml-1"
                  />
                )}
              </p>
            </div>
            
            <div className="mt-3 flex items-center gap-2">
              <div className="flex -space-x-1">
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="text-xs text-gray-500">AI Assistant • Online</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-gray-100 px-4 py-3">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                Ask Question
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                Get Help
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}