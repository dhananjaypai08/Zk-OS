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
      "#00ff00", // Bright Green
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
      color: colors[index]
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

  return (
    <div className="min-h-screen bg-black p-8">
      {/* Main container with terminal styling */}
      <div className="w-full max-w-7xl mx-auto relative">
        {/* Terminal window */}
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#00ff00]/20">
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
              <div className="border border-[#00ff00]/30 rounded p-4 bg-black/50">
                <h3 className="text-sm mb-2 text-white font-sans">TOTAL_BRIDGE_VOLUME</h3>
                <p className="text-2xl font-mono text-[#00ff00]">{totalBridgeVolume.toFixed(2)} ETH</p>
              </div>
              <div className="border border-[#00ff00]/30 rounded p-4 bg-black/50">
                <h3 className="text-sm mb-2 text-white font-sans">ACTIVE_CURATORS</h3>
                <p className="text-2xl font-mono text-[#00ff00]">{curatorStats.activeCurators}</p>
              </div>
              <div className="border border-[#00ff00]/30 rounded p-4 bg-black/50">
                <h3 className="text-sm mb-2 text-white font-sans">TOTAL_SUBGRAPHS</h3>
                <p className="text-2xl font-mono text-[#00ff00]">{data.totalSubgraphs}</p>
              </div>
              <div className="border border-[#00ff00]/30 rounded p-4 bg-black/50">
                <h3 className="text-sm mb-2 text-white font-sans">NETWORK_PARTICIPANTS</h3>
                <p className="text-2xl font-mono text-[#00ff00]">{data.totalAccounts}</p>
              </div>
            </div>

            {/* Charts grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bridge Activity Chart */}
              <div className="border border-[#00ff00]/30 rounded p-4 bg-black/50">
                <h3 className="text-sm mb-4 text-white font-sans">BRIDGE_ACTIVITY_TRENDS</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={bridgeActivityTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#00ff00" opacity={0.2} />
                      <XAxis dataKey="date" stroke="#f0f0f0" />
                      <YAxis stroke="#f0f0f0" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'black',
                          border: '1px solid #00ff00',
                          color: '#00ff00'
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="deposits" stroke="#00ff00" />
                      <Line type="monotone" dataKey="withdrawals" stroke="#ffc4c4" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Network Distribution */}
              <div className="border border-[#00ff00]/30 rounded p-4 bg-black/50">
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
                        fill="#00ff00"
                      >
                        {networkData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'black',
                          border: '1px solid #00ff00',
                          color: '#00ff00'
                        }}
                      />
                      <Legend
                        formatter={(value, entry) => (
                          <span style={{ color: 'white' }}>{value}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Curators */}
              <div className="border border-[#00ff00]/30 rounded p-4 bg-black/50">
                <h3 className="text-sm mb-4 text-white font-sans">TOP_CURATORS</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={curatorStats.topCurators}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#00ff00" opacity={0.2} />
                      <XAxis dataKey="curator" stroke="#00ff00" />
                      <YAxis stroke="#00ff00" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'black',
                          border: '1px solid #00ff00',
                          color: '#00ff00'
                        }}
                      />
                      <Bar dataKey="balance" fill="#00ff00" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="border border-[#00ff00]/30 rounded p-4 bg-black/50">
                <h3 className="text-sm mb-4 text-white font-sans">RECENT_TRANSACTIONS</h3>
                <div className="space-y-3 font-mono text-[#00ff00]">
                  {data.bridgeTransactions.slice(0, 5).map((tx, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>{tx.from.slice(0, 6)}...{tx.from.slice(-4)}</span>
                      <span>{(Number(tx.amount) / 1e18).toFixed(2)} ETH</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphDashboard;