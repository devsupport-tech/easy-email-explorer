
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { CustomButton } from '@/components/ui/CustomButton';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm here to help. What can I assist you with today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Simple keyword-based responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Thanks for reaching out. How can I help you today?";
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('pricing')) {
      return "I'd be happy to help with pricing information! Our team can provide you with a customized quote based on your specific needs. Would you like me to connect you with someone from our sales team?";
    }
    
    if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
      return "You can reach us at hello@essence.com or call us at +1 (555) 123-4567. Our team is available Monday through Friday, 9 AM to 6 PM EST.";
    }
    
    if (message.includes('product') || message.includes('service') || message.includes('what do you do')) {
      return "We specialize in creating beautiful, functional products that enhance everyday experiences. Our focus is on thoughtful design and quality craftsmanship. Is there a particular product or service you'd like to know more about?";
    }
    
    if (message.includes('support') || message.includes('help') || message.includes('problem')) {
      return "I'm here to help! Can you tell me more about what you need assistance with? Our support team is also available to provide more detailed help if needed.";
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're very welcome! Is there anything else I can help you with today?";
    }
    
    if (message.includes('bye') || message.includes('goodbye')) {
      return "Thank you for chatting with us! Have a wonderful day, and feel free to reach out anytime if you need assistance.";
    }
    
    // Default response
    return "That's a great question! While I'd love to help with more specific information, I'd recommend reaching out to our team directly at hello@essence.com or using our contact form. They'll be able to provide you with detailed answers tailored to your needs.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <CustomButton
          onClick={() => setIsOpen(!isOpen)}
          variant="gradient"
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </CustomButton>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-background border rounded-lg shadow-xl z-50 flex flex-col animate-scale-in">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
            <div>
              <h3 className="font-medium">Chat Support</h3>
              <p className="text-xs opacity-90">We're here to help!</p>
            </div>
            <CustomButton
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </CustomButton>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground p-3 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-accent text-sm"
              />
              <CustomButton
                onClick={handleSendMessage}
                variant="gradient"
                size="icon"
                className="h-10 w-10"
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
