import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Attestations as AttestationsEvent,
  BatchMetadataUpdate as BatchMetadataUpdateEvent,
  MetadataUpdate as MetadataUpdateEvent,
  Mint as MintEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PerformUpkeep as PerformUpkeepEvent,
  Transfer as TransferEvent,
  UpkeepCheck as UpkeepCheckEvent,
  ZkProof as ZkProofEvent
} from "../generated/ZkOS/ZkOS"
import {
  Approval,
  ApprovalForAll,
  Attestations,
  BatchMetadataUpdate,
  MetadataUpdate,
  Mint,
  OwnershipTransferred,
  PerformUpkeep,
  Transfer,
  UpkeepCheck,
  ZkProof
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAttestations(event: AttestationsEvent): void {
  let entity = new Attestations(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.subgraph_owner = event.params.subgraph.owner
  entity.subgraph_endpoint = event.params.subgraph.endpoint
  entity.subgraph_zk_proof = event.params.subgraph.zk_proof
  entity.subgraph_datetime = event.params.subgraph.datetime
  entity.subgraph_attestation_count = event.params.subgraph.attestation_count
  entity.attestation_owner = event.params.attestation.owner
  entity.attestation_data = event.params.attestation.data
  entity.attestation_subgraph_owner = event.params.attestation.subgraph.owner
  entity.attestation_subgraph_endpoint =
    event.params.attestation.subgraph.endpoint
  entity.attestation_subgraph_zk_proof =
    event.params.attestation.subgraph.zk_proof
  entity.attestation_subgraph_datetime =
    event.params.attestation.subgraph.datetime
  entity.attestation_subgraph_attestation_count =
    event.params.attestation.subgraph.attestation_count
  entity._timestamp = event.params._timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBatchMetadataUpdate(
  event: BatchMetadataUpdateEvent
): void {
  let entity = new BatchMetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._fromTokenId = event.params._fromTokenId
  entity._toTokenId = event.params._toTokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMetadataUpdate(event: MetadataUpdateEvent): void {
  let entity = new MetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._tokenId = event.params._tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMint(event: MintEvent): void {
  let entity = new Mint(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._to = event.params._to
  entity.uri = event.params.uri
  entity._timestamp = event.params._timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePerformUpkeep(event: PerformUpkeepEvent): void {
  let entity = new PerformUpkeep(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._timestamp = event.params._timestamp
  entity._counter = event.params._counter

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpkeepCheck(event: UpkeepCheckEvent): void {
  let entity = new UpkeepCheck(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._timestamp = event.params._timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleZkProof(event: ZkProofEvent): void {
  let entity = new ZkProof(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.zk_hash = event.params.zk_hash
  entity._timestamp = event.params._timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
