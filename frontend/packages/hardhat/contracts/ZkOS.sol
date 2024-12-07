// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Counters.sol"; 
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

contract ZkOS is ERC721URIStorage, Ownable, AutomationCompatibleInterface {
    event UpkeepCheck(uint256 _timestamp);
    event PerformUpkeep(uint256 _timestamp, uint256 _counter);
    event Mint(address _to, string uri, uint256 _timestamp);
    event ZkProof(address owner, bytes32 zk_hash, uint256 _timestamp);
    event Attestations(address owner, SubGraph subgraph, Attestation attestation, uint256 _timestamp);

    struct Attestation{
        address owner;
        string data;
        SubGraph subgraph;
    }

    struct SubGraph {
        address owner;
        string endpoint;
        bytes32 zk_proof;
        uint256 datetime;
        uint256 attestation_count;
    }

    SubGraph[] public all_subgraphs;
    address[] public all_users;
    mapping(address => SubGraph[]) public all_subgraphs_of_user;
    mapping(string => SubGraph) public endpoint_mapped_to_subgraph;
 
    // using Counters for Counters.Counter;
    // Counters.Counter private _tokenIdCounter;
    uint256 private _tokenIdCounter;


    uint256 public immutable interval = 30;
    uint256 public lastTimeStamp = block.timestamp;
    uint256 counter = 0;
    bytes public upkeepData;

    address internal burning_address = 0x000000000000000000000000000000000000dEaD; // Burning address

    constructor() ERC721("OsZK", "OZK") Ownable(msg.sender) {}

    // Get data 
    function getUsers() public view returns(address[] memory) {
        return all_users;
    }

    function getSubgraphs() public view returns(SubGraph[] memory) {
        return all_subgraphs;
    }

    function getSubgraphsofUser(address _addr) public view returns(SubGraph[] memory) {
        return all_subgraphs_of_user[_addr];
    }
 
    // Upload subgraph
    function safeMint(string memory subgraph_endpoint, string memory uri, address to, bytes32 zk_proof_hash) public {
        // uint256 tokenId = _tokenIdCounter.current();
        // _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter += 1;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        

        emit Mint(to, uri, block.timestamp);

        all_users.push(to);
        SubGraph memory newSubGraph = SubGraph(to, subgraph_endpoint, zk_proof_hash, block.timestamp, 0);
        all_subgraphs.push(newSubGraph);
        all_subgraphs_of_user[to].push(newSubGraph);
        endpoint_mapped_to_subgraph[subgraph_endpoint] = newSubGraph;
        emit ZkProof(to, zk_proof_hash, block.timestamp);
    }

    function attest_subgraph(string memory data, address owner, string memory subgraph_endpoint) public {
        SubGraph memory givenSG = endpoint_mapped_to_subgraph[subgraph_endpoint];
        Attestation memory newAttestation = Attestation(owner, data, givenSG);
        emit Attestations(owner, givenSG, newAttestation, block.timestamp);
    }

    // TOKEN URI of metadata
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }


    /*
    ###### Uptime check 
    */
    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
        emit UpkeepCheck(1);
        return (upkeepNeeded, _checkMint(performData));
    }

    function performUpkeep(bytes calldata performData) external override {
        if ((block.timestamp - lastTimeStamp) > interval) {
            lastTimeStamp = block.timestamp;
            counter = counter + 1;
            emit PerformUpkeep(lastTimeStamp, counter);
        }
        _performMint(performData);
        
    }

    function _checkMint(bytes memory performData) public pure returns(bytes memory){
        return performData;
    }

    function _performMint(bytes calldata performData) public {
        upkeepData = performData;
    }
    /*
    ##### Uptime Check Ended
    */

}