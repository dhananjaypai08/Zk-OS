// components/TerminalPage.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// components/TerminalPage.tsx

// components/TerminalPage.tsx

const TerminalPage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string[]>(["Welcome to zkOS Terminal", 'Type "ls" to view available features']);
  const [featuresShown, setFeaturesShown] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = input.trim().toLowerCase();
      setOutput(prev => [...prev, `zkos@terminal ~ % ${command}`]);
      processCommand(command);
      setInput("");
    }
  };

  const processCommand = (command: string) => {
    if (command === "ls") {
      setOutput(prev => [
        ...prev,
        "📁 home            - Main Application",
        "🔒 zkKYC           - Decentralized Identity Verification",
        "💼 zkWallet        - Secure Digital Asset Management",
        "🔄 zkBridge        - Cross-Chain Asset Transfer",
        "🤝 zkDAO           - Decentralized Governance Platform",
        "",
        'Use "cd <directory>" to navigate',
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
        router.push("/home");
      } else if (destination === "") {
        setOutput(prev => [...prev, "Please specify a directory"]);
      } else {
        setOutput(prev => [...prev, `Directory not found: ${destination}`]);
      }
    } else if (command === "cd") {
      setOutput(prev => [...prev, "Please specify a directory"]);
    } else if (command === "clear") {
      setOutput([]);
    } else if (command === "help") {
      setOutput(prev => [
        ...prev,
        "Available commands:",
        "  ls               - List directories",
        "  cd <directory>   - Change directory",
        "  clear           - Clear terminal",
        "  help            - Show this help message",
      ]);
    } else if (command) {
      setOutput(prev => [...prev, `Command not found: ${command}. Try 'help' for available commands`]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-black rounded-lg shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center border-b border-gray-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 text-center text-sm text-gray-400">zkOS Terminal</div>
        </div>

        {/* Terminal Content */}
        <div
          className="p-4 h-[500px] overflow-y-auto font-mono text-green-500 cursor-text"
          onClick={handleTerminalClick}
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Output Area */}
          {output.map((line, index) => (
            <div key={index} className="mb-1">
              {!line.startsWith("zkos@terminal") && line && <>{line}</>}
              {line.startsWith("zkos@terminal") && <>{line}</>}
            </div>
          ))}

          {/* Input Area */}
          <div className="flex">
            <span className="text-green-500">zkos@terminal ~ % </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-green-500 font-mono ml-1"
              autoFocus
              aria-label="terminal input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPage;
