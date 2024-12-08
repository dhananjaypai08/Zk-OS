"use client";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, Tooltip, Legend, CartesianGrid, XAxis, YAxis
} from 'recharts';
import { MessageCircle, X, Send, Loader } from 'lucide-react';

// GraphQL Queries
const DASHBOARD_QUERIES = gql`
  query GetDashboardData {
    zkProofs(first: 10, orderBy: id, orderDirection: asc) {
      zk_hash
      owner
      _timestamp
    }
    mints(first: 10) {
      uri
      blockTimestamp
      _to
    }
    attestations_collection(orderBy: id, orderDirection: asc) {
      attestation_data
      subgraph_endpoint
    }
  }
`;

const ZKOSDashboard = () => {
  const { loading, error, data } = useQuery(DASHBOARD_QUERIES);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Process ZK Proofs data
  const zkProofStats = useMemo(() => {
    if (!data?.zkProofs) return { total: 0, uniqueOwners: 0 };
    const uniqueOwners = new Set(data.zkProofs.map(p => p.owner)).size;
    return {
      total: data.zkProofs.length,
      uniqueOwners,
      recentProofs: data.zkProofs.slice(0, 5)
    };
  }, [data?.zkProofs]);

  // Process Mints data
  const mintStats = useMemo(() => {
    if (!data?.mints) return { total: 0, uniqueMinters: 0 };
    const uniqueMinters = new Set(data.mints.map(m => m._to)).size;
    return {
      total: data.mints.length,
      uniqueMinters,
      recentMints: data.mints.slice(0, 5)
    };
  }, [data?.mints]);

  // Mock time series data for visualization
  const timeSeriesData = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      proofs: Math.floor(Math.random() * 20),
      mints: Math.floor(Math.random() * 15)
    })).reverse();
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    setIsSending(true);
    const userMessage = { type: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const endpoint = inputMessage.toLowerCase().includes('load') 
        ? '/load_subgraph' 
        : '/askGPT';
      
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage })
      });
      
      const data = await response.json();
      const aiMessage = { type: 'ai', content: data.response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { type: 'ai', content: 'Sorry, there was an error processing your request.' };
      setMessages(prev => [...prev, errorMessage]);
    }
    
    setIsSending(false);
    setInputMessage('');
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader className="w-8 h-8 text-[#8fffad] animate-spin" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
      Error: {error.message}
    </div>
  );

  return (
    <div className="min-h-screen bg-black p-8 relative">
      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#8fffad] mb-2">zkOS Analytics</h1>
          <p className="text-gray-400">Real-time insights into zkOS network activity</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* ZK Proofs Card */}
          <div className="bg-gray-900 rounded-lg p-6 border border-[#8fffad]/20">
            <h3 className="text-[#8fffad] text-sm font-medium mb-2">Total ZK Proofs</h3>
            <p className="text-3xl font-bold text-white mb-4">{zkProofStats.total}</p>
            <p className="text-gray-400 text-sm">
              {zkProofStats.uniqueOwners} unique generators
            </p>
          </div>

          {/* Mints Card */}
          <div className="bg-gray-900 rounded-lg p-6 border border-[#8fffad]/20">
            <h3 className="text-[#8fffad] text-sm font-medium mb-2">Total Mints</h3>
            <p className="text-3xl font-bold text-white mb-4">{mintStats.total}</p>
            <p className="text-gray-400 text-sm">
              {mintStats.uniqueMinters} unique minters
            </p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Activity Timeline */}
          <div className="bg-gray-900 rounded-lg p-6 border border-[#8fffad]/20">
            <h3 className="text-[#8fffad] text-sm font-medium mb-4">Network Activity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#8fffad" />
                  <YAxis stroke="#8fffad" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '4px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="proofs" 
                    stroke="#8fffad" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mints" 
                    stroke="#ff69b4" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900 rounded-lg p-6 border border-[#8fffad]/20">
            <h3 className="text-[#8fffad] text-sm font-medium mb-4">Recent ZK Proofs</h3>
            <div className="space-y-4">
              {zkProofStats.recentProofs?.map((proof, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#8fffad] rounded-full" />
                    <span className="text-gray-300 font-mono text-sm">
                      {proof.owner.slice(0, 6)}...{proof.owner.slice(-4)}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {new Date(parseInt(proof._timestamp) * 1000).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Widget */}
        {chatOpen && (
          <div className="fixed bottom-20 right-8 w-96 h-[500px] bg-gray-900 rounded-lg shadow-xl border border-[#8fffad]/20 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-[#8fffad]/20 flex justify-between items-center">
              <h3 className="text-[#8fffad] font-medium">AI Assistant</h3>
              <button 
                onClick={() => setChatOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-[#8fffad]/10 text-[#8fffad]'
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-[#8fffad]/20">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask anything about the data..."
                  className="flex-1 bg-gray-800 border border-[#8fffad]/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#8fffad]"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isSending}
                  className="bg-[#8fffad]/20 text-[#8fffad] p-2 rounded-lg hover:bg-[#8fffad]/30 transition-colors"
                >
                  {isSending ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chat Toggle Button */}
        <button
          onClick={() => setChatOpen(prev => !prev)}
          className="fixed bottom-8 right-8 bg-[#8fffad] text-black p-4 rounded-full shadow-lg hover:bg-[#8fffad]/90 transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ZKOSDashboard;