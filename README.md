# ZK-OS: A Web3 Operating System

**ZK-OS** is an innovative Web3 operating system built using the **Scaffold-ETH-2 toolkit**. It incorporates advanced protocols to provide monitoring, subgraph management, and decentralized file storage solutions, all powered by Zero-Knowledge (ZK) proofs and blockchain technology. This system leverages **The Graph Protocol** and **Filecoin** to ensure efficient, secure, and decentralized functionalities.

---

## Features

### 1. **Terminal Interface**
- Command-driven interaction for seamless navigation.
- **Commands**:
  - `ls`: Lists all available protocols.
  - `cd home`: Navigates to the Home Page.
- **Connect Wallet**: A button to connect your Web3 wallet for secure interactions.

### 2. **Home Page**
- Overview of the protocols available:
  1. **Monitoring Protocol (zkMonitor)**: Real-time analytics of subgraph deployments.
  2. **Subgraph Management Protocol**: Upload and attest subgraphs with ZK proofs.
  3. **Decentralized File Storage Protocol**: Securely store and retrieve data using Filecoin.

### 3. **zkSubgraph Page**
- Upload subgraphs with **ZK Proofs**.
- Browse subgraphs uploaded by others.
- **Attestation System**: 
  - Leave comments to attest subgraphs.
  - Subgraphs accumulate a reputation score based on attestation activity.
- Dynamic analytics updates for every new subgraph using the **zk-os subgraph**.

### 4. **Monitoring Protocol (zkMonitor)**
- Real-time monitoring of subgraph deployments across **10 blockchain networks**.
- Metrics tracked:
  - Indexing performance.
  - Query volume.
  - Curator activity.
- Powered by **The Graph Protocol Substream**, listening to Ethereum blockchain events for real-time data.

### 5. **Decentralized File Storage Protocol**
- Upload subgraph APIs, datasets, and other data to **Akave**.
- **Storage**: Decentralized on **Filecoin** for high security and accessibility.
- Data can be downloaded securely via the protocol.

---

## Technology Stack
- **Scaffold-ETH-2**: Rapid development toolkit for Ethereum-based applications.
- **The Graph Protocol**: Subgraph indexing and querying.
- **Filecoin**: Decentralized storage solution.
- **ZK Proofs**: Ensures data privacy and integrity.

---

## Installation

### Prerequisites
1. Install **Node.js**, **Yarn**, and **Python**.
2. Set up a wallet like **Metamask**.
3. Frontend Setup
   - Navigate to the frontend directory:
     ```bash
     cd frontend
    - Install dependencies:
       ```bash
      yarn install
    - Start the development server:
       ```bash
      yarn start
4. Backend Setup
   - Create a virtual environment:
     ```bash
     python -m venv env
    - Activate the virtual environment:
    - Start the development server:
       ```bash
      pip install -r requirements.txt
    - Run the main file:
       ```bash
      python main.py
### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/ZK-OS.git
   cd ZK-OS

### Links
1. baseSepolia

| Network | Address                                                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Base    | [0x1c24D24c621833a242b2a28c3507aeC6fEEa8fEc](https://sepolia.basescan.org/address/0x1c24D24c621833a242b2a28c3507aeC6fEEa8fEc) |


2. Subgraph Indexing
- New Subgraph Endpoint - 
- Substream powered subgraph - [https://api.studio.thegraph.com/query/90589/zk-os_substream/v1.1.1](https://testnet.thegraph.com/explorer/subgraphs/4AZ8vNARqGMnUUnumtVvcJpywJxkxbuwVSXSBf4tQzdq?view=Query&chain=arbitrum-sepolia)
