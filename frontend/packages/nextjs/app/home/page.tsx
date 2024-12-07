"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col">
      {/* Hero Section */}
      <div className="flex items-center flex-col flex-grow pt-20 px-4">
        <h1 className="text-center mb-8">
          <span className="block text-6xl font-bold mb-4">
            <span className="text-white">zkOS</span> <span className="text-[#00ff9d]">Platform</span>
          </span>
          <span className="block text-xl text-gray-400">Building the Future of Web3</span>
        </h1>

        {/* Feature Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-16 mb-20">
          {/* zkKYC Card */}
          <Link href={"/dashboard"}>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-[#00ff9d] opacity-20 blur-xl rounded-2xl group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-black/40 border border-[#00ff9d]/20 p-8 rounded-2xl hover:border-[#00ff9d]/40 transition-all">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">🔒</span>
                  <h3 className="text-[#00ff9d] text-xl font-bold">zkMonitor</h3>
                </div>
                <p className="text-gray-400">
                Real-time monitoring and analytics of subgraph deployments across 10 blockchain networks, tracking indexing performance, query volume, and curator activity.
                </p>
              </div>
            </div>
          </Link>

          {/* zkWallet Card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-[#00ff9d] opacity-20 blur-xl rounded-2xl group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-black/40 border border-[#00ff9d]/20 p-8 rounded-2xl hover:border-[#00ff9d]/40 transition-all">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">💼</span>
                <h3 className="text-[#00ff9d] text-xl font-bold">zkWallet</h3>
              </div>
              <p className="text-gray-400">
                Secure digital asset management with privacy-preserving transactions. Keep your financial activities
                confidential while maintaining full control.
              </p>
            </div>
          </div>

          {/* zkBridge Card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-[#00ff9d] opacity-20 blur-xl rounded-2xl group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-black/40 border border-[#00ff9d]/20 p-8 rounded-2xl hover:border-[#00ff9d]/40 transition-all">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">🔄</span>
                <h3 className="text-[#00ff9d] text-xl font-bold">zkBridge</h3>
              </div>
              <p className="text-gray-400">
                Cross-chain asset transfer with zero-knowledge security guarantees. Bridge assets across different
                blockchains without compromising on privacy or security.
              </p>
            </div>
          </div>

          {/* zkDAO Card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-[#00ff9d] opacity-20 blur-xl rounded-2xl group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-black/40 border border-[#00ff9d]/20 p-8 rounded-2xl hover:border-[#00ff9d]/40 transition-all">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">🛡️</span>
                <h3 className="text-[#00ff9d] text-xl font-bold">zkDAO</h3>
              </div>
              <p className="text-gray-400">
                Decentralized governance platform with private voting mechanisms. Participate in DAO governance while
                maintaining vote privacy and preventing front-running.
              </p>
            </div>
          </div>
        </div>

        {/* Connected Address Section (if needed) */}
        {connectedAddress && (
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-2">Connected Account:</p>
            <Address address={connectedAddress} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
