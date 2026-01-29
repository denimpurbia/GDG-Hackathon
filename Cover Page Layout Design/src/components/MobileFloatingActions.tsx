import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Bot,
  Sparkles,
  Shield,
  Phone,
  MessageCircle,
  MapPin,
  Zap,
  Plus,
  X
} from "lucide-react";

interface MobileFloatingActionsProps {
  onAIAssistantOpen: () => void;
  onSafetyOpen: () => void;
  onBookJourney : () => void ;
  onSupportOpen: () => void;
  onEmergencyCall: () => void;
  isAIAssistantOpen: boolean;

}

const quickActions = [
  {
    id: "safety",
    icon: Shield,
    label: "Safety",
    color: "bg-red-500 hover:bg-red-600",
    description: "Emergency SOS"
  },
  {
    id: "support",
    icon: Phone,
    label: "Support",
    color: "bg-green-500 hover:bg-green-600",
    description: "24/7 Help"
  },
  {
    id: "emergency",
    icon: Zap,
    label: "Emergency",
    color: "bg-orange-500 hover:bg-orange-600",
    description: "Quick Call"
  }
];

export function MobileFloatingActions({
  onAIAssistantOpen,
  onSafetyOpen,
  onBookJourney,
  onSupportOpen,
  onEmergencyCall,
  isAIAssistantOpen
}: MobileFloatingActionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pulseAI, setPulseAI] = useState(true);

  const handleActionClick = (actionId: string) => {
    switch (actionId) {
      case "safety":
        onSafetyOpen();
        break;
      case "support":
        onSupportOpen();
        break;
      case "emergency":
        onEmergencyCall();
        break;
    }
    setIsExpanded(false);
  };

  const handleAIClick = () => {
    onAIAssistantOpen();
    setPulseAI(false);
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-3">
      {/* Quick Action Buttons */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2, staggerChildren: 0.05 }}
            className="flex flex-col gap-2"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center gap-3"
              >
                {/* Action Label */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200"
                >
                  <div className="text-sm font-medium text-gray-900">{action.label}</div>
                  <div className="text-xs text-gray-600">{action.description}</div>
                </motion.div>

                {/* Action Button */}
                <Button
                  onClick={() => handleActionClick(action.id)}
                  className={`w-12 h-12 rounded-full ${action.color} shadow-lg border-2 border-white`}
                >
                  <action.icon className="w-5 h-5 text-white" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB - Toggle Quick Actions */}
      <motion.div
        className="relative"
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-14 h-14 rounded-full bg-gray-800 hover:bg-gray-900 shadow-xl border-2 border-white transition-all duration-300 ${
            isExpanded ? 'rotate-45' : ''
          }`}
        >
          {isExpanded ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Plus className="w-6 h-6 text-white" />
          )}
        </Button>

        {/* Quick Actions Badge */}
        {!isExpanded && (
          <Badge className="absolute -top-2 -left-2 w-6 h-6 text-xs p-0 flex items-center justify-center bg-orange-500 border-2 border-white">
            3
          </Badge>
        )}
      </motion.div>

      {/* AI Assistant FAB */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 200 }}
        className="relative"
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={handleAIClick}
          className={`w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl border-4 border-white transition-all duration-300 ${
            pulseAI && !isAIAssistantOpen ? 'animate-pulse' : ''
          }`}
        >
          <Bot className="w-8 h-8 text-white" />
        </Button>

        {/* AI Status Indicator */}
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
          <Sparkles className="w-3 h-3 text-white animate-bounce" />
        </div>

        {/* AI Assistant Tooltip */}
        <AnimatePresence>
          {!isAIAssistantOpen && !isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.8 }}
              transition={{ delay: 2, duration: 0.3 }}
              className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-slate-800/95 backdrop-blur-sm text-white px-4 py-2 rounded-xl shadow-lg border border-slate-700 whitespace-nowrap"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <div>
                  <div className="font-medium text-sm">Talk to JARVIS</div>
                  <div className="text-xs text-slate-300">Your AI Travel Buddy</div>
                </div>
              </div>
              
              {/* Tooltip Arrow */}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-slate-800/95"></div>
              
              {/* Pulsing Dot */}
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Location FAB */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, type: "spring", stiffness: 200 }}
        className="relative"
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onBookJourney}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg border-2 border-white"
        >
          <MapPin className="w-5 h-5 text-white" />
        </Button>

        {/* Location Pulse Effect */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-amber-500/50"
        />
      </motion.div>

      {/* Background Overlay when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}