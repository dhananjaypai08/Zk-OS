"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8fffad]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4AA8FF]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="flex items-center flex-col flex-grow pt-20 px-4 relative z-10">
        <div className="text-center mb-12 relative">
          <h1 className="text-center relative z-10 mb-8">
            <span className="block text-7xl font-bold mb-4 bg-clip-text">
              <span className="text-white">zk</span>
              <span className="text-[#8fffad]">OS</span>
              <span className="text-[#4AA8FF]"> Platform</span>
            </span>
            <span className="block text-2xl text-gray-400 mt-4">Building the Future of Web3</span>
          </h1>
          <div className="absolute -inset-4 bg-gradient-to-r from-[#8fffad]/20 via-[#4AA8FF]/20 to-[#8fffad]/20 blur-xl opacity-50 rounded-full"></div>
        </div>

        {/* Feature Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-16 mb-20 px-4">
          {/* zkMonitor Card */}
          <Link href={"/dashboard"} className="group transform hover:scale-[1.02] transition-all duration-300">
            <div className="relative h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8fffad] to-[#4AA8FF] opacity-20 group-hover:opacity-30 blur rounded-2xl transition-all duration-300"></div>
              <div className="relative h-full bg-black/40 backdrop-blur-sm border border-[#8fffad]/20 p-8 rounded-2xl group-hover:border-[#8fffad]/40 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 mr-4 bg-gradient-to-br from-[#8fffad] to-[#4AA8FF] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-[#8fffad] text-2xl font-bold group-hover:text-[#4AA8FF] transition-colors">zkMonitor</h3>
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Real-time monitoring and analytics of subgraph deployments across 10 blockchain networks, tracking indexing performance, query volume, and curator activity.
                </p>
              </div>
            </div>
          </Link>

          {/* zkSubgraph Card */}
          <Link href={"/upload"} className="group transform hover:scale-[1.02] transition-all duration-300">
            <div className="relative h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4AA8FF] to-[#8fffad] opacity-20 group-hover:opacity-30 blur rounded-2xl transition-all duration-300"></div>
              <div className="relative h-full bg-black/40 backdrop-blur-sm border border-[#4AA8FF]/20 p-8 rounded-2xl group-hover:border-[#4AA8FF]/40 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 mr-4 bg-gradient-to-br from-[#4AA8FF] to-[#8fffad] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-[#4AA8FF] text-2xl font-bold group-hover:text-[#8fffad] transition-colors">zkSubgraph</h3>
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Secure digital asset management with privacy-preserving transactions. Keep your financial activities confidential while maintaining full control.
                </p>
              </div>
            </div>
          </Link>

          {/* zkStore Card */}
          <Link href={"/akave"} className="group transform hover:scale-[1.02] transition-all duration-300">
            <div className="relative h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8fffad] to-[#4AA8FF] opacity-20 group-hover:opacity-30 blur rounded-2xl transition-all duration-300"></div>
              <div className="relative h-full bg-black/40 backdrop-blur-sm border border-[#8fffad]/20 p-8 rounded-2xl group-hover:border-[#8fffad]/40 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 mr-4 bg-gradient-to-br from-[#8fffad] to-[#4AA8FF] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7z M8 10h.01 M12 10h.01 M16 10h.01 M8 14h.01 M12 14h.01 M16 14h.01" />
                    </svg>
                  </div>
                  <h3 className="text-[#8fffad] text-2xl font-bold group-hover:text-[#4AA8FF] transition-colors">zkStore</h3>
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Cross-chain asset transfer with zero-knowledge security guarantees. Bridge assets across different blockchains without compromising on privacy or security.
                </p>
              </div>
            </div>
          </Link>
          

          {/* zkWallet Card */}
          <div className="group transform hover:scale-[1.02] transition-all duration-300">
            <div className="relative h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4AA8FF] to-[#8fffad] opacity-20 group-hover:opacity-30 blur rounded-2xl transition-all duration-300"></div>
              <div className="relative h-full bg-black/40 backdrop-blur-sm border border-[#4AA8FF]/20 p-8 rounded-2xl group-hover:border-[#4AA8FF]/40 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 mr-4 bg-gradient-to-br from-[#4AA8FF] to-[#8fffad] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7h2v14H3V7h2V4a2 2 0 012-2h8a2 2 0 012 2v3zm-8-3v3h4V4h-4z" />
                    </svg>
                  </div>
                  <h3 className="text-[#4AA8FF] text-2xl font-bold group-hover:text-[#8fffad] transition-colors">zkWallet</h3>
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Decentralized governance platform with private voting mechanisms. Participate in DAO governance while maintaining vote privacy and preventing front-running.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Connected Address Section */}
        {connectedAddress && (
          <div className="mt-8 text-center backdrop-blur-sm bg-black/20 px-6 py-3 rounded-xl border border-[#8fffad]/20">
            <p className="text-gray-400 mb-2">Connected Account:</p>
            <Address address={connectedAddress} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;