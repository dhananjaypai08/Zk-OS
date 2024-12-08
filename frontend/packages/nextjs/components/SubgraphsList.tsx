import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const SubgraphList = () => {
  const [subgraphs, setSubgraphs] = useState([]);
  const [selectedSubgraph, setSelectedSubgraph] = useState(null);
  const [attestationComment, setAttestationComment] = useState("");
  const [attestedEndpoints, setAttestedEndpoints] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { address: connectedAddress } = useAccount();

  const { data: subgraphsData, refetch: refetchSubgraphs } = useScaffoldReadContract({
    contractName: "ZkOS",
    functionName: "getSubgraphs",
    watch: true,
  });

  const { writeContractAsync: attestSubgraph } = useScaffoldWriteContract("ZkOS");

  useEffect(() => {
    if (subgraphsData) {
      setSubgraphs(subgraphsData);
    }
  }, [subgraphsData]);

  useEffect(() => {
    const savedAttestations = localStorage.getItem(`attestations_${connectedAddress}`);
    if (savedAttestations) {
      setAttestedEndpoints(new Set(JSON.parse(savedAttestations)));
    }
  }, [connectedAddress]);

  const handleAttestClick = subgraph => {
    setSelectedSubgraph(subgraph);
    setIsModalOpen(true);
  };

  const handleAttestation = async () => {
    if (!selectedSubgraph || !attestationComment.trim() || !connectedAddress) return;

    try {
      await attestSubgraph({
        functionName: "attest_subgraph",
        args: [attestationComment, connectedAddress, selectedSubgraph.endpoint],
      });

      const newAttestedEndpoints = new Set([...attestedEndpoints, selectedSubgraph.endpoint]);
      setAttestedEndpoints(newAttestedEndpoints);
      localStorage.setItem(`attestations_${connectedAddress}`, JSON.stringify(Array.from(newAttestedEndpoints)));

      setAttestationComment("");
      setIsModalOpen(false);
      setSelectedSubgraph(null);

      await refetchSubgraphs();
    } catch (error) {
      console.error("Error submitting attestation:", error);
    }
  };

  return (
    <div className="bg-black">
      <div className="w-full p-6 rounded-xl">
        <div className="flex items-center space-x-2 mb-6">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-200 ml-4">Available Subgraphs</h2>
        </div>

        <div className="space-y-4">
          {subgraphs.map((subgraph, index) => (
            <div
              key={index}
              className="bg-[#1a2235] rounded-lg p-4 hover:bg-[#232d45] transition-all duration-200 border border-[#2a364d] shadow-lg"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-[#00ff9d] font-semibold">Endpoint:</span>
                      <span className="text-gray-300 truncate hover:text-white">{subgraph.endpoint}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <span className="text-[#00ff9d]">Owner: </span>
                        <span className="text-gray-400">{`${subgraph.owner.slice(0, 6)}...${subgraph.owner.slice(-4)}`}</span>
                      </div>
                      <div>
                        <span className="text-[#00ff9d]">Attestations: </span>
                        <span className="text-gray-400">
                          {subgraph.attestation_count ? Number(subgraph.attestation_count) : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      attestedEndpoints.has(subgraph.endpoint)
                        ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                        : "bg-[#00ff9d] text-black hover:bg-[#00cc7d]"
                    }`}
                    onClick={() => handleAttestClick(subgraph)}
                    disabled={attestedEndpoints.has(subgraph.endpoint)}
                  >
                    {attestedEndpoints.has(subgraph.endpoint) ? "Attested" : "Attest"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-[#000000] rounded-xl p-6 w-full max-w-md relative z-50 border border-[#2a364d]">
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-200 ml-2">Submit Attestation</h3>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="text-[#00ff9d]">Your Comment</span>
                </label>
                <textarea
                  className="bg-[#0a0f1c] border border-[#2a364d] rounded-lg p-3 text-gray-300 focus:border-[#00ff9d] focus:ring-1 focus:ring-[#00ff9d] outline-none transition-all duration-200 resize-none"
                  value={attestationComment}
                  onChange={e => setAttestationComment(e.target.value)}
                  placeholder="Enter your attestation comment..."
                  rows={4}
                />
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="px-4 py-2 rounded-full text-gray-300 hover:text-white transition-colors duration-200"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    attestationComment.trim()
                      ? "bg-[#00ff9d] text-black hover:bg-[#00cc7d]"
                      : "bg-gray-700 text-gray-300 cursor-not-allowed"
                  }`}
                  onClick={handleAttestation}
                  disabled={!attestationComment.trim()}
                >
                  Submit Attestation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubgraphList;
