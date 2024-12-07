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
} from "recharts";

type DashboardProps = {
  data: {
    bridgeTransactions: any[];
    networks: any[];
    curators: any[];
    totalAccounts: number;
    totalSubgraphs: number;
  };
};

const GraphDashboard = ({ data }: DashboardProps) => {
  // Calculate total bridge volume
  const totalBridgeVolume = useMemo(() => {
    return data.bridgeTransactions.reduce((sum, tx) => {
      return sum + Number(tx.amount) / 1e18; // Convert from wei to ETH
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

  // Process bridge activity trends
  const bridgeActivityTrends = useMemo(() => {
    const dailyActivity = data.bridgeTransactions.reduce((acc: any, tx) => {
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
    <div className="min-h-screen bg-base-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Key Metrics Cards */}
        <div className="bg-base-100 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Total Bridge Volume</h3>
          <p className="text-3xl font-bold">{totalBridgeVolume.toFixed(2)} ETH</p>
        </div>
        <div className="bg-base-100 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Active Curators</h3>
          <p className="text-3xl font-bold">{curatorStats.activeCurators}</p>
        </div>
        <div className="bg-base-100 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Total Subgraphs</h3>
          <p className="text-3xl font-bold">{data.totalSubgraphs}</p>
        </div>
        <div className="bg-base-100 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Network Participants</h3>
          <p className="text-3xl font-bold">{data.totalAccounts}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Bridge Activity Chart */}
        <div className="bg-base-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Bridge Activity Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bridgeActivityTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="deposits" stroke="#8884d8" />
                <Line type="monotone" dataKey="withdrawals" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Network Distribution */}
        <div className="bg-base-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Subgraph Network Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.networks} dataKey="count" nameKey="network" cx="50%" cy="50%" fill="#8884d8" />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Curator Analytics */}
        <div className="bg-base-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Top Curators by Balance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={curatorStats.topCurators}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="curator" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="balance" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="bg-base-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {data.bridgeTransactions.slice(0, 5).map((tx, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">
                  {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                </span>
                <span className="text-sm font-medium">{(Number(tx.amount) / 1e18).toFixed(2)} ETH</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphDashboard;
