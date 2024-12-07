import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const TerminalPage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string[]>(["Welcome to zkOS", "Type \"ls\" to view available features"]);
  const [featuresShown, setFeaturesShown] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Fix: Add missing handleTerminalClick function
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = input.trim().toLowerCase();
      setOutput(prev => [...prev, `→ ${command}`]);
      processCommand(command);
      setInput("");
    }
  };

  const processCommand = (command: string) => {
    if (command === "ls") {
      setOutput(prev => [
        ...prev,
        "📁 home - Main Application",
        "🔒 zkKYC - Decentralized Identity Verification",
        "💼 zkWallet - Secure Digital Asset Management",
        "🔄 zkBridge - Cross-Chain Asset Transfer",
        "🛡️ zkDAO - Decentralized Governance Platform",
        "",
        'Use "cd <directory>" to navigate'
      ]);
      setFeaturesShown(true);
    } else if (command.startsWith("cd ")) {
      const destination = command.substring(3).trim();
      if (!featuresShown) {
        setOutput(prev => [...prev, 'Please use "ls" first to view available directories']);
        return;
      }

      if (destination === "home") {
        setOutput(prev => [...prev, "Entering zkOS home directory..."]);
        setTimeout(() => {
          router.push("/home");
        }, 500);
      } else if (destination === "") {
        setOutput(prev => [...prev, "Please specify a directory"]);
      } else {
        setOutput(prev => [...prev, `Directory not found: ${destination}`]);
      }
    } else if (command === "clear") {
      setOutput([]);
    } else if (command === "help") {
      setOutput(prev => [
        ...prev,
        "Available commands:",
        "  ls             - List directories",
        "  cd <directory> - Change directory",
        "  clear         - Clear terminal",
        "  help          - Show this help message",
      ]);
    } else if (command) {
      setOutput(prev => [...prev, `Command not found: ${command}. Try 'help' for available commands`]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center p-8">
      {/* Welcome Text */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4">
          Welcome to <span className="text-[#00ff9d]">zkOS</span>
        </h1>
        <p className="text-gray-400 text-xl mb-8">The first zero-knowledge operating system for the decentralized world</p>
        <div className="flex gap-4 justify-center">
          <span className="px-4 py-2 bg-[#001F1A] text-[#00ff9d] rounded-full border border-[#00ff9d]/20">
            Secure by Design
          </span>
          <span className="px-4 py-2 bg-[#001B38] text-[#4AA8FF] rounded-full border border-[#4AA8FF]/20">
            Privacy First
          </span>
          <span className="px-4 py-2 bg-[#022B45] text-[#69B8FF] rounded-full border border-[#69B8FF]/20">
            Web3 Native
          </span>
        </div>
      </div>

      {/* Terminal Container */}
      <div className="w-full max-w-4xl relative transform hover:scale-[1.02] transition-all duration-300">
        {/* Multiple Glow Layers */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ff9d] to-[#4AA8FF] opacity-20 blur-2xl rounded-2xl"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff9d] via-[#4AA8FF] to-[#00ff9d] opacity-3 blur-xl rounded-2xl"></div>
        
        {/* Terminal Window */}
        <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl">
          {/* Terminal Header */}
          <div className="bg-[#1c1c1c] px-4 py-3 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-[#ff5f56] rounded-full shadow-inner" />
              <div className="w-3 h-3 bg-[#ffbd2e] rounded-full shadow-inner" />
              <div className="w-3 h-3 bg-[#27c93f] rounded-full shadow-inner" />
            </div>
            <span className="ml-4 text-gray-400 text-sm">zsh</span>
          </div>

          {/* Terminal Content */}
          <div
            className="p-6 h-[500px] overflow-y-auto font-mono cursor-text bg-black"
            onClick={handleTerminalClick}
            style={{ scrollBehavior: "smooth" }}
          >
            {output.map((line, index) => (
              <div key={index} className="mb-1 text-[#00ff9d]">
                {line}
              </div>
            ))}

            {/* Input Line */}
            <div className="flex items-center group">
              <span className="mr-2 text-[#00ff9d]">→</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-[#00ff9d] font-mono"
                autoFocus
                aria-label="terminal input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPage;