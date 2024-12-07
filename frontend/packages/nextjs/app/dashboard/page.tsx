"use client";

import { useEffect, useState } from "react";
import { execute } from "../../../../.graphclient";
import GraphDashboard from "../../components/GraphDashboard";
import { useAccount } from "wagmi";

// Define types for our data
type BridgeTransaction = {
  amount: string;
  from: string;
  to: string;
  timestamp: number;
};

type NetworkData = {
  network: string;
  count: number;
};

type CuratorData = {
  id: string;
  account: {
    balance: string;
    subgraphs: {
      active: boolean;
    }[];
  };
};

type DashboardData = {
  bridgeTransactions: BridgeTransaction[];
  networks: NetworkData[];
  curators: CuratorData[];
  totalAccounts: number;
  totalSubgraphs: number;
};

// GraphQL Query
const DASHBOARD_QUERY = `
  query DashboardData {
    bridgeDepositTransactions(first: 1000) {
      amount
      from
      to
      timestamp
    }
    bridgeWithdrawalTransactions(first: 1000) {
      amount
      from
      to
      timestamp
    }
    subgraphDeploymentManifests {
      network
    }
    curators {
      id
      account {
        balance
        subgraphs {
          active
        }
      }
    }
    graphAccounts {
      id
    }
    subgraphs {
      active
    }
  }
`;

const Dashboard = () => {
  const { address: connectedAddress } = useAccount();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await execute(DASHBOARD_QUERY, {});

        // Process and transform data
        const processedData = {
          bridgeTransactions: [...result.data.bridgeDepositTransactions, ...result.data.bridgeWithdrawalTransactions],
          networks: processNetworkData(result.data.subgraphDeploymentManifests),
          curators: result.data.curators,
          totalAccounts: result.data.graphAccounts.length,
          totalSubgraphs: result.data.subgraphs.length,
        };

        setDashboardData(processedData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processNetworkData = (manifests: { network: string }[]): NetworkData[] => {
    const networkCounts = manifests.reduce((acc: { [key: string]: number }, manifest) => {
      acc[manifest.network] = (acc[manifest.network] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(networkCounts).map(([network, count]) => ({
      network,
      count,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold mb-8">Graph Network Analytics</h1>
          {dashboardData && <GraphDashboard data={dashboardData} />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
