import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from "recharts";

const GraphDashboard = ({ data }) => {
  // Calculate total bridge volume
  const totalBridgeVolume = useMemo(() => {
    return data.bridgeTransactions.reduce((sum, tx) => {
      return sum + Number(tx.amount) / 1e18;
    }, 0);
  }, [data.bridgeTransactions]);

  // Process curator data
  const curatorStats = useMemo(() => {
    const activeCurators = data.curators.filter(c => c.account.subgraphs.some(s => s.active)).length;
    const topCurators = data.curators
      .map(c => ({
        curator: c.id.slice(0, 6) + "..." + c.id.slice(-4),
        balance: Number(c.account.balance) / 1e18,
      }))
      .sort((a, b) => b.balance - a.balance)
      .slice(0, 10);
    return { activeCurators, topCurators };
  }, [data.curators]);

  // Process network data for top 10 networks
  const networkData = useMemo(() => {
    const sortedNetworks = [...data.networks]
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    // Array of distinct colors for the pie chart
    const colors = [
      "#8fffad", // Bright Green
      "#00ffff", // Cyan
      "#ff00ff", // Magenta
      "#ffff00", // Yellow
      "#ff0000", // Red
      "#0000ff", // Blue
      "#ff8000", // Orange
      "#8000ff", // Purple
      "#00ff80", // Spring Green
      "#ff0080"  // Pink
    ];

    return sortedNetworks.map((network, index) => ({
      ...network,
      fill: colors[index] // Changed from color to fill
    }));
  }, [data.networks]);

  // Process bridge activity trends
  const bridgeActivityTrends = useMemo(() => {
    const dailyActivity = data.bridgeTransactions.reduce((acc, tx) => {
      const date = new Date(tx.timestamp * 1000).toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = { date, deposits: 0, withdrawals: 0 };
      }
      const value = Number(tx.amount) / 1e18;
      if ("deposits" in tx) {
        acc[date].deposits += value;
      } else {
        acc[date].withdrawals += value;
      }
      return acc;
    }, {});
    return Object.values(dailyActivity);
  }, [data.bridgeTransactions]);

  const commonTooltipStyle = {
    contentStyle: { 
      backgroundColor: '#1a1a1a',
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '8px 12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      color: '#f0f0f0'
    },
    itemStyle: { 
      color: '#f0f0f0',
      fontSize: '14px',
      padding: '4px 0'
    },
    labelStyle: {
      color: '#f0f0f0',
      fontWeight: 'bold',
      marginBottom: '4px'
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      {/* Main container with terminal styling */}
      <div className="w-full max-w-7xl mx-auto relative">
        {/* Terminal window */}
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#8fffad]/20">
          {/* Terminal header */}
          <div className="bg-gray-900/50 px-4 py-2 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
              zkOS Dashboard
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-6">
            {/* Key metrics grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Metric cards with terminal styling */}
              <div className="border border-[#8fffad]/30 rounded p-4 bg-black/50">
                <h3 className="text-sm mb-2 text-white font-sans">TOTAL_BRIDGE_VOLUME</h3>
                <p className="text-2xl font-mono text-[#8fffad]">{totalBridgeVolume.toFixed(2)} ETH</p>
              </div>
              <div className="border border-[#8fffad]/30 rounded p-4 bg-black/50">
                <h3 className="text-sm mb-2 text-white font-sans">ACTIVE_CURATORS</h3>
                <p className="text-2xl font-mono text-[#8fffad]">{curatorStats.activeCurators}</p>
              </div>
              <div className="border border-[#8fffad]/30 rounded p-4 bg-black/50">
                <h3 className="text-sm mb-2 text-white font-sans">TOTAL_SUBGRAPHS</h3>
                <p className="text-2xl font-mono text-[#8fffad]">{data.totalSubgraphs}</p>
              </div>
              <div className="border border-[#8fffad]/30 rounded p-4 bg-black/50">
                <h3 className="text-sm mb-2 text-white font-sans">NETWORK_PARTICIPANTS</h3>
                <p className="text-2xl font-mono text-[#8fffad]">{data.totalAccounts}</p>
              </div>
            </div>

            {/* Charts grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bridge Activity Chart */}
              <div className="border border-[#8fffad]/30 rounded p-4 bg-black/50">
                <h3 className="text-sm mb-4 text-white font-sans">BRIDGE_ACTIVITY_TRENDS</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                      data={bridgeActivityTrends}
                      margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#8fffad" opacity={0.2} />
                      <XAxis dataKey="date" stroke="#f0f0f0" fontSize={11} />
                      <YAxis stroke="#f0f0f0" />
                      <Tooltip {...commonTooltipStyle} />
                      <Legend
                        formatter={(value) => (
                          <span style={{ color: '#f0f0f0' }}>{value}</span>
                        )}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="deposits" 
                        stroke="#8fffad"
                        strokeWidth={2}
                        dot={{ fill: '#8fffad', stroke: '#8fffad' }}
                        activeDot={{ fill: '#8fffad', stroke: '#8fffad', r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="withdrawals" 
                        stroke="#ff4444"
                        strokeWidth={2}
                        dot={{ fill: '#ff4444', stroke: '#ff4444' }}
                        activeDot={{ fill: '#ff4444', stroke: '#ff4444', r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Network Distribution */}
              <div className="border border-[#8fffad]/30 rounded p-4 bg-black/50">
                <h3 className="text-sm mb-4 text-white font-sans">NETWORK_DISTRIBUTION</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={networkData} 
                        dataKey="count" 
                        nameKey="network" 
                        cx="50%" 
                        cy="50%"
                        outerRadius={80}
                        strokeWidth={0}
                      >
                        {networkData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip 
                        {...commonTooltipStyle}
                        formatter={(value) => {
                          const total = networkData.reduce((sum, n) => sum + n.count, 0);
                          const percent = ((value / total) * 100).toFixed(1);
                          return [`${percent}%`, ''];
                        }}
                        separator=" "
                      />
                      <Legend
                        formatter={(value) => (
                          <span style={{ color: '#f0f0f0' }}>{value}</span>
                        )}
                        wrapperStyle={{
                          padding: '10px 0'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Curators */}
              <div className="border border-[#8fffad]/30 rounded p-4 bg-black/50">
                <h3 className="text-sm mb-4 text-white font-sans">TOP_CURATORS</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={curatorStats.topCurators}
                      margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#8fffad" opacity={0.2} />
                      <XAxis dataKey="curator" stroke="#f0f0f0" />
                      <YAxis stroke="#f0f0f0" />
                      <Tooltip {...commonTooltipStyle} />
                      <Bar 
                        dataKey="balance" 
                        fill="#8fffad"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="border border-[#8fffad]/30 rounded p-4 bg-black/50 h-64">
                <h3 className="text-sm mb-4 text-white font-sans">RECENT_TRANSACTIONS</h3>
                
                {/* Scrollable container with hidden scrollbar */}
                <div className="h-[calc(100%-4rem)] overflow-y-auto scrollbar-hide">
                  <div className="space-y-2 font-mono pr-2">
                    {data.bridgeTransactions.slice(0, 10).map((tx, index) => (
                      <div 
                        key={index} 
                        className="group relative flex justify-between items-center p-3 rounded transition-all duration-200 hover:bg-[#8fffad]/10 border border-transparent hover:border-[#8fffad]/20 cursor-pointer"
                      >
                        {/* Left side with address and transaction type */}
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-[#8fffad]"></div>
                          <div>
                            <span className="text-[#8fffad] font-medium">
                              {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                            </span>
                            <div className="text-xs text-[#8fffad]/60 mt-0.5">
                              {new Date(tx.timestamp * 1000).toLocaleString()}
                            </div>
                          </div>
                        </div>

                        {/* Right side with amount */}
                        <div className="flex items-center space-x-4">
                          <span className="text-[#8fffad] font-bold">
                            {(Number(tx.amount) / 1e18).toFixed(2)} ETH
                          </span>
                          {/* Copy button that appears on hover */}
                          <button 
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 py-1 rounded border border-[#8fffad]/20 hover:bg-[#8fffad]/20 text-xs text-[#8fffad]"
                            onClick={() => {
                              navigator.clipboard.writeText(tx.from);
                            }}
                          >
                            Copy
                          </button>
                        </div>

                        {/* Hover effect line */}
                        <div className="absolute left-0 top-0 h-full w-1 bg-[#8fffad]/0 group-hover:bg-[#8fffad]/30 transition-all duration-200"></div>
                      </div>
                    ))}
                  </div>
                </div>

                <style jsx>{`
                  .scrollbar-hide {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;     /* Firefox */
                  }
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;            /* Chrome, Safari and Opera */
                  }
                `}</style>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphDashboard;