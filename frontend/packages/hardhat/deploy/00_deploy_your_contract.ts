import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys the ZkOS contract using the deployer account
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployZkOS: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.
    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.
    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Deploy ZkOS contract
  const deployResult = await deploy("ZkOS", {
    from: deployer,
    // No constructor arguments needed since ZkOS constructor uses msg.sender
    args: [],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract
  const zkOSContract = await hre.ethers.getContract<Contract>("ZkOS", deployer);

  // Log deployment info
  console.log("📄 ZkOS Contract deployed to:", deployResult.address);
  console.log("🔐 Owner:", await zkOSContract.owner());

  // Log initial state
  const users = await zkOSContract.getUsers();
  const subgraphs = await zkOSContract.getSubgraphs();
  console.log("👥 Initial users count:", users.length);
  console.log("📊 Initial subgraphs count:", subgraphs.length);
};

export default deployZkOS;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags ZkOS
deployZkOS.tags = ["ZkOS"];
