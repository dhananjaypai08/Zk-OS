// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { GraphnetworkTypes } from './sources/graphnetwork/types';
import * as importedModule$0 from "./sources/graphnetwork/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

/**
 * A state channel Allocation representing a single Indexer-SubgraphDeployment stake
 *
 */
export type Allocation = {
  /** Channel Address */
  id: Scalars['ID']['output'];
  /** Indexer of this allocation */
  indexer: Indexer;
  /** Creator of the allocation - can be the operator or the indexer */
  creator: Scalars['Bytes']['output'];
  /** If the Allocation is active it shows the indexer. If closed, it is null */
  activeForIndexer?: Maybe<Indexer>;
  /** Subgraph deployment that is being allocated to */
  subgraphDeployment: SubgraphDeployment;
  /** Tokens allocation in this allocation */
  allocatedTokens: Scalars['BigInt']['output'];
  /** [DEPRECATED] Effective allocation that is realized upon closing */
  effectiveAllocation: Scalars['BigInt']['output'];
  /** Epoch this allocation was created */
  createdAtEpoch: Scalars['Int']['output'];
  /** Block at which this allocation was created */
  createdAtBlockHash: Scalars['Bytes']['output'];
  /** Block number at which this allocation was created */
  createdAtBlockNumber: Scalars['Int']['output'];
  /** Epoch this allocation was closed in */
  closedAtEpoch?: Maybe<Scalars['Int']['output']>;
  /** Block hash at which this allocation was closed */
  closedAtBlockHash?: Maybe<Scalars['Bytes']['output']>;
  /** Block number at which this allocation was closed */
  closedAtBlockNumber?: Maybe<Scalars['Int']['output']>;
  /** Fees this allocation collected from query fees upon closing. Excludes curator reward and protocol tax */
  queryFeesCollected: Scalars['BigInt']['output'];
  /** Query fee rebate amount claimed from the protocol through rebates mechanism. Does not include portion given to delegators */
  queryFeeRebates: Scalars['BigInt']['output'];
  /** Query fee rebates collected from the protocol. Can differ from queryFeeRebates if multiple vouchers per allocation are allowed. */
  distributedRebates: Scalars['BigInt']['output'];
  /** Curator rewards deposited to the curating bonding curve */
  curatorRewards: Scalars['BigInt']['output'];
  /** Indexing rewards earned by this allocation. Includes delegator and indexer rewards */
  indexingRewards: Scalars['BigInt']['output'];
  /** Indexing rewards earned by this allocation by indexers */
  indexingIndexerRewards: Scalars['BigInt']['output'];
  /** Indexing rewards earned by this allocation by delegators */
  indexingDelegatorRewards: Scalars['BigInt']['output'];
  /** [DEPRECATED] Pool in which this allocation was closed */
  poolClosedIn?: Maybe<Pool>;
  /** Fees paid out to delegators */
  delegationFees: Scalars['BigInt']['output'];
  /** Status of the allocation */
  status: AllocationStatus;
  /** Timestamp this allocation was created at */
  createdAt: Scalars['Int']['output'];
  /** Timestamp this allocation was closed at */
  closedAt?: Maybe<Scalars['Int']['output']>;
  /** POI submitted with a closed allocation */
  poi?: Maybe<Scalars['Bytes']['output']>;
  indexingRewardCutAtStart: Scalars['Int']['output'];
  indexingRewardEffectiveCutAtStart: Scalars['BigDecimal']['output'];
  queryFeeCutAtStart: Scalars['Int']['output'];
  queryFeeEffectiveCutAtStart: Scalars['BigDecimal']['output'];
  indexingRewardCutAtClose?: Maybe<Scalars['Int']['output']>;
  indexingRewardEffectiveCutAtClose?: Maybe<Scalars['BigDecimal']['output']>;
  queryFeeCutAtClose?: Maybe<Scalars['Int']['output']>;
  queryFeeEffectiveCutAtClose?: Maybe<Scalars['BigDecimal']['output']>;
  /** NOT IMPLEMENTED - Return for this allocation */
  totalReturn: Scalars['BigDecimal']['output'];
  /** NOT IMPLEMENTED - Yearly annualzied return */
  annualizedReturn: Scalars['BigDecimal']['output'];
};

export type AllocationStatus =
  | 'Null'
  | 'Active'
  | 'Closed'
  | 'Finalized'
  | 'Claimed';

export type Allocation_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  indexer_not?: InputMaybe<Scalars['String']['input']>;
  indexer_gt?: InputMaybe<Scalars['String']['input']>;
  indexer_lt?: InputMaybe<Scalars['String']['input']>;
  indexer_gte?: InputMaybe<Scalars['String']['input']>;
  indexer_lte?: InputMaybe<Scalars['String']['input']>;
  indexer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  indexer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  indexer_contains?: InputMaybe<Scalars['String']['input']>;
  indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_starts_with?: InputMaybe<Scalars['String']['input']>;
  indexer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  indexer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_ends_with?: InputMaybe<Scalars['String']['input']>;
  indexer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  indexer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_?: InputMaybe<Indexer_filter>;
  creator?: InputMaybe<Scalars['Bytes']['input']>;
  creator_not?: InputMaybe<Scalars['Bytes']['input']>;
  creator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  creator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  creator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  creator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  creator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  creator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  activeForIndexer?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_not?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_gt?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_lt?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_gte?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_lte?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  activeForIndexer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  activeForIndexer_contains?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_starts_with?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_ends_with?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  activeForIndexer_?: InputMaybe<Indexer_filter>;
  subgraphDeployment?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_gt?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_lt?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_gte?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_lte?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraphDeployment_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraphDeployment_contains?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_contains?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_?: InputMaybe<SubgraphDeployment_filter>;
  allocatedTokens?: InputMaybe<Scalars['BigInt']['input']>;
  allocatedTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  allocatedTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  allocatedTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  allocatedTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  allocatedTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  allocatedTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  allocatedTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  effectiveAllocation?: InputMaybe<Scalars['BigInt']['input']>;
  effectiveAllocation_not?: InputMaybe<Scalars['BigInt']['input']>;
  effectiveAllocation_gt?: InputMaybe<Scalars['BigInt']['input']>;
  effectiveAllocation_lt?: InputMaybe<Scalars['BigInt']['input']>;
  effectiveAllocation_gte?: InputMaybe<Scalars['BigInt']['input']>;
  effectiveAllocation_lte?: InputMaybe<Scalars['BigInt']['input']>;
  effectiveAllocation_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  effectiveAllocation_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtEpoch?: InputMaybe<Scalars['Int']['input']>;
  createdAtEpoch_not?: InputMaybe<Scalars['Int']['input']>;
  createdAtEpoch_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAtEpoch_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAtEpoch_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAtEpoch_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAtEpoch_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAtEpoch_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAtBlockHash?: InputMaybe<Scalars['Bytes']['input']>;
  createdAtBlockHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  createdAtBlockHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  createdAtBlockHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  createdAtBlockHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  createdAtBlockHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  createdAtBlockHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  createdAtBlockHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  createdAtBlockHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  createdAtBlockHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  createdAtBlockNumber?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlockNumber_not?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAtBlockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  closedAtEpoch?: InputMaybe<Scalars['Int']['input']>;
  closedAtEpoch_not?: InputMaybe<Scalars['Int']['input']>;
  closedAtEpoch_gt?: InputMaybe<Scalars['Int']['input']>;
  closedAtEpoch_lt?: InputMaybe<Scalars['Int']['input']>;
  closedAtEpoch_gte?: InputMaybe<Scalars['Int']['input']>;
  closedAtEpoch_lte?: InputMaybe<Scalars['Int']['input']>;
  closedAtEpoch_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  closedAtEpoch_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  closedAtBlockHash?: InputMaybe<Scalars['Bytes']['input']>;
  closedAtBlockHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  closedAtBlockHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  closedAtBlockHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  closedAtBlockHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  closedAtBlockHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  closedAtBlockHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  closedAtBlockHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  closedAtBlockHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  closedAtBlockHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  closedAtBlockNumber?: InputMaybe<Scalars['Int']['input']>;
  closedAtBlockNumber_not?: InputMaybe<Scalars['Int']['input']>;
  closedAtBlockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  closedAtBlockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  closedAtBlockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  closedAtBlockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  closedAtBlockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  closedAtBlockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  queryFeesCollected?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_not?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_gt?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_lt?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_gte?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_lte?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queryFeesCollected_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queryFeeRebates?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_not?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_gt?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_lt?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_gte?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_lte?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queryFeeRebates_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  distributedRebates?: InputMaybe<Scalars['BigInt']['input']>;
  distributedRebates_not?: InputMaybe<Scalars['BigInt']['input']>;
  distributedRebates_gt?: InputMaybe<Scalars['BigInt']['input']>;
  distributedRebates_lt?: InputMaybe<Scalars['BigInt']['input']>;
  distributedRebates_gte?: InputMaybe<Scalars['BigInt']['input']>;
  distributedRebates_lte?: InputMaybe<Scalars['BigInt']['input']>;
  distributedRebates_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  distributedRebates_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  curatorRewards?: InputMaybe<Scalars['BigInt']['input']>;
  curatorRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  curatorRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  curatorRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  curatorRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  curatorRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  curatorRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  curatorRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  indexingRewards?: InputMaybe<Scalars['BigInt']['input']>;
  indexingRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  indexingRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  indexingRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  indexingRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  indexingRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  indexingRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  indexingRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  indexingIndexerRewards?: InputMaybe<Scalars['BigInt']['input']>;
  indexingIndexerRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  indexingIndexerRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  indexingIndexerRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  indexingIndexerRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  indexingIndexerRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  indexingIndexerRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  indexingIndexerRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  indexingDelegatorRewards?: InputMaybe<Scalars['BigInt']['input']>;
  indexingDelegatorRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  indexingDelegatorRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  indexingDelegatorRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  indexingDelegatorRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  indexingDelegatorRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  indexingDelegatorRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  indexingDelegatorRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolClosedIn?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_not?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_gt?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_lt?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_gte?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_lte?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_in?: InputMaybe<Array<Scalars['String']['input']>>;
  poolClosedIn_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  poolClosedIn_contains?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_not_contains?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_starts_with?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_ends_with?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolClosedIn_?: InputMaybe<Pool_filter>;
  delegationFees?: InputMaybe<Scalars['BigInt']['input']>;
  delegationFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  delegationFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  delegationFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  delegationFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  delegationFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  delegationFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegationFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  status?: InputMaybe<AllocationStatus>;
  status_not?: InputMaybe<AllocationStatus>;
  status_in?: InputMaybe<Array<AllocationStatus>>;
  status_not_in?: InputMaybe<Array<AllocationStatus>>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  closedAt?: InputMaybe<Scalars['Int']['input']>;
  closedAt_not?: InputMaybe<Scalars['Int']['input']>;
  closedAt_gt?: InputMaybe<Scalars['Int']['input']>;
  closedAt_lt?: InputMaybe<Scalars['Int']['input']>;
  closedAt_gte?: InputMaybe<Scalars['Int']['input']>;
  closedAt_lte?: InputMaybe<Scalars['Int']['input']>;
  closedAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  closedAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  poi?: InputMaybe<Scalars['Bytes']['input']>;
  poi_not?: InputMaybe<Scalars['Bytes']['input']>;
  poi_gt?: InputMaybe<Scalars['Bytes']['input']>;
  poi_lt?: InputMaybe<Scalars['Bytes']['input']>;
  poi_gte?: InputMaybe<Scalars['Bytes']['input']>;
  poi_lte?: InputMaybe<Scalars['Bytes']['input']>;
  poi_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  poi_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  poi_contains?: InputMaybe<Scalars['Bytes']['input']>;
  poi_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  indexingRewardCutAtStart?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCutAtStart_not?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCutAtStart_gt?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCutAtStart_lt?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCutAtStart_gte?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCutAtStart_lte?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCutAtStart_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  indexingRewardCutAtStart_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  indexingRewardEffectiveCutAtStart?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCutAtStart_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCutAtStart_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCutAtStart_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCutAtStart_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCutAtStart_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCutAtStart_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  indexingRewardEffectiveCutAtStart_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  queryFeeCutAtStart?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCutAtStart_not?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCutAtStart_gt?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCutAtStart_lt?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCutAtStart_gte?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCutAtStart_lte?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCutAtStart_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  queryFeeCutAtStart_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  queryFeeEffectiveCutAtStart?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCutAtStart_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCutAtStart_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCutAtStart_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCutAtStart_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCutAtStart_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCutAtStart_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  queryFeeEffectiveCutAtStart_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  indexingRewardCutAtClose?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCutAtClose_not?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCutAtClose_gt?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCutAtClose_lt?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCutAtClose_gte?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCutAtClose_lte?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCutAtClose_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  indexingRewardCutAtClose_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  indexingRewardEffectiveCutAtClose?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCutAtClose_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCutAtClose_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCutAtClose_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCutAtClose_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCutAtClose_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCutAtClose_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  indexingRewardEffectiveCutAtClose_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  queryFeeCutAtClose?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCutAtClose_not?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCutAtClose_gt?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCutAtClose_lt?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCutAtClose_gte?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCutAtClose_lte?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCutAtClose_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  queryFeeCutAtClose_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  queryFeeEffectiveCutAtClose?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCutAtClose_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCutAtClose_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCutAtClose_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCutAtClose_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCutAtClose_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCutAtClose_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  queryFeeEffectiveCutAtClose_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalReturn?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalReturn_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  annualizedReturn?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  annualizedReturn_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Allocation_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Allocation_filter>>>;
};

export type Allocation_orderBy =
  | 'id'
  | 'indexer'
  | 'indexer__id'
  | 'indexer__createdAt'
  | 'indexer__url'
  | 'indexer__geoHash'
  | 'indexer__defaultDisplayName'
  | 'indexer__stakedTokens'
  | 'indexer__allocatedTokens'
  | 'indexer__unstakedTokens'
  | 'indexer__lockedTokens'
  | 'indexer__tokensLockedUntil'
  | 'indexer__allocationCount'
  | 'indexer__totalAllocationCount'
  | 'indexer__queryFeesCollected'
  | 'indexer__queryFeeRebates'
  | 'indexer__rewardsEarned'
  | 'indexer__indexerIndexingRewards'
  | 'indexer__delegatorIndexingRewards'
  | 'indexer__indexerRewardsOwnGenerationRatio'
  | 'indexer__transferredToL2'
  | 'indexer__firstTransferredToL2At'
  | 'indexer__firstTransferredToL2AtBlockNumber'
  | 'indexer__firstTransferredToL2AtTx'
  | 'indexer__lastTransferredToL2At'
  | 'indexer__lastTransferredToL2AtBlockNumber'
  | 'indexer__lastTransferredToL2AtTx'
  | 'indexer__stakedTokensTransferredToL2'
  | 'indexer__idOnL2'
  | 'indexer__idOnL1'
  | 'indexer__delegatedCapacity'
  | 'indexer__tokenCapacity'
  | 'indexer__availableStake'
  | 'indexer__delegatedTokens'
  | 'indexer__ownStakeRatio'
  | 'indexer__delegatedStakeRatio'
  | 'indexer__delegatorShares'
  | 'indexer__delegationExchangeRate'
  | 'indexer__indexingRewardCut'
  | 'indexer__indexingRewardEffectiveCut'
  | 'indexer__overDelegationDilution'
  | 'indexer__delegatorQueryFees'
  | 'indexer__queryFeeCut'
  | 'indexer__queryFeeEffectiveCut'
  | 'indexer__delegatorParameterCooldown'
  | 'indexer__lastDelegationParameterUpdate'
  | 'indexer__forcedClosures'
  | 'indexer__totalReturn'
  | 'indexer__annualizedReturn'
  | 'indexer__stakingEfficiency'
  | 'creator'
  | 'activeForIndexer'
  | 'activeForIndexer__id'
  | 'activeForIndexer__createdAt'
  | 'activeForIndexer__url'
  | 'activeForIndexer__geoHash'
  | 'activeForIndexer__defaultDisplayName'
  | 'activeForIndexer__stakedTokens'
  | 'activeForIndexer__allocatedTokens'
  | 'activeForIndexer__unstakedTokens'
  | 'activeForIndexer__lockedTokens'
  | 'activeForIndexer__tokensLockedUntil'
  | 'activeForIndexer__allocationCount'
  | 'activeForIndexer__totalAllocationCount'
  | 'activeForIndexer__queryFeesCollected'
  | 'activeForIndexer__queryFeeRebates'
  | 'activeForIndexer__rewardsEarned'
  | 'activeForIndexer__indexerIndexingRewards'
  | 'activeForIndexer__delegatorIndexingRewards'
  | 'activeForIndexer__indexerRewardsOwnGenerationRatio'
  | 'activeForIndexer__transferredToL2'
  | 'activeForIndexer__firstTransferredToL2At'
  | 'activeForIndexer__firstTransferredToL2AtBlockNumber'
  | 'activeForIndexer__firstTransferredToL2AtTx'
  | 'activeForIndexer__lastTransferredToL2At'
  | 'activeForIndexer__lastTransferredToL2AtBlockNumber'
  | 'activeForIndexer__lastTransferredToL2AtTx'
  | 'activeForIndexer__stakedTokensTransferredToL2'
  | 'activeForIndexer__idOnL2'
  | 'activeForIndexer__idOnL1'
  | 'activeForIndexer__delegatedCapacity'
  | 'activeForIndexer__tokenCapacity'
  | 'activeForIndexer__availableStake'
  | 'activeForIndexer__delegatedTokens'
  | 'activeForIndexer__ownStakeRatio'
  | 'activeForIndexer__delegatedStakeRatio'
  | 'activeForIndexer__delegatorShares'
  | 'activeForIndexer__delegationExchangeRate'
  | 'activeForIndexer__indexingRewardCut'
  | 'activeForIndexer__indexingRewardEffectiveCut'
  | 'activeForIndexer__overDelegationDilution'
  | 'activeForIndexer__delegatorQueryFees'
  | 'activeForIndexer__queryFeeCut'
  | 'activeForIndexer__queryFeeEffectiveCut'
  | 'activeForIndexer__delegatorParameterCooldown'
  | 'activeForIndexer__lastDelegationParameterUpdate'
  | 'activeForIndexer__forcedClosures'
  | 'activeForIndexer__totalReturn'
  | 'activeForIndexer__annualizedReturn'
  | 'activeForIndexer__stakingEfficiency'
  | 'subgraphDeployment'
  | 'subgraphDeployment__id'
  | 'subgraphDeployment__ipfsHash'
  | 'subgraphDeployment__createdAt'
  | 'subgraphDeployment__deniedAt'
  | 'subgraphDeployment__originalName'
  | 'subgraphDeployment__stakedTokens'
  | 'subgraphDeployment__indexingRewardAmount'
  | 'subgraphDeployment__indexingIndexerRewardAmount'
  | 'subgraphDeployment__indexingDelegatorRewardAmount'
  | 'subgraphDeployment__queryFeesAmount'
  | 'subgraphDeployment__queryFeeRebates'
  | 'subgraphDeployment__curatorFeeRewards'
  | 'subgraphDeployment__signalledTokens'
  | 'subgraphDeployment__unsignalledTokens'
  | 'subgraphDeployment__signalAmount'
  | 'subgraphDeployment__pricePerShare'
  | 'subgraphDeployment__reserveRatio'
  | 'subgraphDeployment__subgraphCount'
  | 'subgraphDeployment__activeSubgraphCount'
  | 'subgraphDeployment__deprecatedSubgraphCount'
  | 'subgraphDeployment__transferredToL2'
  | 'subgraphDeployment__transferredToL2At'
  | 'subgraphDeployment__transferredToL2AtBlockNumber'
  | 'subgraphDeployment__transferredToL2AtTx'
  | 'subgraphDeployment__signalledTokensSentToL2'
  | 'subgraphDeployment__signalledTokensReceivedOnL2'
  | 'allocatedTokens'
  | 'effectiveAllocation'
  | 'createdAtEpoch'
  | 'createdAtBlockHash'
  | 'createdAtBlockNumber'
  | 'closedAtEpoch'
  | 'closedAtBlockHash'
  | 'closedAtBlockNumber'
  | 'queryFeesCollected'
  | 'queryFeeRebates'
  | 'distributedRebates'
  | 'curatorRewards'
  | 'indexingRewards'
  | 'indexingIndexerRewards'
  | 'indexingDelegatorRewards'
  | 'poolClosedIn'
  | 'poolClosedIn__id'
  | 'poolClosedIn__allocation'
  | 'poolClosedIn__totalQueryFees'
  | 'poolClosedIn__claimedFees'
  | 'poolClosedIn__curatorRewards'
  | 'delegationFees'
  | 'status'
  | 'createdAt'
  | 'closedAt'
  | 'poi'
  | 'indexingRewardCutAtStart'
  | 'indexingRewardEffectiveCutAtStart'
  | 'queryFeeCutAtStart'
  | 'queryFeeEffectiveCutAtStart'
  | 'indexingRewardCutAtClose'
  | 'indexingRewardEffectiveCutAtClose'
  | 'queryFeeCutAtClose'
  | 'queryFeeEffectiveCutAtClose'
  | 'totalReturn'
  | 'annualizedReturn';

/**
 * Attestation of a dispute
 *
 */
export type Attestation = {
  /** Concatenation of the requestCID and responseCID */
  id: Scalars['ID']['output'];
  /** Subgraph deployment being disputed */
  subgraphDeployment: SubgraphDeployment;
  /** RequestCID */
  requestCID: Scalars['String']['output'];
  /** ResponseCID */
  responseCID: Scalars['String']['output'];
  /** NOT IMPLEMENTED - Gas used by the attested query */
  gasUsed?: Maybe<Scalars['BigInt']['output']>;
  /** NOT IMPLEMENTED - Bytes of attested query */
  responseNumBytes?: Maybe<Scalars['BigInt']['output']>;
  /** V of the indexers signature */
  v: Scalars['Int']['output'];
  /** R of the indexers signature */
  r: Scalars['String']['output'];
  /** S of the indexers signature */
  s: Scalars['String']['output'];
};

export type Attestation_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  subgraphDeployment?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_gt?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_lt?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_gte?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_lte?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraphDeployment_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraphDeployment_contains?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_contains?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_?: InputMaybe<SubgraphDeployment_filter>;
  requestCID?: InputMaybe<Scalars['String']['input']>;
  requestCID_not?: InputMaybe<Scalars['String']['input']>;
  requestCID_gt?: InputMaybe<Scalars['String']['input']>;
  requestCID_lt?: InputMaybe<Scalars['String']['input']>;
  requestCID_gte?: InputMaybe<Scalars['String']['input']>;
  requestCID_lte?: InputMaybe<Scalars['String']['input']>;
  requestCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  requestCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  requestCID_contains?: InputMaybe<Scalars['String']['input']>;
  requestCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  requestCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  requestCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  requestCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  requestCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  requestCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  requestCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  requestCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  requestCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  requestCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  requestCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  responseCID?: InputMaybe<Scalars['String']['input']>;
  responseCID_not?: InputMaybe<Scalars['String']['input']>;
  responseCID_gt?: InputMaybe<Scalars['String']['input']>;
  responseCID_lt?: InputMaybe<Scalars['String']['input']>;
  responseCID_gte?: InputMaybe<Scalars['String']['input']>;
  responseCID_lte?: InputMaybe<Scalars['String']['input']>;
  responseCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  responseCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  responseCID_contains?: InputMaybe<Scalars['String']['input']>;
  responseCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  responseCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  responseCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  responseCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  responseCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  responseCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  responseCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  responseCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  responseCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  responseCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  responseCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  responseNumBytes?: InputMaybe<Scalars['BigInt']['input']>;
  responseNumBytes_not?: InputMaybe<Scalars['BigInt']['input']>;
  responseNumBytes_gt?: InputMaybe<Scalars['BigInt']['input']>;
  responseNumBytes_lt?: InputMaybe<Scalars['BigInt']['input']>;
  responseNumBytes_gte?: InputMaybe<Scalars['BigInt']['input']>;
  responseNumBytes_lte?: InputMaybe<Scalars['BigInt']['input']>;
  responseNumBytes_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  responseNumBytes_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  v?: InputMaybe<Scalars['Int']['input']>;
  v_not?: InputMaybe<Scalars['Int']['input']>;
  v_gt?: InputMaybe<Scalars['Int']['input']>;
  v_lt?: InputMaybe<Scalars['Int']['input']>;
  v_gte?: InputMaybe<Scalars['Int']['input']>;
  v_lte?: InputMaybe<Scalars['Int']['input']>;
  v_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  v_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  r?: InputMaybe<Scalars['String']['input']>;
  r_not?: InputMaybe<Scalars['String']['input']>;
  r_gt?: InputMaybe<Scalars['String']['input']>;
  r_lt?: InputMaybe<Scalars['String']['input']>;
  r_gte?: InputMaybe<Scalars['String']['input']>;
  r_lte?: InputMaybe<Scalars['String']['input']>;
  r_in?: InputMaybe<Array<Scalars['String']['input']>>;
  r_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  r_contains?: InputMaybe<Scalars['String']['input']>;
  r_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  r_not_contains?: InputMaybe<Scalars['String']['input']>;
  r_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  r_starts_with?: InputMaybe<Scalars['String']['input']>;
  r_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  r_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  r_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  r_ends_with?: InputMaybe<Scalars['String']['input']>;
  r_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  r_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  r_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  s?: InputMaybe<Scalars['String']['input']>;
  s_not?: InputMaybe<Scalars['String']['input']>;
  s_gt?: InputMaybe<Scalars['String']['input']>;
  s_lt?: InputMaybe<Scalars['String']['input']>;
  s_gte?: InputMaybe<Scalars['String']['input']>;
  s_lte?: InputMaybe<Scalars['String']['input']>;
  s_in?: InputMaybe<Array<Scalars['String']['input']>>;
  s_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  s_contains?: InputMaybe<Scalars['String']['input']>;
  s_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  s_not_contains?: InputMaybe<Scalars['String']['input']>;
  s_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  s_starts_with?: InputMaybe<Scalars['String']['input']>;
  s_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  s_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  s_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  s_ends_with?: InputMaybe<Scalars['String']['input']>;
  s_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  s_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  s_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Attestation_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Attestation_filter>>>;
};

export type Attestation_orderBy =
  | 'id'
  | 'subgraphDeployment'
  | 'subgraphDeployment__id'
  | 'subgraphDeployment__ipfsHash'
  | 'subgraphDeployment__createdAt'
  | 'subgraphDeployment__deniedAt'
  | 'subgraphDeployment__originalName'
  | 'subgraphDeployment__stakedTokens'
  | 'subgraphDeployment__indexingRewardAmount'
  | 'subgraphDeployment__indexingIndexerRewardAmount'
  | 'subgraphDeployment__indexingDelegatorRewardAmount'
  | 'subgraphDeployment__queryFeesAmount'
  | 'subgraphDeployment__queryFeeRebates'
  | 'subgraphDeployment__curatorFeeRewards'
  | 'subgraphDeployment__signalledTokens'
  | 'subgraphDeployment__unsignalledTokens'
  | 'subgraphDeployment__signalAmount'
  | 'subgraphDeployment__pricePerShare'
  | 'subgraphDeployment__reserveRatio'
  | 'subgraphDeployment__subgraphCount'
  | 'subgraphDeployment__activeSubgraphCount'
  | 'subgraphDeployment__deprecatedSubgraphCount'
  | 'subgraphDeployment__transferredToL2'
  | 'subgraphDeployment__transferredToL2At'
  | 'subgraphDeployment__transferredToL2AtBlockNumber'
  | 'subgraphDeployment__transferredToL2AtTx'
  | 'subgraphDeployment__signalledTokensSentToL2'
  | 'subgraphDeployment__signalledTokensReceivedOnL2'
  | 'requestCID'
  | 'responseCID'
  | 'gasUsed'
  | 'responseNumBytes'
  | 'v'
  | 'r'
  | 's';

/**
 * Authorized functions for the Manager
 *
 */
export type AuthorizedFunction = {
  /** Function signature (string) */
  id: Scalars['ID']['output'];
  /** The contract address that is authorized to have this function called on itself */
  target: Scalars['Bytes']['output'];
  /** Hash of the function signature */
  sigHash: Scalars['Bytes']['output'];
  /** Token lock Manager */
  manager: TokenManager;
};

export type AuthorizedFunction_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  target?: InputMaybe<Scalars['Bytes']['input']>;
  target_not?: InputMaybe<Scalars['Bytes']['input']>;
  target_gt?: InputMaybe<Scalars['Bytes']['input']>;
  target_lt?: InputMaybe<Scalars['Bytes']['input']>;
  target_gte?: InputMaybe<Scalars['Bytes']['input']>;
  target_lte?: InputMaybe<Scalars['Bytes']['input']>;
  target_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  target_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  target_contains?: InputMaybe<Scalars['Bytes']['input']>;
  target_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sigHash?: InputMaybe<Scalars['Bytes']['input']>;
  sigHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  sigHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  sigHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  sigHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  sigHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  sigHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sigHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sigHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sigHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  manager?: InputMaybe<Scalars['String']['input']>;
  manager_not?: InputMaybe<Scalars['String']['input']>;
  manager_gt?: InputMaybe<Scalars['String']['input']>;
  manager_lt?: InputMaybe<Scalars['String']['input']>;
  manager_gte?: InputMaybe<Scalars['String']['input']>;
  manager_lte?: InputMaybe<Scalars['String']['input']>;
  manager_in?: InputMaybe<Array<Scalars['String']['input']>>;
  manager_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  manager_contains?: InputMaybe<Scalars['String']['input']>;
  manager_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  manager_not_contains?: InputMaybe<Scalars['String']['input']>;
  manager_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  manager_starts_with?: InputMaybe<Scalars['String']['input']>;
  manager_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manager_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  manager_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manager_ends_with?: InputMaybe<Scalars['String']['input']>;
  manager_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manager_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  manager_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manager_?: InputMaybe<TokenManager_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AuthorizedFunction_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AuthorizedFunction_filter>>>;
};

export type AuthorizedFunction_orderBy =
  | 'id'
  | 'target'
  | 'sigHash'
  | 'manager'
  | 'manager__id'
  | 'manager__masterCopy'
  | 'manager__tokens'
  | 'manager__tokenLockCount';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * All relevant data for a bridge deposit Transaction in The Graph Network
 *
 */
export type BridgeDepositTransaction = Transaction & {
  id: Scalars['ID']['output'];
  blockNumber: Scalars['Int']['output'];
  timestamp: Scalars['Int']['output'];
  signer: GraphAccount;
  type: TransactionType;
  /** txHash refers to the tx on the chain corresponding to this subgraph deployment */
  txHash: Scalars['Bytes']['output'];
  from?: Maybe<Scalars['Bytes']['output']>;
  to?: Maybe<Scalars['Bytes']['output']>;
  amount?: Maybe<Scalars['BigInt']['output']>;
  l1Token?: Maybe<Scalars['Bytes']['output']>;
  /** retryableTicketId is the unique value that allows matching an L2 transaction with its L1 counterpart */
  retryableTicketId?: Maybe<Scalars['String']['output']>;
  /** Whether the deposit was initiated through Arbitrum's gateway router (Only available on L1 networks) */
  routed?: Maybe<Scalars['Boolean']['output']>;
};

export type BridgeDepositTransaction_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  timestamp_not?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_lt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  signer?: InputMaybe<Scalars['String']['input']>;
  signer_not?: InputMaybe<Scalars['String']['input']>;
  signer_gt?: InputMaybe<Scalars['String']['input']>;
  signer_lt?: InputMaybe<Scalars['String']['input']>;
  signer_gte?: InputMaybe<Scalars['String']['input']>;
  signer_lte?: InputMaybe<Scalars['String']['input']>;
  signer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signer_contains?: InputMaybe<Scalars['String']['input']>;
  signer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_not_contains?: InputMaybe<Scalars['String']['input']>;
  signer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_starts_with?: InputMaybe<Scalars['String']['input']>;
  signer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  signer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_ends_with?: InputMaybe<Scalars['String']['input']>;
  signer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  signer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_?: InputMaybe<GraphAccount_filter>;
  type?: InputMaybe<TransactionType>;
  type_not?: InputMaybe<TransactionType>;
  type_in?: InputMaybe<Array<TransactionType>>;
  type_not_in?: InputMaybe<Array<TransactionType>>;
  txHash?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from?: InputMaybe<Scalars['Bytes']['input']>;
  from_not?: InputMaybe<Scalars['Bytes']['input']>;
  from_gt?: InputMaybe<Scalars['Bytes']['input']>;
  from_lt?: InputMaybe<Scalars['Bytes']['input']>;
  from_gte?: InputMaybe<Scalars['Bytes']['input']>;
  from_lte?: InputMaybe<Scalars['Bytes']['input']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to?: InputMaybe<Scalars['Bytes']['input']>;
  to_not?: InputMaybe<Scalars['Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['Bytes']['input']>;
  to_lt?: InputMaybe<Scalars['Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  l1Token?: InputMaybe<Scalars['Bytes']['input']>;
  l1Token_not?: InputMaybe<Scalars['Bytes']['input']>;
  l1Token_gt?: InputMaybe<Scalars['Bytes']['input']>;
  l1Token_lt?: InputMaybe<Scalars['Bytes']['input']>;
  l1Token_gte?: InputMaybe<Scalars['Bytes']['input']>;
  l1Token_lte?: InputMaybe<Scalars['Bytes']['input']>;
  l1Token_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  l1Token_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  l1Token_contains?: InputMaybe<Scalars['Bytes']['input']>;
  l1Token_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  retryableTicketId?: InputMaybe<Scalars['String']['input']>;
  retryableTicketId_not?: InputMaybe<Scalars['String']['input']>;
  retryableTicketId_gt?: InputMaybe<Scalars['String']['input']>;
  retryableTicketId_lt?: InputMaybe<Scalars['String']['input']>;
  retryableTicketId_gte?: InputMaybe<Scalars['String']['input']>;
  retryableTicketId_lte?: InputMaybe<Scalars['String']['input']>;
  retryableTicketId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  retryableTicketId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  retryableTicketId_contains?: InputMaybe<Scalars['String']['input']>;
  retryableTicketId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  retryableTicketId_not_contains?: InputMaybe<Scalars['String']['input']>;
  retryableTicketId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  retryableTicketId_starts_with?: InputMaybe<Scalars['String']['input']>;
  retryableTicketId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  retryableTicketId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  retryableTicketId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  retryableTicketId_ends_with?: InputMaybe<Scalars['String']['input']>;
  retryableTicketId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  retryableTicketId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  retryableTicketId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  routed?: InputMaybe<Scalars['Boolean']['input']>;
  routed_not?: InputMaybe<Scalars['Boolean']['input']>;
  routed_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  routed_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BridgeDepositTransaction_filter>>>;
  or?: InputMaybe<Array<InputMaybe<BridgeDepositTransaction_filter>>>;
};

export type BridgeDepositTransaction_orderBy =
  | 'id'
  | 'blockNumber'
  | 'timestamp'
  | 'signer'
  | 'signer__id'
  | 'signer__createdAt'
  | 'signer__defaultDisplayName'
  | 'signer__balance'
  | 'signer__balanceReceivedFromL1Signalling'
  | 'signer__balanceReceivedFromL1Delegation'
  | 'signer__curationApproval'
  | 'signer__stakingApproval'
  | 'signer__gnsApproval'
  | 'signer__developerCreatedAt'
  | 'signer__subgraphQueryFees'
  | 'type'
  | 'txHash'
  | 'from'
  | 'to'
  | 'amount'
  | 'l1Token'
  | 'retryableTicketId'
  | 'routed';

/**
 * All relevant data for a bridge withdrawal Transaction in The Graph Network
 *
 */
export type BridgeWithdrawalTransaction = Transaction & {
  id: Scalars['ID']['output'];
  blockNumber: Scalars['Int']['output'];
  timestamp: Scalars['Int']['output'];
  signer: GraphAccount;
  type: TransactionType;
  /** txHash refers to the tx on the chain corresponding to this subgraph deployment */
  txHash?: Maybe<Scalars['Bytes']['output']>;
  from?: Maybe<Scalars['Bytes']['output']>;
  to?: Maybe<Scalars['Bytes']['output']>;
  amount?: Maybe<Scalars['BigInt']['output']>;
  l1Token?: Maybe<Scalars['Bytes']['output']>;
  /** transactionIndex is the unique value that allows matching an L2 transaction with its L1 counterpart */
  transactionIndex?: Maybe<Scalars['BigInt']['output']>;
};

export type BridgeWithdrawalTransaction_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  timestamp_not?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_lt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  signer?: InputMaybe<Scalars['String']['input']>;
  signer_not?: InputMaybe<Scalars['String']['input']>;
  signer_gt?: InputMaybe<Scalars['String']['input']>;
  signer_lt?: InputMaybe<Scalars['String']['input']>;
  signer_gte?: InputMaybe<Scalars['String']['input']>;
  signer_lte?: InputMaybe<Scalars['String']['input']>;
  signer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signer_contains?: InputMaybe<Scalars['String']['input']>;
  signer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_not_contains?: InputMaybe<Scalars['String']['input']>;
  signer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_starts_with?: InputMaybe<Scalars['String']['input']>;
  signer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  signer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_ends_with?: InputMaybe<Scalars['String']['input']>;
  signer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  signer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_?: InputMaybe<GraphAccount_filter>;
  type?: InputMaybe<TransactionType>;
  type_not?: InputMaybe<TransactionType>;
  type_in?: InputMaybe<Array<TransactionType>>;
  type_not_in?: InputMaybe<Array<TransactionType>>;
  txHash?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from?: InputMaybe<Scalars['Bytes']['input']>;
  from_not?: InputMaybe<Scalars['Bytes']['input']>;
  from_gt?: InputMaybe<Scalars['Bytes']['input']>;
  from_lt?: InputMaybe<Scalars['Bytes']['input']>;
  from_gte?: InputMaybe<Scalars['Bytes']['input']>;
  from_lte?: InputMaybe<Scalars['Bytes']['input']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to?: InputMaybe<Scalars['Bytes']['input']>;
  to_not?: InputMaybe<Scalars['Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['Bytes']['input']>;
  to_lt?: InputMaybe<Scalars['Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  l1Token?: InputMaybe<Scalars['Bytes']['input']>;
  l1Token_not?: InputMaybe<Scalars['Bytes']['input']>;
  l1Token_gt?: InputMaybe<Scalars['Bytes']['input']>;
  l1Token_lt?: InputMaybe<Scalars['Bytes']['input']>;
  l1Token_gte?: InputMaybe<Scalars['Bytes']['input']>;
  l1Token_lte?: InputMaybe<Scalars['Bytes']['input']>;
  l1Token_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  l1Token_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  l1Token_contains?: InputMaybe<Scalars['Bytes']['input']>;
  l1Token_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionIndex?: InputMaybe<Scalars['BigInt']['input']>;
  transactionIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  transactionIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  transactionIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  transactionIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  transactionIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  transactionIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BridgeWithdrawalTransaction_filter>>>;
  or?: InputMaybe<Array<InputMaybe<BridgeWithdrawalTransaction_filter>>>;
};

export type BridgeWithdrawalTransaction_orderBy =
  | 'id'
  | 'blockNumber'
  | 'timestamp'
  | 'signer'
  | 'signer__id'
  | 'signer__createdAt'
  | 'signer__defaultDisplayName'
  | 'signer__balance'
  | 'signer__balanceReceivedFromL1Signalling'
  | 'signer__balanceReceivedFromL1Delegation'
  | 'signer__curationApproval'
  | 'signer__stakingApproval'
  | 'signer__gnsApproval'
  | 'signer__developerCreatedAt'
  | 'signer__subgraphQueryFees'
  | 'type'
  | 'txHash'
  | 'from'
  | 'to'
  | 'amount'
  | 'l1Token'
  | 'transactionIndex';

/**
 * Curator with all Signals and metrics
 *
 */
export type Curator = {
  /** Eth address of the Curator */
  id: Scalars['ID']['output'];
  /** Time this curator was created */
  createdAt: Scalars['Int']['output'];
  /** Graph account of this curator */
  account: GraphAccount;
  /** CUMULATIVE tokens signalled on all the subgraphs */
  totalSignalledTokens: Scalars['BigInt']['output'];
  /** CUMULATIVE tokens unsignalled on all the subgraphs */
  totalUnsignalledTokens: Scalars['BigInt']['output'];
  /** Subgraphs the curator is curating */
  signals: Array<Signal>;
  /** Default display name is the current default name. Used for filtered queries */
  defaultDisplayName?: Maybe<Scalars['String']['output']>;
  /** CUMULATIVE tokens signalled on all names */
  totalNameSignalledTokens: Scalars['BigInt']['output'];
  /** CUMULATIVE tokens unsignalled on all names */
  totalNameUnsignalledTokens: Scalars['BigInt']['output'];
  /** CUMULATIVE withdrawn tokens from deprecated subgraphs */
  totalWithdrawnTokens: Scalars['BigInt']['output'];
  /** Subgraphs the curator is curating */
  nameSignals: Array<NameSignal>;
  /** NOT IMPLEMENTED - Summation of realized rewards from all Signals */
  realizedRewards: Scalars['BigInt']['output'];
  /** NOT IMPLEMENTED - Annualized rate of return on curator signal */
  annualizedReturn: Scalars['BigDecimal']['output'];
  /** NOT IMPLEMENTED - Total return of the curator */
  totalReturn: Scalars['BigDecimal']['output'];
  /** NOT IMPLEMENTED - Signaling efficiency of the curator */
  signalingEfficiency: Scalars['BigDecimal']['output'];
  /** CURRENT summed name signal for all bonding curves */
  totalNameSignal: Scalars['BigDecimal']['output'];
  /** Total curator cost basis of all shares of name pools purchased on all bonding curves */
  totalNameSignalAverageCostBasis: Scalars['BigDecimal']['output'];
  /** totalNameSignalAverageCostBasis / totalNameSignal */
  totalAverageCostBasisPerNameSignal: Scalars['BigDecimal']['output'];
  /** CURRENT summed signal for all bonding curves */
  totalSignal: Scalars['BigDecimal']['output'];
  /** Total curator cost basis of all version signal shares purchased on all bonding curves. Includes those purchased through GNS name pools */
  totalSignalAverageCostBasis: Scalars['BigDecimal']['output'];
  /** totalSignalAverageCostBasis / totalSignal */
  totalAverageCostBasisPerSignal: Scalars['BigDecimal']['output'];
  /** Total amount of signals created by this user */
  signalCount: Scalars['Int']['output'];
  /** Amount of active signals for this user */
  activeSignalCount: Scalars['Int']['output'];
  /** Total amount of name signals created by this user */
  nameSignalCount: Scalars['Int']['output'];
  /** Amount of active name signals for this user */
  activeNameSignalCount: Scalars['Int']['output'];
  /** Total amount of name signals and signals created by this user. signalCount + nameSignalCount */
  combinedSignalCount: Scalars['Int']['output'];
  /** Amount of active name signals and signals for this user. signalCount + nameSignalCount */
  activeCombinedSignalCount: Scalars['Int']['output'];
};


/**
 * Curator with all Signals and metrics
 *
 */
export type CuratorsignalsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Signal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Signal_filter>;
};


/**
 * Curator with all Signals and metrics
 *
 */
export type CuratornameSignalsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NameSignal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NameSignal_filter>;
};

export type Curator_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_not?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<GraphAccount_filter>;
  totalSignalledTokens?: InputMaybe<Scalars['BigInt']['input']>;
  totalSignalledTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSignalledTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSignalledTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSignalledTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSignalledTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSignalledTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSignalledTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalUnsignalledTokens?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnsignalledTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnsignalledTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnsignalledTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnsignalledTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnsignalledTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnsignalledTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalUnsignalledTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signals_?: InputMaybe<Signal_filter>;
  defaultDisplayName?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_gt?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_lt?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_gte?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_lte?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  defaultDisplayName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  defaultDisplayName_contains?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_contains?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_starts_with?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_ends_with?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalNameSignalledTokens?: InputMaybe<Scalars['BigInt']['input']>;
  totalNameSignalledTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalNameSignalledTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalNameSignalledTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalNameSignalledTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalNameSignalledTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalNameSignalledTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalNameSignalledTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalNameUnsignalledTokens?: InputMaybe<Scalars['BigInt']['input']>;
  totalNameUnsignalledTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalNameUnsignalledTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalNameUnsignalledTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalNameUnsignalledTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalNameUnsignalledTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalNameUnsignalledTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalNameUnsignalledTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalWithdrawnTokens?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawnTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawnTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawnTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawnTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawnTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawnTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalWithdrawnTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nameSignals_?: InputMaybe<NameSignal_filter>;
  realizedRewards?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  realizedRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  annualizedReturn?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  annualizedReturn_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalReturn?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalReturn_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  signalingEfficiency?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalingEfficiency_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalingEfficiency_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalingEfficiency_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalingEfficiency_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalingEfficiency_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalingEfficiency_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  signalingEfficiency_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalNameSignal?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalNameSignal_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalNameSignal_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalNameSignal_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalNameSignal_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalNameSignal_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalNameSignal_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalNameSignal_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalNameSignalAverageCostBasis?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalNameSignalAverageCostBasis_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalNameSignalAverageCostBasis_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalNameSignalAverageCostBasis_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalNameSignalAverageCostBasis_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalNameSignalAverageCostBasis_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalNameSignalAverageCostBasis_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalNameSignalAverageCostBasis_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalAverageCostBasisPerNameSignal?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAverageCostBasisPerNameSignal_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAverageCostBasisPerNameSignal_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAverageCostBasisPerNameSignal_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAverageCostBasisPerNameSignal_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAverageCostBasisPerNameSignal_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAverageCostBasisPerNameSignal_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalAverageCostBasisPerNameSignal_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSignal?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSignal_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSignal_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSignal_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSignal_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSignal_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSignal_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSignal_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSignalAverageCostBasis?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSignalAverageCostBasis_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSignalAverageCostBasis_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSignalAverageCostBasis_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSignalAverageCostBasis_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSignalAverageCostBasis_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSignalAverageCostBasis_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSignalAverageCostBasis_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalAverageCostBasisPerSignal?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAverageCostBasisPerSignal_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAverageCostBasisPerSignal_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAverageCostBasisPerSignal_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAverageCostBasisPerSignal_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAverageCostBasisPerSignal_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAverageCostBasisPerSignal_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalAverageCostBasisPerSignal_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  signalCount?: InputMaybe<Scalars['Int']['input']>;
  signalCount_not?: InputMaybe<Scalars['Int']['input']>;
  signalCount_gt?: InputMaybe<Scalars['Int']['input']>;
  signalCount_lt?: InputMaybe<Scalars['Int']['input']>;
  signalCount_gte?: InputMaybe<Scalars['Int']['input']>;
  signalCount_lte?: InputMaybe<Scalars['Int']['input']>;
  signalCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  signalCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeSignalCount?: InputMaybe<Scalars['Int']['input']>;
  activeSignalCount_not?: InputMaybe<Scalars['Int']['input']>;
  activeSignalCount_gt?: InputMaybe<Scalars['Int']['input']>;
  activeSignalCount_lt?: InputMaybe<Scalars['Int']['input']>;
  activeSignalCount_gte?: InputMaybe<Scalars['Int']['input']>;
  activeSignalCount_lte?: InputMaybe<Scalars['Int']['input']>;
  activeSignalCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeSignalCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  nameSignalCount?: InputMaybe<Scalars['Int']['input']>;
  nameSignalCount_not?: InputMaybe<Scalars['Int']['input']>;
  nameSignalCount_gt?: InputMaybe<Scalars['Int']['input']>;
  nameSignalCount_lt?: InputMaybe<Scalars['Int']['input']>;
  nameSignalCount_gte?: InputMaybe<Scalars['Int']['input']>;
  nameSignalCount_lte?: InputMaybe<Scalars['Int']['input']>;
  nameSignalCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  nameSignalCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeNameSignalCount?: InputMaybe<Scalars['Int']['input']>;
  activeNameSignalCount_not?: InputMaybe<Scalars['Int']['input']>;
  activeNameSignalCount_gt?: InputMaybe<Scalars['Int']['input']>;
  activeNameSignalCount_lt?: InputMaybe<Scalars['Int']['input']>;
  activeNameSignalCount_gte?: InputMaybe<Scalars['Int']['input']>;
  activeNameSignalCount_lte?: InputMaybe<Scalars['Int']['input']>;
  activeNameSignalCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeNameSignalCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  combinedSignalCount?: InputMaybe<Scalars['Int']['input']>;
  combinedSignalCount_not?: InputMaybe<Scalars['Int']['input']>;
  combinedSignalCount_gt?: InputMaybe<Scalars['Int']['input']>;
  combinedSignalCount_lt?: InputMaybe<Scalars['Int']['input']>;
  combinedSignalCount_gte?: InputMaybe<Scalars['Int']['input']>;
  combinedSignalCount_lte?: InputMaybe<Scalars['Int']['input']>;
  combinedSignalCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  combinedSignalCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeCombinedSignalCount?: InputMaybe<Scalars['Int']['input']>;
  activeCombinedSignalCount_not?: InputMaybe<Scalars['Int']['input']>;
  activeCombinedSignalCount_gt?: InputMaybe<Scalars['Int']['input']>;
  activeCombinedSignalCount_lt?: InputMaybe<Scalars['Int']['input']>;
  activeCombinedSignalCount_gte?: InputMaybe<Scalars['Int']['input']>;
  activeCombinedSignalCount_lte?: InputMaybe<Scalars['Int']['input']>;
  activeCombinedSignalCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeCombinedSignalCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Curator_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Curator_filter>>>;
};

export type Curator_orderBy =
  | 'id'
  | 'createdAt'
  | 'account'
  | 'account__id'
  | 'account__createdAt'
  | 'account__defaultDisplayName'
  | 'account__balance'
  | 'account__balanceReceivedFromL1Signalling'
  | 'account__balanceReceivedFromL1Delegation'
  | 'account__curationApproval'
  | 'account__stakingApproval'
  | 'account__gnsApproval'
  | 'account__developerCreatedAt'
  | 'account__subgraphQueryFees'
  | 'totalSignalledTokens'
  | 'totalUnsignalledTokens'
  | 'signals'
  | 'defaultDisplayName'
  | 'totalNameSignalledTokens'
  | 'totalNameUnsignalledTokens'
  | 'totalWithdrawnTokens'
  | 'nameSignals'
  | 'realizedRewards'
  | 'annualizedReturn'
  | 'totalReturn'
  | 'signalingEfficiency'
  | 'totalNameSignal'
  | 'totalNameSignalAverageCostBasis'
  | 'totalAverageCostBasisPerNameSignal'
  | 'totalSignal'
  | 'totalSignalAverageCostBasis'
  | 'totalAverageCostBasisPerSignal'
  | 'signalCount'
  | 'activeSignalCount'
  | 'nameSignalCount'
  | 'activeNameSignalCount'
  | 'combinedSignalCount'
  | 'activeCombinedSignalCount';

export type CurrentSubgraphDeploymentRelation = {
  /** Auxiliary entity used to batch update Subgraph entities when signalling on the deployment changes. ID replicates the deployment ID and adds a counter, to make it easy to reproduce. */
  id: Scalars['ID']['output'];
  subgraph: Subgraph;
  deployment: SubgraphDeployment;
  /** Indicates whether this relation is active. This means that the deployment is still the current deployment for the named Subgraph */
  active: Scalars['Boolean']['output'];
};

export type CurrentSubgraphDeploymentRelation_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  subgraph?: InputMaybe<Scalars['String']['input']>;
  subgraph_not?: InputMaybe<Scalars['String']['input']>;
  subgraph_gt?: InputMaybe<Scalars['String']['input']>;
  subgraph_lt?: InputMaybe<Scalars['String']['input']>;
  subgraph_gte?: InputMaybe<Scalars['String']['input']>;
  subgraph_lte?: InputMaybe<Scalars['String']['input']>;
  subgraph_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraph_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraph_contains?: InputMaybe<Scalars['String']['input']>;
  subgraph_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_contains?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_?: InputMaybe<Subgraph_filter>;
  deployment?: InputMaybe<Scalars['String']['input']>;
  deployment_not?: InputMaybe<Scalars['String']['input']>;
  deployment_gt?: InputMaybe<Scalars['String']['input']>;
  deployment_lt?: InputMaybe<Scalars['String']['input']>;
  deployment_gte?: InputMaybe<Scalars['String']['input']>;
  deployment_lte?: InputMaybe<Scalars['String']['input']>;
  deployment_in?: InputMaybe<Array<Scalars['String']['input']>>;
  deployment_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  deployment_contains?: InputMaybe<Scalars['String']['input']>;
  deployment_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  deployment_not_contains?: InputMaybe<Scalars['String']['input']>;
  deployment_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  deployment_starts_with?: InputMaybe<Scalars['String']['input']>;
  deployment_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deployment_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  deployment_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deployment_ends_with?: InputMaybe<Scalars['String']['input']>;
  deployment_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deployment_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  deployment_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deployment_?: InputMaybe<SubgraphDeployment_filter>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  active_not?: InputMaybe<Scalars['Boolean']['input']>;
  active_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  active_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CurrentSubgraphDeploymentRelation_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CurrentSubgraphDeploymentRelation_filter>>>;
};

export type CurrentSubgraphDeploymentRelation_orderBy =
  | 'id'
  | 'subgraph'
  | 'subgraph__id'
  | 'subgraph__versionCount'
  | 'subgraph__createdAt'
  | 'subgraph__updatedAt'
  | 'subgraph__active'
  | 'subgraph__migrated'
  | 'subgraph__startedTransferToL2'
  | 'subgraph__startedTransferToL2At'
  | 'subgraph__startedTransferToL2AtBlockNumber'
  | 'subgraph__startedTransferToL2AtTx'
  | 'subgraph__transferredToL2'
  | 'subgraph__transferredToL2At'
  | 'subgraph__transferredToL2AtBlockNumber'
  | 'subgraph__transferredToL2AtTx'
  | 'subgraph__signalledTokensSentToL2'
  | 'subgraph__signalledTokensReceivedOnL2'
  | 'subgraph__idOnL2'
  | 'subgraph__idOnL1'
  | 'subgraph__nftID'
  | 'subgraph__oldID'
  | 'subgraph__creatorAddress'
  | 'subgraph__subgraphNumber'
  | 'subgraph__initializing'
  | 'subgraph__entityVersion'
  | 'subgraph__signalledTokens'
  | 'subgraph__unsignalledTokens'
  | 'subgraph__currentSignalledTokens'
  | 'subgraph__nameSignalAmount'
  | 'subgraph__signalAmount'
  | 'subgraph__reserveRatio'
  | 'subgraph__withdrawableTokens'
  | 'subgraph__withdrawnTokens'
  | 'subgraph__nameSignalCount'
  | 'subgraph__metadataHash'
  | 'deployment'
  | 'deployment__id'
  | 'deployment__ipfsHash'
  | 'deployment__createdAt'
  | 'deployment__deniedAt'
  | 'deployment__originalName'
  | 'deployment__stakedTokens'
  | 'deployment__indexingRewardAmount'
  | 'deployment__indexingIndexerRewardAmount'
  | 'deployment__indexingDelegatorRewardAmount'
  | 'deployment__queryFeesAmount'
  | 'deployment__queryFeeRebates'
  | 'deployment__curatorFeeRewards'
  | 'deployment__signalledTokens'
  | 'deployment__unsignalledTokens'
  | 'deployment__signalAmount'
  | 'deployment__pricePerShare'
  | 'deployment__reserveRatio'
  | 'deployment__subgraphCount'
  | 'deployment__activeSubgraphCount'
  | 'deployment__deprecatedSubgraphCount'
  | 'deployment__transferredToL2'
  | 'deployment__transferredToL2At'
  | 'deployment__transferredToL2AtBlockNumber'
  | 'deployment__transferredToL2AtTx'
  | 'deployment__signalledTokensSentToL2'
  | 'deployment__signalledTokensReceivedOnL2'
  | 'active';

/**
 * Delegator stake for a single Indexer
 *
 */
export type DelegatedStake = {
  /** Concatenation of Delegator address and Indexer address */
  id: Scalars['ID']['output'];
  /** Index the stake is delegated to */
  indexer: Indexer;
  /** Delegator */
  delegator: Delegator;
  /** CUMULATIVE tokens delegated */
  stakedTokens: Scalars['BigInt']['output'];
  /** CUMULATIVE tokens undelegated */
  unstakedTokens: Scalars['BigInt']['output'];
  /** CURRENT tokens locked */
  lockedTokens: Scalars['BigInt']['output'];
  /** Epoch the locked tokens get unlocked */
  lockedUntil: Scalars['Int']['output'];
  /** Shares owned in the delegator pool. Used to calculate total amount delegated */
  shareAmount: Scalars['BigInt']['output'];
  /** The rate this delegator paid for their shares (calculated using average cost basis). Used for rewards calculations */
  personalExchangeRate: Scalars['BigDecimal']['output'];
  /** Realized rewards from undelegating and realizing a reward */
  realizedRewards: Scalars['BigDecimal']['output'];
  /** Time this delegator first delegated to an indexer */
  createdAt: Scalars['Int']['output'];
  /** Last time this delegator delegated towards this indexer */
  lastDelegatedAt?: Maybe<Scalars['Int']['output']>;
  /** Last time this delegator undelegated from this indexer */
  lastUndelegatedAt?: Maybe<Scalars['Int']['output']>;
  /** Whether the delegation has been transferred from L1 to L2 */
  transferredToL2: Scalars['Boolean']['output'];
  /** Timestamp for the L1 -> L2 Transfer */
  transferredToL2At?: Maybe<Scalars['BigInt']['output']>;
  /** Block number for the L1 -> L2 Transfer */
  transferredToL2AtBlockNumber?: Maybe<Scalars['BigInt']['output']>;
  /** Transaction hash for the L1 -> L2 Transfer */
  transferredToL2AtTx?: Maybe<Scalars['String']['output']>;
  /** Amount of GRT transferred to L2. Only visible from L1, as there's no events for it on L2 */
  stakedTokensTransferredToL2: Scalars['BigInt']['output'];
  /** ID of the delegation on L2. Null if it's not transferred */
  idOnL2?: Maybe<Scalars['String']['output']>;
  /** ID of the delegation on L1. Null if it's not transferred */
  idOnL1?: Maybe<Scalars['String']['output']>;
};

export type DelegatedStake_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  indexer_not?: InputMaybe<Scalars['String']['input']>;
  indexer_gt?: InputMaybe<Scalars['String']['input']>;
  indexer_lt?: InputMaybe<Scalars['String']['input']>;
  indexer_gte?: InputMaybe<Scalars['String']['input']>;
  indexer_lte?: InputMaybe<Scalars['String']['input']>;
  indexer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  indexer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  indexer_contains?: InputMaybe<Scalars['String']['input']>;
  indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_starts_with?: InputMaybe<Scalars['String']['input']>;
  indexer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  indexer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_ends_with?: InputMaybe<Scalars['String']['input']>;
  indexer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  indexer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_?: InputMaybe<Indexer_filter>;
  delegator?: InputMaybe<Scalars['String']['input']>;
  delegator_not?: InputMaybe<Scalars['String']['input']>;
  delegator_gt?: InputMaybe<Scalars['String']['input']>;
  delegator_lt?: InputMaybe<Scalars['String']['input']>;
  delegator_gte?: InputMaybe<Scalars['String']['input']>;
  delegator_lte?: InputMaybe<Scalars['String']['input']>;
  delegator_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegator_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegator_contains?: InputMaybe<Scalars['String']['input']>;
  delegator_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  delegator_not_contains?: InputMaybe<Scalars['String']['input']>;
  delegator_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  delegator_starts_with?: InputMaybe<Scalars['String']['input']>;
  delegator_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegator_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  delegator_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegator_ends_with?: InputMaybe<Scalars['String']['input']>;
  delegator_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegator_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  delegator_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegator_?: InputMaybe<Delegator_filter>;
  stakedTokens?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stakedTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  unstakedTokens?: InputMaybe<Scalars['BigInt']['input']>;
  unstakedTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  unstakedTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  unstakedTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  unstakedTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  unstakedTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  unstakedTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  unstakedTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lockedTokens?: InputMaybe<Scalars['BigInt']['input']>;
  lockedTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  lockedTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lockedTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lockedTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lockedTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lockedTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lockedTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lockedUntil?: InputMaybe<Scalars['Int']['input']>;
  lockedUntil_not?: InputMaybe<Scalars['Int']['input']>;
  lockedUntil_gt?: InputMaybe<Scalars['Int']['input']>;
  lockedUntil_lt?: InputMaybe<Scalars['Int']['input']>;
  lockedUntil_gte?: InputMaybe<Scalars['Int']['input']>;
  lockedUntil_lte?: InputMaybe<Scalars['Int']['input']>;
  lockedUntil_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lockedUntil_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  shareAmount?: InputMaybe<Scalars['BigInt']['input']>;
  shareAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  shareAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  shareAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  shareAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  shareAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  shareAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shareAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  personalExchangeRate?: InputMaybe<Scalars['BigDecimal']['input']>;
  personalExchangeRate_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  personalExchangeRate_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  personalExchangeRate_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  personalExchangeRate_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  personalExchangeRate_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  personalExchangeRate_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  personalExchangeRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  realizedRewards?: InputMaybe<Scalars['BigDecimal']['input']>;
  realizedRewards_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  realizedRewards_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  realizedRewards_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  realizedRewards_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  realizedRewards_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  realizedRewards_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  realizedRewards_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastDelegatedAt?: InputMaybe<Scalars['Int']['input']>;
  lastDelegatedAt_not?: InputMaybe<Scalars['Int']['input']>;
  lastDelegatedAt_gt?: InputMaybe<Scalars['Int']['input']>;
  lastDelegatedAt_lt?: InputMaybe<Scalars['Int']['input']>;
  lastDelegatedAt_gte?: InputMaybe<Scalars['Int']['input']>;
  lastDelegatedAt_lte?: InputMaybe<Scalars['Int']['input']>;
  lastDelegatedAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastDelegatedAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastUndelegatedAt?: InputMaybe<Scalars['Int']['input']>;
  lastUndelegatedAt_not?: InputMaybe<Scalars['Int']['input']>;
  lastUndelegatedAt_gt?: InputMaybe<Scalars['Int']['input']>;
  lastUndelegatedAt_lt?: InputMaybe<Scalars['Int']['input']>;
  lastUndelegatedAt_gte?: InputMaybe<Scalars['Int']['input']>;
  lastUndelegatedAt_lte?: InputMaybe<Scalars['Int']['input']>;
  lastUndelegatedAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastUndelegatedAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  transferredToL2?: InputMaybe<Scalars['Boolean']['input']>;
  transferredToL2_not?: InputMaybe<Scalars['Boolean']['input']>;
  transferredToL2_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  transferredToL2_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  transferredToL2At?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_not?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_gt?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_lt?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_gte?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_lte?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferredToL2At_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferredToL2AtBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferredToL2AtBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferredToL2AtTx?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_gt?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_lt?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_gte?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_lte?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transferredToL2AtTx_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transferredToL2AtTx_contains?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_contains?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_starts_with?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_ends_with?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  stakedTokensTransferredToL2?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokensTransferredToL2_not?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokensTransferredToL2_gt?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokensTransferredToL2_lt?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokensTransferredToL2_gte?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokensTransferredToL2_lte?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokensTransferredToL2_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stakedTokensTransferredToL2_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  idOnL2?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not?: InputMaybe<Scalars['String']['input']>;
  idOnL2_gt?: InputMaybe<Scalars['String']['input']>;
  idOnL2_lt?: InputMaybe<Scalars['String']['input']>;
  idOnL2_gte?: InputMaybe<Scalars['String']['input']>;
  idOnL2_lte?: InputMaybe<Scalars['String']['input']>;
  idOnL2_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idOnL2_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idOnL2_contains?: InputMaybe<Scalars['String']['input']>;
  idOnL2_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_contains?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_starts_with?: InputMaybe<Scalars['String']['input']>;
  idOnL2_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_ends_with?: InputMaybe<Scalars['String']['input']>;
  idOnL2_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not?: InputMaybe<Scalars['String']['input']>;
  idOnL1_gt?: InputMaybe<Scalars['String']['input']>;
  idOnL1_lt?: InputMaybe<Scalars['String']['input']>;
  idOnL1_gte?: InputMaybe<Scalars['String']['input']>;
  idOnL1_lte?: InputMaybe<Scalars['String']['input']>;
  idOnL1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idOnL1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idOnL1_contains?: InputMaybe<Scalars['String']['input']>;
  idOnL1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_contains?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_starts_with?: InputMaybe<Scalars['String']['input']>;
  idOnL1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_ends_with?: InputMaybe<Scalars['String']['input']>;
  idOnL1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DelegatedStake_filter>>>;
  or?: InputMaybe<Array<InputMaybe<DelegatedStake_filter>>>;
};

export type DelegatedStake_orderBy =
  | 'id'
  | 'indexer'
  | 'indexer__id'
  | 'indexer__createdAt'
  | 'indexer__url'
  | 'indexer__geoHash'
  | 'indexer__defaultDisplayName'
  | 'indexer__stakedTokens'
  | 'indexer__allocatedTokens'
  | 'indexer__unstakedTokens'
  | 'indexer__lockedTokens'
  | 'indexer__tokensLockedUntil'
  | 'indexer__allocationCount'
  | 'indexer__totalAllocationCount'
  | 'indexer__queryFeesCollected'
  | 'indexer__queryFeeRebates'
  | 'indexer__rewardsEarned'
  | 'indexer__indexerIndexingRewards'
  | 'indexer__delegatorIndexingRewards'
  | 'indexer__indexerRewardsOwnGenerationRatio'
  | 'indexer__transferredToL2'
  | 'indexer__firstTransferredToL2At'
  | 'indexer__firstTransferredToL2AtBlockNumber'
  | 'indexer__firstTransferredToL2AtTx'
  | 'indexer__lastTransferredToL2At'
  | 'indexer__lastTransferredToL2AtBlockNumber'
  | 'indexer__lastTransferredToL2AtTx'
  | 'indexer__stakedTokensTransferredToL2'
  | 'indexer__idOnL2'
  | 'indexer__idOnL1'
  | 'indexer__delegatedCapacity'
  | 'indexer__tokenCapacity'
  | 'indexer__availableStake'
  | 'indexer__delegatedTokens'
  | 'indexer__ownStakeRatio'
  | 'indexer__delegatedStakeRatio'
  | 'indexer__delegatorShares'
  | 'indexer__delegationExchangeRate'
  | 'indexer__indexingRewardCut'
  | 'indexer__indexingRewardEffectiveCut'
  | 'indexer__overDelegationDilution'
  | 'indexer__delegatorQueryFees'
  | 'indexer__queryFeeCut'
  | 'indexer__queryFeeEffectiveCut'
  | 'indexer__delegatorParameterCooldown'
  | 'indexer__lastDelegationParameterUpdate'
  | 'indexer__forcedClosures'
  | 'indexer__totalReturn'
  | 'indexer__annualizedReturn'
  | 'indexer__stakingEfficiency'
  | 'delegator'
  | 'delegator__id'
  | 'delegator__totalStakedTokens'
  | 'delegator__totalUnstakedTokens'
  | 'delegator__createdAt'
  | 'delegator__totalRealizedRewards'
  | 'delegator__stakesCount'
  | 'delegator__activeStakesCount'
  | 'delegator__defaultDisplayName'
  | 'stakedTokens'
  | 'unstakedTokens'
  | 'lockedTokens'
  | 'lockedUntil'
  | 'shareAmount'
  | 'personalExchangeRate'
  | 'realizedRewards'
  | 'createdAt'
  | 'lastDelegatedAt'
  | 'lastUndelegatedAt'
  | 'transferredToL2'
  | 'transferredToL2At'
  | 'transferredToL2AtBlockNumber'
  | 'transferredToL2AtTx'
  | 'stakedTokensTransferredToL2'
  | 'idOnL2'
  | 'idOnL1';

/**
 * Delegator with all their delegated stakes towards Indexers
 *
 */
export type Delegator = {
  /** Delegator address */
  id: Scalars['ID']['output'];
  /** Graph account of the delegator */
  account: GraphAccount;
  /** Stakes of this delegator */
  stakes: Array<DelegatedStake>;
  /** CUMULATIVE staked tokens in DelegatorStakes of this Delegator */
  totalStakedTokens: Scalars['BigInt']['output'];
  /** CUMULATIVE unstaked tokens in DelegatorStakes of this Delegator */
  totalUnstakedTokens: Scalars['BigInt']['output'];
  /** Time created at */
  createdAt: Scalars['Int']['output'];
  /** Total realized rewards on all delegated stakes. Realized rewards are added when undelegating and realizing a profit */
  totalRealizedRewards: Scalars['BigDecimal']['output'];
  /** Total DelegatedStake entity count (Active and inactive) */
  stakesCount: Scalars['Int']['output'];
  /** Active DelegatedStake entity count. Active means it still has GRT delegated */
  activeStakesCount: Scalars['Int']['output'];
  /** Default display name is the current default name. Used for filtered queries */
  defaultDisplayName?: Maybe<Scalars['String']['output']>;
};


/**
 * Delegator with all their delegated stakes towards Indexers
 *
 */
export type DelegatorstakesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DelegatedStake_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DelegatedStake_filter>;
};

export type Delegator_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_not?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<GraphAccount_filter>;
  stakes_?: InputMaybe<DelegatedStake_filter>;
  totalStakedTokens?: InputMaybe<Scalars['BigInt']['input']>;
  totalStakedTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalStakedTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStakedTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStakedTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStakedTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStakedTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalStakedTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalUnstakedTokens?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnstakedTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnstakedTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnstakedTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnstakedTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnstakedTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnstakedTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalUnstakedTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalRealizedRewards?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalRealizedRewards_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalRealizedRewards_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalRealizedRewards_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalRealizedRewards_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalRealizedRewards_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalRealizedRewards_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalRealizedRewards_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  stakesCount?: InputMaybe<Scalars['Int']['input']>;
  stakesCount_not?: InputMaybe<Scalars['Int']['input']>;
  stakesCount_gt?: InputMaybe<Scalars['Int']['input']>;
  stakesCount_lt?: InputMaybe<Scalars['Int']['input']>;
  stakesCount_gte?: InputMaybe<Scalars['Int']['input']>;
  stakesCount_lte?: InputMaybe<Scalars['Int']['input']>;
  stakesCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  stakesCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeStakesCount?: InputMaybe<Scalars['Int']['input']>;
  activeStakesCount_not?: InputMaybe<Scalars['Int']['input']>;
  activeStakesCount_gt?: InputMaybe<Scalars['Int']['input']>;
  activeStakesCount_lt?: InputMaybe<Scalars['Int']['input']>;
  activeStakesCount_gte?: InputMaybe<Scalars['Int']['input']>;
  activeStakesCount_lte?: InputMaybe<Scalars['Int']['input']>;
  activeStakesCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeStakesCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  defaultDisplayName?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_gt?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_lt?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_gte?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_lte?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  defaultDisplayName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  defaultDisplayName_contains?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_contains?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_starts_with?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_ends_with?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Delegator_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Delegator_filter>>>;
};

export type Delegator_orderBy =
  | 'id'
  | 'account'
  | 'account__id'
  | 'account__createdAt'
  | 'account__defaultDisplayName'
  | 'account__balance'
  | 'account__balanceReceivedFromL1Signalling'
  | 'account__balanceReceivedFromL1Delegation'
  | 'account__curationApproval'
  | 'account__stakingApproval'
  | 'account__gnsApproval'
  | 'account__developerCreatedAt'
  | 'account__subgraphQueryFees'
  | 'stakes'
  | 'totalStakedTokens'
  | 'totalUnstakedTokens'
  | 'createdAt'
  | 'totalRealizedRewards'
  | 'stakesCount'
  | 'activeStakesCount'
  | 'defaultDisplayName';

/**
 * Dispute of a query. Includes single query, conflicting attestation, and indexing disputes
 *
 */
export type Dispute = {
  /** Dispute ID */
  id: Scalars['ID']['output'];
  /** Subgraph deployment being disputed */
  subgraphDeployment: SubgraphDeployment;
  /** Fisherman address */
  fisherman: GraphAccount;
  /** Fisherman deposit */
  deposit: Scalars['BigInt']['output'];
  /** Time dispute was created */
  createdAt: Scalars['Int']['output'];
  /** Time dispute was closed at */
  closedAt: Scalars['Int']['output'];
  /** Status of the dispute. Accepted means the Indexer was slashed */
  status: DisputeStatus;
  /** Total amount of tokens slashed on the dispute */
  tokensSlashed: Scalars['BigDecimal']['output'];
  /** Amount of the slashed tokens that was burned */
  tokensBurned: Scalars['BigDecimal']['output'];
  /** Amount of the slashed tokens that was payed as reward to the fisherman */
  tokensRewarded: Scalars['BigInt']['output'];
  /** Type of dispute */
  type: DisputeType;
  /** Indexer disputed */
  indexer: GraphAccount;
  /** Attestation. Only for single query and conflicting attestations */
  attestation?: Maybe<Attestation>;
  /** Linked dispute of other Indexer. Only for conflicting attestation */
  linkedDispute?: Maybe<Dispute>;
  /** Allocation ID. Only for Indexing Disputes */
  allocation?: Maybe<Allocation>;
};

export type DisputeStatus =
  | 'Undecided'
  | 'Accepted'
  | 'Rejected'
  | 'Draw';

export type DisputeType =
  | 'SingleQuery'
  | 'Conflicting'
  | 'Indexing';

export type Dispute_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  subgraphDeployment?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_gt?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_lt?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_gte?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_lte?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraphDeployment_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraphDeployment_contains?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_contains?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_?: InputMaybe<SubgraphDeployment_filter>;
  fisherman?: InputMaybe<Scalars['String']['input']>;
  fisherman_not?: InputMaybe<Scalars['String']['input']>;
  fisherman_gt?: InputMaybe<Scalars['String']['input']>;
  fisherman_lt?: InputMaybe<Scalars['String']['input']>;
  fisherman_gte?: InputMaybe<Scalars['String']['input']>;
  fisherman_lte?: InputMaybe<Scalars['String']['input']>;
  fisherman_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fisherman_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fisherman_contains?: InputMaybe<Scalars['String']['input']>;
  fisherman_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  fisherman_not_contains?: InputMaybe<Scalars['String']['input']>;
  fisherman_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  fisherman_starts_with?: InputMaybe<Scalars['String']['input']>;
  fisherman_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fisherman_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  fisherman_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fisherman_ends_with?: InputMaybe<Scalars['String']['input']>;
  fisherman_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fisherman_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  fisherman_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fisherman_?: InputMaybe<GraphAccount_filter>;
  deposit?: InputMaybe<Scalars['BigInt']['input']>;
  deposit_not?: InputMaybe<Scalars['BigInt']['input']>;
  deposit_gt?: InputMaybe<Scalars['BigInt']['input']>;
  deposit_lt?: InputMaybe<Scalars['BigInt']['input']>;
  deposit_gte?: InputMaybe<Scalars['BigInt']['input']>;
  deposit_lte?: InputMaybe<Scalars['BigInt']['input']>;
  deposit_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deposit_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  closedAt?: InputMaybe<Scalars['Int']['input']>;
  closedAt_not?: InputMaybe<Scalars['Int']['input']>;
  closedAt_gt?: InputMaybe<Scalars['Int']['input']>;
  closedAt_lt?: InputMaybe<Scalars['Int']['input']>;
  closedAt_gte?: InputMaybe<Scalars['Int']['input']>;
  closedAt_lte?: InputMaybe<Scalars['Int']['input']>;
  closedAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  closedAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  status?: InputMaybe<DisputeStatus>;
  status_not?: InputMaybe<DisputeStatus>;
  status_in?: InputMaybe<Array<DisputeStatus>>;
  status_not_in?: InputMaybe<Array<DisputeStatus>>;
  tokensSlashed?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokensSlashed_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokensSlashed_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokensSlashed_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokensSlashed_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokensSlashed_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokensSlashed_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tokensSlashed_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tokensBurned?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokensBurned_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokensBurned_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokensBurned_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokensBurned_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokensBurned_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokensBurned_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tokensBurned_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tokensRewarded?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRewarded_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRewarded_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRewarded_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRewarded_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRewarded_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRewarded_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokensRewarded_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  type?: InputMaybe<DisputeType>;
  type_not?: InputMaybe<DisputeType>;
  type_in?: InputMaybe<Array<DisputeType>>;
  type_not_in?: InputMaybe<Array<DisputeType>>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  indexer_not?: InputMaybe<Scalars['String']['input']>;
  indexer_gt?: InputMaybe<Scalars['String']['input']>;
  indexer_lt?: InputMaybe<Scalars['String']['input']>;
  indexer_gte?: InputMaybe<Scalars['String']['input']>;
  indexer_lte?: InputMaybe<Scalars['String']['input']>;
  indexer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  indexer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  indexer_contains?: InputMaybe<Scalars['String']['input']>;
  indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_starts_with?: InputMaybe<Scalars['String']['input']>;
  indexer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  indexer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_ends_with?: InputMaybe<Scalars['String']['input']>;
  indexer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  indexer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_?: InputMaybe<GraphAccount_filter>;
  attestation?: InputMaybe<Scalars['String']['input']>;
  attestation_not?: InputMaybe<Scalars['String']['input']>;
  attestation_gt?: InputMaybe<Scalars['String']['input']>;
  attestation_lt?: InputMaybe<Scalars['String']['input']>;
  attestation_gte?: InputMaybe<Scalars['String']['input']>;
  attestation_lte?: InputMaybe<Scalars['String']['input']>;
  attestation_in?: InputMaybe<Array<Scalars['String']['input']>>;
  attestation_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  attestation_contains?: InputMaybe<Scalars['String']['input']>;
  attestation_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  attestation_not_contains?: InputMaybe<Scalars['String']['input']>;
  attestation_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  attestation_starts_with?: InputMaybe<Scalars['String']['input']>;
  attestation_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  attestation_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  attestation_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  attestation_ends_with?: InputMaybe<Scalars['String']['input']>;
  attestation_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  attestation_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  attestation_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  attestation_?: InputMaybe<Attestation_filter>;
  linkedDispute?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_not?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_gt?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_lt?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_gte?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_lte?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_in?: InputMaybe<Array<Scalars['String']['input']>>;
  linkedDispute_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  linkedDispute_contains?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_not_contains?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_starts_with?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_ends_with?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedDispute_?: InputMaybe<Dispute_filter>;
  allocation?: InputMaybe<Scalars['String']['input']>;
  allocation_not?: InputMaybe<Scalars['String']['input']>;
  allocation_gt?: InputMaybe<Scalars['String']['input']>;
  allocation_lt?: InputMaybe<Scalars['String']['input']>;
  allocation_gte?: InputMaybe<Scalars['String']['input']>;
  allocation_lte?: InputMaybe<Scalars['String']['input']>;
  allocation_in?: InputMaybe<Array<Scalars['String']['input']>>;
  allocation_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  allocation_contains?: InputMaybe<Scalars['String']['input']>;
  allocation_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  allocation_not_contains?: InputMaybe<Scalars['String']['input']>;
  allocation_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  allocation_starts_with?: InputMaybe<Scalars['String']['input']>;
  allocation_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  allocation_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  allocation_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  allocation_ends_with?: InputMaybe<Scalars['String']['input']>;
  allocation_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  allocation_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  allocation_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  allocation_?: InputMaybe<Allocation_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Dispute_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Dispute_filter>>>;
};

export type Dispute_orderBy =
  | 'id'
  | 'subgraphDeployment'
  | 'subgraphDeployment__id'
  | 'subgraphDeployment__ipfsHash'
  | 'subgraphDeployment__createdAt'
  | 'subgraphDeployment__deniedAt'
  | 'subgraphDeployment__originalName'
  | 'subgraphDeployment__stakedTokens'
  | 'subgraphDeployment__indexingRewardAmount'
  | 'subgraphDeployment__indexingIndexerRewardAmount'
  | 'subgraphDeployment__indexingDelegatorRewardAmount'
  | 'subgraphDeployment__queryFeesAmount'
  | 'subgraphDeployment__queryFeeRebates'
  | 'subgraphDeployment__curatorFeeRewards'
  | 'subgraphDeployment__signalledTokens'
  | 'subgraphDeployment__unsignalledTokens'
  | 'subgraphDeployment__signalAmount'
  | 'subgraphDeployment__pricePerShare'
  | 'subgraphDeployment__reserveRatio'
  | 'subgraphDeployment__subgraphCount'
  | 'subgraphDeployment__activeSubgraphCount'
  | 'subgraphDeployment__deprecatedSubgraphCount'
  | 'subgraphDeployment__transferredToL2'
  | 'subgraphDeployment__transferredToL2At'
  | 'subgraphDeployment__transferredToL2AtBlockNumber'
  | 'subgraphDeployment__transferredToL2AtTx'
  | 'subgraphDeployment__signalledTokensSentToL2'
  | 'subgraphDeployment__signalledTokensReceivedOnL2'
  | 'fisherman'
  | 'fisherman__id'
  | 'fisherman__createdAt'
  | 'fisherman__defaultDisplayName'
  | 'fisherman__balance'
  | 'fisherman__balanceReceivedFromL1Signalling'
  | 'fisherman__balanceReceivedFromL1Delegation'
  | 'fisherman__curationApproval'
  | 'fisherman__stakingApproval'
  | 'fisherman__gnsApproval'
  | 'fisherman__developerCreatedAt'
  | 'fisherman__subgraphQueryFees'
  | 'deposit'
  | 'createdAt'
  | 'closedAt'
  | 'status'
  | 'tokensSlashed'
  | 'tokensBurned'
  | 'tokensRewarded'
  | 'type'
  | 'indexer'
  | 'indexer__id'
  | 'indexer__createdAt'
  | 'indexer__defaultDisplayName'
  | 'indexer__balance'
  | 'indexer__balanceReceivedFromL1Signalling'
  | 'indexer__balanceReceivedFromL1Delegation'
  | 'indexer__curationApproval'
  | 'indexer__stakingApproval'
  | 'indexer__gnsApproval'
  | 'indexer__developerCreatedAt'
  | 'indexer__subgraphQueryFees'
  | 'attestation'
  | 'attestation__id'
  | 'attestation__requestCID'
  | 'attestation__responseCID'
  | 'attestation__gasUsed'
  | 'attestation__responseNumBytes'
  | 'attestation__v'
  | 'attestation__r'
  | 'attestation__s'
  | 'linkedDispute'
  | 'linkedDispute__id'
  | 'linkedDispute__deposit'
  | 'linkedDispute__createdAt'
  | 'linkedDispute__closedAt'
  | 'linkedDispute__status'
  | 'linkedDispute__tokensSlashed'
  | 'linkedDispute__tokensBurned'
  | 'linkedDispute__tokensRewarded'
  | 'linkedDispute__type'
  | 'allocation'
  | 'allocation__id'
  | 'allocation__creator'
  | 'allocation__allocatedTokens'
  | 'allocation__effectiveAllocation'
  | 'allocation__createdAtEpoch'
  | 'allocation__createdAtBlockHash'
  | 'allocation__createdAtBlockNumber'
  | 'allocation__closedAtEpoch'
  | 'allocation__closedAtBlockHash'
  | 'allocation__closedAtBlockNumber'
  | 'allocation__queryFeesCollected'
  | 'allocation__queryFeeRebates'
  | 'allocation__distributedRebates'
  | 'allocation__curatorRewards'
  | 'allocation__indexingRewards'
  | 'allocation__indexingIndexerRewards'
  | 'allocation__indexingDelegatorRewards'
  | 'allocation__delegationFees'
  | 'allocation__status'
  | 'allocation__createdAt'
  | 'allocation__closedAt'
  | 'allocation__poi'
  | 'allocation__indexingRewardCutAtStart'
  | 'allocation__indexingRewardEffectiveCutAtStart'
  | 'allocation__queryFeeCutAtStart'
  | 'allocation__queryFeeEffectiveCutAtStart'
  | 'allocation__indexingRewardCutAtClose'
  | 'allocation__indexingRewardEffectiveCutAtClose'
  | 'allocation__queryFeeCutAtClose'
  | 'allocation__queryFeeEffectiveCutAtClose'
  | 'allocation__totalReturn'
  | 'allocation__annualizedReturn';

/**
 * Epoch aggregate data for network statistics on signaling, rewards, and query fees
 *
 */
export type Epoch = {
  /** Epoch number */
  id: Scalars['ID']['output'];
  /** Start block of the epoch */
  startBlock: Scalars['Int']['output'];
  /** End block of the epoch */
  endBlock: Scalars['Int']['output'];
  /** Signaled tokens during this epoch */
  signalledTokens: Scalars['BigInt']['output'];
  /** Stake deposited during this epoch */
  stakeDeposited: Scalars['BigInt']['output'];
  /** Total amount of query fees generated during this epoch (Includes everything) */
  totalQueryFees: Scalars['BigInt']['output'];
  /** Amount of query fees generated that were burnt by the 1% protocol tax during this epoch */
  taxedQueryFees: Scalars['BigInt']['output'];
  /** Amount of query fees generated for indexers during this epoch */
  queryFeesCollected: Scalars['BigInt']['output'];
  /** Amount of query fees generated that are going to curators during this epoch */
  curatorQueryFees: Scalars['BigInt']['output'];
  /** Rebate amount claimed from the protocol through rebates mechanism during this epoch */
  queryFeeRebates: Scalars['BigInt']['output'];
  /** Total indexing rewards earned in this epoch. Includes both delegator and indexer rewards */
  totalRewards: Scalars['BigInt']['output'];
  /** Total indexing rewards earned in this epoch by indexers */
  totalIndexerRewards: Scalars['BigInt']['output'];
  /** Total indexing rewards earned in this epoch by delegators */
  totalDelegatorRewards: Scalars['BigInt']['output'];
};

export type Epoch_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  startBlock?: InputMaybe<Scalars['Int']['input']>;
  startBlock_not?: InputMaybe<Scalars['Int']['input']>;
  startBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  startBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  startBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  startBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  startBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  startBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  endBlock?: InputMaybe<Scalars['Int']['input']>;
  endBlock_not?: InputMaybe<Scalars['Int']['input']>;
  endBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  endBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  endBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  endBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  endBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  endBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  signalledTokens?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalledTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stakeDeposited?: InputMaybe<Scalars['BigInt']['input']>;
  stakeDeposited_not?: InputMaybe<Scalars['BigInt']['input']>;
  stakeDeposited_gt?: InputMaybe<Scalars['BigInt']['input']>;
  stakeDeposited_lt?: InputMaybe<Scalars['BigInt']['input']>;
  stakeDeposited_gte?: InputMaybe<Scalars['BigInt']['input']>;
  stakeDeposited_lte?: InputMaybe<Scalars['BigInt']['input']>;
  stakeDeposited_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stakeDeposited_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalQueryFees?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalQueryFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  taxedQueryFees?: InputMaybe<Scalars['BigInt']['input']>;
  taxedQueryFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  taxedQueryFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  taxedQueryFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  taxedQueryFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  taxedQueryFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  taxedQueryFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  taxedQueryFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queryFeesCollected?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_not?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_gt?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_lt?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_gte?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_lte?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queryFeesCollected_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  curatorQueryFees?: InputMaybe<Scalars['BigInt']['input']>;
  curatorQueryFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  curatorQueryFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  curatorQueryFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  curatorQueryFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  curatorQueryFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  curatorQueryFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  curatorQueryFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queryFeeRebates?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_not?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_gt?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_lt?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_gte?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_lte?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queryFeeRebates_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalRewards?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalIndexerRewards?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalIndexerRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDelegatorRewards?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatorRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatorRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatorRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatorRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatorRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatorRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDelegatorRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Epoch_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Epoch_filter>>>;
};

export type Epoch_orderBy =
  | 'id'
  | 'startBlock'
  | 'endBlock'
  | 'signalledTokens'
  | 'stakeDeposited'
  | 'totalQueryFees'
  | 'taxedQueryFees'
  | 'queryFeesCollected'
  | 'curatorQueryFees'
  | 'queryFeeRebates'
  | 'totalRewards'
  | 'totalIndexerRewards'
  | 'totalDelegatorRewards';

/**
 * An account within the graph network. Contains metadata and all relevant data for this accounts
 * delegating, curating, and indexing.
 *
 */
export type GraphAccount = {
  /** Graph account ID */
  id: Scalars['ID']['output'];
  /** All names this graph account has claimed from all name systems */
  names: Array<GraphAccountName>;
  /** Default name the graph account has chosen */
  defaultName?: Maybe<GraphAccountName>;
  /** Time the account was created */
  createdAt: Scalars['Int']['output'];
  /** Default display name is the current default name. Used for filtered queries in the explorer */
  defaultDisplayName?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<GraphAccountMeta>;
  /** Operator of other Graph Accounts */
  operatorOf: Array<GraphAccount>;
  /** Operators of this Graph Accounts */
  operators: Array<GraphAccount>;
  /** Graph token balance */
  balance: Scalars['BigInt']['output'];
  /** Balance received due to failed signal transfer from L1 */
  balanceReceivedFromL1Signalling: Scalars['BigInt']['output'];
  /** Balance received due to failed delegation transfer from L1 */
  balanceReceivedFromL1Delegation: Scalars['BigInt']['output'];
  /** Amount this account has approved staking to transfer their GRT */
  curationApproval: Scalars['BigInt']['output'];
  /** Amount this account has approved curation to transfer their GRT */
  stakingApproval: Scalars['BigInt']['output'];
  /** Amount this account has approved the GNS to transfer their GRT */
  gnsApproval: Scalars['BigInt']['output'];
  /** Subgraphs the graph account owns */
  subgraphs: Array<Subgraph>;
  /** Time that this graph account became a developer */
  developerCreatedAt?: Maybe<Scalars['Int']['output']>;
  /** NOT IMPLEMENTED - Total query fees the subgraphs created by this account have accumulated in GRT */
  subgraphQueryFees: Scalars['BigInt']['output'];
  /** Disputes this graph account has created */
  createdDisputes: Array<Dispute>;
  /** Disputes against this graph account */
  disputesAgainst: Array<Dispute>;
  /** Curator fields for this GraphAccount. Null if never curated */
  curator?: Maybe<Curator>;
  /** Indexer fields for this GraphAccount. Null if never indexed */
  indexer?: Maybe<Indexer>;
  /** Delegator fields for this GraphAccount. Null if never delegated */
  delegator?: Maybe<Delegator>;
  /** Name signal transactions created by this GraphAccount */
  nameSignalTransactions: Array<NameSignalTransaction>;
  bridgeWithdrawalTransactions: Array<BridgeWithdrawalTransaction>;
  bridgeDepositTransactions: Array<BridgeDepositTransaction>;
  tokenLockWallets: Array<TokenLockWallet>;
};


/**
 * An account within the graph network. Contains metadata and all relevant data for this accounts
 * delegating, curating, and indexing.
 *
 */
export type GraphAccountnamesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GraphAccountName_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GraphAccountName_filter>;
};


/**
 * An account within the graph network. Contains metadata and all relevant data for this accounts
 * delegating, curating, and indexing.
 *
 */
export type GraphAccountoperatorOfArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GraphAccount_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GraphAccount_filter>;
};


/**
 * An account within the graph network. Contains metadata and all relevant data for this accounts
 * delegating, curating, and indexing.
 *
 */
export type GraphAccountoperatorsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GraphAccount_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GraphAccount_filter>;
};


/**
 * An account within the graph network. Contains metadata and all relevant data for this accounts
 * delegating, curating, and indexing.
 *
 */
export type GraphAccountsubgraphsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Subgraph_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Subgraph_filter>;
};


/**
 * An account within the graph network. Contains metadata and all relevant data for this accounts
 * delegating, curating, and indexing.
 *
 */
export type GraphAccountcreatedDisputesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Dispute_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Dispute_filter>;
};


/**
 * An account within the graph network. Contains metadata and all relevant data for this accounts
 * delegating, curating, and indexing.
 *
 */
export type GraphAccountdisputesAgainstArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Dispute_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Dispute_filter>;
};


/**
 * An account within the graph network. Contains metadata and all relevant data for this accounts
 * delegating, curating, and indexing.
 *
 */
export type GraphAccountnameSignalTransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NameSignalTransaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NameSignalTransaction_filter>;
};


/**
 * An account within the graph network. Contains metadata and all relevant data for this accounts
 * delegating, curating, and indexing.
 *
 */
export type GraphAccountbridgeWithdrawalTransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeWithdrawalTransaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BridgeWithdrawalTransaction_filter>;
};


/**
 * An account within the graph network. Contains metadata and all relevant data for this accounts
 * delegating, curating, and indexing.
 *
 */
export type GraphAccountbridgeDepositTransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeDepositTransaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BridgeDepositTransaction_filter>;
};


/**
 * An account within the graph network. Contains metadata and all relevant data for this accounts
 * delegating, curating, and indexing.
 *
 */
export type GraphAccounttokenLockWalletsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenLockWallet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenLockWallet_filter>;
};

export type GraphAccountMeta = {
  /** IPFS hash with account metadata details */
  id: Scalars['ID']['output'];
  /** Account that reference this metadata file. For compatibility purposes. For the full list use graphAccounts */
  graphAccount?: Maybe<GraphAccount>;
  /** Accounts that reference this metadata file */
  graphAccounts: Array<GraphAccount>;
  /** True if it is an organization. False if it is an individual */
  isOrganization?: Maybe<Scalars['Boolean']['output']>;
  /** Main repository of code for the graph account */
  codeRepository?: Maybe<Scalars['String']['output']>;
  /** Description of the graph account */
  description?: Maybe<Scalars['String']['output']>;
  /** Image URL */
  image?: Maybe<Scalars['String']['output']>;
  /** Website URL */
  website?: Maybe<Scalars['String']['output']>;
  /** Display name. Not unique */
  displayName?: Maybe<Scalars['String']['output']>;
};


export type GraphAccountMetagraphAccountsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GraphAccount_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GraphAccount_filter>;
};

export type GraphAccountMeta_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  graphAccount_?: InputMaybe<GraphAccount_filter>;
  graphAccounts_?: InputMaybe<GraphAccount_filter>;
  isOrganization?: InputMaybe<Scalars['Boolean']['input']>;
  isOrganization_not?: InputMaybe<Scalars['Boolean']['input']>;
  isOrganization_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isOrganization_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  codeRepository?: InputMaybe<Scalars['String']['input']>;
  codeRepository_not?: InputMaybe<Scalars['String']['input']>;
  codeRepository_gt?: InputMaybe<Scalars['String']['input']>;
  codeRepository_lt?: InputMaybe<Scalars['String']['input']>;
  codeRepository_gte?: InputMaybe<Scalars['String']['input']>;
  codeRepository_lte?: InputMaybe<Scalars['String']['input']>;
  codeRepository_in?: InputMaybe<Array<Scalars['String']['input']>>;
  codeRepository_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  codeRepository_contains?: InputMaybe<Scalars['String']['input']>;
  codeRepository_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  codeRepository_not_contains?: InputMaybe<Scalars['String']['input']>;
  codeRepository_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  codeRepository_starts_with?: InputMaybe<Scalars['String']['input']>;
  codeRepository_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  codeRepository_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  codeRepository_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  codeRepository_ends_with?: InputMaybe<Scalars['String']['input']>;
  codeRepository_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  codeRepository_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  codeRepository_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  image_not?: InputMaybe<Scalars['String']['input']>;
  image_gt?: InputMaybe<Scalars['String']['input']>;
  image_lt?: InputMaybe<Scalars['String']['input']>;
  image_gte?: InputMaybe<Scalars['String']['input']>;
  image_lte?: InputMaybe<Scalars['String']['input']>;
  image_in?: InputMaybe<Array<Scalars['String']['input']>>;
  image_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  image_contains?: InputMaybe<Scalars['String']['input']>;
  image_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  image_not_contains?: InputMaybe<Scalars['String']['input']>;
  image_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  image_starts_with?: InputMaybe<Scalars['String']['input']>;
  image_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  image_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  image_ends_with?: InputMaybe<Scalars['String']['input']>;
  image_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  image_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
  website_not?: InputMaybe<Scalars['String']['input']>;
  website_gt?: InputMaybe<Scalars['String']['input']>;
  website_lt?: InputMaybe<Scalars['String']['input']>;
  website_gte?: InputMaybe<Scalars['String']['input']>;
  website_lte?: InputMaybe<Scalars['String']['input']>;
  website_in?: InputMaybe<Array<Scalars['String']['input']>>;
  website_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  website_contains?: InputMaybe<Scalars['String']['input']>;
  website_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  website_not_contains?: InputMaybe<Scalars['String']['input']>;
  website_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  website_starts_with?: InputMaybe<Scalars['String']['input']>;
  website_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  website_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  website_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  website_ends_with?: InputMaybe<Scalars['String']['input']>;
  website_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  website_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  website_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  displayName_not?: InputMaybe<Scalars['String']['input']>;
  displayName_gt?: InputMaybe<Scalars['String']['input']>;
  displayName_lt?: InputMaybe<Scalars['String']['input']>;
  displayName_gte?: InputMaybe<Scalars['String']['input']>;
  displayName_lte?: InputMaybe<Scalars['String']['input']>;
  displayName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  displayName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  displayName_contains?: InputMaybe<Scalars['String']['input']>;
  displayName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  displayName_not_contains?: InputMaybe<Scalars['String']['input']>;
  displayName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  displayName_starts_with?: InputMaybe<Scalars['String']['input']>;
  displayName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  displayName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  displayName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  displayName_ends_with?: InputMaybe<Scalars['String']['input']>;
  displayName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  displayName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  displayName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<GraphAccountMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<GraphAccountMeta_filter>>>;
};

export type GraphAccountMeta_orderBy =
  | 'id'
  | 'graphAccount'
  | 'graphAccount__id'
  | 'graphAccount__createdAt'
  | 'graphAccount__defaultDisplayName'
  | 'graphAccount__balance'
  | 'graphAccount__balanceReceivedFromL1Signalling'
  | 'graphAccount__balanceReceivedFromL1Delegation'
  | 'graphAccount__curationApproval'
  | 'graphAccount__stakingApproval'
  | 'graphAccount__gnsApproval'
  | 'graphAccount__developerCreatedAt'
  | 'graphAccount__subgraphQueryFees'
  | 'graphAccounts'
  | 'isOrganization'
  | 'codeRepository'
  | 'description'
  | 'image'
  | 'website'
  | 'displayName';

/**
 * A name chosen by a Graph Account from a Name System such as ENS. This allows Graph Accounts to be
 * recognized by name, rather than just an Ethereum address
 *
 */
export type GraphAccountName = {
  /** Name system concatenated with the unique ID of the name system */
  id: Scalars['ID']['output'];
  /** Name system for this name */
  nameSystem: NameSystem;
  /** Name from the system */
  name: Scalars['String']['output'];
  /** The graph account that owned the name when it was linked in the graph network */
  graphAccount?: Maybe<GraphAccount>;
};

export type GraphAccountName_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  nameSystem?: InputMaybe<NameSystem>;
  nameSystem_not?: InputMaybe<NameSystem>;
  nameSystem_in?: InputMaybe<Array<NameSystem>>;
  nameSystem_not_in?: InputMaybe<Array<NameSystem>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  graphAccount?: InputMaybe<Scalars['String']['input']>;
  graphAccount_not?: InputMaybe<Scalars['String']['input']>;
  graphAccount_gt?: InputMaybe<Scalars['String']['input']>;
  graphAccount_lt?: InputMaybe<Scalars['String']['input']>;
  graphAccount_gte?: InputMaybe<Scalars['String']['input']>;
  graphAccount_lte?: InputMaybe<Scalars['String']['input']>;
  graphAccount_in?: InputMaybe<Array<Scalars['String']['input']>>;
  graphAccount_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  graphAccount_contains?: InputMaybe<Scalars['String']['input']>;
  graphAccount_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  graphAccount_not_contains?: InputMaybe<Scalars['String']['input']>;
  graphAccount_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  graphAccount_starts_with?: InputMaybe<Scalars['String']['input']>;
  graphAccount_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  graphAccount_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  graphAccount_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  graphAccount_ends_with?: InputMaybe<Scalars['String']['input']>;
  graphAccount_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  graphAccount_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  graphAccount_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  graphAccount_?: InputMaybe<GraphAccount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<GraphAccountName_filter>>>;
  or?: InputMaybe<Array<InputMaybe<GraphAccountName_filter>>>;
};

export type GraphAccountName_orderBy =
  | 'id'
  | 'nameSystem'
  | 'name'
  | 'graphAccount'
  | 'graphAccount__id'
  | 'graphAccount__createdAt'
  | 'graphAccount__defaultDisplayName'
  | 'graphAccount__balance'
  | 'graphAccount__balanceReceivedFromL1Signalling'
  | 'graphAccount__balanceReceivedFromL1Delegation'
  | 'graphAccount__curationApproval'
  | 'graphAccount__stakingApproval'
  | 'graphAccount__gnsApproval'
  | 'graphAccount__developerCreatedAt'
  | 'graphAccount__subgraphQueryFees';

export type GraphAccount_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  names_?: InputMaybe<GraphAccountName_filter>;
  defaultName?: InputMaybe<Scalars['String']['input']>;
  defaultName_not?: InputMaybe<Scalars['String']['input']>;
  defaultName_gt?: InputMaybe<Scalars['String']['input']>;
  defaultName_lt?: InputMaybe<Scalars['String']['input']>;
  defaultName_gte?: InputMaybe<Scalars['String']['input']>;
  defaultName_lte?: InputMaybe<Scalars['String']['input']>;
  defaultName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  defaultName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  defaultName_contains?: InputMaybe<Scalars['String']['input']>;
  defaultName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultName_not_contains?: InputMaybe<Scalars['String']['input']>;
  defaultName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultName_starts_with?: InputMaybe<Scalars['String']['input']>;
  defaultName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  defaultName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultName_ends_with?: InputMaybe<Scalars['String']['input']>;
  defaultName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  defaultName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultName_?: InputMaybe<GraphAccountName_filter>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  defaultDisplayName?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_gt?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_lt?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_gte?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_lte?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  defaultDisplayName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  defaultDisplayName_contains?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_contains?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_starts_with?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_ends_with?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['String']['input']>;
  metadata_not?: InputMaybe<Scalars['String']['input']>;
  metadata_gt?: InputMaybe<Scalars['String']['input']>;
  metadata_lt?: InputMaybe<Scalars['String']['input']>;
  metadata_gte?: InputMaybe<Scalars['String']['input']>;
  metadata_lte?: InputMaybe<Scalars['String']['input']>;
  metadata_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metadata_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metadata_contains?: InputMaybe<Scalars['String']['input']>;
  metadata_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_not_contains?: InputMaybe<Scalars['String']['input']>;
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_starts_with?: InputMaybe<Scalars['String']['input']>;
  metadata_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  metadata_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_ends_with?: InputMaybe<Scalars['String']['input']>;
  metadata_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  metadata_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_?: InputMaybe<GraphAccountMeta_filter>;
  operatorOf_?: InputMaybe<GraphAccount_filter>;
  operators?: InputMaybe<Array<Scalars['String']['input']>>;
  operators_not?: InputMaybe<Array<Scalars['String']['input']>>;
  operators_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  operators_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  operators_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  operators_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  operators_?: InputMaybe<GraphAccount_filter>;
  balance?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balanceReceivedFromL1Signalling?: InputMaybe<Scalars['BigInt']['input']>;
  balanceReceivedFromL1Signalling_not?: InputMaybe<Scalars['BigInt']['input']>;
  balanceReceivedFromL1Signalling_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balanceReceivedFromL1Signalling_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balanceReceivedFromL1Signalling_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balanceReceivedFromL1Signalling_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balanceReceivedFromL1Signalling_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balanceReceivedFromL1Signalling_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balanceReceivedFromL1Delegation?: InputMaybe<Scalars['BigInt']['input']>;
  balanceReceivedFromL1Delegation_not?: InputMaybe<Scalars['BigInt']['input']>;
  balanceReceivedFromL1Delegation_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balanceReceivedFromL1Delegation_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balanceReceivedFromL1Delegation_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balanceReceivedFromL1Delegation_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balanceReceivedFromL1Delegation_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balanceReceivedFromL1Delegation_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  curationApproval?: InputMaybe<Scalars['BigInt']['input']>;
  curationApproval_not?: InputMaybe<Scalars['BigInt']['input']>;
  curationApproval_gt?: InputMaybe<Scalars['BigInt']['input']>;
  curationApproval_lt?: InputMaybe<Scalars['BigInt']['input']>;
  curationApproval_gte?: InputMaybe<Scalars['BigInt']['input']>;
  curationApproval_lte?: InputMaybe<Scalars['BigInt']['input']>;
  curationApproval_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  curationApproval_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stakingApproval?: InputMaybe<Scalars['BigInt']['input']>;
  stakingApproval_not?: InputMaybe<Scalars['BigInt']['input']>;
  stakingApproval_gt?: InputMaybe<Scalars['BigInt']['input']>;
  stakingApproval_lt?: InputMaybe<Scalars['BigInt']['input']>;
  stakingApproval_gte?: InputMaybe<Scalars['BigInt']['input']>;
  stakingApproval_lte?: InputMaybe<Scalars['BigInt']['input']>;
  stakingApproval_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stakingApproval_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gnsApproval?: InputMaybe<Scalars['BigInt']['input']>;
  gnsApproval_not?: InputMaybe<Scalars['BigInt']['input']>;
  gnsApproval_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gnsApproval_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gnsApproval_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gnsApproval_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gnsApproval_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gnsApproval_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  subgraphs_?: InputMaybe<Subgraph_filter>;
  developerCreatedAt?: InputMaybe<Scalars['Int']['input']>;
  developerCreatedAt_not?: InputMaybe<Scalars['Int']['input']>;
  developerCreatedAt_gt?: InputMaybe<Scalars['Int']['input']>;
  developerCreatedAt_lt?: InputMaybe<Scalars['Int']['input']>;
  developerCreatedAt_gte?: InputMaybe<Scalars['Int']['input']>;
  developerCreatedAt_lte?: InputMaybe<Scalars['Int']['input']>;
  developerCreatedAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  developerCreatedAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  subgraphQueryFees?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphQueryFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphQueryFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphQueryFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphQueryFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphQueryFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphQueryFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  subgraphQueryFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdDisputes_?: InputMaybe<Dispute_filter>;
  disputesAgainst_?: InputMaybe<Dispute_filter>;
  curator?: InputMaybe<Scalars['String']['input']>;
  curator_not?: InputMaybe<Scalars['String']['input']>;
  curator_gt?: InputMaybe<Scalars['String']['input']>;
  curator_lt?: InputMaybe<Scalars['String']['input']>;
  curator_gte?: InputMaybe<Scalars['String']['input']>;
  curator_lte?: InputMaybe<Scalars['String']['input']>;
  curator_in?: InputMaybe<Array<Scalars['String']['input']>>;
  curator_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  curator_contains?: InputMaybe<Scalars['String']['input']>;
  curator_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_not_contains?: InputMaybe<Scalars['String']['input']>;
  curator_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_starts_with?: InputMaybe<Scalars['String']['input']>;
  curator_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  curator_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_ends_with?: InputMaybe<Scalars['String']['input']>;
  curator_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  curator_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_?: InputMaybe<Curator_filter>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  indexer_not?: InputMaybe<Scalars['String']['input']>;
  indexer_gt?: InputMaybe<Scalars['String']['input']>;
  indexer_lt?: InputMaybe<Scalars['String']['input']>;
  indexer_gte?: InputMaybe<Scalars['String']['input']>;
  indexer_lte?: InputMaybe<Scalars['String']['input']>;
  indexer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  indexer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  indexer_contains?: InputMaybe<Scalars['String']['input']>;
  indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_starts_with?: InputMaybe<Scalars['String']['input']>;
  indexer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  indexer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_ends_with?: InputMaybe<Scalars['String']['input']>;
  indexer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  indexer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_?: InputMaybe<Indexer_filter>;
  delegator?: InputMaybe<Scalars['String']['input']>;
  delegator_not?: InputMaybe<Scalars['String']['input']>;
  delegator_gt?: InputMaybe<Scalars['String']['input']>;
  delegator_lt?: InputMaybe<Scalars['String']['input']>;
  delegator_gte?: InputMaybe<Scalars['String']['input']>;
  delegator_lte?: InputMaybe<Scalars['String']['input']>;
  delegator_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegator_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegator_contains?: InputMaybe<Scalars['String']['input']>;
  delegator_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  delegator_not_contains?: InputMaybe<Scalars['String']['input']>;
  delegator_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  delegator_starts_with?: InputMaybe<Scalars['String']['input']>;
  delegator_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegator_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  delegator_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegator_ends_with?: InputMaybe<Scalars['String']['input']>;
  delegator_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegator_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  delegator_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegator_?: InputMaybe<Delegator_filter>;
  nameSignalTransactions_?: InputMaybe<NameSignalTransaction_filter>;
  bridgeWithdrawalTransactions_?: InputMaybe<BridgeWithdrawalTransaction_filter>;
  bridgeDepositTransactions_?: InputMaybe<BridgeDepositTransaction_filter>;
  tokenLockWallets?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenLockWallets_not?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenLockWallets_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenLockWallets_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenLockWallets_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenLockWallets_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenLockWallets_?: InputMaybe<TokenLockWallet_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<GraphAccount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<GraphAccount_filter>>>;
};

export type GraphAccount_orderBy =
  | 'id'
  | 'names'
  | 'defaultName'
  | 'defaultName__id'
  | 'defaultName__nameSystem'
  | 'defaultName__name'
  | 'createdAt'
  | 'defaultDisplayName'
  | 'metadata'
  | 'metadata__id'
  | 'metadata__isOrganization'
  | 'metadata__codeRepository'
  | 'metadata__description'
  | 'metadata__image'
  | 'metadata__website'
  | 'metadata__displayName'
  | 'operatorOf'
  | 'operators'
  | 'balance'
  | 'balanceReceivedFromL1Signalling'
  | 'balanceReceivedFromL1Delegation'
  | 'curationApproval'
  | 'stakingApproval'
  | 'gnsApproval'
  | 'subgraphs'
  | 'developerCreatedAt'
  | 'subgraphQueryFees'
  | 'createdDisputes'
  | 'disputesAgainst'
  | 'curator'
  | 'curator__id'
  | 'curator__createdAt'
  | 'curator__totalSignalledTokens'
  | 'curator__totalUnsignalledTokens'
  | 'curator__defaultDisplayName'
  | 'curator__totalNameSignalledTokens'
  | 'curator__totalNameUnsignalledTokens'
  | 'curator__totalWithdrawnTokens'
  | 'curator__realizedRewards'
  | 'curator__annualizedReturn'
  | 'curator__totalReturn'
  | 'curator__signalingEfficiency'
  | 'curator__totalNameSignal'
  | 'curator__totalNameSignalAverageCostBasis'
  | 'curator__totalAverageCostBasisPerNameSignal'
  | 'curator__totalSignal'
  | 'curator__totalSignalAverageCostBasis'
  | 'curator__totalAverageCostBasisPerSignal'
  | 'curator__signalCount'
  | 'curator__activeSignalCount'
  | 'curator__nameSignalCount'
  | 'curator__activeNameSignalCount'
  | 'curator__combinedSignalCount'
  | 'curator__activeCombinedSignalCount'
  | 'indexer'
  | 'indexer__id'
  | 'indexer__createdAt'
  | 'indexer__url'
  | 'indexer__geoHash'
  | 'indexer__defaultDisplayName'
  | 'indexer__stakedTokens'
  | 'indexer__allocatedTokens'
  | 'indexer__unstakedTokens'
  | 'indexer__lockedTokens'
  | 'indexer__tokensLockedUntil'
  | 'indexer__allocationCount'
  | 'indexer__totalAllocationCount'
  | 'indexer__queryFeesCollected'
  | 'indexer__queryFeeRebates'
  | 'indexer__rewardsEarned'
  | 'indexer__indexerIndexingRewards'
  | 'indexer__delegatorIndexingRewards'
  | 'indexer__indexerRewardsOwnGenerationRatio'
  | 'indexer__transferredToL2'
  | 'indexer__firstTransferredToL2At'
  | 'indexer__firstTransferredToL2AtBlockNumber'
  | 'indexer__firstTransferredToL2AtTx'
  | 'indexer__lastTransferredToL2At'
  | 'indexer__lastTransferredToL2AtBlockNumber'
  | 'indexer__lastTransferredToL2AtTx'
  | 'indexer__stakedTokensTransferredToL2'
  | 'indexer__idOnL2'
  | 'indexer__idOnL1'
  | 'indexer__delegatedCapacity'
  | 'indexer__tokenCapacity'
  | 'indexer__availableStake'
  | 'indexer__delegatedTokens'
  | 'indexer__ownStakeRatio'
  | 'indexer__delegatedStakeRatio'
  | 'indexer__delegatorShares'
  | 'indexer__delegationExchangeRate'
  | 'indexer__indexingRewardCut'
  | 'indexer__indexingRewardEffectiveCut'
  | 'indexer__overDelegationDilution'
  | 'indexer__delegatorQueryFees'
  | 'indexer__queryFeeCut'
  | 'indexer__queryFeeEffectiveCut'
  | 'indexer__delegatorParameterCooldown'
  | 'indexer__lastDelegationParameterUpdate'
  | 'indexer__forcedClosures'
  | 'indexer__totalReturn'
  | 'indexer__annualizedReturn'
  | 'indexer__stakingEfficiency'
  | 'delegator'
  | 'delegator__id'
  | 'delegator__totalStakedTokens'
  | 'delegator__totalUnstakedTokens'
  | 'delegator__createdAt'
  | 'delegator__totalRealizedRewards'
  | 'delegator__stakesCount'
  | 'delegator__activeStakesCount'
  | 'delegator__defaultDisplayName'
  | 'nameSignalTransactions'
  | 'bridgeWithdrawalTransactions'
  | 'bridgeDepositTransactions'
  | 'tokenLockWallets';

/**
 * Graph Network global parameters and contract addresses
 *
 */
export type GraphNetwork = {
  /** ID is set to 1 */
  id: Scalars['ID']['output'];
  /** Controller address */
  controller: Scalars['Bytes']['output'];
  /** Graph token address */
  graphToken: Scalars['Bytes']['output'];
  /** Epoch manager address */
  epochManager: Scalars['Bytes']['output'];
  /** Epoch Manager implementations. Last in the array is current */
  epochManagerImplementations: Array<Scalars['Bytes']['output']>;
  /** Curation address */
  curation: Scalars['Bytes']['output'];
  /** Curation implementations. Last in the array is current */
  curationImplementations: Array<Scalars['Bytes']['output']>;
  /** Staking address */
  staking: Scalars['Bytes']['output'];
  /** Graph token implementations. Last in the array is current */
  stakingImplementations: Array<Scalars['Bytes']['output']>;
  /** Dispute manager address */
  disputeManager: Scalars['Bytes']['output'];
  /** GNS address */
  gns: Scalars['Bytes']['output'];
  /** Service registry address */
  serviceRegistry: Scalars['Bytes']['output'];
  /** Rewards manager address */
  rewardsManager: Scalars['Bytes']['output'];
  /** Rewards Manager implementations. Last in the array is current */
  rewardsManagerImplementations: Array<Scalars['Bytes']['output']>;
  /** True if the protocol is paused */
  isPaused: Scalars['Boolean']['output'];
  /** True if the protocol is partially paused */
  isPartialPaused: Scalars['Boolean']['output'];
  /** Governor of the controller (i.e. the whole protocol) */
  governor: Scalars['Bytes']['output'];
  /** Pause guardian address */
  pauseGuardian: Scalars['Bytes']['output'];
  /** Percentage of fees going to curators. In parts per million */
  curationPercentage: Scalars['Int']['output'];
  /** Percentage of fees burn as protocol fee. In parts per million */
  protocolFeePercentage: Scalars['Int']['output'];
  /** Ratio of max staked delegation tokens to indexers stake that earns rewards */
  delegationRatio: Scalars['Int']['output'];
  /** [DEPRECATED] Epochs to wait before fees can be claimed in rebate pool */
  channelDisputeEpochs: Scalars['Int']['output'];
  /** Epochs to wait before delegators can settle */
  maxAllocationEpochs: Scalars['Int']['output'];
  /** Time in blocks needed to wait to unstake */
  thawingPeriod: Scalars['Int']['output'];
  /** Minimum time an Indexer must use for resetting their Delegation parameters */
  delegationParametersCooldown: Scalars['Int']['output'];
  /** Minimum GRT an indexer must stake */
  minimumIndexerStake: Scalars['BigInt']['output'];
  /** Contracts that have been approved to be a slasher */
  slashers?: Maybe<Array<Scalars['Bytes']['output']>>;
  /** Time in epochs a delegator needs to wait to withdraw delegated stake */
  delegationUnbondingPeriod: Scalars['Int']['output'];
  /** [DEPRECATED] Alpha in the cobbs douglas formula */
  rebateRatio: Scalars['BigDecimal']['output'];
  /** Alpha in the exponential formula */
  rebateAlpha: Scalars['BigDecimal']['output'];
  /** Lambda in the exponential formula */
  rebateLambda: Scalars['BigDecimal']['output'];
  /** Tax that delegators pay to deposit. In Parts per million */
  delegationTaxPercentage: Scalars['Int']['output'];
  /** Asset holder for the protocol */
  assetHolders?: Maybe<Array<Scalars['Bytes']['output']>>;
  /** Total amount of indexer stake transferred to L2 */
  totalTokensStakedTransferredToL2: Scalars['BigInt']['output'];
  /** Total amount of delegated tokens transferred to L2 */
  totalDelegatedTokensTransferredToL2: Scalars['BigInt']['output'];
  /** Total amount of delegated tokens transferred to L2 */
  totalSignalledTokensTransferredToL2: Scalars['BigInt']['output'];
  /** The total amount of GRT staked in the staking contract */
  totalTokensStaked: Scalars['BigInt']['output'];
  /** NOT IMPLEMENTED - Total tokens that are settled and waiting to be claimed */
  totalTokensClaimable: Scalars['BigInt']['output'];
  /** Total tokens that are currently locked or withdrawable in the network from unstaking */
  totalUnstakedTokensLocked: Scalars['BigInt']['output'];
  /** Total GRT currently in allocation */
  totalTokensAllocated: Scalars['BigInt']['output'];
  /** Total delegated tokens in the protocol */
  totalDelegatedTokens: Scalars['BigInt']['output'];
  /** The total amount of GRT signalled in the Curation contract */
  totalTokensSignalled: Scalars['BigInt']['output'];
  /** Total GRT currently curating via the Auto-Migrate function */
  totalTokensSignalledAutoMigrate: Scalars['BigDecimal']['output'];
  /** Total GRT currently curating to a specific version */
  totalTokensSignalledDirectly: Scalars['BigDecimal']['output'];
  /** Total query fees generated in the network */
  totalQueryFees: Scalars['BigInt']['output'];
  /** Total query fees collected by indexers */
  totalIndexerQueryFeesCollected: Scalars['BigInt']['output'];
  /** Total query fees rebates claimed by indexers */
  totalIndexerQueryFeeRebates: Scalars['BigInt']['output'];
  /** Total query fees rebates claimed by delegators */
  totalDelegatorQueryFeeRebates: Scalars['BigInt']['output'];
  /** Total query fees payed to curators */
  totalCuratorQueryFees: Scalars['BigInt']['output'];
  /** Total protocol taxes applied to the query fees */
  totalTaxedQueryFees: Scalars['BigInt']['output'];
  /** Total unclaimed rebates. Includes unclaimed rebates, and rebates lost in rebates mechanism  */
  totalUnclaimedQueryFeeRebates: Scalars['BigInt']['output'];
  /** Total indexing rewards minted */
  totalIndexingRewards: Scalars['BigInt']['output'];
  /** Total indexing rewards minted to Delegators */
  totalIndexingDelegatorRewards: Scalars['BigInt']['output'];
  /** Total indexing rewards minted to Indexers */
  totalIndexingIndexerRewards: Scalars['BigInt']['output'];
  /** (Deprecated) The issuance rate of GRT per block before GIP-0037. To get annual rate do (networkGRTIssuance * 10^-18)^(blocksPerYear) */
  networkGRTIssuance: Scalars['BigInt']['output'];
  /** The issuance rate of GRT per block after GIP-0037. To get annual rate do (networkGRTIssuancePerBlock * blocksPerYear) */
  networkGRTIssuancePerBlock: Scalars['BigInt']['output'];
  /** Address of the availability oracle */
  subgraphAvailabilityOracle: Scalars['Bytes']['output'];
  /** Default reserve ratio for all subgraphs. In parts per million */
  defaultReserveRatio: Scalars['Int']['output'];
  /** Minimum amount of tokens needed to start curating */
  minimumCurationDeposit: Scalars['BigInt']['output'];
  /** The fee charged when a curator withdraws signal. In parts per million */
  curationTaxPercentage: Scalars['Int']['output'];
  /** Percentage of the GNS migration tax payed by the subgraph owner */
  ownerTaxPercentage: Scalars['Int']['output'];
  /** Graph Token supply */
  totalSupply: Scalars['BigInt']['output'];
  /** NOT IMPLEMENTED - Price of one GRT in USD */
  GRTinUSD: Scalars['BigDecimal']['output'];
  /** NOT IMPLEMENTED - Price of one GRT in ETH */
  GRTinETH?: Maybe<Scalars['BigDecimal']['output']>;
  /** Total amount of GRT minted */
  totalGRTMinted: Scalars['BigInt']['output'];
  /** Total amount of GRT burned */
  totalGRTBurned: Scalars['BigInt']['output'];
  /** Epoch Length in blocks */
  epochLength: Scalars['Int']['output'];
  /** Epoch that was last run */
  lastRunEpoch: Scalars['Int']['output'];
  /** Epoch when epoch length was last updated */
  lastLengthUpdateEpoch: Scalars['Int']['output'];
  /** Block when epoch length was last updated */
  lastLengthUpdateBlock: Scalars['Int']['output'];
  /** Current epoch the protocol is in */
  currentEpoch: Scalars['Int']['output'];
  /** Total indexers */
  indexerCount: Scalars['Int']['output'];
  /** Number of indexers that currently have some stake in the protocol */
  stakedIndexersCount: Scalars['Int']['output'];
  /** Total amount of delegators historically */
  delegatorCount: Scalars['Int']['output'];
  /** Total active delegators. Those that still have at least one active delegation. */
  activeDelegatorCount: Scalars['Int']['output'];
  /** Total amount of delegations historically */
  delegationCount: Scalars['Int']['output'];
  /** Total active delegations. Those delegations that still have GRT staked towards an indexer */
  activeDelegationCount: Scalars['Int']['output'];
  /** Total amount of curators historically */
  curatorCount: Scalars['Int']['output'];
  /** Total amount of curators historically */
  activeCuratorCount: Scalars['Int']['output'];
  /** Total amount of Subgraph entities */
  subgraphCount: Scalars['Int']['output'];
  /** Amount of active Subgraph entities */
  activeSubgraphCount: Scalars['Int']['output'];
  /** Total amount of SubgraphDeployment entities */
  subgraphDeploymentCount: Scalars['Int']['output'];
  /** Total epochs */
  epochCount: Scalars['Int']['output'];
  /** Total amount of allocations opened */
  allocationCount: Scalars['Int']['output'];
  /** Total amount of allocations currently active */
  activeAllocationCount: Scalars['Int']['output'];
  /** Dispute arbitrator */
  arbitrator: Scalars['Bytes']['output'];
  /** Penalty to Indexer on successful disputes for query disputes. In parts per million */
  querySlashingPercentage: Scalars['Int']['output'];
  /** Penalty to Indexer on successful disputes for indexing disputes. In parts per million */
  indexingSlashingPercentage: Scalars['Int']['output'];
  /** [DEPRECATED] Penalty to Indexer on successful disputes for indexing disputes. In parts per million */
  slashingPercentage: Scalars['Int']['output'];
  /** Minimum deposit to create a dispute */
  minimumDisputeDeposit: Scalars['BigInt']['output'];
  /** Reward to Fisherman on successful disputes. In parts per million */
  fishermanRewardPercentage: Scalars['Int']['output'];
  /** Total amount of GRT deposited to the L1 gateway. Note that the actual amount claimed in L2 might be lower due to tickets not redeemed. */
  totalGRTDeposited: Scalars['BigInt']['output'];
  /** Total amount of GRT withdrawn from the L2 gateway and claimed in L1. */
  totalGRTWithdrawnConfirmed: Scalars['BigInt']['output'];
  /** Total amount of GRT minted by L1 bridge */
  totalGRTMintedFromL2: Scalars['BigInt']['output'];
  /** Total amount of GRT deposited to the L1 gateway and redeemed in L2. */
  totalGRTDepositedConfirmed: Scalars['BigInt']['output'];
  /** Total amount of GRT withdrawn from the L2 gateway. Note that the actual amount claimed in L1 might be lower due to outbound transactions not finalized. */
  totalGRTWithdrawn: Scalars['BigInt']['output'];
  /** Block number for L1. Only implemented for L2 deployments to properly reflect the L1 block used for timings */
  currentL1BlockNumber?: Maybe<Scalars['BigInt']['output']>;
};

export type GraphNetwork_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  controller?: InputMaybe<Scalars['Bytes']['input']>;
  controller_not?: InputMaybe<Scalars['Bytes']['input']>;
  controller_gt?: InputMaybe<Scalars['Bytes']['input']>;
  controller_lt?: InputMaybe<Scalars['Bytes']['input']>;
  controller_gte?: InputMaybe<Scalars['Bytes']['input']>;
  controller_lte?: InputMaybe<Scalars['Bytes']['input']>;
  controller_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  controller_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  controller_contains?: InputMaybe<Scalars['Bytes']['input']>;
  controller_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  graphToken?: InputMaybe<Scalars['Bytes']['input']>;
  graphToken_not?: InputMaybe<Scalars['Bytes']['input']>;
  graphToken_gt?: InputMaybe<Scalars['Bytes']['input']>;
  graphToken_lt?: InputMaybe<Scalars['Bytes']['input']>;
  graphToken_gte?: InputMaybe<Scalars['Bytes']['input']>;
  graphToken_lte?: InputMaybe<Scalars['Bytes']['input']>;
  graphToken_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  graphToken_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  graphToken_contains?: InputMaybe<Scalars['Bytes']['input']>;
  graphToken_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  epochManager?: InputMaybe<Scalars['Bytes']['input']>;
  epochManager_not?: InputMaybe<Scalars['Bytes']['input']>;
  epochManager_gt?: InputMaybe<Scalars['Bytes']['input']>;
  epochManager_lt?: InputMaybe<Scalars['Bytes']['input']>;
  epochManager_gte?: InputMaybe<Scalars['Bytes']['input']>;
  epochManager_lte?: InputMaybe<Scalars['Bytes']['input']>;
  epochManager_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  epochManager_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  epochManager_contains?: InputMaybe<Scalars['Bytes']['input']>;
  epochManager_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  epochManagerImplementations?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  epochManagerImplementations_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  epochManagerImplementations_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  epochManagerImplementations_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  epochManagerImplementations_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  epochManagerImplementations_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  curation?: InputMaybe<Scalars['Bytes']['input']>;
  curation_not?: InputMaybe<Scalars['Bytes']['input']>;
  curation_gt?: InputMaybe<Scalars['Bytes']['input']>;
  curation_lt?: InputMaybe<Scalars['Bytes']['input']>;
  curation_gte?: InputMaybe<Scalars['Bytes']['input']>;
  curation_lte?: InputMaybe<Scalars['Bytes']['input']>;
  curation_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  curation_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  curation_contains?: InputMaybe<Scalars['Bytes']['input']>;
  curation_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  curationImplementations?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  curationImplementations_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  curationImplementations_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  curationImplementations_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  curationImplementations_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  curationImplementations_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  staking?: InputMaybe<Scalars['Bytes']['input']>;
  staking_not?: InputMaybe<Scalars['Bytes']['input']>;
  staking_gt?: InputMaybe<Scalars['Bytes']['input']>;
  staking_lt?: InputMaybe<Scalars['Bytes']['input']>;
  staking_gte?: InputMaybe<Scalars['Bytes']['input']>;
  staking_lte?: InputMaybe<Scalars['Bytes']['input']>;
  staking_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  staking_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  staking_contains?: InputMaybe<Scalars['Bytes']['input']>;
  staking_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  stakingImplementations?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  stakingImplementations_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  stakingImplementations_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  stakingImplementations_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  stakingImplementations_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  stakingImplementations_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  disputeManager?: InputMaybe<Scalars['Bytes']['input']>;
  disputeManager_not?: InputMaybe<Scalars['Bytes']['input']>;
  disputeManager_gt?: InputMaybe<Scalars['Bytes']['input']>;
  disputeManager_lt?: InputMaybe<Scalars['Bytes']['input']>;
  disputeManager_gte?: InputMaybe<Scalars['Bytes']['input']>;
  disputeManager_lte?: InputMaybe<Scalars['Bytes']['input']>;
  disputeManager_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  disputeManager_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  disputeManager_contains?: InputMaybe<Scalars['Bytes']['input']>;
  disputeManager_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  gns?: InputMaybe<Scalars['Bytes']['input']>;
  gns_not?: InputMaybe<Scalars['Bytes']['input']>;
  gns_gt?: InputMaybe<Scalars['Bytes']['input']>;
  gns_lt?: InputMaybe<Scalars['Bytes']['input']>;
  gns_gte?: InputMaybe<Scalars['Bytes']['input']>;
  gns_lte?: InputMaybe<Scalars['Bytes']['input']>;
  gns_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  gns_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  gns_contains?: InputMaybe<Scalars['Bytes']['input']>;
  gns_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  serviceRegistry?: InputMaybe<Scalars['Bytes']['input']>;
  serviceRegistry_not?: InputMaybe<Scalars['Bytes']['input']>;
  serviceRegistry_gt?: InputMaybe<Scalars['Bytes']['input']>;
  serviceRegistry_lt?: InputMaybe<Scalars['Bytes']['input']>;
  serviceRegistry_gte?: InputMaybe<Scalars['Bytes']['input']>;
  serviceRegistry_lte?: InputMaybe<Scalars['Bytes']['input']>;
  serviceRegistry_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  serviceRegistry_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  serviceRegistry_contains?: InputMaybe<Scalars['Bytes']['input']>;
  serviceRegistry_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  rewardsManager?: InputMaybe<Scalars['Bytes']['input']>;
  rewardsManager_not?: InputMaybe<Scalars['Bytes']['input']>;
  rewardsManager_gt?: InputMaybe<Scalars['Bytes']['input']>;
  rewardsManager_lt?: InputMaybe<Scalars['Bytes']['input']>;
  rewardsManager_gte?: InputMaybe<Scalars['Bytes']['input']>;
  rewardsManager_lte?: InputMaybe<Scalars['Bytes']['input']>;
  rewardsManager_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  rewardsManager_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  rewardsManager_contains?: InputMaybe<Scalars['Bytes']['input']>;
  rewardsManager_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  rewardsManagerImplementations?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  rewardsManagerImplementations_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  rewardsManagerImplementations_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  rewardsManagerImplementations_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  rewardsManagerImplementations_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  rewardsManagerImplementations_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  isPaused?: InputMaybe<Scalars['Boolean']['input']>;
  isPaused_not?: InputMaybe<Scalars['Boolean']['input']>;
  isPaused_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isPaused_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isPartialPaused?: InputMaybe<Scalars['Boolean']['input']>;
  isPartialPaused_not?: InputMaybe<Scalars['Boolean']['input']>;
  isPartialPaused_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isPartialPaused_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  governor?: InputMaybe<Scalars['Bytes']['input']>;
  governor_not?: InputMaybe<Scalars['Bytes']['input']>;
  governor_gt?: InputMaybe<Scalars['Bytes']['input']>;
  governor_lt?: InputMaybe<Scalars['Bytes']['input']>;
  governor_gte?: InputMaybe<Scalars['Bytes']['input']>;
  governor_lte?: InputMaybe<Scalars['Bytes']['input']>;
  governor_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  governor_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  governor_contains?: InputMaybe<Scalars['Bytes']['input']>;
  governor_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  pauseGuardian?: InputMaybe<Scalars['Bytes']['input']>;
  pauseGuardian_not?: InputMaybe<Scalars['Bytes']['input']>;
  pauseGuardian_gt?: InputMaybe<Scalars['Bytes']['input']>;
  pauseGuardian_lt?: InputMaybe<Scalars['Bytes']['input']>;
  pauseGuardian_gte?: InputMaybe<Scalars['Bytes']['input']>;
  pauseGuardian_lte?: InputMaybe<Scalars['Bytes']['input']>;
  pauseGuardian_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  pauseGuardian_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  pauseGuardian_contains?: InputMaybe<Scalars['Bytes']['input']>;
  pauseGuardian_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  curationPercentage?: InputMaybe<Scalars['Int']['input']>;
  curationPercentage_not?: InputMaybe<Scalars['Int']['input']>;
  curationPercentage_gt?: InputMaybe<Scalars['Int']['input']>;
  curationPercentage_lt?: InputMaybe<Scalars['Int']['input']>;
  curationPercentage_gte?: InputMaybe<Scalars['Int']['input']>;
  curationPercentage_lte?: InputMaybe<Scalars['Int']['input']>;
  curationPercentage_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  curationPercentage_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  protocolFeePercentage?: InputMaybe<Scalars['Int']['input']>;
  protocolFeePercentage_not?: InputMaybe<Scalars['Int']['input']>;
  protocolFeePercentage_gt?: InputMaybe<Scalars['Int']['input']>;
  protocolFeePercentage_lt?: InputMaybe<Scalars['Int']['input']>;
  protocolFeePercentage_gte?: InputMaybe<Scalars['Int']['input']>;
  protocolFeePercentage_lte?: InputMaybe<Scalars['Int']['input']>;
  protocolFeePercentage_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  protocolFeePercentage_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegationRatio?: InputMaybe<Scalars['Int']['input']>;
  delegationRatio_not?: InputMaybe<Scalars['Int']['input']>;
  delegationRatio_gt?: InputMaybe<Scalars['Int']['input']>;
  delegationRatio_lt?: InputMaybe<Scalars['Int']['input']>;
  delegationRatio_gte?: InputMaybe<Scalars['Int']['input']>;
  delegationRatio_lte?: InputMaybe<Scalars['Int']['input']>;
  delegationRatio_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegationRatio_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  channelDisputeEpochs?: InputMaybe<Scalars['Int']['input']>;
  channelDisputeEpochs_not?: InputMaybe<Scalars['Int']['input']>;
  channelDisputeEpochs_gt?: InputMaybe<Scalars['Int']['input']>;
  channelDisputeEpochs_lt?: InputMaybe<Scalars['Int']['input']>;
  channelDisputeEpochs_gte?: InputMaybe<Scalars['Int']['input']>;
  channelDisputeEpochs_lte?: InputMaybe<Scalars['Int']['input']>;
  channelDisputeEpochs_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  channelDisputeEpochs_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  maxAllocationEpochs?: InputMaybe<Scalars['Int']['input']>;
  maxAllocationEpochs_not?: InputMaybe<Scalars['Int']['input']>;
  maxAllocationEpochs_gt?: InputMaybe<Scalars['Int']['input']>;
  maxAllocationEpochs_lt?: InputMaybe<Scalars['Int']['input']>;
  maxAllocationEpochs_gte?: InputMaybe<Scalars['Int']['input']>;
  maxAllocationEpochs_lte?: InputMaybe<Scalars['Int']['input']>;
  maxAllocationEpochs_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  maxAllocationEpochs_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  thawingPeriod?: InputMaybe<Scalars['Int']['input']>;
  thawingPeriod_not?: InputMaybe<Scalars['Int']['input']>;
  thawingPeriod_gt?: InputMaybe<Scalars['Int']['input']>;
  thawingPeriod_lt?: InputMaybe<Scalars['Int']['input']>;
  thawingPeriod_gte?: InputMaybe<Scalars['Int']['input']>;
  thawingPeriod_lte?: InputMaybe<Scalars['Int']['input']>;
  thawingPeriod_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  thawingPeriod_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegationParametersCooldown?: InputMaybe<Scalars['Int']['input']>;
  delegationParametersCooldown_not?: InputMaybe<Scalars['Int']['input']>;
  delegationParametersCooldown_gt?: InputMaybe<Scalars['Int']['input']>;
  delegationParametersCooldown_lt?: InputMaybe<Scalars['Int']['input']>;
  delegationParametersCooldown_gte?: InputMaybe<Scalars['Int']['input']>;
  delegationParametersCooldown_lte?: InputMaybe<Scalars['Int']['input']>;
  delegationParametersCooldown_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegationParametersCooldown_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  minimumIndexerStake?: InputMaybe<Scalars['BigInt']['input']>;
  minimumIndexerStake_not?: InputMaybe<Scalars['BigInt']['input']>;
  minimumIndexerStake_gt?: InputMaybe<Scalars['BigInt']['input']>;
  minimumIndexerStake_lt?: InputMaybe<Scalars['BigInt']['input']>;
  minimumIndexerStake_gte?: InputMaybe<Scalars['BigInt']['input']>;
  minimumIndexerStake_lte?: InputMaybe<Scalars['BigInt']['input']>;
  minimumIndexerStake_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  minimumIndexerStake_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  slashers?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  slashers_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  slashers_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  slashers_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  slashers_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  slashers_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  delegationUnbondingPeriod?: InputMaybe<Scalars['Int']['input']>;
  delegationUnbondingPeriod_not?: InputMaybe<Scalars['Int']['input']>;
  delegationUnbondingPeriod_gt?: InputMaybe<Scalars['Int']['input']>;
  delegationUnbondingPeriod_lt?: InputMaybe<Scalars['Int']['input']>;
  delegationUnbondingPeriod_gte?: InputMaybe<Scalars['Int']['input']>;
  delegationUnbondingPeriod_lte?: InputMaybe<Scalars['Int']['input']>;
  delegationUnbondingPeriod_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegationUnbondingPeriod_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  rebateRatio?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateRatio_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateRatio_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateRatio_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateRatio_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateRatio_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateRatio_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  rebateRatio_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  rebateAlpha?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateAlpha_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateAlpha_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateAlpha_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateAlpha_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateAlpha_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateAlpha_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  rebateAlpha_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  rebateLambda?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateLambda_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateLambda_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateLambda_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateLambda_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateLambda_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  rebateLambda_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  rebateLambda_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  delegationTaxPercentage?: InputMaybe<Scalars['Int']['input']>;
  delegationTaxPercentage_not?: InputMaybe<Scalars['Int']['input']>;
  delegationTaxPercentage_gt?: InputMaybe<Scalars['Int']['input']>;
  delegationTaxPercentage_lt?: InputMaybe<Scalars['Int']['input']>;
  delegationTaxPercentage_gte?: InputMaybe<Scalars['Int']['input']>;
  delegationTaxPercentage_lte?: InputMaybe<Scalars['Int']['input']>;
  delegationTaxPercentage_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegationTaxPercentage_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  assetHolders?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetHolders_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetHolders_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetHolders_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetHolders_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  assetHolders_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  totalTokensStakedTransferredToL2?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensStakedTransferredToL2_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensStakedTransferredToL2_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensStakedTransferredToL2_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensStakedTransferredToL2_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensStakedTransferredToL2_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensStakedTransferredToL2_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTokensStakedTransferredToL2_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDelegatedTokensTransferredToL2?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatedTokensTransferredToL2_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatedTokensTransferredToL2_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatedTokensTransferredToL2_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatedTokensTransferredToL2_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatedTokensTransferredToL2_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatedTokensTransferredToL2_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDelegatedTokensTransferredToL2_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSignalledTokensTransferredToL2?: InputMaybe<Scalars['BigInt']['input']>;
  totalSignalledTokensTransferredToL2_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSignalledTokensTransferredToL2_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSignalledTokensTransferredToL2_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSignalledTokensTransferredToL2_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSignalledTokensTransferredToL2_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSignalledTokensTransferredToL2_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSignalledTokensTransferredToL2_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTokensStaked?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensStaked_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensStaked_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensStaked_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensStaked_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensStaked_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensStaked_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTokensStaked_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTokensClaimable?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensClaimable_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensClaimable_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensClaimable_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensClaimable_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensClaimable_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensClaimable_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTokensClaimable_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalUnstakedTokensLocked?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnstakedTokensLocked_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnstakedTokensLocked_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnstakedTokensLocked_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnstakedTokensLocked_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnstakedTokensLocked_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnstakedTokensLocked_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalUnstakedTokensLocked_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTokensAllocated?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensAllocated_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensAllocated_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensAllocated_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensAllocated_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensAllocated_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensAllocated_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTokensAllocated_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDelegatedTokens?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatedTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatedTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatedTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatedTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatedTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatedTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDelegatedTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTokensSignalled?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensSignalled_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensSignalled_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensSignalled_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensSignalled_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensSignalled_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensSignalled_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTokensSignalled_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTokensSignalledAutoMigrate?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalTokensSignalledAutoMigrate_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalTokensSignalledAutoMigrate_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalTokensSignalledAutoMigrate_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalTokensSignalledAutoMigrate_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalTokensSignalledAutoMigrate_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalTokensSignalledAutoMigrate_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalTokensSignalledAutoMigrate_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalTokensSignalledDirectly?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalTokensSignalledDirectly_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalTokensSignalledDirectly_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalTokensSignalledDirectly_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalTokensSignalledDirectly_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalTokensSignalledDirectly_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalTokensSignalledDirectly_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalTokensSignalledDirectly_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalQueryFees?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalQueryFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalIndexerQueryFeesCollected?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerQueryFeesCollected_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerQueryFeesCollected_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerQueryFeesCollected_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerQueryFeesCollected_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerQueryFeesCollected_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerQueryFeesCollected_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalIndexerQueryFeesCollected_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalIndexerQueryFeeRebates?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerQueryFeeRebates_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerQueryFeeRebates_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerQueryFeeRebates_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerQueryFeeRebates_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerQueryFeeRebates_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexerQueryFeeRebates_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalIndexerQueryFeeRebates_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDelegatorQueryFeeRebates?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatorQueryFeeRebates_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatorQueryFeeRebates_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatorQueryFeeRebates_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatorQueryFeeRebates_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatorQueryFeeRebates_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegatorQueryFeeRebates_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDelegatorQueryFeeRebates_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalCuratorQueryFees?: InputMaybe<Scalars['BigInt']['input']>;
  totalCuratorQueryFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalCuratorQueryFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalCuratorQueryFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalCuratorQueryFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalCuratorQueryFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalCuratorQueryFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalCuratorQueryFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTaxedQueryFees?: InputMaybe<Scalars['BigInt']['input']>;
  totalTaxedQueryFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalTaxedQueryFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTaxedQueryFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTaxedQueryFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTaxedQueryFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTaxedQueryFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTaxedQueryFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalUnclaimedQueryFeeRebates?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnclaimedQueryFeeRebates_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnclaimedQueryFeeRebates_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnclaimedQueryFeeRebates_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnclaimedQueryFeeRebates_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnclaimedQueryFeeRebates_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalUnclaimedQueryFeeRebates_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalUnclaimedQueryFeeRebates_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalIndexingRewards?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalIndexingRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalIndexingDelegatorRewards?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingDelegatorRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingDelegatorRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingDelegatorRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingDelegatorRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingDelegatorRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingDelegatorRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalIndexingDelegatorRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalIndexingIndexerRewards?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingIndexerRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingIndexerRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingIndexerRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingIndexerRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingIndexerRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalIndexingIndexerRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalIndexingIndexerRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  networkGRTIssuance?: InputMaybe<Scalars['BigInt']['input']>;
  networkGRTIssuance_not?: InputMaybe<Scalars['BigInt']['input']>;
  networkGRTIssuance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  networkGRTIssuance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  networkGRTIssuance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  networkGRTIssuance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  networkGRTIssuance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  networkGRTIssuance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  networkGRTIssuancePerBlock?: InputMaybe<Scalars['BigInt']['input']>;
  networkGRTIssuancePerBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  networkGRTIssuancePerBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  networkGRTIssuancePerBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  networkGRTIssuancePerBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  networkGRTIssuancePerBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  networkGRTIssuancePerBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  networkGRTIssuancePerBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  subgraphAvailabilityOracle?: InputMaybe<Scalars['Bytes']['input']>;
  subgraphAvailabilityOracle_not?: InputMaybe<Scalars['Bytes']['input']>;
  subgraphAvailabilityOracle_gt?: InputMaybe<Scalars['Bytes']['input']>;
  subgraphAvailabilityOracle_lt?: InputMaybe<Scalars['Bytes']['input']>;
  subgraphAvailabilityOracle_gte?: InputMaybe<Scalars['Bytes']['input']>;
  subgraphAvailabilityOracle_lte?: InputMaybe<Scalars['Bytes']['input']>;
  subgraphAvailabilityOracle_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  subgraphAvailabilityOracle_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  subgraphAvailabilityOracle_contains?: InputMaybe<Scalars['Bytes']['input']>;
  subgraphAvailabilityOracle_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  defaultReserveRatio?: InputMaybe<Scalars['Int']['input']>;
  defaultReserveRatio_not?: InputMaybe<Scalars['Int']['input']>;
  defaultReserveRatio_gt?: InputMaybe<Scalars['Int']['input']>;
  defaultReserveRatio_lt?: InputMaybe<Scalars['Int']['input']>;
  defaultReserveRatio_gte?: InputMaybe<Scalars['Int']['input']>;
  defaultReserveRatio_lte?: InputMaybe<Scalars['Int']['input']>;
  defaultReserveRatio_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  defaultReserveRatio_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  minimumCurationDeposit?: InputMaybe<Scalars['BigInt']['input']>;
  minimumCurationDeposit_not?: InputMaybe<Scalars['BigInt']['input']>;
  minimumCurationDeposit_gt?: InputMaybe<Scalars['BigInt']['input']>;
  minimumCurationDeposit_lt?: InputMaybe<Scalars['BigInt']['input']>;
  minimumCurationDeposit_gte?: InputMaybe<Scalars['BigInt']['input']>;
  minimumCurationDeposit_lte?: InputMaybe<Scalars['BigInt']['input']>;
  minimumCurationDeposit_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  minimumCurationDeposit_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  curationTaxPercentage?: InputMaybe<Scalars['Int']['input']>;
  curationTaxPercentage_not?: InputMaybe<Scalars['Int']['input']>;
  curationTaxPercentage_gt?: InputMaybe<Scalars['Int']['input']>;
  curationTaxPercentage_lt?: InputMaybe<Scalars['Int']['input']>;
  curationTaxPercentage_gte?: InputMaybe<Scalars['Int']['input']>;
  curationTaxPercentage_lte?: InputMaybe<Scalars['Int']['input']>;
  curationTaxPercentage_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  curationTaxPercentage_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  ownerTaxPercentage?: InputMaybe<Scalars['Int']['input']>;
  ownerTaxPercentage_not?: InputMaybe<Scalars['Int']['input']>;
  ownerTaxPercentage_gt?: InputMaybe<Scalars['Int']['input']>;
  ownerTaxPercentage_lt?: InputMaybe<Scalars['Int']['input']>;
  ownerTaxPercentage_gte?: InputMaybe<Scalars['Int']['input']>;
  ownerTaxPercentage_lte?: InputMaybe<Scalars['Int']['input']>;
  ownerTaxPercentage_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  ownerTaxPercentage_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalSupply?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  GRTinUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  GRTinUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  GRTinUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  GRTinUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  GRTinUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  GRTinUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  GRTinUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  GRTinUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  GRTinETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  GRTinETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  GRTinETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  GRTinETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  GRTinETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  GRTinETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  GRTinETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  GRTinETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalGRTMinted?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTMinted_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTMinted_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTMinted_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTMinted_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTMinted_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTMinted_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalGRTMinted_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalGRTBurned?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTBurned_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTBurned_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTBurned_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTBurned_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTBurned_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTBurned_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalGRTBurned_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  epochLength?: InputMaybe<Scalars['Int']['input']>;
  epochLength_not?: InputMaybe<Scalars['Int']['input']>;
  epochLength_gt?: InputMaybe<Scalars['Int']['input']>;
  epochLength_lt?: InputMaybe<Scalars['Int']['input']>;
  epochLength_gte?: InputMaybe<Scalars['Int']['input']>;
  epochLength_lte?: InputMaybe<Scalars['Int']['input']>;
  epochLength_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  epochLength_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastRunEpoch?: InputMaybe<Scalars['Int']['input']>;
  lastRunEpoch_not?: InputMaybe<Scalars['Int']['input']>;
  lastRunEpoch_gt?: InputMaybe<Scalars['Int']['input']>;
  lastRunEpoch_lt?: InputMaybe<Scalars['Int']['input']>;
  lastRunEpoch_gte?: InputMaybe<Scalars['Int']['input']>;
  lastRunEpoch_lte?: InputMaybe<Scalars['Int']['input']>;
  lastRunEpoch_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastRunEpoch_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastLengthUpdateEpoch?: InputMaybe<Scalars['Int']['input']>;
  lastLengthUpdateEpoch_not?: InputMaybe<Scalars['Int']['input']>;
  lastLengthUpdateEpoch_gt?: InputMaybe<Scalars['Int']['input']>;
  lastLengthUpdateEpoch_lt?: InputMaybe<Scalars['Int']['input']>;
  lastLengthUpdateEpoch_gte?: InputMaybe<Scalars['Int']['input']>;
  lastLengthUpdateEpoch_lte?: InputMaybe<Scalars['Int']['input']>;
  lastLengthUpdateEpoch_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastLengthUpdateEpoch_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastLengthUpdateBlock?: InputMaybe<Scalars['Int']['input']>;
  lastLengthUpdateBlock_not?: InputMaybe<Scalars['Int']['input']>;
  lastLengthUpdateBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  lastLengthUpdateBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  lastLengthUpdateBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  lastLengthUpdateBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  lastLengthUpdateBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastLengthUpdateBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  currentEpoch?: InputMaybe<Scalars['Int']['input']>;
  currentEpoch_not?: InputMaybe<Scalars['Int']['input']>;
  currentEpoch_gt?: InputMaybe<Scalars['Int']['input']>;
  currentEpoch_lt?: InputMaybe<Scalars['Int']['input']>;
  currentEpoch_gte?: InputMaybe<Scalars['Int']['input']>;
  currentEpoch_lte?: InputMaybe<Scalars['Int']['input']>;
  currentEpoch_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  currentEpoch_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  indexerCount?: InputMaybe<Scalars['Int']['input']>;
  indexerCount_not?: InputMaybe<Scalars['Int']['input']>;
  indexerCount_gt?: InputMaybe<Scalars['Int']['input']>;
  indexerCount_lt?: InputMaybe<Scalars['Int']['input']>;
  indexerCount_gte?: InputMaybe<Scalars['Int']['input']>;
  indexerCount_lte?: InputMaybe<Scalars['Int']['input']>;
  indexerCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  indexerCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  stakedIndexersCount?: InputMaybe<Scalars['Int']['input']>;
  stakedIndexersCount_not?: InputMaybe<Scalars['Int']['input']>;
  stakedIndexersCount_gt?: InputMaybe<Scalars['Int']['input']>;
  stakedIndexersCount_lt?: InputMaybe<Scalars['Int']['input']>;
  stakedIndexersCount_gte?: InputMaybe<Scalars['Int']['input']>;
  stakedIndexersCount_lte?: InputMaybe<Scalars['Int']['input']>;
  stakedIndexersCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  stakedIndexersCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegatorCount?: InputMaybe<Scalars['Int']['input']>;
  delegatorCount_not?: InputMaybe<Scalars['Int']['input']>;
  delegatorCount_gt?: InputMaybe<Scalars['Int']['input']>;
  delegatorCount_lt?: InputMaybe<Scalars['Int']['input']>;
  delegatorCount_gte?: InputMaybe<Scalars['Int']['input']>;
  delegatorCount_lte?: InputMaybe<Scalars['Int']['input']>;
  delegatorCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegatorCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeDelegatorCount?: InputMaybe<Scalars['Int']['input']>;
  activeDelegatorCount_not?: InputMaybe<Scalars['Int']['input']>;
  activeDelegatorCount_gt?: InputMaybe<Scalars['Int']['input']>;
  activeDelegatorCount_lt?: InputMaybe<Scalars['Int']['input']>;
  activeDelegatorCount_gte?: InputMaybe<Scalars['Int']['input']>;
  activeDelegatorCount_lte?: InputMaybe<Scalars['Int']['input']>;
  activeDelegatorCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeDelegatorCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegationCount?: InputMaybe<Scalars['Int']['input']>;
  delegationCount_not?: InputMaybe<Scalars['Int']['input']>;
  delegationCount_gt?: InputMaybe<Scalars['Int']['input']>;
  delegationCount_lt?: InputMaybe<Scalars['Int']['input']>;
  delegationCount_gte?: InputMaybe<Scalars['Int']['input']>;
  delegationCount_lte?: InputMaybe<Scalars['Int']['input']>;
  delegationCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegationCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeDelegationCount?: InputMaybe<Scalars['Int']['input']>;
  activeDelegationCount_not?: InputMaybe<Scalars['Int']['input']>;
  activeDelegationCount_gt?: InputMaybe<Scalars['Int']['input']>;
  activeDelegationCount_lt?: InputMaybe<Scalars['Int']['input']>;
  activeDelegationCount_gte?: InputMaybe<Scalars['Int']['input']>;
  activeDelegationCount_lte?: InputMaybe<Scalars['Int']['input']>;
  activeDelegationCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeDelegationCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  curatorCount?: InputMaybe<Scalars['Int']['input']>;
  curatorCount_not?: InputMaybe<Scalars['Int']['input']>;
  curatorCount_gt?: InputMaybe<Scalars['Int']['input']>;
  curatorCount_lt?: InputMaybe<Scalars['Int']['input']>;
  curatorCount_gte?: InputMaybe<Scalars['Int']['input']>;
  curatorCount_lte?: InputMaybe<Scalars['Int']['input']>;
  curatorCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  curatorCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeCuratorCount?: InputMaybe<Scalars['Int']['input']>;
  activeCuratorCount_not?: InputMaybe<Scalars['Int']['input']>;
  activeCuratorCount_gt?: InputMaybe<Scalars['Int']['input']>;
  activeCuratorCount_lt?: InputMaybe<Scalars['Int']['input']>;
  activeCuratorCount_gte?: InputMaybe<Scalars['Int']['input']>;
  activeCuratorCount_lte?: InputMaybe<Scalars['Int']['input']>;
  activeCuratorCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeCuratorCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  subgraphCount?: InputMaybe<Scalars['Int']['input']>;
  subgraphCount_not?: InputMaybe<Scalars['Int']['input']>;
  subgraphCount_gt?: InputMaybe<Scalars['Int']['input']>;
  subgraphCount_lt?: InputMaybe<Scalars['Int']['input']>;
  subgraphCount_gte?: InputMaybe<Scalars['Int']['input']>;
  subgraphCount_lte?: InputMaybe<Scalars['Int']['input']>;
  subgraphCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  subgraphCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeSubgraphCount?: InputMaybe<Scalars['Int']['input']>;
  activeSubgraphCount_not?: InputMaybe<Scalars['Int']['input']>;
  activeSubgraphCount_gt?: InputMaybe<Scalars['Int']['input']>;
  activeSubgraphCount_lt?: InputMaybe<Scalars['Int']['input']>;
  activeSubgraphCount_gte?: InputMaybe<Scalars['Int']['input']>;
  activeSubgraphCount_lte?: InputMaybe<Scalars['Int']['input']>;
  activeSubgraphCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeSubgraphCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  subgraphDeploymentCount?: InputMaybe<Scalars['Int']['input']>;
  subgraphDeploymentCount_not?: InputMaybe<Scalars['Int']['input']>;
  subgraphDeploymentCount_gt?: InputMaybe<Scalars['Int']['input']>;
  subgraphDeploymentCount_lt?: InputMaybe<Scalars['Int']['input']>;
  subgraphDeploymentCount_gte?: InputMaybe<Scalars['Int']['input']>;
  subgraphDeploymentCount_lte?: InputMaybe<Scalars['Int']['input']>;
  subgraphDeploymentCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  subgraphDeploymentCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  epochCount?: InputMaybe<Scalars['Int']['input']>;
  epochCount_not?: InputMaybe<Scalars['Int']['input']>;
  epochCount_gt?: InputMaybe<Scalars['Int']['input']>;
  epochCount_lt?: InputMaybe<Scalars['Int']['input']>;
  epochCount_gte?: InputMaybe<Scalars['Int']['input']>;
  epochCount_lte?: InputMaybe<Scalars['Int']['input']>;
  epochCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  epochCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  allocationCount?: InputMaybe<Scalars['Int']['input']>;
  allocationCount_not?: InputMaybe<Scalars['Int']['input']>;
  allocationCount_gt?: InputMaybe<Scalars['Int']['input']>;
  allocationCount_lt?: InputMaybe<Scalars['Int']['input']>;
  allocationCount_gte?: InputMaybe<Scalars['Int']['input']>;
  allocationCount_lte?: InputMaybe<Scalars['Int']['input']>;
  allocationCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  allocationCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeAllocationCount?: InputMaybe<Scalars['Int']['input']>;
  activeAllocationCount_not?: InputMaybe<Scalars['Int']['input']>;
  activeAllocationCount_gt?: InputMaybe<Scalars['Int']['input']>;
  activeAllocationCount_lt?: InputMaybe<Scalars['Int']['input']>;
  activeAllocationCount_gte?: InputMaybe<Scalars['Int']['input']>;
  activeAllocationCount_lte?: InputMaybe<Scalars['Int']['input']>;
  activeAllocationCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeAllocationCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  arbitrator?: InputMaybe<Scalars['Bytes']['input']>;
  arbitrator_not?: InputMaybe<Scalars['Bytes']['input']>;
  arbitrator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  arbitrator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  arbitrator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  arbitrator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  arbitrator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  arbitrator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  arbitrator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  arbitrator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  querySlashingPercentage?: InputMaybe<Scalars['Int']['input']>;
  querySlashingPercentage_not?: InputMaybe<Scalars['Int']['input']>;
  querySlashingPercentage_gt?: InputMaybe<Scalars['Int']['input']>;
  querySlashingPercentage_lt?: InputMaybe<Scalars['Int']['input']>;
  querySlashingPercentage_gte?: InputMaybe<Scalars['Int']['input']>;
  querySlashingPercentage_lte?: InputMaybe<Scalars['Int']['input']>;
  querySlashingPercentage_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  querySlashingPercentage_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  indexingSlashingPercentage?: InputMaybe<Scalars['Int']['input']>;
  indexingSlashingPercentage_not?: InputMaybe<Scalars['Int']['input']>;
  indexingSlashingPercentage_gt?: InputMaybe<Scalars['Int']['input']>;
  indexingSlashingPercentage_lt?: InputMaybe<Scalars['Int']['input']>;
  indexingSlashingPercentage_gte?: InputMaybe<Scalars['Int']['input']>;
  indexingSlashingPercentage_lte?: InputMaybe<Scalars['Int']['input']>;
  indexingSlashingPercentage_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  indexingSlashingPercentage_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  slashingPercentage?: InputMaybe<Scalars['Int']['input']>;
  slashingPercentage_not?: InputMaybe<Scalars['Int']['input']>;
  slashingPercentage_gt?: InputMaybe<Scalars['Int']['input']>;
  slashingPercentage_lt?: InputMaybe<Scalars['Int']['input']>;
  slashingPercentage_gte?: InputMaybe<Scalars['Int']['input']>;
  slashingPercentage_lte?: InputMaybe<Scalars['Int']['input']>;
  slashingPercentage_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  slashingPercentage_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  minimumDisputeDeposit?: InputMaybe<Scalars['BigInt']['input']>;
  minimumDisputeDeposit_not?: InputMaybe<Scalars['BigInt']['input']>;
  minimumDisputeDeposit_gt?: InputMaybe<Scalars['BigInt']['input']>;
  minimumDisputeDeposit_lt?: InputMaybe<Scalars['BigInt']['input']>;
  minimumDisputeDeposit_gte?: InputMaybe<Scalars['BigInt']['input']>;
  minimumDisputeDeposit_lte?: InputMaybe<Scalars['BigInt']['input']>;
  minimumDisputeDeposit_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  minimumDisputeDeposit_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fishermanRewardPercentage?: InputMaybe<Scalars['Int']['input']>;
  fishermanRewardPercentage_not?: InputMaybe<Scalars['Int']['input']>;
  fishermanRewardPercentage_gt?: InputMaybe<Scalars['Int']['input']>;
  fishermanRewardPercentage_lt?: InputMaybe<Scalars['Int']['input']>;
  fishermanRewardPercentage_gte?: InputMaybe<Scalars['Int']['input']>;
  fishermanRewardPercentage_lte?: InputMaybe<Scalars['Int']['input']>;
  fishermanRewardPercentage_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  fishermanRewardPercentage_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalGRTDeposited?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTDeposited_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTDeposited_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTDeposited_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTDeposited_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTDeposited_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTDeposited_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalGRTDeposited_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalGRTWithdrawnConfirmed?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTWithdrawnConfirmed_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTWithdrawnConfirmed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTWithdrawnConfirmed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTWithdrawnConfirmed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTWithdrawnConfirmed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTWithdrawnConfirmed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalGRTWithdrawnConfirmed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalGRTMintedFromL2?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTMintedFromL2_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTMintedFromL2_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTMintedFromL2_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTMintedFromL2_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTMintedFromL2_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTMintedFromL2_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalGRTMintedFromL2_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalGRTDepositedConfirmed?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTDepositedConfirmed_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTDepositedConfirmed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTDepositedConfirmed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTDepositedConfirmed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTDepositedConfirmed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTDepositedConfirmed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalGRTDepositedConfirmed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalGRTWithdrawn?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTWithdrawn_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTWithdrawn_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTWithdrawn_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTWithdrawn_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTWithdrawn_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalGRTWithdrawn_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalGRTWithdrawn_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentL1BlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  currentL1BlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  currentL1BlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currentL1BlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currentL1BlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currentL1BlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currentL1BlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentL1BlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<GraphNetwork_filter>>>;
  or?: InputMaybe<Array<InputMaybe<GraphNetwork_filter>>>;
};

export type GraphNetwork_orderBy =
  | 'id'
  | 'controller'
  | 'graphToken'
  | 'epochManager'
  | 'epochManagerImplementations'
  | 'curation'
  | 'curationImplementations'
  | 'staking'
  | 'stakingImplementations'
  | 'disputeManager'
  | 'gns'
  | 'serviceRegistry'
  | 'rewardsManager'
  | 'rewardsManagerImplementations'
  | 'isPaused'
  | 'isPartialPaused'
  | 'governor'
  | 'pauseGuardian'
  | 'curationPercentage'
  | 'protocolFeePercentage'
  | 'delegationRatio'
  | 'channelDisputeEpochs'
  | 'maxAllocationEpochs'
  | 'thawingPeriod'
  | 'delegationParametersCooldown'
  | 'minimumIndexerStake'
  | 'slashers'
  | 'delegationUnbondingPeriod'
  | 'rebateRatio'
  | 'rebateAlpha'
  | 'rebateLambda'
  | 'delegationTaxPercentage'
  | 'assetHolders'
  | 'totalTokensStakedTransferredToL2'
  | 'totalDelegatedTokensTransferredToL2'
  | 'totalSignalledTokensTransferredToL2'
  | 'totalTokensStaked'
  | 'totalTokensClaimable'
  | 'totalUnstakedTokensLocked'
  | 'totalTokensAllocated'
  | 'totalDelegatedTokens'
  | 'totalTokensSignalled'
  | 'totalTokensSignalledAutoMigrate'
  | 'totalTokensSignalledDirectly'
  | 'totalQueryFees'
  | 'totalIndexerQueryFeesCollected'
  | 'totalIndexerQueryFeeRebates'
  | 'totalDelegatorQueryFeeRebates'
  | 'totalCuratorQueryFees'
  | 'totalTaxedQueryFees'
  | 'totalUnclaimedQueryFeeRebates'
  | 'totalIndexingRewards'
  | 'totalIndexingDelegatorRewards'
  | 'totalIndexingIndexerRewards'
  | 'networkGRTIssuance'
  | 'networkGRTIssuancePerBlock'
  | 'subgraphAvailabilityOracle'
  | 'defaultReserveRatio'
  | 'minimumCurationDeposit'
  | 'curationTaxPercentage'
  | 'ownerTaxPercentage'
  | 'totalSupply'
  | 'GRTinUSD'
  | 'GRTinETH'
  | 'totalGRTMinted'
  | 'totalGRTBurned'
  | 'epochLength'
  | 'lastRunEpoch'
  | 'lastLengthUpdateEpoch'
  | 'lastLengthUpdateBlock'
  | 'currentEpoch'
  | 'indexerCount'
  | 'stakedIndexersCount'
  | 'delegatorCount'
  | 'activeDelegatorCount'
  | 'delegationCount'
  | 'activeDelegationCount'
  | 'curatorCount'
  | 'activeCuratorCount'
  | 'subgraphCount'
  | 'activeSubgraphCount'
  | 'subgraphDeploymentCount'
  | 'epochCount'
  | 'allocationCount'
  | 'activeAllocationCount'
  | 'arbitrator'
  | 'querySlashingPercentage'
  | 'indexingSlashingPercentage'
  | 'slashingPercentage'
  | 'minimumDisputeDeposit'
  | 'fishermanRewardPercentage'
  | 'totalGRTDeposited'
  | 'totalGRTWithdrawnConfirmed'
  | 'totalGRTMintedFromL2'
  | 'totalGRTDepositedConfirmed'
  | 'totalGRTWithdrawn'
  | 'currentL1BlockNumber';

/**
 * Meta for the Indexer along with parameters and staking data
 *
 */
export type Indexer = {
  /** Eth address of Indexer */
  id: Scalars['ID']['output'];
  /** Time this indexer was created */
  createdAt: Scalars['Int']['output'];
  /** Graph account of this indexer */
  account: GraphAccount;
  /** Service registry URL for the indexer */
  url?: Maybe<Scalars['String']['output']>;
  /** Geohash of the indexer. Shows where their indexer is located in the world */
  geoHash?: Maybe<Scalars['String']['output']>;
  /** Default display name is the current default name. Used for filtered queries */
  defaultDisplayName?: Maybe<Scalars['String']['output']>;
  /** CURRENT tokens staked in the protocol. Decreases on withdraw, not on lock */
  stakedTokens: Scalars['BigInt']['output'];
  /** CURRENT  tokens allocated on all subgraphs */
  allocatedTokens: Scalars['BigInt']['output'];
  /** NOT IMPLEMENTED - Tokens that have been unstaked and withdrawn */
  unstakedTokens: Scalars['BigInt']['output'];
  /** CURRENT tokens locked */
  lockedTokens: Scalars['BigInt']['output'];
  /** The block when the Indexers tokens unlock */
  tokensLockedUntil: Scalars['Int']['output'];
  /** Active allocations of stake for this Indexer */
  allocations: Array<Allocation>;
  /** All allocations of stake for this Indexer (i.e. closed and active) */
  totalAllocations: Array<Allocation>;
  /** Number of active allocations of stake for this Indexer */
  allocationCount: Scalars['Int']['output'];
  /** All allocations for this Indexer (i.e. closed and active) */
  totalAllocationCount: Scalars['BigInt']['output'];
  /** Total query fees collected. Includes the portion given to delegators */
  queryFeesCollected: Scalars['BigInt']['output'];
  /** Query fee rebate amount claimed from the protocol through rebates mechanism. Does not include portion given to delegators */
  queryFeeRebates: Scalars['BigInt']['output'];
  /** Total indexing rewards earned by this indexer from inflation. Including delegation rewards */
  rewardsEarned: Scalars['BigInt']['output'];
  /** The total amount of indexing rewards the indexer kept */
  indexerIndexingRewards: Scalars['BigInt']['output'];
  /** The total amount of indexing rewards given to delegators */
  delegatorIndexingRewards: Scalars['BigInt']['output'];
  /** Percentage of indexers' own rewards received in relation to its own stake. 1 (100%) means that the indexer is receiving the exact amount that is generated by his own stake */
  indexerRewardsOwnGenerationRatio: Scalars['BigDecimal']['output'];
  /** Whether the indexer has been transferred from L1 to L2 partially or fully */
  transferredToL2: Scalars['Boolean']['output'];
  /** Timestamp for the FIRST L1 -> L2 Transfer */
  firstTransferredToL2At?: Maybe<Scalars['BigInt']['output']>;
  /** Block number for the FIRST L1 -> L2 Transfer */
  firstTransferredToL2AtBlockNumber?: Maybe<Scalars['BigInt']['output']>;
  /** Transaction hash for the FIRST L1 -> L2 Transfer */
  firstTransferredToL2AtTx?: Maybe<Scalars['String']['output']>;
  /** Timestamp for the latest L1 -> L2 Transfer */
  lastTransferredToL2At?: Maybe<Scalars['BigInt']['output']>;
  /** Block number for the latest L1 -> L2 Transfer */
  lastTransferredToL2AtBlockNumber?: Maybe<Scalars['BigInt']['output']>;
  /** Transaction hash for the latest L1 -> L2 Transfer */
  lastTransferredToL2AtTx?: Maybe<Scalars['String']['output']>;
  /** Amount of GRT transferred to L2. Only visible from L1, as there's no events for it on L2 */
  stakedTokensTransferredToL2: Scalars['BigInt']['output'];
  /** ID of the indexer on L2. Null if it's not transferred */
  idOnL2?: Maybe<Scalars['String']['output']>;
  /** ID of the indexer on L1. Null if it's not transferred */
  idOnL1?: Maybe<Scalars['String']['output']>;
  /** Amount of delegated tokens that can be eligible for rewards */
  delegatedCapacity: Scalars['BigInt']['output'];
  /** Total token capacity = delegatedCapacity + stakedTokens */
  tokenCapacity: Scalars['BigInt']['output'];
  /** Stake available to earn rewards. tokenCapacity - allocationTokens - lockedTokens */
  availableStake: Scalars['BigInt']['output'];
  /** Delegators to this Indexer */
  delegators: Array<DelegatedStake>;
  /** CURRENT tokens delegated to the indexer */
  delegatedTokens: Scalars['BigInt']['output'];
  /** Ratio between the amount of the indexers own stake over the total usable stake. */
  ownStakeRatio: Scalars['BigDecimal']['output'];
  /** Ratio between the amount of delegated stake over the total usable stake. */
  delegatedStakeRatio: Scalars['BigDecimal']['output'];
  /** Total shares of the delegator pool */
  delegatorShares: Scalars['BigInt']['output'];
  /** Exchange rate of of tokens received for each share */
  delegationExchangeRate: Scalars['BigDecimal']['output'];
  /** The percent of indexing rewards generated by the total stake that the Indexer keeps for itself. In parts per million */
  indexingRewardCut: Scalars['Int']['output'];
  /** The percent of indexing rewards generated by the delegated stake that the Indexer keeps for itself */
  indexingRewardEffectiveCut: Scalars['BigDecimal']['output'];
  /** The percent of reward dilution delegators experience because of overdelegation. Overdelegated stake can't be used to generate rewards but still gets accounted while distributing the generated rewards. This causes dilution of the rewards for the rest of the pool. */
  overDelegationDilution: Scalars['BigDecimal']['output'];
  /** The total amount of query fees given to delegators */
  delegatorQueryFees: Scalars['BigInt']['output'];
  /** The percent of query rebate rewards the Indexer keeps for itself. In parts per million */
  queryFeeCut: Scalars['Int']['output'];
  /** The percent of query rebate rewards generated by the delegated stake that the Indexer keeps for itself */
  queryFeeEffectiveCut: Scalars['BigDecimal']['output'];
  /** Amount of blocks a delegator chooses for the waiting period for changing their params */
  delegatorParameterCooldown: Scalars['Int']['output'];
  /** Block number for the last time the delegator updated their parameters */
  lastDelegationParameterUpdate: Scalars['Int']['output'];
  /** Count of how many times this indexer has been forced to close an allocation */
  forcedClosures: Scalars['Int']['output'];
  /** NOT IMPLEMENTED - Total return this indexer has earned */
  totalReturn: Scalars['BigDecimal']['output'];
  /** NOT IMPLEMENTED - Annualized rate of return for the indexer */
  annualizedReturn: Scalars['BigDecimal']['output'];
  /** NOT IMPLEMENTED - Staking efficiency of the indexer */
  stakingEfficiency: Scalars['BigDecimal']['output'];
};


/**
 * Meta for the Indexer along with parameters and staking data
 *
 */
export type IndexerallocationsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Allocation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Allocation_filter>;
};


/**
 * Meta for the Indexer along with parameters and staking data
 *
 */
export type IndexertotalAllocationsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Allocation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Allocation_filter>;
};


/**
 * Meta for the Indexer along with parameters and staking data
 *
 */
export type IndexerdelegatorsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DelegatedStake_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DelegatedStake_filter>;
};

export type Indexer_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_not?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<GraphAccount_filter>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_gt?: InputMaybe<Scalars['String']['input']>;
  url_lt?: InputMaybe<Scalars['String']['input']>;
  url_gte?: InputMaybe<Scalars['String']['input']>;
  url_lte?: InputMaybe<Scalars['String']['input']>;
  url_in?: InputMaybe<Array<Scalars['String']['input']>>;
  url_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  url_starts_with?: InputMaybe<Scalars['String']['input']>;
  url_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  url_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  url_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  url_ends_with?: InputMaybe<Scalars['String']['input']>;
  url_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  url_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  url_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  geoHash?: InputMaybe<Scalars['String']['input']>;
  geoHash_not?: InputMaybe<Scalars['String']['input']>;
  geoHash_gt?: InputMaybe<Scalars['String']['input']>;
  geoHash_lt?: InputMaybe<Scalars['String']['input']>;
  geoHash_gte?: InputMaybe<Scalars['String']['input']>;
  geoHash_lte?: InputMaybe<Scalars['String']['input']>;
  geoHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  geoHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  geoHash_contains?: InputMaybe<Scalars['String']['input']>;
  geoHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  geoHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  geoHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  geoHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  geoHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  geoHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  geoHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  geoHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  geoHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  geoHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  geoHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_gt?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_lt?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_gte?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_lte?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  defaultDisplayName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  defaultDisplayName_contains?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_contains?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_starts_with?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_ends_with?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  defaultDisplayName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  stakedTokens?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stakedTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  allocatedTokens?: InputMaybe<Scalars['BigInt']['input']>;
  allocatedTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  allocatedTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  allocatedTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  allocatedTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  allocatedTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  allocatedTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  allocatedTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  unstakedTokens?: InputMaybe<Scalars['BigInt']['input']>;
  unstakedTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  unstakedTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  unstakedTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  unstakedTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  unstakedTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  unstakedTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  unstakedTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lockedTokens?: InputMaybe<Scalars['BigInt']['input']>;
  lockedTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  lockedTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lockedTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lockedTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lockedTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lockedTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lockedTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokensLockedUntil?: InputMaybe<Scalars['Int']['input']>;
  tokensLockedUntil_not?: InputMaybe<Scalars['Int']['input']>;
  tokensLockedUntil_gt?: InputMaybe<Scalars['Int']['input']>;
  tokensLockedUntil_lt?: InputMaybe<Scalars['Int']['input']>;
  tokensLockedUntil_gte?: InputMaybe<Scalars['Int']['input']>;
  tokensLockedUntil_lte?: InputMaybe<Scalars['Int']['input']>;
  tokensLockedUntil_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tokensLockedUntil_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  allocations_?: InputMaybe<Allocation_filter>;
  totalAllocations_?: InputMaybe<Allocation_filter>;
  allocationCount?: InputMaybe<Scalars['Int']['input']>;
  allocationCount_not?: InputMaybe<Scalars['Int']['input']>;
  allocationCount_gt?: InputMaybe<Scalars['Int']['input']>;
  allocationCount_lt?: InputMaybe<Scalars['Int']['input']>;
  allocationCount_gte?: InputMaybe<Scalars['Int']['input']>;
  allocationCount_lte?: InputMaybe<Scalars['Int']['input']>;
  allocationCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  allocationCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalAllocationCount?: InputMaybe<Scalars['BigInt']['input']>;
  totalAllocationCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalAllocationCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalAllocationCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalAllocationCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalAllocationCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalAllocationCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAllocationCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queryFeesCollected?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_not?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_gt?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_lt?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_gte?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_lte?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesCollected_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queryFeesCollected_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queryFeeRebates?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_not?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_gt?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_lt?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_gte?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_lte?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queryFeeRebates_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rewardsEarned?: InputMaybe<Scalars['BigInt']['input']>;
  rewardsEarned_not?: InputMaybe<Scalars['BigInt']['input']>;
  rewardsEarned_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rewardsEarned_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rewardsEarned_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rewardsEarned_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rewardsEarned_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rewardsEarned_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  indexerIndexingRewards?: InputMaybe<Scalars['BigInt']['input']>;
  indexerIndexingRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  indexerIndexingRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  indexerIndexingRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  indexerIndexingRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  indexerIndexingRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  indexerIndexingRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  indexerIndexingRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegatorIndexingRewards?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorIndexingRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorIndexingRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorIndexingRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorIndexingRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorIndexingRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorIndexingRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegatorIndexingRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  indexerRewardsOwnGenerationRatio?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexerRewardsOwnGenerationRatio_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexerRewardsOwnGenerationRatio_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexerRewardsOwnGenerationRatio_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexerRewardsOwnGenerationRatio_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexerRewardsOwnGenerationRatio_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexerRewardsOwnGenerationRatio_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  indexerRewardsOwnGenerationRatio_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  transferredToL2?: InputMaybe<Scalars['Boolean']['input']>;
  transferredToL2_not?: InputMaybe<Scalars['Boolean']['input']>;
  transferredToL2_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  transferredToL2_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  firstTransferredToL2At?: InputMaybe<Scalars['BigInt']['input']>;
  firstTransferredToL2At_not?: InputMaybe<Scalars['BigInt']['input']>;
  firstTransferredToL2At_gt?: InputMaybe<Scalars['BigInt']['input']>;
  firstTransferredToL2At_lt?: InputMaybe<Scalars['BigInt']['input']>;
  firstTransferredToL2At_gte?: InputMaybe<Scalars['BigInt']['input']>;
  firstTransferredToL2At_lte?: InputMaybe<Scalars['BigInt']['input']>;
  firstTransferredToL2At_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  firstTransferredToL2At_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  firstTransferredToL2AtBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  firstTransferredToL2AtBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  firstTransferredToL2AtBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  firstTransferredToL2AtBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  firstTransferredToL2AtBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  firstTransferredToL2AtBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  firstTransferredToL2AtBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  firstTransferredToL2AtBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  firstTransferredToL2AtTx?: InputMaybe<Scalars['String']['input']>;
  firstTransferredToL2AtTx_not?: InputMaybe<Scalars['String']['input']>;
  firstTransferredToL2AtTx_gt?: InputMaybe<Scalars['String']['input']>;
  firstTransferredToL2AtTx_lt?: InputMaybe<Scalars['String']['input']>;
  firstTransferredToL2AtTx_gte?: InputMaybe<Scalars['String']['input']>;
  firstTransferredToL2AtTx_lte?: InputMaybe<Scalars['String']['input']>;
  firstTransferredToL2AtTx_in?: InputMaybe<Array<Scalars['String']['input']>>;
  firstTransferredToL2AtTx_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  firstTransferredToL2AtTx_contains?: InputMaybe<Scalars['String']['input']>;
  firstTransferredToL2AtTx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  firstTransferredToL2AtTx_not_contains?: InputMaybe<Scalars['String']['input']>;
  firstTransferredToL2AtTx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  firstTransferredToL2AtTx_starts_with?: InputMaybe<Scalars['String']['input']>;
  firstTransferredToL2AtTx_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  firstTransferredToL2AtTx_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  firstTransferredToL2AtTx_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  firstTransferredToL2AtTx_ends_with?: InputMaybe<Scalars['String']['input']>;
  firstTransferredToL2AtTx_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  firstTransferredToL2AtTx_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  firstTransferredToL2AtTx_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2At?: InputMaybe<Scalars['BigInt']['input']>;
  lastTransferredToL2At_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastTransferredToL2At_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastTransferredToL2At_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastTransferredToL2At_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastTransferredToL2At_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastTransferredToL2At_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastTransferredToL2At_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastTransferredToL2AtBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  lastTransferredToL2AtBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastTransferredToL2AtBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastTransferredToL2AtBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastTransferredToL2AtBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastTransferredToL2AtBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastTransferredToL2AtBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastTransferredToL2AtBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastTransferredToL2AtTx?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2AtTx_not?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2AtTx_gt?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2AtTx_lt?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2AtTx_gte?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2AtTx_lte?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2AtTx_in?: InputMaybe<Array<Scalars['String']['input']>>;
  lastTransferredToL2AtTx_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  lastTransferredToL2AtTx_contains?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2AtTx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2AtTx_not_contains?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2AtTx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2AtTx_starts_with?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2AtTx_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2AtTx_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2AtTx_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2AtTx_ends_with?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2AtTx_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2AtTx_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  lastTransferredToL2AtTx_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  stakedTokensTransferredToL2?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokensTransferredToL2_not?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokensTransferredToL2_gt?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokensTransferredToL2_lt?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokensTransferredToL2_gte?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokensTransferredToL2_lte?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokensTransferredToL2_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stakedTokensTransferredToL2_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  idOnL2?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not?: InputMaybe<Scalars['String']['input']>;
  idOnL2_gt?: InputMaybe<Scalars['String']['input']>;
  idOnL2_lt?: InputMaybe<Scalars['String']['input']>;
  idOnL2_gte?: InputMaybe<Scalars['String']['input']>;
  idOnL2_lte?: InputMaybe<Scalars['String']['input']>;
  idOnL2_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idOnL2_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idOnL2_contains?: InputMaybe<Scalars['String']['input']>;
  idOnL2_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_contains?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_starts_with?: InputMaybe<Scalars['String']['input']>;
  idOnL2_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_ends_with?: InputMaybe<Scalars['String']['input']>;
  idOnL2_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not?: InputMaybe<Scalars['String']['input']>;
  idOnL1_gt?: InputMaybe<Scalars['String']['input']>;
  idOnL1_lt?: InputMaybe<Scalars['String']['input']>;
  idOnL1_gte?: InputMaybe<Scalars['String']['input']>;
  idOnL1_lte?: InputMaybe<Scalars['String']['input']>;
  idOnL1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idOnL1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idOnL1_contains?: InputMaybe<Scalars['String']['input']>;
  idOnL1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_contains?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_starts_with?: InputMaybe<Scalars['String']['input']>;
  idOnL1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_ends_with?: InputMaybe<Scalars['String']['input']>;
  idOnL1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegatedCapacity?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedCapacity_not?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedCapacity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedCapacity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedCapacity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedCapacity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedCapacity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegatedCapacity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenCapacity?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCapacity_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCapacity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCapacity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCapacity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCapacity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenCapacity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenCapacity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  availableStake?: InputMaybe<Scalars['BigInt']['input']>;
  availableStake_not?: InputMaybe<Scalars['BigInt']['input']>;
  availableStake_gt?: InputMaybe<Scalars['BigInt']['input']>;
  availableStake_lt?: InputMaybe<Scalars['BigInt']['input']>;
  availableStake_gte?: InputMaybe<Scalars['BigInt']['input']>;
  availableStake_lte?: InputMaybe<Scalars['BigInt']['input']>;
  availableStake_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  availableStake_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegators_?: InputMaybe<DelegatedStake_filter>;
  delegatedTokens?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegatedTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ownStakeRatio?: InputMaybe<Scalars['BigDecimal']['input']>;
  ownStakeRatio_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  ownStakeRatio_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  ownStakeRatio_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  ownStakeRatio_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  ownStakeRatio_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  ownStakeRatio_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  ownStakeRatio_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  delegatedStakeRatio?: InputMaybe<Scalars['BigDecimal']['input']>;
  delegatedStakeRatio_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  delegatedStakeRatio_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  delegatedStakeRatio_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  delegatedStakeRatio_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  delegatedStakeRatio_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  delegatedStakeRatio_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  delegatedStakeRatio_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  delegatorShares?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorShares_not?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorShares_gt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorShares_lt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorShares_gte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorShares_lte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorShares_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegatorShares_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegationExchangeRate?: InputMaybe<Scalars['BigDecimal']['input']>;
  delegationExchangeRate_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  delegationExchangeRate_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  delegationExchangeRate_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  delegationExchangeRate_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  delegationExchangeRate_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  delegationExchangeRate_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  delegationExchangeRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  indexingRewardCut?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCut_not?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCut_gt?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCut_lt?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCut_gte?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCut_lte?: InputMaybe<Scalars['Int']['input']>;
  indexingRewardCut_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  indexingRewardCut_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  indexingRewardEffectiveCut?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCut_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCut_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCut_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCut_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCut_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  indexingRewardEffectiveCut_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  indexingRewardEffectiveCut_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  overDelegationDilution?: InputMaybe<Scalars['BigDecimal']['input']>;
  overDelegationDilution_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  overDelegationDilution_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  overDelegationDilution_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  overDelegationDilution_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  overDelegationDilution_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  overDelegationDilution_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  overDelegationDilution_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  delegatorQueryFees?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorQueryFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorQueryFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorQueryFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorQueryFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorQueryFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatorQueryFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegatorQueryFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queryFeeCut?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCut_not?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCut_gt?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCut_lt?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCut_gte?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCut_lte?: InputMaybe<Scalars['Int']['input']>;
  queryFeeCut_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  queryFeeCut_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  queryFeeEffectiveCut?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCut_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCut_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCut_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCut_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCut_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  queryFeeEffectiveCut_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  queryFeeEffectiveCut_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  delegatorParameterCooldown?: InputMaybe<Scalars['Int']['input']>;
  delegatorParameterCooldown_not?: InputMaybe<Scalars['Int']['input']>;
  delegatorParameterCooldown_gt?: InputMaybe<Scalars['Int']['input']>;
  delegatorParameterCooldown_lt?: InputMaybe<Scalars['Int']['input']>;
  delegatorParameterCooldown_gte?: InputMaybe<Scalars['Int']['input']>;
  delegatorParameterCooldown_lte?: InputMaybe<Scalars['Int']['input']>;
  delegatorParameterCooldown_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegatorParameterCooldown_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastDelegationParameterUpdate?: InputMaybe<Scalars['Int']['input']>;
  lastDelegationParameterUpdate_not?: InputMaybe<Scalars['Int']['input']>;
  lastDelegationParameterUpdate_gt?: InputMaybe<Scalars['Int']['input']>;
  lastDelegationParameterUpdate_lt?: InputMaybe<Scalars['Int']['input']>;
  lastDelegationParameterUpdate_gte?: InputMaybe<Scalars['Int']['input']>;
  lastDelegationParameterUpdate_lte?: InputMaybe<Scalars['Int']['input']>;
  lastDelegationParameterUpdate_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastDelegationParameterUpdate_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  forcedClosures?: InputMaybe<Scalars['Int']['input']>;
  forcedClosures_not?: InputMaybe<Scalars['Int']['input']>;
  forcedClosures_gt?: InputMaybe<Scalars['Int']['input']>;
  forcedClosures_lt?: InputMaybe<Scalars['Int']['input']>;
  forcedClosures_gte?: InputMaybe<Scalars['Int']['input']>;
  forcedClosures_lte?: InputMaybe<Scalars['Int']['input']>;
  forcedClosures_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  forcedClosures_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalReturn?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReturn_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalReturn_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  annualizedReturn?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  annualizedReturn_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  annualizedReturn_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  stakingEfficiency?: InputMaybe<Scalars['BigDecimal']['input']>;
  stakingEfficiency_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  stakingEfficiency_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  stakingEfficiency_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  stakingEfficiency_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  stakingEfficiency_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  stakingEfficiency_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  stakingEfficiency_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Indexer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Indexer_filter>>>;
};

export type Indexer_orderBy =
  | 'id'
  | 'createdAt'
  | 'account'
  | 'account__id'
  | 'account__createdAt'
  | 'account__defaultDisplayName'
  | 'account__balance'
  | 'account__balanceReceivedFromL1Signalling'
  | 'account__balanceReceivedFromL1Delegation'
  | 'account__curationApproval'
  | 'account__stakingApproval'
  | 'account__gnsApproval'
  | 'account__developerCreatedAt'
  | 'account__subgraphQueryFees'
  | 'url'
  | 'geoHash'
  | 'defaultDisplayName'
  | 'stakedTokens'
  | 'allocatedTokens'
  | 'unstakedTokens'
  | 'lockedTokens'
  | 'tokensLockedUntil'
  | 'allocations'
  | 'totalAllocations'
  | 'allocationCount'
  | 'totalAllocationCount'
  | 'queryFeesCollected'
  | 'queryFeeRebates'
  | 'rewardsEarned'
  | 'indexerIndexingRewards'
  | 'delegatorIndexingRewards'
  | 'indexerRewardsOwnGenerationRatio'
  | 'transferredToL2'
  | 'firstTransferredToL2At'
  | 'firstTransferredToL2AtBlockNumber'
  | 'firstTransferredToL2AtTx'
  | 'lastTransferredToL2At'
  | 'lastTransferredToL2AtBlockNumber'
  | 'lastTransferredToL2AtTx'
  | 'stakedTokensTransferredToL2'
  | 'idOnL2'
  | 'idOnL1'
  | 'delegatedCapacity'
  | 'tokenCapacity'
  | 'availableStake'
  | 'delegators'
  | 'delegatedTokens'
  | 'ownStakeRatio'
  | 'delegatedStakeRatio'
  | 'delegatorShares'
  | 'delegationExchangeRate'
  | 'indexingRewardCut'
  | 'indexingRewardEffectiveCut'
  | 'overDelegationDilution'
  | 'delegatorQueryFees'
  | 'queryFeeCut'
  | 'queryFeeEffectiveCut'
  | 'delegatorParameterCooldown'
  | 'lastDelegationParameterUpdate'
  | 'forcedClosures'
  | 'totalReturn'
  | 'annualizedReturn'
  | 'stakingEfficiency';

/**
 * Curator Name Signal for a single Subgraph
 *
 */
export type NameSignal = {
  /** Eth address + subgraph ID */
  id: Scalars['ID']['output'];
  /** Eth address of the curator */
  curator: Curator;
  /** Subgraph being signalled */
  subgraph: Subgraph;
  /** CUMULATIVE number of tokens the curator has signalled */
  signalledTokens: Scalars['BigInt']['output'];
  /** CUMULATIVE number of tokens the curator has unsignalled */
  unsignalledTokens: Scalars['BigInt']['output'];
  /** Tokens the curator has withdrawn from a deprecated name curve */
  withdrawnTokens: Scalars['BigInt']['output'];
  /** Shares of the name pool (GNS) that the curator has from signaling their GRT */
  nameSignal: Scalars['BigInt']['output'];
  /** Actual signal shares that the name pool minted with the GRT provided by the curator */
  signal: Scalars['BigDecimal']['output'];
  /** Amount of GRT transferred to L2 */
  signalledTokensSentToL2: Scalars['BigInt']['output'];
  /** Amount of GRT received on L2 */
  signalledTokensReceivedOnL2: Scalars['BigInt']['output'];
  /** Whether the name signal has been transferred from L1 to L2. Only applies to NameSignals that have been transferred, native L2 NameSignal entities will return false */
  transferredToL2: Scalars['Boolean']['output'];
  /** Timestamp for the L1 -> L2 Transfer. */
  transferredToL2At?: Maybe<Scalars['BigInt']['output']>;
  /** Block number for the L1 -> L2 Transfer. */
  transferredToL2AtBlockNumber?: Maybe<Scalars['BigInt']['output']>;
  /** Transaction hash for the L1 -> L2 Transfer. */
  transferredToL2AtTx?: Maybe<Scalars['String']['output']>;
  /** ID of the NameSignal entity on L2. Null if it's not transferred */
  idOnL2?: Maybe<Scalars['String']['output']>;
  /** ID of the NameSignal entity on L1. Null if it's not transferred */
  idOnL1?: Maybe<Scalars['String']['output']>;
  /** Block for which the curator last entered or exited the curve */
  lastNameSignalChange: Scalars['Int']['output'];
  /** Summation of realized rewards from before the last time the curator entered the curation curve */
  realizedRewards: Scalars['BigInt']['output'];
  /** [DEPRECATED] Curator average cost basis for this name signal on this subgraph. New field for further versions will be nameSignalAverageCostBasis */
  averageCostBasis: Scalars['BigDecimal']['output'];
  /** [DEPRECATED] nameSignalAverageCostBasis / nameSignal. New field for further versions will be nameSignalAverageCostBasisPerSignal */
  averageCostBasisPerSignal: Scalars['BigDecimal']['output'];
  /** Curator average cost basis for this name signal on this subgraph */
  nameSignalAverageCostBasis: Scalars['BigDecimal']['output'];
  /** nameSignalAverageCostBasis / nameSignal */
  nameSignalAverageCostBasisPerSignal: Scalars['BigDecimal']['output'];
  /** Curator average cost basis for the version signal on this subgraph name pool */
  signalAverageCostBasis: Scalars['BigDecimal']['output'];
  /** signalAverageCostBasis / signal */
  signalAverageCostBasisPerSignal: Scalars['BigDecimal']['output'];
  entityVersion: Scalars['Int']['output'];
  /** [DEPRECATED] Used for duplicate entities to enable old IDs from before the subgraph NFT update */
  linkedEntity?: Maybe<NameSignal>;
};

/**
 * Auxiliary entity to be able to batch update NameSignal entities
 *
 */
export type NameSignalSubgraphRelation = {
  /** Subgraph ID + index */
  id: Scalars['ID']['output'];
  nameSignal: NameSignal;
  subgraph: Subgraph;
};

export type NameSignalSubgraphRelation_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  nameSignal?: InputMaybe<Scalars['String']['input']>;
  nameSignal_not?: InputMaybe<Scalars['String']['input']>;
  nameSignal_gt?: InputMaybe<Scalars['String']['input']>;
  nameSignal_lt?: InputMaybe<Scalars['String']['input']>;
  nameSignal_gte?: InputMaybe<Scalars['String']['input']>;
  nameSignal_lte?: InputMaybe<Scalars['String']['input']>;
  nameSignal_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nameSignal_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nameSignal_contains?: InputMaybe<Scalars['String']['input']>;
  nameSignal_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nameSignal_not_contains?: InputMaybe<Scalars['String']['input']>;
  nameSignal_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nameSignal_starts_with?: InputMaybe<Scalars['String']['input']>;
  nameSignal_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nameSignal_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  nameSignal_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nameSignal_ends_with?: InputMaybe<Scalars['String']['input']>;
  nameSignal_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nameSignal_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  nameSignal_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nameSignal_?: InputMaybe<NameSignal_filter>;
  subgraph?: InputMaybe<Scalars['String']['input']>;
  subgraph_not?: InputMaybe<Scalars['String']['input']>;
  subgraph_gt?: InputMaybe<Scalars['String']['input']>;
  subgraph_lt?: InputMaybe<Scalars['String']['input']>;
  subgraph_gte?: InputMaybe<Scalars['String']['input']>;
  subgraph_lte?: InputMaybe<Scalars['String']['input']>;
  subgraph_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraph_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraph_contains?: InputMaybe<Scalars['String']['input']>;
  subgraph_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_contains?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_?: InputMaybe<Subgraph_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NameSignalSubgraphRelation_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NameSignalSubgraphRelation_filter>>>;
};

export type NameSignalSubgraphRelation_orderBy =
  | 'id'
  | 'nameSignal'
  | 'nameSignal__id'
  | 'nameSignal__signalledTokens'
  | 'nameSignal__unsignalledTokens'
  | 'nameSignal__withdrawnTokens'
  | 'nameSignal__nameSignal'
  | 'nameSignal__signal'
  | 'nameSignal__signalledTokensSentToL2'
  | 'nameSignal__signalledTokensReceivedOnL2'
  | 'nameSignal__transferredToL2'
  | 'nameSignal__transferredToL2At'
  | 'nameSignal__transferredToL2AtBlockNumber'
  | 'nameSignal__transferredToL2AtTx'
  | 'nameSignal__idOnL2'
  | 'nameSignal__idOnL1'
  | 'nameSignal__lastNameSignalChange'
  | 'nameSignal__realizedRewards'
  | 'nameSignal__averageCostBasis'
  | 'nameSignal__averageCostBasisPerSignal'
  | 'nameSignal__nameSignalAverageCostBasis'
  | 'nameSignal__nameSignalAverageCostBasisPerSignal'
  | 'nameSignal__signalAverageCostBasis'
  | 'nameSignal__signalAverageCostBasisPerSignal'
  | 'nameSignal__entityVersion'
  | 'subgraph'
  | 'subgraph__id'
  | 'subgraph__versionCount'
  | 'subgraph__createdAt'
  | 'subgraph__updatedAt'
  | 'subgraph__active'
  | 'subgraph__migrated'
  | 'subgraph__startedTransferToL2'
  | 'subgraph__startedTransferToL2At'
  | 'subgraph__startedTransferToL2AtBlockNumber'
  | 'subgraph__startedTransferToL2AtTx'
  | 'subgraph__transferredToL2'
  | 'subgraph__transferredToL2At'
  | 'subgraph__transferredToL2AtBlockNumber'
  | 'subgraph__transferredToL2AtTx'
  | 'subgraph__signalledTokensSentToL2'
  | 'subgraph__signalledTokensReceivedOnL2'
  | 'subgraph__idOnL2'
  | 'subgraph__idOnL1'
  | 'subgraph__nftID'
  | 'subgraph__oldID'
  | 'subgraph__creatorAddress'
  | 'subgraph__subgraphNumber'
  | 'subgraph__initializing'
  | 'subgraph__entityVersion'
  | 'subgraph__signalledTokens'
  | 'subgraph__unsignalledTokens'
  | 'subgraph__currentSignalledTokens'
  | 'subgraph__nameSignalAmount'
  | 'subgraph__signalAmount'
  | 'subgraph__reserveRatio'
  | 'subgraph__withdrawableTokens'
  | 'subgraph__withdrawnTokens'
  | 'subgraph__nameSignalCount'
  | 'subgraph__metadataHash';

/**
 * All relevant data for a Name Signal Transaction in The Graph Network
 *
 */
export type NameSignalTransaction = Transaction & {
  id: Scalars['ID']['output'];
  blockNumber: Scalars['Int']['output'];
  timestamp: Scalars['Int']['output'];
  signer: GraphAccount;
  type: TransactionType;
  /** Amount of name signal updated */
  nameSignal: Scalars['BigInt']['output'];
  /** Amount of version signal updated */
  versionSignal: Scalars['BigInt']['output'];
  /** Tokens used */
  tokens: Scalars['BigInt']['output'];
  /** Subgraph where name signal was updated */
  subgraph: Subgraph;
};

export type NameSignalTransaction_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  timestamp_not?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_lt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  signer?: InputMaybe<Scalars['String']['input']>;
  signer_not?: InputMaybe<Scalars['String']['input']>;
  signer_gt?: InputMaybe<Scalars['String']['input']>;
  signer_lt?: InputMaybe<Scalars['String']['input']>;
  signer_gte?: InputMaybe<Scalars['String']['input']>;
  signer_lte?: InputMaybe<Scalars['String']['input']>;
  signer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signer_contains?: InputMaybe<Scalars['String']['input']>;
  signer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_not_contains?: InputMaybe<Scalars['String']['input']>;
  signer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_starts_with?: InputMaybe<Scalars['String']['input']>;
  signer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  signer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_ends_with?: InputMaybe<Scalars['String']['input']>;
  signer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  signer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_?: InputMaybe<GraphAccount_filter>;
  type?: InputMaybe<TransactionType>;
  type_not?: InputMaybe<TransactionType>;
  type_in?: InputMaybe<Array<TransactionType>>;
  type_not_in?: InputMaybe<Array<TransactionType>>;
  nameSignal?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignal_not?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignal_gt?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignal_lt?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignal_gte?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignal_lte?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignal_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nameSignal_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  versionSignal?: InputMaybe<Scalars['BigInt']['input']>;
  versionSignal_not?: InputMaybe<Scalars['BigInt']['input']>;
  versionSignal_gt?: InputMaybe<Scalars['BigInt']['input']>;
  versionSignal_lt?: InputMaybe<Scalars['BigInt']['input']>;
  versionSignal_gte?: InputMaybe<Scalars['BigInt']['input']>;
  versionSignal_lte?: InputMaybe<Scalars['BigInt']['input']>;
  versionSignal_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  versionSignal_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokens?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  subgraph?: InputMaybe<Scalars['String']['input']>;
  subgraph_not?: InputMaybe<Scalars['String']['input']>;
  subgraph_gt?: InputMaybe<Scalars['String']['input']>;
  subgraph_lt?: InputMaybe<Scalars['String']['input']>;
  subgraph_gte?: InputMaybe<Scalars['String']['input']>;
  subgraph_lte?: InputMaybe<Scalars['String']['input']>;
  subgraph_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraph_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraph_contains?: InputMaybe<Scalars['String']['input']>;
  subgraph_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_contains?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_?: InputMaybe<Subgraph_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NameSignalTransaction_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NameSignalTransaction_filter>>>;
};

export type NameSignalTransaction_orderBy =
  | 'id'
  | 'blockNumber'
  | 'timestamp'
  | 'signer'
  | 'signer__id'
  | 'signer__createdAt'
  | 'signer__defaultDisplayName'
  | 'signer__balance'
  | 'signer__balanceReceivedFromL1Signalling'
  | 'signer__balanceReceivedFromL1Delegation'
  | 'signer__curationApproval'
  | 'signer__stakingApproval'
  | 'signer__gnsApproval'
  | 'signer__developerCreatedAt'
  | 'signer__subgraphQueryFees'
  | 'type'
  | 'nameSignal'
  | 'versionSignal'
  | 'tokens'
  | 'subgraph'
  | 'subgraph__id'
  | 'subgraph__versionCount'
  | 'subgraph__createdAt'
  | 'subgraph__updatedAt'
  | 'subgraph__active'
  | 'subgraph__migrated'
  | 'subgraph__startedTransferToL2'
  | 'subgraph__startedTransferToL2At'
  | 'subgraph__startedTransferToL2AtBlockNumber'
  | 'subgraph__startedTransferToL2AtTx'
  | 'subgraph__transferredToL2'
  | 'subgraph__transferredToL2At'
  | 'subgraph__transferredToL2AtBlockNumber'
  | 'subgraph__transferredToL2AtTx'
  | 'subgraph__signalledTokensSentToL2'
  | 'subgraph__signalledTokensReceivedOnL2'
  | 'subgraph__idOnL2'
  | 'subgraph__idOnL1'
  | 'subgraph__nftID'
  | 'subgraph__oldID'
  | 'subgraph__creatorAddress'
  | 'subgraph__subgraphNumber'
  | 'subgraph__initializing'
  | 'subgraph__entityVersion'
  | 'subgraph__signalledTokens'
  | 'subgraph__unsignalledTokens'
  | 'subgraph__currentSignalledTokens'
  | 'subgraph__nameSignalAmount'
  | 'subgraph__signalAmount'
  | 'subgraph__reserveRatio'
  | 'subgraph__withdrawableTokens'
  | 'subgraph__withdrawnTokens'
  | 'subgraph__nameSignalCount'
  | 'subgraph__metadataHash';

export type NameSignal_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  curator?: InputMaybe<Scalars['String']['input']>;
  curator_not?: InputMaybe<Scalars['String']['input']>;
  curator_gt?: InputMaybe<Scalars['String']['input']>;
  curator_lt?: InputMaybe<Scalars['String']['input']>;
  curator_gte?: InputMaybe<Scalars['String']['input']>;
  curator_lte?: InputMaybe<Scalars['String']['input']>;
  curator_in?: InputMaybe<Array<Scalars['String']['input']>>;
  curator_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  curator_contains?: InputMaybe<Scalars['String']['input']>;
  curator_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_not_contains?: InputMaybe<Scalars['String']['input']>;
  curator_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_starts_with?: InputMaybe<Scalars['String']['input']>;
  curator_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  curator_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_ends_with?: InputMaybe<Scalars['String']['input']>;
  curator_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  curator_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_?: InputMaybe<Curator_filter>;
  subgraph?: InputMaybe<Scalars['String']['input']>;
  subgraph_not?: InputMaybe<Scalars['String']['input']>;
  subgraph_gt?: InputMaybe<Scalars['String']['input']>;
  subgraph_lt?: InputMaybe<Scalars['String']['input']>;
  subgraph_gte?: InputMaybe<Scalars['String']['input']>;
  subgraph_lte?: InputMaybe<Scalars['String']['input']>;
  subgraph_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraph_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraph_contains?: InputMaybe<Scalars['String']['input']>;
  subgraph_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_contains?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_?: InputMaybe<Subgraph_filter>;
  signalledTokens?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalledTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  unsignalledTokens?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  unsignalledTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawnTokens?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawnTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nameSignal?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignal_not?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignal_gt?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignal_lt?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignal_gte?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignal_lte?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignal_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nameSignal_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signal?: InputMaybe<Scalars['BigDecimal']['input']>;
  signal_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  signal_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  signal_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  signal_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  signal_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  signal_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  signal_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  signalledTokensSentToL2?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_not?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_gt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_lt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_gte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_lte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalledTokensSentToL2_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalledTokensReceivedOnL2?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_not?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_gt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_lt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_gte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_lte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalledTokensReceivedOnL2_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferredToL2?: InputMaybe<Scalars['Boolean']['input']>;
  transferredToL2_not?: InputMaybe<Scalars['Boolean']['input']>;
  transferredToL2_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  transferredToL2_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  transferredToL2At?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_not?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_gt?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_lt?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_gte?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_lte?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferredToL2At_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferredToL2AtBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferredToL2AtBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferredToL2AtTx?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_gt?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_lt?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_gte?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_lte?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transferredToL2AtTx_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transferredToL2AtTx_contains?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_contains?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_starts_with?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_ends_with?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not?: InputMaybe<Scalars['String']['input']>;
  idOnL2_gt?: InputMaybe<Scalars['String']['input']>;
  idOnL2_lt?: InputMaybe<Scalars['String']['input']>;
  idOnL2_gte?: InputMaybe<Scalars['String']['input']>;
  idOnL2_lte?: InputMaybe<Scalars['String']['input']>;
  idOnL2_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idOnL2_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idOnL2_contains?: InputMaybe<Scalars['String']['input']>;
  idOnL2_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_contains?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_starts_with?: InputMaybe<Scalars['String']['input']>;
  idOnL2_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_ends_with?: InputMaybe<Scalars['String']['input']>;
  idOnL2_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not?: InputMaybe<Scalars['String']['input']>;
  idOnL1_gt?: InputMaybe<Scalars['String']['input']>;
  idOnL1_lt?: InputMaybe<Scalars['String']['input']>;
  idOnL1_gte?: InputMaybe<Scalars['String']['input']>;
  idOnL1_lte?: InputMaybe<Scalars['String']['input']>;
  idOnL1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idOnL1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idOnL1_contains?: InputMaybe<Scalars['String']['input']>;
  idOnL1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_contains?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_starts_with?: InputMaybe<Scalars['String']['input']>;
  idOnL1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_ends_with?: InputMaybe<Scalars['String']['input']>;
  idOnL1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  lastNameSignalChange?: InputMaybe<Scalars['Int']['input']>;
  lastNameSignalChange_not?: InputMaybe<Scalars['Int']['input']>;
  lastNameSignalChange_gt?: InputMaybe<Scalars['Int']['input']>;
  lastNameSignalChange_lt?: InputMaybe<Scalars['Int']['input']>;
  lastNameSignalChange_gte?: InputMaybe<Scalars['Int']['input']>;
  lastNameSignalChange_lte?: InputMaybe<Scalars['Int']['input']>;
  lastNameSignalChange_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastNameSignalChange_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  realizedRewards?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  realizedRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  averageCostBasis?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasis_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasis_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasis_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasis_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasis_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasis_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  averageCostBasis_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  averageCostBasisPerSignal?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasisPerSignal_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasisPerSignal_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasisPerSignal_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasisPerSignal_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasisPerSignal_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasisPerSignal_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  averageCostBasisPerSignal_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  nameSignalAverageCostBasis?: InputMaybe<Scalars['BigDecimal']['input']>;
  nameSignalAverageCostBasis_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  nameSignalAverageCostBasis_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  nameSignalAverageCostBasis_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  nameSignalAverageCostBasis_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  nameSignalAverageCostBasis_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  nameSignalAverageCostBasis_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  nameSignalAverageCostBasis_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  nameSignalAverageCostBasisPerSignal?: InputMaybe<Scalars['BigDecimal']['input']>;
  nameSignalAverageCostBasisPerSignal_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  nameSignalAverageCostBasisPerSignal_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  nameSignalAverageCostBasisPerSignal_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  nameSignalAverageCostBasisPerSignal_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  nameSignalAverageCostBasisPerSignal_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  nameSignalAverageCostBasisPerSignal_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  nameSignalAverageCostBasisPerSignal_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  signalAverageCostBasis?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalAverageCostBasis_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalAverageCostBasis_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalAverageCostBasis_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalAverageCostBasis_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalAverageCostBasis_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalAverageCostBasis_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  signalAverageCostBasis_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  signalAverageCostBasisPerSignal?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalAverageCostBasisPerSignal_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalAverageCostBasisPerSignal_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalAverageCostBasisPerSignal_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalAverageCostBasisPerSignal_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalAverageCostBasisPerSignal_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  signalAverageCostBasisPerSignal_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  signalAverageCostBasisPerSignal_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  entityVersion?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_not?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_gt?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_lt?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_gte?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_lte?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  entityVersion_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  linkedEntity?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_gt?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_lt?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_gte?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_lte?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_in?: InputMaybe<Array<Scalars['String']['input']>>;
  linkedEntity_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  linkedEntity_contains?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_contains?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_starts_with?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_ends_with?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_?: InputMaybe<NameSignal_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NameSignal_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NameSignal_filter>>>;
};

export type NameSignal_orderBy =
  | 'id'
  | 'curator'
  | 'curator__id'
  | 'curator__createdAt'
  | 'curator__totalSignalledTokens'
  | 'curator__totalUnsignalledTokens'
  | 'curator__defaultDisplayName'
  | 'curator__totalNameSignalledTokens'
  | 'curator__totalNameUnsignalledTokens'
  | 'curator__totalWithdrawnTokens'
  | 'curator__realizedRewards'
  | 'curator__annualizedReturn'
  | 'curator__totalReturn'
  | 'curator__signalingEfficiency'
  | 'curator__totalNameSignal'
  | 'curator__totalNameSignalAverageCostBasis'
  | 'curator__totalAverageCostBasisPerNameSignal'
  | 'curator__totalSignal'
  | 'curator__totalSignalAverageCostBasis'
  | 'curator__totalAverageCostBasisPerSignal'
  | 'curator__signalCount'
  | 'curator__activeSignalCount'
  | 'curator__nameSignalCount'
  | 'curator__activeNameSignalCount'
  | 'curator__combinedSignalCount'
  | 'curator__activeCombinedSignalCount'
  | 'subgraph'
  | 'subgraph__id'
  | 'subgraph__versionCount'
  | 'subgraph__createdAt'
  | 'subgraph__updatedAt'
  | 'subgraph__active'
  | 'subgraph__migrated'
  | 'subgraph__startedTransferToL2'
  | 'subgraph__startedTransferToL2At'
  | 'subgraph__startedTransferToL2AtBlockNumber'
  | 'subgraph__startedTransferToL2AtTx'
  | 'subgraph__transferredToL2'
  | 'subgraph__transferredToL2At'
  | 'subgraph__transferredToL2AtBlockNumber'
  | 'subgraph__transferredToL2AtTx'
  | 'subgraph__signalledTokensSentToL2'
  | 'subgraph__signalledTokensReceivedOnL2'
  | 'subgraph__idOnL2'
  | 'subgraph__idOnL1'
  | 'subgraph__nftID'
  | 'subgraph__oldID'
  | 'subgraph__creatorAddress'
  | 'subgraph__subgraphNumber'
  | 'subgraph__initializing'
  | 'subgraph__entityVersion'
  | 'subgraph__signalledTokens'
  | 'subgraph__unsignalledTokens'
  | 'subgraph__currentSignalledTokens'
  | 'subgraph__nameSignalAmount'
  | 'subgraph__signalAmount'
  | 'subgraph__reserveRatio'
  | 'subgraph__withdrawableTokens'
  | 'subgraph__withdrawnTokens'
  | 'subgraph__nameSignalCount'
  | 'subgraph__metadataHash'
  | 'signalledTokens'
  | 'unsignalledTokens'
  | 'withdrawnTokens'
  | 'nameSignal'
  | 'signal'
  | 'signalledTokensSentToL2'
  | 'signalledTokensReceivedOnL2'
  | 'transferredToL2'
  | 'transferredToL2At'
  | 'transferredToL2AtBlockNumber'
  | 'transferredToL2AtTx'
  | 'idOnL2'
  | 'idOnL1'
  | 'lastNameSignalChange'
  | 'realizedRewards'
  | 'averageCostBasis'
  | 'averageCostBasisPerSignal'
  | 'nameSignalAverageCostBasis'
  | 'nameSignalAverageCostBasisPerSignal'
  | 'signalAverageCostBasis'
  | 'signalAverageCostBasisPerSignal'
  | 'entityVersion'
  | 'linkedEntity'
  | 'linkedEntity__id'
  | 'linkedEntity__signalledTokens'
  | 'linkedEntity__unsignalledTokens'
  | 'linkedEntity__withdrawnTokens'
  | 'linkedEntity__nameSignal'
  | 'linkedEntity__signal'
  | 'linkedEntity__signalledTokensSentToL2'
  | 'linkedEntity__signalledTokensReceivedOnL2'
  | 'linkedEntity__transferredToL2'
  | 'linkedEntity__transferredToL2At'
  | 'linkedEntity__transferredToL2AtBlockNumber'
  | 'linkedEntity__transferredToL2AtTx'
  | 'linkedEntity__idOnL2'
  | 'linkedEntity__idOnL1'
  | 'linkedEntity__lastNameSignalChange'
  | 'linkedEntity__realizedRewards'
  | 'linkedEntity__averageCostBasis'
  | 'linkedEntity__averageCostBasisPerSignal'
  | 'linkedEntity__nameSignalAverageCostBasis'
  | 'linkedEntity__nameSignalAverageCostBasisPerSignal'
  | 'linkedEntity__signalAverageCostBasis'
  | 'linkedEntity__signalAverageCostBasisPerSignal'
  | 'linkedEntity__entityVersion';

export type NameSystem =
  | 'ENS';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

/**
 * [DEPRECATED] Global pool of query fees for closed state channels. Each Epoch has a single pool,
 * hence why they share the same IDs.
 *
 */
export type Pool = {
  /** Epoch number of the pool */
  id: Scalars['ID']['output'];
  /** Total effective allocation tokens from all allocations closed in this epoch */
  allocation: Scalars['BigInt']['output'];
  /** Total query fees collected in this epoch */
  totalQueryFees: Scalars['BigInt']['output'];
  /** Total query fees claimed in this epoch. Can be smaller than totalFees because of rebates function  */
  claimedFees: Scalars['BigInt']['output'];
  /** Total rewards from query fees deposited to all curator bonding curves during the epoch */
  curatorRewards: Scalars['BigInt']['output'];
  /** Allocations that were closed during this epoch */
  closedAllocations: Array<Allocation>;
};


/**
 * [DEPRECATED] Global pool of query fees for closed state channels. Each Epoch has a single pool,
 * hence why they share the same IDs.
 *
 */
export type PoolclosedAllocationsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Allocation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Allocation_filter>;
};

export type Pool_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  allocation?: InputMaybe<Scalars['BigInt']['input']>;
  allocation_not?: InputMaybe<Scalars['BigInt']['input']>;
  allocation_gt?: InputMaybe<Scalars['BigInt']['input']>;
  allocation_lt?: InputMaybe<Scalars['BigInt']['input']>;
  allocation_gte?: InputMaybe<Scalars['BigInt']['input']>;
  allocation_lte?: InputMaybe<Scalars['BigInt']['input']>;
  allocation_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  allocation_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalQueryFees?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalQueryFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalQueryFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimedFees?: InputMaybe<Scalars['BigInt']['input']>;
  claimedFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  claimedFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  claimedFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  claimedFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  claimedFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  claimedFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimedFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  curatorRewards?: InputMaybe<Scalars['BigInt']['input']>;
  curatorRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  curatorRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  curatorRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  curatorRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  curatorRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  curatorRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  curatorRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  closedAllocations_?: InputMaybe<Allocation_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Pool_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Pool_filter>>>;
};

export type Pool_orderBy =
  | 'id'
  | 'allocation'
  | 'totalQueryFees'
  | 'claimedFees'
  | 'curatorRewards'
  | 'closedAllocations';

export type Query = {
  graphNetwork?: Maybe<GraphNetwork>;
  graphNetworks: Array<GraphNetwork>;
  graphAccount?: Maybe<GraphAccount>;
  graphAccounts: Array<GraphAccount>;
  graphAccountMeta?: Maybe<GraphAccountMeta>;
  graphAccountMetas: Array<GraphAccountMeta>;
  graphAccountName?: Maybe<GraphAccountName>;
  graphAccountNames: Array<GraphAccountName>;
  subgraph?: Maybe<Subgraph>;
  subgraphs: Array<Subgraph>;
  subgraphMeta?: Maybe<SubgraphMeta>;
  subgraphMetas: Array<SubgraphMeta>;
  currentSubgraphDeploymentRelation?: Maybe<CurrentSubgraphDeploymentRelation>;
  currentSubgraphDeploymentRelations: Array<CurrentSubgraphDeploymentRelation>;
  subgraphVersion?: Maybe<SubgraphVersion>;
  subgraphVersions: Array<SubgraphVersion>;
  subgraphVersionMeta?: Maybe<SubgraphVersionMeta>;
  subgraphVersionMetas: Array<SubgraphVersionMeta>;
  subgraphDeployment?: Maybe<SubgraphDeployment>;
  subgraphDeployments: Array<SubgraphDeployment>;
  subgraphDeploymentSchema?: Maybe<SubgraphDeploymentSchema>;
  subgraphDeploymentSchemas: Array<SubgraphDeploymentSchema>;
  subgraphDeploymentManifest?: Maybe<SubgraphDeploymentManifest>;
  subgraphDeploymentManifests: Array<SubgraphDeploymentManifest>;
  indexer?: Maybe<Indexer>;
  indexers: Array<Indexer>;
  allocation?: Maybe<Allocation>;
  allocations: Array<Allocation>;
  pool?: Maybe<Pool>;
  pools: Array<Pool>;
  delegator?: Maybe<Delegator>;
  delegators: Array<Delegator>;
  delegatedStake?: Maybe<DelegatedStake>;
  delegatedStakes: Array<DelegatedStake>;
  curator?: Maybe<Curator>;
  curators: Array<Curator>;
  signal?: Maybe<Signal>;
  signals: Array<Signal>;
  nameSignal?: Maybe<NameSignal>;
  nameSignals: Array<NameSignal>;
  nameSignalSubgraphRelation?: Maybe<NameSignalSubgraphRelation>;
  nameSignalSubgraphRelations: Array<NameSignalSubgraphRelation>;
  dispute?: Maybe<Dispute>;
  disputes: Array<Dispute>;
  attestation?: Maybe<Attestation>;
  attestations: Array<Attestation>;
  epoch?: Maybe<Epoch>;
  epoches: Array<Epoch>;
  nameSignalTransaction?: Maybe<NameSignalTransaction>;
  nameSignalTransactions: Array<NameSignalTransaction>;
  signalTransaction?: Maybe<SignalTransaction>;
  signalTransactions: Array<SignalTransaction>;
  bridgeWithdrawalTransaction?: Maybe<BridgeWithdrawalTransaction>;
  bridgeWithdrawalTransactions: Array<BridgeWithdrawalTransaction>;
  bridgeDepositTransaction?: Maybe<BridgeDepositTransaction>;
  bridgeDepositTransactions: Array<BridgeDepositTransaction>;
  retryableTicket?: Maybe<RetryableTicket>;
  retryableTickets: Array<RetryableTicket>;
  retryableTicketRedeemAttempt?: Maybe<RetryableTicketRedeemAttempt>;
  retryableTicketRedeemAttempts: Array<RetryableTicketRedeemAttempt>;
  tokenManager?: Maybe<TokenManager>;
  tokenManagers: Array<TokenManager>;
  authorizedFunction?: Maybe<AuthorizedFunction>;
  authorizedFunctions: Array<AuthorizedFunction>;
  tokenLockWallet?: Maybe<TokenLockWallet>;
  tokenLockWallets: Array<TokenLockWallet>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  subgraphMetadataSearch: Array<SubgraphMeta>;
  curatorSearch: Array<Curator>;
  delegatorSearch: Array<Delegator>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerygraphNetworkArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygraphNetworksArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GraphNetwork_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GraphNetwork_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygraphAccountArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygraphAccountsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GraphAccount_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GraphAccount_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygraphAccountMetaArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygraphAccountMetasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GraphAccountMeta_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GraphAccountMeta_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygraphAccountNameArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygraphAccountNamesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GraphAccountName_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GraphAccountName_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubgraphArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubgraphsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Subgraph_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Subgraph_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubgraphMetaArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubgraphMetasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubgraphMeta_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubgraphMeta_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycurrentSubgraphDeploymentRelationArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycurrentSubgraphDeploymentRelationsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CurrentSubgraphDeploymentRelation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CurrentSubgraphDeploymentRelation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubgraphVersionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubgraphVersionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubgraphVersion_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubgraphVersion_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubgraphVersionMetaArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubgraphVersionMetasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubgraphVersionMeta_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubgraphVersionMeta_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubgraphDeploymentArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubgraphDeploymentsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubgraphDeployment_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubgraphDeployment_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubgraphDeploymentSchemaArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubgraphDeploymentSchemasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubgraphDeploymentSchema_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubgraphDeploymentSchema_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubgraphDeploymentManifestArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubgraphDeploymentManifestsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubgraphDeploymentManifest_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubgraphDeploymentManifest_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryindexerArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryindexersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Indexer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Indexer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryallocationArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryallocationsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Allocation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Allocation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Pool_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pool_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegatorArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegatorsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Delegator_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Delegator_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegatedStakeArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegatedStakesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DelegatedStake_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DelegatedStake_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycuratorArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycuratorsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Curator_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Curator_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysignalArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysignalsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Signal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Signal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynameSignalArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynameSignalsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NameSignal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NameSignal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynameSignalSubgraphRelationArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynameSignalSubgraphRelationsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NameSignalSubgraphRelation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NameSignalSubgraphRelation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydisputeArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydisputesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Dispute_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Dispute_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryattestationArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryattestationsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Attestation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Attestation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryepochArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryepochesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Epoch_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Epoch_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynameSignalTransactionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynameSignalTransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NameSignalTransaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NameSignalTransaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysignalTransactionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysignalTransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SignalTransaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SignalTransaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybridgeWithdrawalTransactionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybridgeWithdrawalTransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeWithdrawalTransaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BridgeWithdrawalTransaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybridgeDepositTransactionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybridgeDepositTransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeDepositTransaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BridgeDepositTransaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryretryableTicketArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryretryableTicketsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RetryableTicket_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RetryableTicket_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryretryableTicketRedeemAttemptArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryretryableTicketRedeemAttemptsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RetryableTicketRedeemAttempt_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RetryableTicketRedeemAttempt_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenManagerArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenManagersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenManager_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenManager_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauthorizedFunctionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauthorizedFunctionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AuthorizedFunction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AuthorizedFunction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenLockWalletArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenLockWalletsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenLockWallet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenLockWallet_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransactionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Transaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubgraphMetadataSearchArgs = {
  text: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  block?: InputMaybe<Block_height>;
  where?: InputMaybe<SubgraphMeta_filter>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycuratorSearchArgs = {
  text: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  block?: InputMaybe<Block_height>;
  where?: InputMaybe<Curator_filter>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegatorSearchArgs = {
  text: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  block?: InputMaybe<Block_height>;
  where?: InputMaybe<Delegator_filter>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

/**
 * All relevant data for arbitrum retryable tickets
 *
 */
export type RetryableTicket = {
  id: Scalars['ID']['output'];
  /** hash of the retryable ticket creation transaction */
  txHash?: Maybe<Scalars['Bytes']['output']>;
  redeemAttempts: Array<RetryableTicketRedeemAttempt>;
  /** The amount of times the ticket has been scheduled for redeeming */
  redeemCount?: Maybe<Scalars['Int']['output']>;
};


/**
 * All relevant data for arbitrum retryable tickets
 *
 */
export type RetryableTicketredeemAttemptsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RetryableTicketRedeemAttempt_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RetryableTicketRedeemAttempt_filter>;
};

export type RetryableTicketRedeemAttempt = {
  id: Scalars['ID']['output'];
  ticketId: RetryableTicket;
  txHash?: Maybe<Scalars['Bytes']['output']>;
  sequenceNumber?: Maybe<Scalars['Int']['output']>;
};

export type RetryableTicketRedeemAttempt_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  ticketId?: InputMaybe<Scalars['String']['input']>;
  ticketId_not?: InputMaybe<Scalars['String']['input']>;
  ticketId_gt?: InputMaybe<Scalars['String']['input']>;
  ticketId_lt?: InputMaybe<Scalars['String']['input']>;
  ticketId_gte?: InputMaybe<Scalars['String']['input']>;
  ticketId_lte?: InputMaybe<Scalars['String']['input']>;
  ticketId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ticketId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ticketId_contains?: InputMaybe<Scalars['String']['input']>;
  ticketId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketId_not_contains?: InputMaybe<Scalars['String']['input']>;
  ticketId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketId_starts_with?: InputMaybe<Scalars['String']['input']>;
  ticketId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  ticketId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketId_ends_with?: InputMaybe<Scalars['String']['input']>;
  ticketId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  ticketId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketId_?: InputMaybe<RetryableTicket_filter>;
  txHash?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sequenceNumber?: InputMaybe<Scalars['Int']['input']>;
  sequenceNumber_not?: InputMaybe<Scalars['Int']['input']>;
  sequenceNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  sequenceNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  sequenceNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  sequenceNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  sequenceNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  sequenceNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RetryableTicketRedeemAttempt_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RetryableTicketRedeemAttempt_filter>>>;
};

export type RetryableTicketRedeemAttempt_orderBy =
  | 'id'
  | 'ticketId'
  | 'ticketId__id'
  | 'ticketId__txHash'
  | 'ticketId__redeemCount'
  | 'txHash'
  | 'sequenceNumber';

export type RetryableTicket_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  txHash?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  redeemAttempts_?: InputMaybe<RetryableTicketRedeemAttempt_filter>;
  redeemCount?: InputMaybe<Scalars['Int']['input']>;
  redeemCount_not?: InputMaybe<Scalars['Int']['input']>;
  redeemCount_gt?: InputMaybe<Scalars['Int']['input']>;
  redeemCount_lt?: InputMaybe<Scalars['Int']['input']>;
  redeemCount_gte?: InputMaybe<Scalars['Int']['input']>;
  redeemCount_lte?: InputMaybe<Scalars['Int']['input']>;
  redeemCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  redeemCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RetryableTicket_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RetryableTicket_filter>>>;
};

export type RetryableTicket_orderBy =
  | 'id'
  | 'txHash'
  | 'redeemAttempts'
  | 'redeemCount';

/**
 * TokenLockWallet Revocability Enum
 *
 */
export type Revocability =
  | 'NotSet'
  | 'Enabled'
  | 'Disabled';

/**
 * Curator Signal for a single SubgraphDeployment
 *
 */
export type Signal = {
  /** Eth address + subgraph deployment ID */
  id: Scalars['ID']['output'];
  /** Eth address of the curator */
  curator: Curator;
  /** Subgraph being signalled */
  subgraphDeployment: SubgraphDeployment;
  /** CUMULATIVE number of tokens the curator has signalled */
  signalledTokens: Scalars['BigInt']['output'];
  /** CUMULATIVE number of tokens the curator has unsignalled */
  unsignalledTokens: Scalars['BigInt']['output'];
  /** Signal that the curator has from signaling their GRT */
  signal: Scalars['BigInt']['output'];
  /** Curator average cost basis for this signal on this subgraph */
  averageCostBasis: Scalars['BigDecimal']['output'];
  /** averageCostBasis / signal */
  averageCostBasisPerSignal: Scalars['BigDecimal']['output'];
  /** Block for which the curator last entered or exited the curve */
  lastSignalChange: Scalars['Int']['output'];
  /** Summation of realized rewards from before the last time the curator entered the curation curve */
  realizedRewards: Scalars['BigInt']['output'];
  /** Timetamp when this entity was created */
  createdAt: Scalars['Int']['output'];
  /** Timetamp when this entity was last updated */
  lastUpdatedAt: Scalars['Int']['output'];
  /** Block number where this entity was created */
  createdAtBlock: Scalars['Int']['output'];
  /** Block number where this entity was last updated */
  lastUpdatedAtBlock: Scalars['Int']['output'];
};

/**
 * All relevant data for a Signal Transaction in The Graph Network
 *
 */
export type SignalTransaction = Transaction & {
  id: Scalars['ID']['output'];
  blockNumber: Scalars['Int']['output'];
  timestamp: Scalars['Int']['output'];
  signer: GraphAccount;
  type: TransactionType;
  /** Amount of signal updated */
  signal: Scalars['BigInt']['output'];
  /** Tokens used */
  tokens: Scalars['BigInt']['output'];
  /** Subgraph where signal was updated */
  subgraphDeployment: SubgraphDeployment;
  /** Withdrawal fees. On minting only */
  withdrawalFees: Scalars['BigInt']['output'];
};

export type SignalTransaction_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  timestamp_not?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_lt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  signer?: InputMaybe<Scalars['String']['input']>;
  signer_not?: InputMaybe<Scalars['String']['input']>;
  signer_gt?: InputMaybe<Scalars['String']['input']>;
  signer_lt?: InputMaybe<Scalars['String']['input']>;
  signer_gte?: InputMaybe<Scalars['String']['input']>;
  signer_lte?: InputMaybe<Scalars['String']['input']>;
  signer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signer_contains?: InputMaybe<Scalars['String']['input']>;
  signer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_not_contains?: InputMaybe<Scalars['String']['input']>;
  signer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_starts_with?: InputMaybe<Scalars['String']['input']>;
  signer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  signer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_ends_with?: InputMaybe<Scalars['String']['input']>;
  signer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  signer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_?: InputMaybe<GraphAccount_filter>;
  type?: InputMaybe<TransactionType>;
  type_not?: InputMaybe<TransactionType>;
  type_in?: InputMaybe<Array<TransactionType>>;
  type_not_in?: InputMaybe<Array<TransactionType>>;
  signal?: InputMaybe<Scalars['BigInt']['input']>;
  signal_not?: InputMaybe<Scalars['BigInt']['input']>;
  signal_gt?: InputMaybe<Scalars['BigInt']['input']>;
  signal_lt?: InputMaybe<Scalars['BigInt']['input']>;
  signal_gte?: InputMaybe<Scalars['BigInt']['input']>;
  signal_lte?: InputMaybe<Scalars['BigInt']['input']>;
  signal_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signal_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokens?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  subgraphDeployment?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_gt?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_lt?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_gte?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_lte?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraphDeployment_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraphDeployment_contains?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_contains?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_?: InputMaybe<SubgraphDeployment_filter>;
  withdrawalFees?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawalFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawalFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawalFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawalFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawalFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawalFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawalFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SignalTransaction_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SignalTransaction_filter>>>;
};

export type SignalTransaction_orderBy =
  | 'id'
  | 'blockNumber'
  | 'timestamp'
  | 'signer'
  | 'signer__id'
  | 'signer__createdAt'
  | 'signer__defaultDisplayName'
  | 'signer__balance'
  | 'signer__balanceReceivedFromL1Signalling'
  | 'signer__balanceReceivedFromL1Delegation'
  | 'signer__curationApproval'
  | 'signer__stakingApproval'
  | 'signer__gnsApproval'
  | 'signer__developerCreatedAt'
  | 'signer__subgraphQueryFees'
  | 'type'
  | 'signal'
  | 'tokens'
  | 'subgraphDeployment'
  | 'subgraphDeployment__id'
  | 'subgraphDeployment__ipfsHash'
  | 'subgraphDeployment__createdAt'
  | 'subgraphDeployment__deniedAt'
  | 'subgraphDeployment__originalName'
  | 'subgraphDeployment__stakedTokens'
  | 'subgraphDeployment__indexingRewardAmount'
  | 'subgraphDeployment__indexingIndexerRewardAmount'
  | 'subgraphDeployment__indexingDelegatorRewardAmount'
  | 'subgraphDeployment__queryFeesAmount'
  | 'subgraphDeployment__queryFeeRebates'
  | 'subgraphDeployment__curatorFeeRewards'
  | 'subgraphDeployment__signalledTokens'
  | 'subgraphDeployment__unsignalledTokens'
  | 'subgraphDeployment__signalAmount'
  | 'subgraphDeployment__pricePerShare'
  | 'subgraphDeployment__reserveRatio'
  | 'subgraphDeployment__subgraphCount'
  | 'subgraphDeployment__activeSubgraphCount'
  | 'subgraphDeployment__deprecatedSubgraphCount'
  | 'subgraphDeployment__transferredToL2'
  | 'subgraphDeployment__transferredToL2At'
  | 'subgraphDeployment__transferredToL2AtBlockNumber'
  | 'subgraphDeployment__transferredToL2AtTx'
  | 'subgraphDeployment__signalledTokensSentToL2'
  | 'subgraphDeployment__signalledTokensReceivedOnL2'
  | 'withdrawalFees';

export type Signal_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  curator?: InputMaybe<Scalars['String']['input']>;
  curator_not?: InputMaybe<Scalars['String']['input']>;
  curator_gt?: InputMaybe<Scalars['String']['input']>;
  curator_lt?: InputMaybe<Scalars['String']['input']>;
  curator_gte?: InputMaybe<Scalars['String']['input']>;
  curator_lte?: InputMaybe<Scalars['String']['input']>;
  curator_in?: InputMaybe<Array<Scalars['String']['input']>>;
  curator_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  curator_contains?: InputMaybe<Scalars['String']['input']>;
  curator_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_not_contains?: InputMaybe<Scalars['String']['input']>;
  curator_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_starts_with?: InputMaybe<Scalars['String']['input']>;
  curator_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  curator_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_ends_with?: InputMaybe<Scalars['String']['input']>;
  curator_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  curator_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  curator_?: InputMaybe<Curator_filter>;
  subgraphDeployment?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_gt?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_lt?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_gte?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_lte?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraphDeployment_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraphDeployment_contains?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_contains?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_?: InputMaybe<SubgraphDeployment_filter>;
  signalledTokens?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalledTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  unsignalledTokens?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  unsignalledTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signal?: InputMaybe<Scalars['BigInt']['input']>;
  signal_not?: InputMaybe<Scalars['BigInt']['input']>;
  signal_gt?: InputMaybe<Scalars['BigInt']['input']>;
  signal_lt?: InputMaybe<Scalars['BigInt']['input']>;
  signal_gte?: InputMaybe<Scalars['BigInt']['input']>;
  signal_lte?: InputMaybe<Scalars['BigInt']['input']>;
  signal_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signal_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  averageCostBasis?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasis_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasis_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasis_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasis_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasis_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasis_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  averageCostBasis_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  averageCostBasisPerSignal?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasisPerSignal_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasisPerSignal_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasisPerSignal_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasisPerSignal_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasisPerSignal_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  averageCostBasisPerSignal_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  averageCostBasisPerSignal_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  lastSignalChange?: InputMaybe<Scalars['Int']['input']>;
  lastSignalChange_not?: InputMaybe<Scalars['Int']['input']>;
  lastSignalChange_gt?: InputMaybe<Scalars['Int']['input']>;
  lastSignalChange_lt?: InputMaybe<Scalars['Int']['input']>;
  lastSignalChange_gte?: InputMaybe<Scalars['Int']['input']>;
  lastSignalChange_lte?: InputMaybe<Scalars['Int']['input']>;
  lastSignalChange_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastSignalChange_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  realizedRewards?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  realizedRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  realizedRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastUpdatedAt?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedAt_not?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedAt_gt?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedAt_lt?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedAt_gte?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedAt_lte?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastUpdatedAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAtBlock?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_not?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastUpdatedAtBlock?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedAtBlock_not?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedAtBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedAtBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedAtBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedAtBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedAtBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastUpdatedAtBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Signal_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Signal_filter>>>;
};

export type Signal_orderBy =
  | 'id'
  | 'curator'
  | 'curator__id'
  | 'curator__createdAt'
  | 'curator__totalSignalledTokens'
  | 'curator__totalUnsignalledTokens'
  | 'curator__defaultDisplayName'
  | 'curator__totalNameSignalledTokens'
  | 'curator__totalNameUnsignalledTokens'
  | 'curator__totalWithdrawnTokens'
  | 'curator__realizedRewards'
  | 'curator__annualizedReturn'
  | 'curator__totalReturn'
  | 'curator__signalingEfficiency'
  | 'curator__totalNameSignal'
  | 'curator__totalNameSignalAverageCostBasis'
  | 'curator__totalAverageCostBasisPerNameSignal'
  | 'curator__totalSignal'
  | 'curator__totalSignalAverageCostBasis'
  | 'curator__totalAverageCostBasisPerSignal'
  | 'curator__signalCount'
  | 'curator__activeSignalCount'
  | 'curator__nameSignalCount'
  | 'curator__activeNameSignalCount'
  | 'curator__combinedSignalCount'
  | 'curator__activeCombinedSignalCount'
  | 'subgraphDeployment'
  | 'subgraphDeployment__id'
  | 'subgraphDeployment__ipfsHash'
  | 'subgraphDeployment__createdAt'
  | 'subgraphDeployment__deniedAt'
  | 'subgraphDeployment__originalName'
  | 'subgraphDeployment__stakedTokens'
  | 'subgraphDeployment__indexingRewardAmount'
  | 'subgraphDeployment__indexingIndexerRewardAmount'
  | 'subgraphDeployment__indexingDelegatorRewardAmount'
  | 'subgraphDeployment__queryFeesAmount'
  | 'subgraphDeployment__queryFeeRebates'
  | 'subgraphDeployment__curatorFeeRewards'
  | 'subgraphDeployment__signalledTokens'
  | 'subgraphDeployment__unsignalledTokens'
  | 'subgraphDeployment__signalAmount'
  | 'subgraphDeployment__pricePerShare'
  | 'subgraphDeployment__reserveRatio'
  | 'subgraphDeployment__subgraphCount'
  | 'subgraphDeployment__activeSubgraphCount'
  | 'subgraphDeployment__deprecatedSubgraphCount'
  | 'subgraphDeployment__transferredToL2'
  | 'subgraphDeployment__transferredToL2At'
  | 'subgraphDeployment__transferredToL2AtBlockNumber'
  | 'subgraphDeployment__transferredToL2AtTx'
  | 'subgraphDeployment__signalledTokensSentToL2'
  | 'subgraphDeployment__signalledTokensReceivedOnL2'
  | 'signalledTokens'
  | 'unsignalledTokens'
  | 'signal'
  | 'averageCostBasis'
  | 'averageCostBasisPerSignal'
  | 'lastSignalChange'
  | 'realizedRewards'
  | 'createdAt'
  | 'lastUpdatedAt'
  | 'createdAtBlock'
  | 'lastUpdatedAtBlock';

/**
 * The Subgraph entity represents a permanent, unique endpoint. This unique endpoint can resolve to
 * many different SubgraphVersions over it's lifetime. The Subgraph can also have a name attributed
 * to it. The owner of the Subgraph can only use a name once, thus making the owner account and the
 * name chosen a unique combination. When a Curator singals on a Subgraph, they receive "Name Signal".
 * "Name Signal" resolves into the underlying "Signal" of the SubgraphDeployment. The metadata of the
 * subgraph is stored on IPFS.
 *
 */
export type Subgraph = {
  /** Subgraph ID - which is derived from the Organization/Individual graph accountID */
  id: Scalars['ID']['output'];
  /** Graph account that owns this subgraph */
  owner: GraphAccount;
  /** Current version. Null if the subgraph is deprecated */
  currentVersion?: Maybe<SubgraphVersion>;
  /** [DEPRECATED] Past versions. Has the same data as 'versions' but keeps the old naming for backwards compatibility */
  pastVersions: Array<SubgraphVersion>;
  /** List of all the subgraph versions included the current one */
  versions: Array<SubgraphVersion>;
  /** Version counter */
  versionCount: Scalars['BigInt']['output'];
  /** Creation timestamp */
  createdAt: Scalars['Int']['output'];
  /** Updated timestamp */
  updatedAt: Scalars['Int']['output'];
  /** Whether the subgraph is active or deprecated */
  active: Scalars['Boolean']['output'];
  /** Whether the subgraph has been claimed/migrated. Can only be false for subgraphs created with V1 contracts that have not been claimed/migrated */
  migrated: Scalars['Boolean']['output'];
  /** Whether the subgraph has been transferred from L1 to L2. Subgraphs published on L2 will have this as false unless they were published through a transfer */
  startedTransferToL2: Scalars['Boolean']['output'];
  /** Timestamp for the L1 -> L2 Transfer. Null if the transfer hasn't started yet */
  startedTransferToL2At?: Maybe<Scalars['BigInt']['output']>;
  /** Block number for the L1 -> L2 Transfer. Null if the transfer hasn't started yet */
  startedTransferToL2AtBlockNumber?: Maybe<Scalars['BigInt']['output']>;
  /** Transaction hash for the L1 -> L2 Transfer. Null if the transfer hasn't started yet */
  startedTransferToL2AtTx?: Maybe<Scalars['String']['output']>;
  /** Whether the subgraph has been fully transferred from L1 to L2. Subgraphs published on L2 will have this as false unless they were published through a transfer */
  transferredToL2: Scalars['Boolean']['output'];
  /** Timestamp for the L1 -> L2 Transfer. Null if it's not fully transferred or if it's an L1 deployment */
  transferredToL2At?: Maybe<Scalars['BigInt']['output']>;
  /** Block number for the L1 -> L2 Transfer. Null if it's not fully transferred or if it's an L1 deployment */
  transferredToL2AtBlockNumber?: Maybe<Scalars['BigInt']['output']>;
  /** Transaction hash for the L1 -> L2 Transfer. Null if it's not fully transferred or if it's an L1 deployment */
  transferredToL2AtTx?: Maybe<Scalars['String']['output']>;
  /** Amount of GRT transferred to L2 */
  signalledTokensSentToL2: Scalars['BigInt']['output'];
  /** Amount of GRT received on L2 */
  signalledTokensReceivedOnL2: Scalars['BigInt']['output'];
  /** ID of the subgraph on L2. Null if it's not transferred */
  idOnL2?: Maybe<Scalars['String']['output']>;
  /** ID of the subgraph on L1. Null if it's not transferred */
  idOnL1?: Maybe<Scalars['String']['output']>;
  /** The actual ID of the subgraph on the contracts subgraph NFT implementation. BigInt represented as a String. It's only actually valid once the subgraph is migrated (migrated == true) */
  nftID?: Maybe<Scalars['String']['output']>;
  /** ID of the subgraph that was used on the old version of this The Graph Network Subgraph. Null for Subgraphs created with the new GNS implementation or for version 1 entities (since they use the old id) */
  oldID?: Maybe<Scalars['String']['output']>;
  /** Address used to create the ID. Only available for Subgraphs created pre-migration */
  creatorAddress?: Maybe<Scalars['Bytes']['output']>;
  /** Subgraph number used to create the ID. Only available for Subgraphs created pre-migration */
  subgraphNumber?: Maybe<Scalars['BigInt']['output']>;
  /** Auxiliary field to denote whether the subgraph is handling the initialization order on V2 events. Doesn't matter for V1 events. */
  initializing: Scalars['Boolean']['output'];
  /** Version of the entity. Subgraph entities are changing the way their ID is generated when the new GNS v2 rolls out so we need to differnetiate them */
  entityVersion: Scalars['Int']['output'];
  /** [DEPRECATED] Used for duplicate entities to enable old IDs from before the subgraph NFT update */
  linkedEntity?: Maybe<Subgraph>;
  /** CUMULATIVE signaled tokens on this subgraph all time */
  signalledTokens: Scalars['BigInt']['output'];
  /** CUMULATIVE unsignalled tokens on this subgraph all time */
  unsignalledTokens: Scalars['BigInt']['output'];
  /** CURRENT amount of tokens signalled on this subgraph latest version. Mirrors the total amount signalled towards the current deployment. */
  currentSignalledTokens: Scalars['BigInt']['output'];
  /** The CURRENT name signal amount for this subgraph */
  nameSignalAmount: Scalars['BigInt']['output'];
  /** Current amount of version signal managed by the name pool */
  signalAmount: Scalars['BigInt']['output'];
  /** Reserve ratio of the name curation curve. In parts per million */
  reserveRatio: Scalars['Int']['output'];
  /** Tokens that can be withdrawn once the Subgraph is deprecated */
  withdrawableTokens: Scalars['BigInt']['output'];
  /** Tokens the curators have withdrawn from the deprecated Subgraph */
  withdrawnTokens: Scalars['BigInt']['output'];
  /** Curators of this subgraph deployment */
  nameSignals: Array<NameSignal>;
  /** Total amount of NameSignal entities */
  nameSignalCount: Scalars['Int']['output'];
  /** Subgraph metadata */
  metadataHash?: Maybe<Scalars['Bytes']['output']>;
  /** Subgraph metadata ipfs hash and entity */
  metadata?: Maybe<SubgraphMeta>;
  currentVersionRelationEntity?: Maybe<CurrentSubgraphDeploymentRelation>;
};


/**
 * The Subgraph entity represents a permanent, unique endpoint. This unique endpoint can resolve to
 * many different SubgraphVersions over it's lifetime. The Subgraph can also have a name attributed
 * to it. The owner of the Subgraph can only use a name once, thus making the owner account and the
 * name chosen a unique combination. When a Curator singals on a Subgraph, they receive "Name Signal".
 * "Name Signal" resolves into the underlying "Signal" of the SubgraphDeployment. The metadata of the
 * subgraph is stored on IPFS.
 *
 */
export type SubgraphpastVersionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubgraphVersion_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubgraphVersion_filter>;
};


/**
 * The Subgraph entity represents a permanent, unique endpoint. This unique endpoint can resolve to
 * many different SubgraphVersions over it's lifetime. The Subgraph can also have a name attributed
 * to it. The owner of the Subgraph can only use a name once, thus making the owner account and the
 * name chosen a unique combination. When a Curator singals on a Subgraph, they receive "Name Signal".
 * "Name Signal" resolves into the underlying "Signal" of the SubgraphDeployment. The metadata of the
 * subgraph is stored on IPFS.
 *
 */
export type SubgraphversionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubgraphVersion_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubgraphVersion_filter>;
};


/**
 * The Subgraph entity represents a permanent, unique endpoint. This unique endpoint can resolve to
 * many different SubgraphVersions over it's lifetime. The Subgraph can also have a name attributed
 * to it. The owner of the Subgraph can only use a name once, thus making the owner account and the
 * name chosen a unique combination. When a Curator singals on a Subgraph, they receive "Name Signal".
 * "Name Signal" resolves into the underlying "Signal" of the SubgraphDeployment. The metadata of the
 * subgraph is stored on IPFS.
 *
 */
export type SubgraphnameSignalsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NameSignal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NameSignal_filter>;
};

/**
 * The SubgraphDeployment is represented by the immutable subgraph code that is uploaded, and posted
 * to IPFS. A SubgraphDeployment has a manifest which gives the instructions to the Graph Network on
 * what to index. The entity stores relevant data for the SubgraphDeployment on how much it is being
 * staked on and signaled on in the contracts, as well as how it is performing in query fees. It is
 * related to a SubgraphVersion.
 *
 */
export type SubgraphDeployment = {
  /** Subgraph Deployment ID. The IPFS hash with Qm removed to fit into 32 bytes */
  id: Scalars['ID']['output'];
  /** IPFS hash of the subgraph manifest */
  ipfsHash: Scalars['String']['output'];
  /** The versions this subgraph deployment relates to */
  versions: Array<SubgraphVersion>;
  /** Creation timestamp */
  createdAt: Scalars['Int']['output'];
  /** The block at which this deployment was denied for rewards. Null if not denied */
  deniedAt: Scalars['Int']['output'];
  /** [DEPRECATED] The original Subgraph that was deployed through GNS. Can be null if never created through GNS. Used for filtering in the Explorer. Always null now */
  originalName?: Maybe<Scalars['String']['output']>;
  /** CURRENT total stake of all indexers on this Subgraph Deployment */
  stakedTokens: Scalars['BigInt']['output'];
  /** Allocations created by indexers for this Subgraph */
  indexerAllocations: Array<Allocation>;
  /** Total rewards accrued all time by this Subgraph Deployment. Includes delegator and indexer rewards */
  indexingRewardAmount: Scalars['BigInt']['output'];
  /** Total rewards accrued all time by indexers */
  indexingIndexerRewardAmount: Scalars['BigInt']['output'];
  /** Total rewards accrued all time by delegators */
  indexingDelegatorRewardAmount: Scalars['BigInt']['output'];
  /** Total query fees earned by this Subgraph Deployment, without curator query fees */
  queryFeesAmount: Scalars['BigInt']['output'];
  /** Total query fee rebates earned from the protocol, through the rebates formula. Does not include delegation fees */
  queryFeeRebates: Scalars['BigInt']['output'];
  /** Total curator rewards from fees */
  curatorFeeRewards: Scalars['BigInt']['output'];
  /** CURRENT signalled tokens in the bonding curve */
  signalledTokens: Scalars['BigInt']['output'];
  /** NOT IMPLEMENTED - CURRENT signalled tokens in the bonding curve */
  unsignalledTokens: Scalars['BigInt']['output'];
  /** CURRENT curation signal for this subgraph deployment */
  signalAmount: Scalars['BigInt']['output'];
  /** signalledTokens / signalAmount */
  pricePerShare: Scalars['BigDecimal']['output'];
  /** Curators of this subgraph deployment */
  curatorSignals: Array<Signal>;
  /** Bonding curve reserve ratio. In parts per million */
  reserveRatio: Scalars['Int']['output'];
  /** Entity that represents the manifest of the deployment. Filled by File Data Sources */
  manifest?: Maybe<SubgraphDeploymentManifest>;
  /** Total amount of Subgraph entities that used this deployment at some point. subgraphCount >= activeSubgraphCount + deprecatedSubgraphCount */
  subgraphCount: Scalars['Int']['output'];
  /** Amount of active Subgraph entities that are currently using this deployment. Deprecated subgraph entities are not counted */
  activeSubgraphCount: Scalars['Int']['output'];
  /** Amount of Subgraph entities that were currently using this deployment when they got deprecated */
  deprecatedSubgraphCount: Scalars['Int']['output'];
  /** Whether the deployment has been transferred from L1 to L2. Subgraphs published on L2 will have this as false unless they were published through a transfer */
  transferredToL2: Scalars['Boolean']['output'];
  /** Timestamp for the L1 -> L2 Transfer. Null if it's not fully transferred or if it's an L1 deployment */
  transferredToL2At?: Maybe<Scalars['BigInt']['output']>;
  /** Block number for the L1 -> L2 Transfer. Null if it's not fully transferred or if it's an L1 deployment */
  transferredToL2AtBlockNumber?: Maybe<Scalars['BigInt']['output']>;
  /** Transaction hash for the L1 -> L2 Transfer. Null if it's not fully transferred or if it's an L1 deployment */
  transferredToL2AtTx?: Maybe<Scalars['String']['output']>;
  /** Amount of GRT transferred to L2 */
  signalledTokensSentToL2: Scalars['BigInt']['output'];
  /** Amount of GRT received on L2 */
  signalledTokensReceivedOnL2: Scalars['BigInt']['output'];
};


/**
 * The SubgraphDeployment is represented by the immutable subgraph code that is uploaded, and posted
 * to IPFS. A SubgraphDeployment has a manifest which gives the instructions to the Graph Network on
 * what to index. The entity stores relevant data for the SubgraphDeployment on how much it is being
 * staked on and signaled on in the contracts, as well as how it is performing in query fees. It is
 * related to a SubgraphVersion.
 *
 */
export type SubgraphDeploymentversionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubgraphVersion_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubgraphVersion_filter>;
};


/**
 * The SubgraphDeployment is represented by the immutable subgraph code that is uploaded, and posted
 * to IPFS. A SubgraphDeployment has a manifest which gives the instructions to the Graph Network on
 * what to index. The entity stores relevant data for the SubgraphDeployment on how much it is being
 * staked on and signaled on in the contracts, as well as how it is performing in query fees. It is
 * related to a SubgraphVersion.
 *
 */
export type SubgraphDeploymentindexerAllocationsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Allocation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Allocation_filter>;
};


/**
 * The SubgraphDeployment is represented by the immutable subgraph code that is uploaded, and posted
 * to IPFS. A SubgraphDeployment has a manifest which gives the instructions to the Graph Network on
 * what to index. The entity stores relevant data for the SubgraphDeployment on how much it is being
 * staked on and signaled on in the contracts, as well as how it is performing in query fees. It is
 * related to a SubgraphVersion.
 *
 */
export type SubgraphDeploymentcuratorSignalsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Signal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Signal_filter>;
};

export type SubgraphDeploymentManifest = {
  /** IPFS Hash */
  id: Scalars['ID']['output'];
  /** Link to SubgraphDeployment entity */
  deployment?: Maybe<SubgraphDeployment>;
  /** Schema entity */
  schema?: Maybe<SubgraphDeploymentSchema>;
  /** Schema ipfs hash */
  schemaIpfsHash?: Maybe<Scalars['String']['output']>;
  /** Contents of the Manifest file */
  manifest?: Maybe<Scalars['String']['output']>;
  /** Network where the contracts that the subgraph indexes are located */
  network?: Maybe<Scalars['String']['output']>;
  /** Whether the subgraph is a SpS/SbS. Null if we can't parse it */
  poweredBySubstreams?: Maybe<Scalars['Boolean']['output']>;
  /** Start block for the deployment. It's the lowest startBlock found (0 if some data source doesn't contain a start block) */
  startBlock?: Maybe<Scalars['BigInt']['output']>;
};

export type SubgraphDeploymentManifest_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  deployment_?: InputMaybe<SubgraphDeployment_filter>;
  schema?: InputMaybe<Scalars['String']['input']>;
  schema_not?: InputMaybe<Scalars['String']['input']>;
  schema_gt?: InputMaybe<Scalars['String']['input']>;
  schema_lt?: InputMaybe<Scalars['String']['input']>;
  schema_gte?: InputMaybe<Scalars['String']['input']>;
  schema_lte?: InputMaybe<Scalars['String']['input']>;
  schema_in?: InputMaybe<Array<Scalars['String']['input']>>;
  schema_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  schema_contains?: InputMaybe<Scalars['String']['input']>;
  schema_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  schema_not_contains?: InputMaybe<Scalars['String']['input']>;
  schema_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  schema_starts_with?: InputMaybe<Scalars['String']['input']>;
  schema_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  schema_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  schema_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  schema_ends_with?: InputMaybe<Scalars['String']['input']>;
  schema_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  schema_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  schema_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  schema_?: InputMaybe<SubgraphDeploymentSchema_filter>;
  schemaIpfsHash?: InputMaybe<Scalars['String']['input']>;
  schemaIpfsHash_not?: InputMaybe<Scalars['String']['input']>;
  schemaIpfsHash_gt?: InputMaybe<Scalars['String']['input']>;
  schemaIpfsHash_lt?: InputMaybe<Scalars['String']['input']>;
  schemaIpfsHash_gte?: InputMaybe<Scalars['String']['input']>;
  schemaIpfsHash_lte?: InputMaybe<Scalars['String']['input']>;
  schemaIpfsHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  schemaIpfsHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  schemaIpfsHash_contains?: InputMaybe<Scalars['String']['input']>;
  schemaIpfsHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  schemaIpfsHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  schemaIpfsHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  schemaIpfsHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  schemaIpfsHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  schemaIpfsHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  schemaIpfsHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  schemaIpfsHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  schemaIpfsHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  schemaIpfsHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  schemaIpfsHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manifest?: InputMaybe<Scalars['String']['input']>;
  manifest_not?: InputMaybe<Scalars['String']['input']>;
  manifest_gt?: InputMaybe<Scalars['String']['input']>;
  manifest_lt?: InputMaybe<Scalars['String']['input']>;
  manifest_gte?: InputMaybe<Scalars['String']['input']>;
  manifest_lte?: InputMaybe<Scalars['String']['input']>;
  manifest_in?: InputMaybe<Array<Scalars['String']['input']>>;
  manifest_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  manifest_contains?: InputMaybe<Scalars['String']['input']>;
  manifest_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  manifest_not_contains?: InputMaybe<Scalars['String']['input']>;
  manifest_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  manifest_starts_with?: InputMaybe<Scalars['String']['input']>;
  manifest_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manifest_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  manifest_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manifest_ends_with?: InputMaybe<Scalars['String']['input']>;
  manifest_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manifest_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  manifest_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  network?: InputMaybe<Scalars['String']['input']>;
  network_not?: InputMaybe<Scalars['String']['input']>;
  network_gt?: InputMaybe<Scalars['String']['input']>;
  network_lt?: InputMaybe<Scalars['String']['input']>;
  network_gte?: InputMaybe<Scalars['String']['input']>;
  network_lte?: InputMaybe<Scalars['String']['input']>;
  network_in?: InputMaybe<Array<Scalars['String']['input']>>;
  network_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  network_contains?: InputMaybe<Scalars['String']['input']>;
  network_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  network_not_contains?: InputMaybe<Scalars['String']['input']>;
  network_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  network_starts_with?: InputMaybe<Scalars['String']['input']>;
  network_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  network_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  network_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  network_ends_with?: InputMaybe<Scalars['String']['input']>;
  network_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  network_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  network_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poweredBySubstreams?: InputMaybe<Scalars['Boolean']['input']>;
  poweredBySubstreams_not?: InputMaybe<Scalars['Boolean']['input']>;
  poweredBySubstreams_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  poweredBySubstreams_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  startBlock?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SubgraphDeploymentManifest_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SubgraphDeploymentManifest_filter>>>;
};

export type SubgraphDeploymentManifest_orderBy =
  | 'id'
  | 'deployment'
  | 'deployment__id'
  | 'deployment__ipfsHash'
  | 'deployment__createdAt'
  | 'deployment__deniedAt'
  | 'deployment__originalName'
  | 'deployment__stakedTokens'
  | 'deployment__indexingRewardAmount'
  | 'deployment__indexingIndexerRewardAmount'
  | 'deployment__indexingDelegatorRewardAmount'
  | 'deployment__queryFeesAmount'
  | 'deployment__queryFeeRebates'
  | 'deployment__curatorFeeRewards'
  | 'deployment__signalledTokens'
  | 'deployment__unsignalledTokens'
  | 'deployment__signalAmount'
  | 'deployment__pricePerShare'
  | 'deployment__reserveRatio'
  | 'deployment__subgraphCount'
  | 'deployment__activeSubgraphCount'
  | 'deployment__deprecatedSubgraphCount'
  | 'deployment__transferredToL2'
  | 'deployment__transferredToL2At'
  | 'deployment__transferredToL2AtBlockNumber'
  | 'deployment__transferredToL2AtTx'
  | 'deployment__signalledTokensSentToL2'
  | 'deployment__signalledTokensReceivedOnL2'
  | 'schema'
  | 'schema__id'
  | 'schema__schema'
  | 'schemaIpfsHash'
  | 'manifest'
  | 'network'
  | 'poweredBySubstreams'
  | 'startBlock';

export type SubgraphDeploymentSchema = {
  /** IPFS Hash */
  id: Scalars['ID']['output'];
  /** Link to a SubgraphDeploymentManifest entity that references this schema. For backwards compatibility purposes only, for the full list of manifests use manifests */
  manifest?: Maybe<SubgraphDeploymentManifest>;
  /** Links to SubgraphDeploymentManifest entities that reference this schema */
  manifests: Array<SubgraphDeploymentManifest>;
  /** Contents of the Schema file */
  schema?: Maybe<Scalars['String']['output']>;
};


export type SubgraphDeploymentSchemamanifestsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubgraphDeploymentManifest_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubgraphDeploymentManifest_filter>;
};

export type SubgraphDeploymentSchema_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  manifest_?: InputMaybe<SubgraphDeploymentManifest_filter>;
  manifests_?: InputMaybe<SubgraphDeploymentManifest_filter>;
  schema?: InputMaybe<Scalars['String']['input']>;
  schema_not?: InputMaybe<Scalars['String']['input']>;
  schema_gt?: InputMaybe<Scalars['String']['input']>;
  schema_lt?: InputMaybe<Scalars['String']['input']>;
  schema_gte?: InputMaybe<Scalars['String']['input']>;
  schema_lte?: InputMaybe<Scalars['String']['input']>;
  schema_in?: InputMaybe<Array<Scalars['String']['input']>>;
  schema_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  schema_contains?: InputMaybe<Scalars['String']['input']>;
  schema_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  schema_not_contains?: InputMaybe<Scalars['String']['input']>;
  schema_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  schema_starts_with?: InputMaybe<Scalars['String']['input']>;
  schema_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  schema_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  schema_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  schema_ends_with?: InputMaybe<Scalars['String']['input']>;
  schema_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  schema_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  schema_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SubgraphDeploymentSchema_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SubgraphDeploymentSchema_filter>>>;
};

export type SubgraphDeploymentSchema_orderBy =
  | 'id'
  | 'manifest'
  | 'manifest__id'
  | 'manifest__schemaIpfsHash'
  | 'manifest__manifest'
  | 'manifest__network'
  | 'manifest__poweredBySubstreams'
  | 'manifest__startBlock'
  | 'manifests'
  | 'schema';

export type SubgraphDeployment_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  ipfsHash?: InputMaybe<Scalars['String']['input']>;
  ipfsHash_not?: InputMaybe<Scalars['String']['input']>;
  ipfsHash_gt?: InputMaybe<Scalars['String']['input']>;
  ipfsHash_lt?: InputMaybe<Scalars['String']['input']>;
  ipfsHash_gte?: InputMaybe<Scalars['String']['input']>;
  ipfsHash_lte?: InputMaybe<Scalars['String']['input']>;
  ipfsHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ipfsHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ipfsHash_contains?: InputMaybe<Scalars['String']['input']>;
  ipfsHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  ipfsHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  ipfsHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  ipfsHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  ipfsHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  ipfsHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  versions_?: InputMaybe<SubgraphVersion_filter>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  deniedAt?: InputMaybe<Scalars['Int']['input']>;
  deniedAt_not?: InputMaybe<Scalars['Int']['input']>;
  deniedAt_gt?: InputMaybe<Scalars['Int']['input']>;
  deniedAt_lt?: InputMaybe<Scalars['Int']['input']>;
  deniedAt_gte?: InputMaybe<Scalars['Int']['input']>;
  deniedAt_lte?: InputMaybe<Scalars['Int']['input']>;
  deniedAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  deniedAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  originalName?: InputMaybe<Scalars['String']['input']>;
  originalName_not?: InputMaybe<Scalars['String']['input']>;
  originalName_gt?: InputMaybe<Scalars['String']['input']>;
  originalName_lt?: InputMaybe<Scalars['String']['input']>;
  originalName_gte?: InputMaybe<Scalars['String']['input']>;
  originalName_lte?: InputMaybe<Scalars['String']['input']>;
  originalName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  originalName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  originalName_contains?: InputMaybe<Scalars['String']['input']>;
  originalName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  originalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  originalName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  originalName_starts_with?: InputMaybe<Scalars['String']['input']>;
  originalName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  originalName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  originalName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  originalName_ends_with?: InputMaybe<Scalars['String']['input']>;
  originalName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  originalName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  originalName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  stakedTokens?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  stakedTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stakedTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  indexerAllocations_?: InputMaybe<Allocation_filter>;
  indexingRewardAmount?: InputMaybe<Scalars['BigInt']['input']>;
  indexingRewardAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  indexingRewardAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  indexingRewardAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  indexingRewardAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  indexingRewardAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  indexingRewardAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  indexingRewardAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  indexingIndexerRewardAmount?: InputMaybe<Scalars['BigInt']['input']>;
  indexingIndexerRewardAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  indexingIndexerRewardAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  indexingIndexerRewardAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  indexingIndexerRewardAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  indexingIndexerRewardAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  indexingIndexerRewardAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  indexingIndexerRewardAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  indexingDelegatorRewardAmount?: InputMaybe<Scalars['BigInt']['input']>;
  indexingDelegatorRewardAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  indexingDelegatorRewardAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  indexingDelegatorRewardAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  indexingDelegatorRewardAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  indexingDelegatorRewardAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  indexingDelegatorRewardAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  indexingDelegatorRewardAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queryFeesAmount?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeesAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queryFeesAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queryFeeRebates?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_not?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_gt?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_lt?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_gte?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_lte?: InputMaybe<Scalars['BigInt']['input']>;
  queryFeeRebates_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queryFeeRebates_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  curatorFeeRewards?: InputMaybe<Scalars['BigInt']['input']>;
  curatorFeeRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  curatorFeeRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  curatorFeeRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  curatorFeeRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  curatorFeeRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  curatorFeeRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  curatorFeeRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalledTokens?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalledTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  unsignalledTokens?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  unsignalledTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalAmount?: InputMaybe<Scalars['BigInt']['input']>;
  signalAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  signalAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  signalAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  signalAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  signalAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  signalAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pricePerShare?: InputMaybe<Scalars['BigDecimal']['input']>;
  pricePerShare_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  pricePerShare_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  pricePerShare_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  pricePerShare_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  pricePerShare_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  pricePerShare_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  pricePerShare_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  curatorSignals_?: InputMaybe<Signal_filter>;
  reserveRatio?: InputMaybe<Scalars['Int']['input']>;
  reserveRatio_not?: InputMaybe<Scalars['Int']['input']>;
  reserveRatio_gt?: InputMaybe<Scalars['Int']['input']>;
  reserveRatio_lt?: InputMaybe<Scalars['Int']['input']>;
  reserveRatio_gte?: InputMaybe<Scalars['Int']['input']>;
  reserveRatio_lte?: InputMaybe<Scalars['Int']['input']>;
  reserveRatio_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  reserveRatio_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  manifest?: InputMaybe<Scalars['String']['input']>;
  manifest_not?: InputMaybe<Scalars['String']['input']>;
  manifest_gt?: InputMaybe<Scalars['String']['input']>;
  manifest_lt?: InputMaybe<Scalars['String']['input']>;
  manifest_gte?: InputMaybe<Scalars['String']['input']>;
  manifest_lte?: InputMaybe<Scalars['String']['input']>;
  manifest_in?: InputMaybe<Array<Scalars['String']['input']>>;
  manifest_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  manifest_contains?: InputMaybe<Scalars['String']['input']>;
  manifest_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  manifest_not_contains?: InputMaybe<Scalars['String']['input']>;
  manifest_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  manifest_starts_with?: InputMaybe<Scalars['String']['input']>;
  manifest_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manifest_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  manifest_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manifest_ends_with?: InputMaybe<Scalars['String']['input']>;
  manifest_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manifest_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  manifest_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  manifest_?: InputMaybe<SubgraphDeploymentManifest_filter>;
  subgraphCount?: InputMaybe<Scalars['Int']['input']>;
  subgraphCount_not?: InputMaybe<Scalars['Int']['input']>;
  subgraphCount_gt?: InputMaybe<Scalars['Int']['input']>;
  subgraphCount_lt?: InputMaybe<Scalars['Int']['input']>;
  subgraphCount_gte?: InputMaybe<Scalars['Int']['input']>;
  subgraphCount_lte?: InputMaybe<Scalars['Int']['input']>;
  subgraphCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  subgraphCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeSubgraphCount?: InputMaybe<Scalars['Int']['input']>;
  activeSubgraphCount_not?: InputMaybe<Scalars['Int']['input']>;
  activeSubgraphCount_gt?: InputMaybe<Scalars['Int']['input']>;
  activeSubgraphCount_lt?: InputMaybe<Scalars['Int']['input']>;
  activeSubgraphCount_gte?: InputMaybe<Scalars['Int']['input']>;
  activeSubgraphCount_lte?: InputMaybe<Scalars['Int']['input']>;
  activeSubgraphCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  activeSubgraphCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  deprecatedSubgraphCount?: InputMaybe<Scalars['Int']['input']>;
  deprecatedSubgraphCount_not?: InputMaybe<Scalars['Int']['input']>;
  deprecatedSubgraphCount_gt?: InputMaybe<Scalars['Int']['input']>;
  deprecatedSubgraphCount_lt?: InputMaybe<Scalars['Int']['input']>;
  deprecatedSubgraphCount_gte?: InputMaybe<Scalars['Int']['input']>;
  deprecatedSubgraphCount_lte?: InputMaybe<Scalars['Int']['input']>;
  deprecatedSubgraphCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  deprecatedSubgraphCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  transferredToL2?: InputMaybe<Scalars['Boolean']['input']>;
  transferredToL2_not?: InputMaybe<Scalars['Boolean']['input']>;
  transferredToL2_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  transferredToL2_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  transferredToL2At?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_not?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_gt?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_lt?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_gte?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_lte?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferredToL2At_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferredToL2AtBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferredToL2AtBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferredToL2AtTx?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_gt?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_lt?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_gte?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_lte?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transferredToL2AtTx_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transferredToL2AtTx_contains?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_contains?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_starts_with?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_ends_with?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signalledTokensSentToL2?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_not?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_gt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_lt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_gte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_lte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalledTokensSentToL2_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalledTokensReceivedOnL2?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_not?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_gt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_lt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_gte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_lte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalledTokensReceivedOnL2_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SubgraphDeployment_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SubgraphDeployment_filter>>>;
};

export type SubgraphDeployment_orderBy =
  | 'id'
  | 'ipfsHash'
  | 'versions'
  | 'createdAt'
  | 'deniedAt'
  | 'originalName'
  | 'stakedTokens'
  | 'indexerAllocations'
  | 'indexingRewardAmount'
  | 'indexingIndexerRewardAmount'
  | 'indexingDelegatorRewardAmount'
  | 'queryFeesAmount'
  | 'queryFeeRebates'
  | 'curatorFeeRewards'
  | 'signalledTokens'
  | 'unsignalledTokens'
  | 'signalAmount'
  | 'pricePerShare'
  | 'curatorSignals'
  | 'reserveRatio'
  | 'manifest'
  | 'manifest__id'
  | 'manifest__schemaIpfsHash'
  | 'manifest__manifest'
  | 'manifest__network'
  | 'manifest__poweredBySubstreams'
  | 'manifest__startBlock'
  | 'subgraphCount'
  | 'activeSubgraphCount'
  | 'deprecatedSubgraphCount'
  | 'transferredToL2'
  | 'transferredToL2At'
  | 'transferredToL2AtBlockNumber'
  | 'transferredToL2AtTx'
  | 'signalledTokensSentToL2'
  | 'signalledTokensReceivedOnL2';

export type SubgraphMeta = {
  /** Subgraph metadata ipfs hash */
  id: Scalars['ID']['output'];
  /** Subgraph that reference this metadata. For compatibility purposes. For the full list use subgraphs */
  subgraph?: Maybe<Subgraph>;
  /** Subgraphs that reference this metadata */
  subgraphs: Array<Subgraph>;
  /** Short description of the subgraph */
  description?: Maybe<Scalars['String']['output']>;
  /** Image in string format */
  image?: Maybe<Scalars['String']['output']>;
  /** NFT Image representation */
  nftImage?: Maybe<Scalars['String']['output']>;
  /** Location of the code for this project */
  codeRepository?: Maybe<Scalars['String']['output']>;
  /** Projects website */
  website?: Maybe<Scalars['String']['output']>;
  /** Display name */
  displayName?: Maybe<Scalars['String']['output']>;
  /** Categories that the subgraph belongs to. */
  categories?: Maybe<Array<Scalars['String']['output']>>;
};


export type SubgraphMetasubgraphsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Subgraph_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Subgraph_filter>;
};

export type SubgraphMeta_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  subgraph_?: InputMaybe<Subgraph_filter>;
  subgraphs_?: InputMaybe<Subgraph_filter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  image_not?: InputMaybe<Scalars['String']['input']>;
  image_gt?: InputMaybe<Scalars['String']['input']>;
  image_lt?: InputMaybe<Scalars['String']['input']>;
  image_gte?: InputMaybe<Scalars['String']['input']>;
  image_lte?: InputMaybe<Scalars['String']['input']>;
  image_in?: InputMaybe<Array<Scalars['String']['input']>>;
  image_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  image_contains?: InputMaybe<Scalars['String']['input']>;
  image_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  image_not_contains?: InputMaybe<Scalars['String']['input']>;
  image_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  image_starts_with?: InputMaybe<Scalars['String']['input']>;
  image_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  image_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  image_ends_with?: InputMaybe<Scalars['String']['input']>;
  image_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  image_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nftImage?: InputMaybe<Scalars['String']['input']>;
  nftImage_not?: InputMaybe<Scalars['String']['input']>;
  nftImage_gt?: InputMaybe<Scalars['String']['input']>;
  nftImage_lt?: InputMaybe<Scalars['String']['input']>;
  nftImage_gte?: InputMaybe<Scalars['String']['input']>;
  nftImage_lte?: InputMaybe<Scalars['String']['input']>;
  nftImage_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nftImage_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nftImage_contains?: InputMaybe<Scalars['String']['input']>;
  nftImage_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nftImage_not_contains?: InputMaybe<Scalars['String']['input']>;
  nftImage_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nftImage_starts_with?: InputMaybe<Scalars['String']['input']>;
  nftImage_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nftImage_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  nftImage_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nftImage_ends_with?: InputMaybe<Scalars['String']['input']>;
  nftImage_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nftImage_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  nftImage_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  codeRepository?: InputMaybe<Scalars['String']['input']>;
  codeRepository_not?: InputMaybe<Scalars['String']['input']>;
  codeRepository_gt?: InputMaybe<Scalars['String']['input']>;
  codeRepository_lt?: InputMaybe<Scalars['String']['input']>;
  codeRepository_gte?: InputMaybe<Scalars['String']['input']>;
  codeRepository_lte?: InputMaybe<Scalars['String']['input']>;
  codeRepository_in?: InputMaybe<Array<Scalars['String']['input']>>;
  codeRepository_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  codeRepository_contains?: InputMaybe<Scalars['String']['input']>;
  codeRepository_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  codeRepository_not_contains?: InputMaybe<Scalars['String']['input']>;
  codeRepository_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  codeRepository_starts_with?: InputMaybe<Scalars['String']['input']>;
  codeRepository_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  codeRepository_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  codeRepository_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  codeRepository_ends_with?: InputMaybe<Scalars['String']['input']>;
  codeRepository_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  codeRepository_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  codeRepository_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
  website_not?: InputMaybe<Scalars['String']['input']>;
  website_gt?: InputMaybe<Scalars['String']['input']>;
  website_lt?: InputMaybe<Scalars['String']['input']>;
  website_gte?: InputMaybe<Scalars['String']['input']>;
  website_lte?: InputMaybe<Scalars['String']['input']>;
  website_in?: InputMaybe<Array<Scalars['String']['input']>>;
  website_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  website_contains?: InputMaybe<Scalars['String']['input']>;
  website_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  website_not_contains?: InputMaybe<Scalars['String']['input']>;
  website_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  website_starts_with?: InputMaybe<Scalars['String']['input']>;
  website_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  website_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  website_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  website_ends_with?: InputMaybe<Scalars['String']['input']>;
  website_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  website_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  website_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  displayName_not?: InputMaybe<Scalars['String']['input']>;
  displayName_gt?: InputMaybe<Scalars['String']['input']>;
  displayName_lt?: InputMaybe<Scalars['String']['input']>;
  displayName_gte?: InputMaybe<Scalars['String']['input']>;
  displayName_lte?: InputMaybe<Scalars['String']['input']>;
  displayName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  displayName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  displayName_contains?: InputMaybe<Scalars['String']['input']>;
  displayName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  displayName_not_contains?: InputMaybe<Scalars['String']['input']>;
  displayName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  displayName_starts_with?: InputMaybe<Scalars['String']['input']>;
  displayName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  displayName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  displayName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  displayName_ends_with?: InputMaybe<Scalars['String']['input']>;
  displayName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  displayName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  displayName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  categories_not?: InputMaybe<Array<Scalars['String']['input']>>;
  categories_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  categories_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  categories_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  categories_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SubgraphMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SubgraphMeta_filter>>>;
};

export type SubgraphMeta_orderBy =
  | 'id'
  | 'subgraph'
  | 'subgraph__id'
  | 'subgraph__versionCount'
  | 'subgraph__createdAt'
  | 'subgraph__updatedAt'
  | 'subgraph__active'
  | 'subgraph__migrated'
  | 'subgraph__startedTransferToL2'
  | 'subgraph__startedTransferToL2At'
  | 'subgraph__startedTransferToL2AtBlockNumber'
  | 'subgraph__startedTransferToL2AtTx'
  | 'subgraph__transferredToL2'
  | 'subgraph__transferredToL2At'
  | 'subgraph__transferredToL2AtBlockNumber'
  | 'subgraph__transferredToL2AtTx'
  | 'subgraph__signalledTokensSentToL2'
  | 'subgraph__signalledTokensReceivedOnL2'
  | 'subgraph__idOnL2'
  | 'subgraph__idOnL1'
  | 'subgraph__nftID'
  | 'subgraph__oldID'
  | 'subgraph__creatorAddress'
  | 'subgraph__subgraphNumber'
  | 'subgraph__initializing'
  | 'subgraph__entityVersion'
  | 'subgraph__signalledTokens'
  | 'subgraph__unsignalledTokens'
  | 'subgraph__currentSignalledTokens'
  | 'subgraph__nameSignalAmount'
  | 'subgraph__signalAmount'
  | 'subgraph__reserveRatio'
  | 'subgraph__withdrawableTokens'
  | 'subgraph__withdrawnTokens'
  | 'subgraph__nameSignalCount'
  | 'subgraph__metadataHash'
  | 'subgraphs'
  | 'description'
  | 'image'
  | 'nftImage'
  | 'codeRepository'
  | 'website'
  | 'displayName'
  | 'categories';

/**
 * The SubgraphVersion entity represents a version of the Subgraph. A new SubgraphVersion is created
 * whenever there is an update to the Subgraph triggered by the owner. The new SubgraphVersion can
 * then point to a new SubgraphDeployment, thus allowing the Subgraph to resolve to a different
 * deployment, while keeping the same endpoint. The metadata and label are stored on IPFS. The label
 * is for the developer to provide a semantic version. This is different from the version, which is
 * just a counter than increases each time a new SubgraphVersion is created for a Subgraph.
 *
 */
export type SubgraphVersion = {
  /** Concatenation of subgraph, subgraph deployment, and version ID */
  id: Scalars['ID']['output'];
  /** Subgraph of this version */
  subgraph: Subgraph;
  /** Subgraph deployment of this version */
  subgraphDeployment: SubgraphDeployment;
  /** Version number */
  version: Scalars['Int']['output'];
  /** Creation timestamp */
  createdAt: Scalars['Int']['output'];
  metadataHash?: Maybe<Scalars['Bytes']['output']>;
  metadata?: Maybe<SubgraphVersionMeta>;
  entityVersion: Scalars['Int']['output'];
  /** [DEPRECATED] Used for duplicate entities to enable old IDs from before the subgraph NFT update */
  linkedEntity?: Maybe<SubgraphVersion>;
};

export type SubgraphVersionMeta = {
  /** Subgraph version metadata ipfs hash */
  id: Scalars['ID']['output'];
  /** SubgraphVersion entity that references this metadata. For compatibility purposes. For the full list use subgraphVersions */
  subgraphVersion?: Maybe<SubgraphVersion>;
  /** SubgraphVersion entities that reference this metadata */
  subgraphVersions: Array<SubgraphVersion>;
  /** Short description of the version */
  description?: Maybe<Scalars['String']['output']>;
  /** Semantic versioning label */
  label?: Maybe<Scalars['String']['output']>;
};


export type SubgraphVersionMetasubgraphVersionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubgraphVersion_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubgraphVersion_filter>;
};

export type SubgraphVersionMeta_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  subgraphVersion_?: InputMaybe<SubgraphVersion_filter>;
  subgraphVersions_?: InputMaybe<SubgraphVersion_filter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  label_not?: InputMaybe<Scalars['String']['input']>;
  label_gt?: InputMaybe<Scalars['String']['input']>;
  label_lt?: InputMaybe<Scalars['String']['input']>;
  label_gte?: InputMaybe<Scalars['String']['input']>;
  label_lte?: InputMaybe<Scalars['String']['input']>;
  label_in?: InputMaybe<Array<Scalars['String']['input']>>;
  label_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  label_contains?: InputMaybe<Scalars['String']['input']>;
  label_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  label_not_contains?: InputMaybe<Scalars['String']['input']>;
  label_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  label_starts_with?: InputMaybe<Scalars['String']['input']>;
  label_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  label_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  label_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  label_ends_with?: InputMaybe<Scalars['String']['input']>;
  label_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  label_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  label_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SubgraphVersionMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SubgraphVersionMeta_filter>>>;
};

export type SubgraphVersionMeta_orderBy =
  | 'id'
  | 'subgraphVersion'
  | 'subgraphVersion__id'
  | 'subgraphVersion__version'
  | 'subgraphVersion__createdAt'
  | 'subgraphVersion__metadataHash'
  | 'subgraphVersion__entityVersion'
  | 'subgraphVersions'
  | 'description'
  | 'label';

export type SubgraphVersion_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  subgraph?: InputMaybe<Scalars['String']['input']>;
  subgraph_not?: InputMaybe<Scalars['String']['input']>;
  subgraph_gt?: InputMaybe<Scalars['String']['input']>;
  subgraph_lt?: InputMaybe<Scalars['String']['input']>;
  subgraph_gte?: InputMaybe<Scalars['String']['input']>;
  subgraph_lte?: InputMaybe<Scalars['String']['input']>;
  subgraph_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraph_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraph_contains?: InputMaybe<Scalars['String']['input']>;
  subgraph_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_contains?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraph_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraph_?: InputMaybe<Subgraph_filter>;
  subgraphDeployment?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_gt?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_lt?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_gte?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_lte?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraphDeployment_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  subgraphDeployment_contains?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_contains?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphDeployment_?: InputMaybe<SubgraphDeployment_filter>;
  version?: InputMaybe<Scalars['Int']['input']>;
  version_not?: InputMaybe<Scalars['Int']['input']>;
  version_gt?: InputMaybe<Scalars['Int']['input']>;
  version_lt?: InputMaybe<Scalars['Int']['input']>;
  version_gte?: InputMaybe<Scalars['Int']['input']>;
  version_lte?: InputMaybe<Scalars['Int']['input']>;
  version_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  version_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  metadataHash?: InputMaybe<Scalars['Bytes']['input']>;
  metadataHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  metadataHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  metadataHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  metadataHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  metadataHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  metadataHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  metadataHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  metadataHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  metadataHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  metadata?: InputMaybe<Scalars['String']['input']>;
  metadata_not?: InputMaybe<Scalars['String']['input']>;
  metadata_gt?: InputMaybe<Scalars['String']['input']>;
  metadata_lt?: InputMaybe<Scalars['String']['input']>;
  metadata_gte?: InputMaybe<Scalars['String']['input']>;
  metadata_lte?: InputMaybe<Scalars['String']['input']>;
  metadata_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metadata_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metadata_contains?: InputMaybe<Scalars['String']['input']>;
  metadata_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_not_contains?: InputMaybe<Scalars['String']['input']>;
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_starts_with?: InputMaybe<Scalars['String']['input']>;
  metadata_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  metadata_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_ends_with?: InputMaybe<Scalars['String']['input']>;
  metadata_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  metadata_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_?: InputMaybe<SubgraphVersionMeta_filter>;
  entityVersion?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_not?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_gt?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_lt?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_gte?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_lte?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  entityVersion_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  linkedEntity?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_gt?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_lt?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_gte?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_lte?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_in?: InputMaybe<Array<Scalars['String']['input']>>;
  linkedEntity_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  linkedEntity_contains?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_contains?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_starts_with?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_ends_with?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_?: InputMaybe<SubgraphVersion_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SubgraphVersion_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SubgraphVersion_filter>>>;
};

export type SubgraphVersion_orderBy =
  | 'id'
  | 'subgraph'
  | 'subgraph__id'
  | 'subgraph__versionCount'
  | 'subgraph__createdAt'
  | 'subgraph__updatedAt'
  | 'subgraph__active'
  | 'subgraph__migrated'
  | 'subgraph__startedTransferToL2'
  | 'subgraph__startedTransferToL2At'
  | 'subgraph__startedTransferToL2AtBlockNumber'
  | 'subgraph__startedTransferToL2AtTx'
  | 'subgraph__transferredToL2'
  | 'subgraph__transferredToL2At'
  | 'subgraph__transferredToL2AtBlockNumber'
  | 'subgraph__transferredToL2AtTx'
  | 'subgraph__signalledTokensSentToL2'
  | 'subgraph__signalledTokensReceivedOnL2'
  | 'subgraph__idOnL2'
  | 'subgraph__idOnL1'
  | 'subgraph__nftID'
  | 'subgraph__oldID'
  | 'subgraph__creatorAddress'
  | 'subgraph__subgraphNumber'
  | 'subgraph__initializing'
  | 'subgraph__entityVersion'
  | 'subgraph__signalledTokens'
  | 'subgraph__unsignalledTokens'
  | 'subgraph__currentSignalledTokens'
  | 'subgraph__nameSignalAmount'
  | 'subgraph__signalAmount'
  | 'subgraph__reserveRatio'
  | 'subgraph__withdrawableTokens'
  | 'subgraph__withdrawnTokens'
  | 'subgraph__nameSignalCount'
  | 'subgraph__metadataHash'
  | 'subgraphDeployment'
  | 'subgraphDeployment__id'
  | 'subgraphDeployment__ipfsHash'
  | 'subgraphDeployment__createdAt'
  | 'subgraphDeployment__deniedAt'
  | 'subgraphDeployment__originalName'
  | 'subgraphDeployment__stakedTokens'
  | 'subgraphDeployment__indexingRewardAmount'
  | 'subgraphDeployment__indexingIndexerRewardAmount'
  | 'subgraphDeployment__indexingDelegatorRewardAmount'
  | 'subgraphDeployment__queryFeesAmount'
  | 'subgraphDeployment__queryFeeRebates'
  | 'subgraphDeployment__curatorFeeRewards'
  | 'subgraphDeployment__signalledTokens'
  | 'subgraphDeployment__unsignalledTokens'
  | 'subgraphDeployment__signalAmount'
  | 'subgraphDeployment__pricePerShare'
  | 'subgraphDeployment__reserveRatio'
  | 'subgraphDeployment__subgraphCount'
  | 'subgraphDeployment__activeSubgraphCount'
  | 'subgraphDeployment__deprecatedSubgraphCount'
  | 'subgraphDeployment__transferredToL2'
  | 'subgraphDeployment__transferredToL2At'
  | 'subgraphDeployment__transferredToL2AtBlockNumber'
  | 'subgraphDeployment__transferredToL2AtTx'
  | 'subgraphDeployment__signalledTokensSentToL2'
  | 'subgraphDeployment__signalledTokensReceivedOnL2'
  | 'version'
  | 'createdAt'
  | 'metadataHash'
  | 'metadata'
  | 'metadata__id'
  | 'metadata__description'
  | 'metadata__label'
  | 'entityVersion'
  | 'linkedEntity'
  | 'linkedEntity__id'
  | 'linkedEntity__version'
  | 'linkedEntity__createdAt'
  | 'linkedEntity__metadataHash'
  | 'linkedEntity__entityVersion';

export type Subgraph_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<GraphAccount_filter>;
  currentVersion?: InputMaybe<Scalars['String']['input']>;
  currentVersion_not?: InputMaybe<Scalars['String']['input']>;
  currentVersion_gt?: InputMaybe<Scalars['String']['input']>;
  currentVersion_lt?: InputMaybe<Scalars['String']['input']>;
  currentVersion_gte?: InputMaybe<Scalars['String']['input']>;
  currentVersion_lte?: InputMaybe<Scalars['String']['input']>;
  currentVersion_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currentVersion_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currentVersion_contains?: InputMaybe<Scalars['String']['input']>;
  currentVersion_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  currentVersion_not_contains?: InputMaybe<Scalars['String']['input']>;
  currentVersion_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  currentVersion_starts_with?: InputMaybe<Scalars['String']['input']>;
  currentVersion_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentVersion_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  currentVersion_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentVersion_ends_with?: InputMaybe<Scalars['String']['input']>;
  currentVersion_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentVersion_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  currentVersion_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentVersion_?: InputMaybe<SubgraphVersion_filter>;
  pastVersions_?: InputMaybe<SubgraphVersion_filter>;
  versions_?: InputMaybe<SubgraphVersion_filter>;
  versionCount?: InputMaybe<Scalars['BigInt']['input']>;
  versionCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  versionCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  versionCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  versionCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  versionCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  versionCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  versionCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  updatedAt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_not?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_lt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  active_not?: InputMaybe<Scalars['Boolean']['input']>;
  active_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  active_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  migrated?: InputMaybe<Scalars['Boolean']['input']>;
  migrated_not?: InputMaybe<Scalars['Boolean']['input']>;
  migrated_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  migrated_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  startedTransferToL2?: InputMaybe<Scalars['Boolean']['input']>;
  startedTransferToL2_not?: InputMaybe<Scalars['Boolean']['input']>;
  startedTransferToL2_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  startedTransferToL2_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  startedTransferToL2At?: InputMaybe<Scalars['BigInt']['input']>;
  startedTransferToL2At_not?: InputMaybe<Scalars['BigInt']['input']>;
  startedTransferToL2At_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startedTransferToL2At_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startedTransferToL2At_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startedTransferToL2At_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startedTransferToL2At_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startedTransferToL2At_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startedTransferToL2AtBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  startedTransferToL2AtBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  startedTransferToL2AtBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startedTransferToL2AtBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startedTransferToL2AtBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startedTransferToL2AtBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startedTransferToL2AtBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startedTransferToL2AtBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startedTransferToL2AtTx?: InputMaybe<Scalars['String']['input']>;
  startedTransferToL2AtTx_not?: InputMaybe<Scalars['String']['input']>;
  startedTransferToL2AtTx_gt?: InputMaybe<Scalars['String']['input']>;
  startedTransferToL2AtTx_lt?: InputMaybe<Scalars['String']['input']>;
  startedTransferToL2AtTx_gte?: InputMaybe<Scalars['String']['input']>;
  startedTransferToL2AtTx_lte?: InputMaybe<Scalars['String']['input']>;
  startedTransferToL2AtTx_in?: InputMaybe<Array<Scalars['String']['input']>>;
  startedTransferToL2AtTx_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  startedTransferToL2AtTx_contains?: InputMaybe<Scalars['String']['input']>;
  startedTransferToL2AtTx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  startedTransferToL2AtTx_not_contains?: InputMaybe<Scalars['String']['input']>;
  startedTransferToL2AtTx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  startedTransferToL2AtTx_starts_with?: InputMaybe<Scalars['String']['input']>;
  startedTransferToL2AtTx_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  startedTransferToL2AtTx_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  startedTransferToL2AtTx_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  startedTransferToL2AtTx_ends_with?: InputMaybe<Scalars['String']['input']>;
  startedTransferToL2AtTx_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  startedTransferToL2AtTx_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  startedTransferToL2AtTx_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2?: InputMaybe<Scalars['Boolean']['input']>;
  transferredToL2_not?: InputMaybe<Scalars['Boolean']['input']>;
  transferredToL2_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  transferredToL2_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  transferredToL2At?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_not?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_gt?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_lt?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_gte?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_lte?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2At_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferredToL2At_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferredToL2AtBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  transferredToL2AtBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferredToL2AtBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferredToL2AtTx?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_gt?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_lt?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_gte?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_lte?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transferredToL2AtTx_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transferredToL2AtTx_contains?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_contains?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_starts_with?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_ends_with?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transferredToL2AtTx_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signalledTokensSentToL2?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_not?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_gt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_lt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_gte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_lte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensSentToL2_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalledTokensSentToL2_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalledTokensReceivedOnL2?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_not?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_gt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_lt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_gte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_lte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokensReceivedOnL2_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalledTokensReceivedOnL2_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  idOnL2?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not?: InputMaybe<Scalars['String']['input']>;
  idOnL2_gt?: InputMaybe<Scalars['String']['input']>;
  idOnL2_lt?: InputMaybe<Scalars['String']['input']>;
  idOnL2_gte?: InputMaybe<Scalars['String']['input']>;
  idOnL2_lte?: InputMaybe<Scalars['String']['input']>;
  idOnL2_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idOnL2_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idOnL2_contains?: InputMaybe<Scalars['String']['input']>;
  idOnL2_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_contains?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_starts_with?: InputMaybe<Scalars['String']['input']>;
  idOnL2_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_ends_with?: InputMaybe<Scalars['String']['input']>;
  idOnL2_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  idOnL2_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not?: InputMaybe<Scalars['String']['input']>;
  idOnL1_gt?: InputMaybe<Scalars['String']['input']>;
  idOnL1_lt?: InputMaybe<Scalars['String']['input']>;
  idOnL1_gte?: InputMaybe<Scalars['String']['input']>;
  idOnL1_lte?: InputMaybe<Scalars['String']['input']>;
  idOnL1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idOnL1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  idOnL1_contains?: InputMaybe<Scalars['String']['input']>;
  idOnL1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_contains?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_starts_with?: InputMaybe<Scalars['String']['input']>;
  idOnL1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_ends_with?: InputMaybe<Scalars['String']['input']>;
  idOnL1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  idOnL1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nftID?: InputMaybe<Scalars['String']['input']>;
  nftID_not?: InputMaybe<Scalars['String']['input']>;
  nftID_gt?: InputMaybe<Scalars['String']['input']>;
  nftID_lt?: InputMaybe<Scalars['String']['input']>;
  nftID_gte?: InputMaybe<Scalars['String']['input']>;
  nftID_lte?: InputMaybe<Scalars['String']['input']>;
  nftID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nftID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nftID_contains?: InputMaybe<Scalars['String']['input']>;
  nftID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nftID_not_contains?: InputMaybe<Scalars['String']['input']>;
  nftID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nftID_starts_with?: InputMaybe<Scalars['String']['input']>;
  nftID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nftID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  nftID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nftID_ends_with?: InputMaybe<Scalars['String']['input']>;
  nftID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nftID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  nftID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  oldID?: InputMaybe<Scalars['String']['input']>;
  oldID_not?: InputMaybe<Scalars['String']['input']>;
  oldID_gt?: InputMaybe<Scalars['String']['input']>;
  oldID_lt?: InputMaybe<Scalars['String']['input']>;
  oldID_gte?: InputMaybe<Scalars['String']['input']>;
  oldID_lte?: InputMaybe<Scalars['String']['input']>;
  oldID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  oldID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  oldID_contains?: InputMaybe<Scalars['String']['input']>;
  oldID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  oldID_not_contains?: InputMaybe<Scalars['String']['input']>;
  oldID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  oldID_starts_with?: InputMaybe<Scalars['String']['input']>;
  oldID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  oldID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  oldID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  oldID_ends_with?: InputMaybe<Scalars['String']['input']>;
  oldID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  oldID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  oldID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorAddress?: InputMaybe<Scalars['Bytes']['input']>;
  creatorAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  creatorAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  creatorAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  creatorAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  creatorAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  creatorAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creatorAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creatorAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  creatorAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  subgraphNumber?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  subgraphNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  initializing?: InputMaybe<Scalars['Boolean']['input']>;
  initializing_not?: InputMaybe<Scalars['Boolean']['input']>;
  initializing_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  initializing_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  entityVersion?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_not?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_gt?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_lt?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_gte?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_lte?: InputMaybe<Scalars['Int']['input']>;
  entityVersion_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  entityVersion_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  linkedEntity?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_gt?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_lt?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_gte?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_lte?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_in?: InputMaybe<Array<Scalars['String']['input']>>;
  linkedEntity_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  linkedEntity_contains?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_contains?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_starts_with?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_ends_with?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  linkedEntity_?: InputMaybe<Subgraph_filter>;
  signalledTokens?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  signalledTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalledTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  unsignalledTokens?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  unsignalledTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  unsignalledTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentSignalledTokens?: InputMaybe<Scalars['BigInt']['input']>;
  currentSignalledTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  currentSignalledTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currentSignalledTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currentSignalledTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currentSignalledTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currentSignalledTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentSignalledTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nameSignalAmount?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignalAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignalAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignalAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignalAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignalAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  nameSignalAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nameSignalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalAmount?: InputMaybe<Scalars['BigInt']['input']>;
  signalAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  signalAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  signalAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  signalAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  signalAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  signalAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reserveRatio?: InputMaybe<Scalars['Int']['input']>;
  reserveRatio_not?: InputMaybe<Scalars['Int']['input']>;
  reserveRatio_gt?: InputMaybe<Scalars['Int']['input']>;
  reserveRatio_lt?: InputMaybe<Scalars['Int']['input']>;
  reserveRatio_gte?: InputMaybe<Scalars['Int']['input']>;
  reserveRatio_lte?: InputMaybe<Scalars['Int']['input']>;
  reserveRatio_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  reserveRatio_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  withdrawableTokens?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawableTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawableTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawableTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawableTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawableTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawableTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawableTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawnTokens?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnTokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawnTokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nameSignals_?: InputMaybe<NameSignal_filter>;
  nameSignalCount?: InputMaybe<Scalars['Int']['input']>;
  nameSignalCount_not?: InputMaybe<Scalars['Int']['input']>;
  nameSignalCount_gt?: InputMaybe<Scalars['Int']['input']>;
  nameSignalCount_lt?: InputMaybe<Scalars['Int']['input']>;
  nameSignalCount_gte?: InputMaybe<Scalars['Int']['input']>;
  nameSignalCount_lte?: InputMaybe<Scalars['Int']['input']>;
  nameSignalCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  nameSignalCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  metadataHash?: InputMaybe<Scalars['Bytes']['input']>;
  metadataHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  metadataHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  metadataHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  metadataHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  metadataHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  metadataHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  metadataHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  metadataHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  metadataHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  metadata?: InputMaybe<Scalars['String']['input']>;
  metadata_not?: InputMaybe<Scalars['String']['input']>;
  metadata_gt?: InputMaybe<Scalars['String']['input']>;
  metadata_lt?: InputMaybe<Scalars['String']['input']>;
  metadata_gte?: InputMaybe<Scalars['String']['input']>;
  metadata_lte?: InputMaybe<Scalars['String']['input']>;
  metadata_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metadata_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metadata_contains?: InputMaybe<Scalars['String']['input']>;
  metadata_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_not_contains?: InputMaybe<Scalars['String']['input']>;
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_starts_with?: InputMaybe<Scalars['String']['input']>;
  metadata_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  metadata_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_ends_with?: InputMaybe<Scalars['String']['input']>;
  metadata_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  metadata_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_?: InputMaybe<SubgraphMeta_filter>;
  currentVersionRelationEntity?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_not?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_gt?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_lt?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_gte?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_lte?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currentVersionRelationEntity_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currentVersionRelationEntity_contains?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_not_contains?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_starts_with?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_ends_with?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentVersionRelationEntity_?: InputMaybe<CurrentSubgraphDeploymentRelation_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Subgraph_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Subgraph_filter>>>;
};

export type Subgraph_orderBy =
  | 'id'
  | 'owner'
  | 'owner__id'
  | 'owner__createdAt'
  | 'owner__defaultDisplayName'
  | 'owner__balance'
  | 'owner__balanceReceivedFromL1Signalling'
  | 'owner__balanceReceivedFromL1Delegation'
  | 'owner__curationApproval'
  | 'owner__stakingApproval'
  | 'owner__gnsApproval'
  | 'owner__developerCreatedAt'
  | 'owner__subgraphQueryFees'
  | 'currentVersion'
  | 'currentVersion__id'
  | 'currentVersion__version'
  | 'currentVersion__createdAt'
  | 'currentVersion__metadataHash'
  | 'currentVersion__entityVersion'
  | 'pastVersions'
  | 'versions'
  | 'versionCount'
  | 'createdAt'
  | 'updatedAt'
  | 'active'
  | 'migrated'
  | 'startedTransferToL2'
  | 'startedTransferToL2At'
  | 'startedTransferToL2AtBlockNumber'
  | 'startedTransferToL2AtTx'
  | 'transferredToL2'
  | 'transferredToL2At'
  | 'transferredToL2AtBlockNumber'
  | 'transferredToL2AtTx'
  | 'signalledTokensSentToL2'
  | 'signalledTokensReceivedOnL2'
  | 'idOnL2'
  | 'idOnL1'
  | 'nftID'
  | 'oldID'
  | 'creatorAddress'
  | 'subgraphNumber'
  | 'initializing'
  | 'entityVersion'
  | 'linkedEntity'
  | 'linkedEntity__id'
  | 'linkedEntity__versionCount'
  | 'linkedEntity__createdAt'
  | 'linkedEntity__updatedAt'
  | 'linkedEntity__active'
  | 'linkedEntity__migrated'
  | 'linkedEntity__startedTransferToL2'
  | 'linkedEntity__startedTransferToL2At'
  | 'linkedEntity__startedTransferToL2AtBlockNumber'
  | 'linkedEntity__startedTransferToL2AtTx'
  | 'linkedEntity__transferredToL2'
  | 'linkedEntity__transferredToL2At'
  | 'linkedEntity__transferredToL2AtBlockNumber'
  | 'linkedEntity__transferredToL2AtTx'
  | 'linkedEntity__signalledTokensSentToL2'
  | 'linkedEntity__signalledTokensReceivedOnL2'
  | 'linkedEntity__idOnL2'
  | 'linkedEntity__idOnL1'
  | 'linkedEntity__nftID'
  | 'linkedEntity__oldID'
  | 'linkedEntity__creatorAddress'
  | 'linkedEntity__subgraphNumber'
  | 'linkedEntity__initializing'
  | 'linkedEntity__entityVersion'
  | 'linkedEntity__signalledTokens'
  | 'linkedEntity__unsignalledTokens'
  | 'linkedEntity__currentSignalledTokens'
  | 'linkedEntity__nameSignalAmount'
  | 'linkedEntity__signalAmount'
  | 'linkedEntity__reserveRatio'
  | 'linkedEntity__withdrawableTokens'
  | 'linkedEntity__withdrawnTokens'
  | 'linkedEntity__nameSignalCount'
  | 'linkedEntity__metadataHash'
  | 'signalledTokens'
  | 'unsignalledTokens'
  | 'currentSignalledTokens'
  | 'nameSignalAmount'
  | 'signalAmount'
  | 'reserveRatio'
  | 'withdrawableTokens'
  | 'withdrawnTokens'
  | 'nameSignals'
  | 'nameSignalCount'
  | 'metadataHash'
  | 'metadata'
  | 'metadata__id'
  | 'metadata__description'
  | 'metadata__image'
  | 'metadata__nftImage'
  | 'metadata__codeRepository'
  | 'metadata__website'
  | 'metadata__displayName'
  | 'currentVersionRelationEntity'
  | 'currentVersionRelationEntity__id'
  | 'currentVersionRelationEntity__active';

export type Subscription = {
  graphNetwork?: Maybe<GraphNetwork>;
  graphNetworks: Array<GraphNetwork>;
  graphAccount?: Maybe<GraphAccount>;
  graphAccounts: Array<GraphAccount>;
  graphAccountMeta?: Maybe<GraphAccountMeta>;
  graphAccountMetas: Array<GraphAccountMeta>;
  graphAccountName?: Maybe<GraphAccountName>;
  graphAccountNames: Array<GraphAccountName>;
  subgraph?: Maybe<Subgraph>;
  subgraphs: Array<Subgraph>;
  subgraphMeta?: Maybe<SubgraphMeta>;
  subgraphMetas: Array<SubgraphMeta>;
  currentSubgraphDeploymentRelation?: Maybe<CurrentSubgraphDeploymentRelation>;
  currentSubgraphDeploymentRelations: Array<CurrentSubgraphDeploymentRelation>;
  subgraphVersion?: Maybe<SubgraphVersion>;
  subgraphVersions: Array<SubgraphVersion>;
  subgraphVersionMeta?: Maybe<SubgraphVersionMeta>;
  subgraphVersionMetas: Array<SubgraphVersionMeta>;
  subgraphDeployment?: Maybe<SubgraphDeployment>;
  subgraphDeployments: Array<SubgraphDeployment>;
  subgraphDeploymentSchema?: Maybe<SubgraphDeploymentSchema>;
  subgraphDeploymentSchemas: Array<SubgraphDeploymentSchema>;
  subgraphDeploymentManifest?: Maybe<SubgraphDeploymentManifest>;
  subgraphDeploymentManifests: Array<SubgraphDeploymentManifest>;
  indexer?: Maybe<Indexer>;
  indexers: Array<Indexer>;
  allocation?: Maybe<Allocation>;
  allocations: Array<Allocation>;
  pool?: Maybe<Pool>;
  pools: Array<Pool>;
  delegator?: Maybe<Delegator>;
  delegators: Array<Delegator>;
  delegatedStake?: Maybe<DelegatedStake>;
  delegatedStakes: Array<DelegatedStake>;
  curator?: Maybe<Curator>;
  curators: Array<Curator>;
  signal?: Maybe<Signal>;
  signals: Array<Signal>;
  nameSignal?: Maybe<NameSignal>;
  nameSignals: Array<NameSignal>;
  nameSignalSubgraphRelation?: Maybe<NameSignalSubgraphRelation>;
  nameSignalSubgraphRelations: Array<NameSignalSubgraphRelation>;
  dispute?: Maybe<Dispute>;
  disputes: Array<Dispute>;
  attestation?: Maybe<Attestation>;
  attestations: Array<Attestation>;
  epoch?: Maybe<Epoch>;
  epoches: Array<Epoch>;
  nameSignalTransaction?: Maybe<NameSignalTransaction>;
  nameSignalTransactions: Array<NameSignalTransaction>;
  signalTransaction?: Maybe<SignalTransaction>;
  signalTransactions: Array<SignalTransaction>;
  bridgeWithdrawalTransaction?: Maybe<BridgeWithdrawalTransaction>;
  bridgeWithdrawalTransactions: Array<BridgeWithdrawalTransaction>;
  bridgeDepositTransaction?: Maybe<BridgeDepositTransaction>;
  bridgeDepositTransactions: Array<BridgeDepositTransaction>;
  retryableTicket?: Maybe<RetryableTicket>;
  retryableTickets: Array<RetryableTicket>;
  retryableTicketRedeemAttempt?: Maybe<RetryableTicketRedeemAttempt>;
  retryableTicketRedeemAttempts: Array<RetryableTicketRedeemAttempt>;
  tokenManager?: Maybe<TokenManager>;
  tokenManagers: Array<TokenManager>;
  authorizedFunction?: Maybe<AuthorizedFunction>;
  authorizedFunctions: Array<AuthorizedFunction>;
  tokenLockWallet?: Maybe<TokenLockWallet>;
  tokenLockWallets: Array<TokenLockWallet>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptiongraphNetworkArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongraphNetworksArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GraphNetwork_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GraphNetwork_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongraphAccountArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongraphAccountsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GraphAccount_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GraphAccount_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongraphAccountMetaArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongraphAccountMetasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GraphAccountMeta_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GraphAccountMeta_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongraphAccountNameArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongraphAccountNamesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GraphAccountName_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GraphAccountName_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubgraphArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubgraphsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Subgraph_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Subgraph_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubgraphMetaArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubgraphMetasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubgraphMeta_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubgraphMeta_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncurrentSubgraphDeploymentRelationArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncurrentSubgraphDeploymentRelationsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CurrentSubgraphDeploymentRelation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CurrentSubgraphDeploymentRelation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubgraphVersionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubgraphVersionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubgraphVersion_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubgraphVersion_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubgraphVersionMetaArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubgraphVersionMetasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubgraphVersionMeta_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubgraphVersionMeta_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubgraphDeploymentArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubgraphDeploymentsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubgraphDeployment_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubgraphDeployment_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubgraphDeploymentSchemaArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubgraphDeploymentSchemasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubgraphDeploymentSchema_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubgraphDeploymentSchema_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubgraphDeploymentManifestArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubgraphDeploymentManifestsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SubgraphDeploymentManifest_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubgraphDeploymentManifest_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionindexerArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionindexersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Indexer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Indexer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionallocationArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionallocationsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Allocation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Allocation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpoolArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpoolsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Pool_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pool_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegatorArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegatorsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Delegator_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Delegator_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegatedStakeArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegatedStakesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DelegatedStake_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DelegatedStake_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncuratorArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncuratorsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Curator_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Curator_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsignalArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsignalsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Signal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Signal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnameSignalArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnameSignalsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NameSignal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NameSignal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnameSignalSubgraphRelationArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnameSignalSubgraphRelationsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NameSignalSubgraphRelation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NameSignalSubgraphRelation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondisputeArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondisputesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Dispute_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Dispute_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionattestationArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionattestationsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Attestation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Attestation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionepochArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionepochesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Epoch_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Epoch_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnameSignalTransactionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnameSignalTransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NameSignalTransaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NameSignalTransaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsignalTransactionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsignalTransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SignalTransaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SignalTransaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbridgeWithdrawalTransactionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbridgeWithdrawalTransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeWithdrawalTransaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BridgeWithdrawalTransaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbridgeDepositTransactionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbridgeDepositTransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeDepositTransaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BridgeDepositTransaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionretryableTicketArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionretryableTicketsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RetryableTicket_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RetryableTicket_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionretryableTicketRedeemAttemptArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionretryableTicketRedeemAttemptsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RetryableTicketRedeemAttempt_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RetryableTicketRedeemAttempt_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenManagerArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenManagersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenManager_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenManager_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauthorizedFunctionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauthorizedFunctionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AuthorizedFunction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AuthorizedFunction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenLockWalletArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenLockWalletsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenLockWallet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenLockWallet_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransactionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Transaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

/**
 * Token Lock Wallets which hold locked GRT
 *
 */
export type TokenLockWallet = {
  /** The address of the token lock wallet */
  id: Scalars['ID']['output'];
  /** The Manager address */
  manager: Scalars['Bytes']['output'];
  /** The hash of the initializer */
  initHash: Scalars['Bytes']['output'];
  /** Address of the beneficiary of locked tokens */
  beneficiary: Scalars['Bytes']['output'];
  /** The token being used (GRT) */
  token: Scalars['Bytes']['output'];
  /** Amount of tokens to be managed by the lock contract */
  managedAmount: Scalars['BigInt']['output'];
  /** Start time of the release schedule */
  startTime: Scalars['BigInt']['output'];
  /** End time of the release schedule */
  endTime: Scalars['BigInt']['output'];
  /** Number of periods between start time and end time */
  periods: Scalars['BigInt']['output'];
  /** Time when the releases start */
  releaseStartTime: Scalars['BigInt']['output'];
  /** Time the cliff vests, 0 if no cliff */
  vestingCliffTime: Scalars['BigInt']['output'];
  /** Whether or not the contract is revocable */
  revocable?: Maybe<Revocability>;
  /** True if the beneficiary has approved addresses that the manager has approved */
  tokenDestinationsApproved: Scalars['Boolean']['output'];
  /** The amount of tokens that have been resleased */
  tokensReleased: Scalars['BigInt']['output'];
  /** The amount of tokens that have been withdrawn */
  tokensWithdrawn: Scalars['BigInt']['output'];
  /** The amount of tokens that have been revoked */
  tokensRevoked: Scalars['BigInt']['output'];
  /** The block this wlalet was created */
  blockNumberCreated: Scalars['BigInt']['output'];
  /** The creation tx hash of the wallet */
  txHash: Scalars['Bytes']['output'];
};

export type TokenLockWallet_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  manager?: InputMaybe<Scalars['Bytes']['input']>;
  manager_not?: InputMaybe<Scalars['Bytes']['input']>;
  manager_gt?: InputMaybe<Scalars['Bytes']['input']>;
  manager_lt?: InputMaybe<Scalars['Bytes']['input']>;
  manager_gte?: InputMaybe<Scalars['Bytes']['input']>;
  manager_lte?: InputMaybe<Scalars['Bytes']['input']>;
  manager_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  manager_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  manager_contains?: InputMaybe<Scalars['Bytes']['input']>;
  manager_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  initHash?: InputMaybe<Scalars['Bytes']['input']>;
  initHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  initHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  initHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  initHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  initHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  initHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  initHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  initHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  initHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  beneficiary?: InputMaybe<Scalars['Bytes']['input']>;
  beneficiary_not?: InputMaybe<Scalars['Bytes']['input']>;
  beneficiary_gt?: InputMaybe<Scalars['Bytes']['input']>;
  beneficiary_lt?: InputMaybe<Scalars['Bytes']['input']>;
  beneficiary_gte?: InputMaybe<Scalars['Bytes']['input']>;
  beneficiary_lte?: InputMaybe<Scalars['Bytes']['input']>;
  beneficiary_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  beneficiary_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  beneficiary_contains?: InputMaybe<Scalars['Bytes']['input']>;
  beneficiary_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  token?: InputMaybe<Scalars['Bytes']['input']>;
  token_not?: InputMaybe<Scalars['Bytes']['input']>;
  token_gt?: InputMaybe<Scalars['Bytes']['input']>;
  token_lt?: InputMaybe<Scalars['Bytes']['input']>;
  token_gte?: InputMaybe<Scalars['Bytes']['input']>;
  token_lte?: InputMaybe<Scalars['Bytes']['input']>;
  token_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  token_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  token_contains?: InputMaybe<Scalars['Bytes']['input']>;
  token_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  managedAmount?: InputMaybe<Scalars['BigInt']['input']>;
  managedAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  managedAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  managedAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  managedAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  managedAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  managedAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  managedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startTime?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endTime?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  periods?: InputMaybe<Scalars['BigInt']['input']>;
  periods_not?: InputMaybe<Scalars['BigInt']['input']>;
  periods_gt?: InputMaybe<Scalars['BigInt']['input']>;
  periods_lt?: InputMaybe<Scalars['BigInt']['input']>;
  periods_gte?: InputMaybe<Scalars['BigInt']['input']>;
  periods_lte?: InputMaybe<Scalars['BigInt']['input']>;
  periods_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  periods_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  releaseStartTime?: InputMaybe<Scalars['BigInt']['input']>;
  releaseStartTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  releaseStartTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  releaseStartTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  releaseStartTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  releaseStartTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  releaseStartTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  releaseStartTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vestingCliffTime?: InputMaybe<Scalars['BigInt']['input']>;
  vestingCliffTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  vestingCliffTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  vestingCliffTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  vestingCliffTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  vestingCliffTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  vestingCliffTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vestingCliffTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  revocable?: InputMaybe<Revocability>;
  revocable_not?: InputMaybe<Revocability>;
  revocable_in?: InputMaybe<Array<Revocability>>;
  revocable_not_in?: InputMaybe<Array<Revocability>>;
  tokenDestinationsApproved?: InputMaybe<Scalars['Boolean']['input']>;
  tokenDestinationsApproved_not?: InputMaybe<Scalars['Boolean']['input']>;
  tokenDestinationsApproved_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  tokenDestinationsApproved_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  tokensReleased?: InputMaybe<Scalars['BigInt']['input']>;
  tokensReleased_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokensReleased_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensReleased_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensReleased_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensReleased_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensReleased_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokensReleased_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokensWithdrawn?: InputMaybe<Scalars['BigInt']['input']>;
  tokensWithdrawn_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokensWithdrawn_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensWithdrawn_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensWithdrawn_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensWithdrawn_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensWithdrawn_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokensWithdrawn_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokensRevoked?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRevoked_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRevoked_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRevoked_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRevoked_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRevoked_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensRevoked_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokensRevoked_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumberCreated?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumberCreated_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumberCreated_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumberCreated_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumberCreated_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumberCreated_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumberCreated_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumberCreated_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txHash?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokenLockWallet_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TokenLockWallet_filter>>>;
};

export type TokenLockWallet_orderBy =
  | 'id'
  | 'manager'
  | 'initHash'
  | 'beneficiary'
  | 'token'
  | 'managedAmount'
  | 'startTime'
  | 'endTime'
  | 'periods'
  | 'releaseStartTime'
  | 'vestingCliffTime'
  | 'revocable'
  | 'tokenDestinationsApproved'
  | 'tokensReleased'
  | 'tokensWithdrawn'
  | 'tokensRevoked'
  | 'blockNumberCreated'
  | 'txHash';

/**
 * The Token manager data
 *
 */
export type TokenManager = {
  /** Token manager address */
  id: Scalars['ID']['output'];
  /** Master copy address */
  masterCopy: Scalars['Bytes']['output'];
  /** Tokens stored in manger through deposit or withdraw */
  tokens: Scalars['BigInt']['output'];
  /** List of addresses that are allowed to pull funds */
  tokenDestinations?: Maybe<Array<Scalars['Bytes']['output']>>;
  /** List of function call authorizations */
  authorizedFunctions?: Maybe<Array<AuthorizedFunction>>;
  /** Token lock count of contracts created */
  tokenLockCount: Scalars['BigInt']['output'];
};


/**
 * The Token manager data
 *
 */
export type TokenManagerauthorizedFunctionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AuthorizedFunction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AuthorizedFunction_filter>;
};

export type TokenManager_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  masterCopy?: InputMaybe<Scalars['Bytes']['input']>;
  masterCopy_not?: InputMaybe<Scalars['Bytes']['input']>;
  masterCopy_gt?: InputMaybe<Scalars['Bytes']['input']>;
  masterCopy_lt?: InputMaybe<Scalars['Bytes']['input']>;
  masterCopy_gte?: InputMaybe<Scalars['Bytes']['input']>;
  masterCopy_lte?: InputMaybe<Scalars['Bytes']['input']>;
  masterCopy_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  masterCopy_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  masterCopy_contains?: InputMaybe<Scalars['Bytes']['input']>;
  masterCopy_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokens?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokens_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokens_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenDestinations?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tokenDestinations_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tokenDestinations_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tokenDestinations_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tokenDestinations_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tokenDestinations_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  authorizedFunctions_?: InputMaybe<AuthorizedFunction_filter>;
  tokenLockCount?: InputMaybe<Scalars['BigInt']['input']>;
  tokenLockCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenLockCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenLockCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenLockCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenLockCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenLockCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenLockCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokenManager_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TokenManager_filter>>>;
};

export type TokenManager_orderBy =
  | 'id'
  | 'masterCopy'
  | 'tokens'
  | 'tokenDestinations'
  | 'authorizedFunctions'
  | 'tokenLockCount';

/**
 * A generic transaction in The Graph Network
 *
 */
export type Transaction = {
  /** Transaction hash concatenated with event log index */
  id: Scalars['ID']['output'];
  /** Block number for the transaction */
  blockNumber: Scalars['Int']['output'];
  /** Timestamp for the transaction */
  timestamp: Scalars['Int']['output'];
  /** Signer of the transaction */
  signer: GraphAccount;
  /** Type of Graph Network transaction */
  type: TransactionType;
};

export type TransactionType =
  | 'Stake'
  | 'Unstake'
  | 'MintSignal'
  | 'BurnSignal'
  | 'MintNSignal'
  | 'BurnNSignal'
  | 'BridgeWithdrawal'
  | 'BridgeDeposit';

export type Transaction_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  timestamp_not?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_lt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  signer?: InputMaybe<Scalars['String']['input']>;
  signer_not?: InputMaybe<Scalars['String']['input']>;
  signer_gt?: InputMaybe<Scalars['String']['input']>;
  signer_lt?: InputMaybe<Scalars['String']['input']>;
  signer_gte?: InputMaybe<Scalars['String']['input']>;
  signer_lte?: InputMaybe<Scalars['String']['input']>;
  signer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signer_contains?: InputMaybe<Scalars['String']['input']>;
  signer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_not_contains?: InputMaybe<Scalars['String']['input']>;
  signer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_starts_with?: InputMaybe<Scalars['String']['input']>;
  signer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  signer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_ends_with?: InputMaybe<Scalars['String']['input']>;
  signer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  signer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signer_?: InputMaybe<GraphAccount_filter>;
  type?: InputMaybe<TransactionType>;
  type_not?: InputMaybe<TransactionType>;
  type_in?: InputMaybe<Array<TransactionType>>;
  type_not_in?: InputMaybe<Array<TransactionType>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Transaction_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Transaction_filter>>>;
};

export type Transaction_orderBy =
  | 'id'
  | 'blockNumber'
  | 'timestamp'
  | 'signer'
  | 'signer__id'
  | 'signer__createdAt'
  | 'signer__defaultDisplayName'
  | 'signer__balance'
  | 'signer__balanceReceivedFromL1Signalling'
  | 'signer__balanceReceivedFromL1Delegation'
  | 'signer__curationApproval'
  | 'signer__stakingApproval'
  | 'signer__gnsApproval'
  | 'signer__developerCreatedAt'
  | 'signer__subgraphQueryFees'
  | 'type';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = ResolversObject<{
  Transaction: ( BridgeDepositTransaction ) | ( BridgeWithdrawalTransaction ) | ( NameSignalTransaction ) | ( SignalTransaction );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Aggregation_interval: Aggregation_interval;
  Allocation: ResolverTypeWrapper<Allocation>;
  AllocationStatus: AllocationStatus;
  Allocation_filter: Allocation_filter;
  Allocation_orderBy: Allocation_orderBy;
  Attestation: ResolverTypeWrapper<Attestation>;
  Attestation_filter: Attestation_filter;
  Attestation_orderBy: Attestation_orderBy;
  AuthorizedFunction: ResolverTypeWrapper<AuthorizedFunction>;
  AuthorizedFunction_filter: AuthorizedFunction_filter;
  AuthorizedFunction_orderBy: AuthorizedFunction_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BridgeDepositTransaction: ResolverTypeWrapper<BridgeDepositTransaction>;
  BridgeDepositTransaction_filter: BridgeDepositTransaction_filter;
  BridgeDepositTransaction_orderBy: BridgeDepositTransaction_orderBy;
  BridgeWithdrawalTransaction: ResolverTypeWrapper<BridgeWithdrawalTransaction>;
  BridgeWithdrawalTransaction_filter: BridgeWithdrawalTransaction_filter;
  BridgeWithdrawalTransaction_orderBy: BridgeWithdrawalTransaction_orderBy;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  Curator: ResolverTypeWrapper<Curator>;
  Curator_filter: Curator_filter;
  Curator_orderBy: Curator_orderBy;
  CurrentSubgraphDeploymentRelation: ResolverTypeWrapper<CurrentSubgraphDeploymentRelation>;
  CurrentSubgraphDeploymentRelation_filter: CurrentSubgraphDeploymentRelation_filter;
  CurrentSubgraphDeploymentRelation_orderBy: CurrentSubgraphDeploymentRelation_orderBy;
  DelegatedStake: ResolverTypeWrapper<DelegatedStake>;
  DelegatedStake_filter: DelegatedStake_filter;
  DelegatedStake_orderBy: DelegatedStake_orderBy;
  Delegator: ResolverTypeWrapper<Delegator>;
  Delegator_filter: Delegator_filter;
  Delegator_orderBy: Delegator_orderBy;
  Dispute: ResolverTypeWrapper<Dispute>;
  DisputeStatus: DisputeStatus;
  DisputeType: DisputeType;
  Dispute_filter: Dispute_filter;
  Dispute_orderBy: Dispute_orderBy;
  Epoch: ResolverTypeWrapper<Epoch>;
  Epoch_filter: Epoch_filter;
  Epoch_orderBy: Epoch_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GraphAccount: ResolverTypeWrapper<GraphAccount>;
  GraphAccountMeta: ResolverTypeWrapper<GraphAccountMeta>;
  GraphAccountMeta_filter: GraphAccountMeta_filter;
  GraphAccountMeta_orderBy: GraphAccountMeta_orderBy;
  GraphAccountName: ResolverTypeWrapper<GraphAccountName>;
  GraphAccountName_filter: GraphAccountName_filter;
  GraphAccountName_orderBy: GraphAccountName_orderBy;
  GraphAccount_filter: GraphAccount_filter;
  GraphAccount_orderBy: GraphAccount_orderBy;
  GraphNetwork: ResolverTypeWrapper<GraphNetwork>;
  GraphNetwork_filter: GraphNetwork_filter;
  GraphNetwork_orderBy: GraphNetwork_orderBy;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Indexer: ResolverTypeWrapper<Indexer>;
  Indexer_filter: Indexer_filter;
  Indexer_orderBy: Indexer_orderBy;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  NameSignal: ResolverTypeWrapper<NameSignal>;
  NameSignalSubgraphRelation: ResolverTypeWrapper<NameSignalSubgraphRelation>;
  NameSignalSubgraphRelation_filter: NameSignalSubgraphRelation_filter;
  NameSignalSubgraphRelation_orderBy: NameSignalSubgraphRelation_orderBy;
  NameSignalTransaction: ResolverTypeWrapper<NameSignalTransaction>;
  NameSignalTransaction_filter: NameSignalTransaction_filter;
  NameSignalTransaction_orderBy: NameSignalTransaction_orderBy;
  NameSignal_filter: NameSignal_filter;
  NameSignal_orderBy: NameSignal_orderBy;
  NameSystem: NameSystem;
  OrderDirection: OrderDirection;
  Pool: ResolverTypeWrapper<Pool>;
  Pool_filter: Pool_filter;
  Pool_orderBy: Pool_orderBy;
  Query: ResolverTypeWrapper<{}>;
  RetryableTicket: ResolverTypeWrapper<RetryableTicket>;
  RetryableTicketRedeemAttempt: ResolverTypeWrapper<RetryableTicketRedeemAttempt>;
  RetryableTicketRedeemAttempt_filter: RetryableTicketRedeemAttempt_filter;
  RetryableTicketRedeemAttempt_orderBy: RetryableTicketRedeemAttempt_orderBy;
  RetryableTicket_filter: RetryableTicket_filter;
  RetryableTicket_orderBy: RetryableTicket_orderBy;
  Revocability: Revocability;
  Signal: ResolverTypeWrapper<Signal>;
  SignalTransaction: ResolverTypeWrapper<SignalTransaction>;
  SignalTransaction_filter: SignalTransaction_filter;
  SignalTransaction_orderBy: SignalTransaction_orderBy;
  Signal_filter: Signal_filter;
  Signal_orderBy: Signal_orderBy;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subgraph: ResolverTypeWrapper<Subgraph>;
  SubgraphDeployment: ResolverTypeWrapper<SubgraphDeployment>;
  SubgraphDeploymentManifest: ResolverTypeWrapper<SubgraphDeploymentManifest>;
  SubgraphDeploymentManifest_filter: SubgraphDeploymentManifest_filter;
  SubgraphDeploymentManifest_orderBy: SubgraphDeploymentManifest_orderBy;
  SubgraphDeploymentSchema: ResolverTypeWrapper<SubgraphDeploymentSchema>;
  SubgraphDeploymentSchema_filter: SubgraphDeploymentSchema_filter;
  SubgraphDeploymentSchema_orderBy: SubgraphDeploymentSchema_orderBy;
  SubgraphDeployment_filter: SubgraphDeployment_filter;
  SubgraphDeployment_orderBy: SubgraphDeployment_orderBy;
  SubgraphMeta: ResolverTypeWrapper<SubgraphMeta>;
  SubgraphMeta_filter: SubgraphMeta_filter;
  SubgraphMeta_orderBy: SubgraphMeta_orderBy;
  SubgraphVersion: ResolverTypeWrapper<SubgraphVersion>;
  SubgraphVersionMeta: ResolverTypeWrapper<SubgraphVersionMeta>;
  SubgraphVersionMeta_filter: SubgraphVersionMeta_filter;
  SubgraphVersionMeta_orderBy: SubgraphVersionMeta_orderBy;
  SubgraphVersion_filter: SubgraphVersion_filter;
  SubgraphVersion_orderBy: SubgraphVersion_orderBy;
  Subgraph_filter: Subgraph_filter;
  Subgraph_orderBy: Subgraph_orderBy;
  Subscription: ResolverTypeWrapper<{}>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  TokenLockWallet: ResolverTypeWrapper<TokenLockWallet>;
  TokenLockWallet_filter: TokenLockWallet_filter;
  TokenLockWallet_orderBy: TokenLockWallet_orderBy;
  TokenManager: ResolverTypeWrapper<TokenManager>;
  TokenManager_filter: TokenManager_filter;
  TokenManager_orderBy: TokenManager_orderBy;
  Transaction: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Transaction']>;
  TransactionType: TransactionType;
  Transaction_filter: Transaction_filter;
  Transaction_orderBy: Transaction_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Allocation: Allocation;
  Allocation_filter: Allocation_filter;
  Attestation: Attestation;
  Attestation_filter: Attestation_filter;
  AuthorizedFunction: AuthorizedFunction;
  AuthorizedFunction_filter: AuthorizedFunction_filter;
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean']['output'];
  BridgeDepositTransaction: BridgeDepositTransaction;
  BridgeDepositTransaction_filter: BridgeDepositTransaction_filter;
  BridgeWithdrawalTransaction: BridgeWithdrawalTransaction;
  BridgeWithdrawalTransaction_filter: BridgeWithdrawalTransaction_filter;
  Bytes: Scalars['Bytes']['output'];
  Curator: Curator;
  Curator_filter: Curator_filter;
  CurrentSubgraphDeploymentRelation: CurrentSubgraphDeploymentRelation;
  CurrentSubgraphDeploymentRelation_filter: CurrentSubgraphDeploymentRelation_filter;
  DelegatedStake: DelegatedStake;
  DelegatedStake_filter: DelegatedStake_filter;
  Delegator: Delegator;
  Delegator_filter: Delegator_filter;
  Dispute: Dispute;
  Dispute_filter: Dispute_filter;
  Epoch: Epoch;
  Epoch_filter: Epoch_filter;
  Float: Scalars['Float']['output'];
  GraphAccount: GraphAccount;
  GraphAccountMeta: GraphAccountMeta;
  GraphAccountMeta_filter: GraphAccountMeta_filter;
  GraphAccountName: GraphAccountName;
  GraphAccountName_filter: GraphAccountName_filter;
  GraphAccount_filter: GraphAccount_filter;
  GraphNetwork: GraphNetwork;
  GraphNetwork_filter: GraphNetwork_filter;
  ID: Scalars['ID']['output'];
  Indexer: Indexer;
  Indexer_filter: Indexer_filter;
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  NameSignal: NameSignal;
  NameSignalSubgraphRelation: NameSignalSubgraphRelation;
  NameSignalSubgraphRelation_filter: NameSignalSubgraphRelation_filter;
  NameSignalTransaction: NameSignalTransaction;
  NameSignalTransaction_filter: NameSignalTransaction_filter;
  NameSignal_filter: NameSignal_filter;
  Pool: Pool;
  Pool_filter: Pool_filter;
  Query: {};
  RetryableTicket: RetryableTicket;
  RetryableTicketRedeemAttempt: RetryableTicketRedeemAttempt;
  RetryableTicketRedeemAttempt_filter: RetryableTicketRedeemAttempt_filter;
  RetryableTicket_filter: RetryableTicket_filter;
  Signal: Signal;
  SignalTransaction: SignalTransaction;
  SignalTransaction_filter: SignalTransaction_filter;
  Signal_filter: Signal_filter;
  String: Scalars['String']['output'];
  Subgraph: Subgraph;
  SubgraphDeployment: SubgraphDeployment;
  SubgraphDeploymentManifest: SubgraphDeploymentManifest;
  SubgraphDeploymentManifest_filter: SubgraphDeploymentManifest_filter;
  SubgraphDeploymentSchema: SubgraphDeploymentSchema;
  SubgraphDeploymentSchema_filter: SubgraphDeploymentSchema_filter;
  SubgraphDeployment_filter: SubgraphDeployment_filter;
  SubgraphMeta: SubgraphMeta;
  SubgraphMeta_filter: SubgraphMeta_filter;
  SubgraphVersion: SubgraphVersion;
  SubgraphVersionMeta: SubgraphVersionMeta;
  SubgraphVersionMeta_filter: SubgraphVersionMeta_filter;
  SubgraphVersion_filter: SubgraphVersion_filter;
  Subgraph_filter: Subgraph_filter;
  Subscription: {};
  Timestamp: Scalars['Timestamp']['output'];
  TokenLockWallet: TokenLockWallet;
  TokenLockWallet_filter: TokenLockWallet_filter;
  TokenManager: TokenManager;
  TokenManager_filter: TokenManager_filter;
  Transaction: ResolversInterfaceTypes<ResolversParentTypes>['Transaction'];
  Transaction_filter: Transaction_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AllocationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Allocation'] = ResolversParentTypes['Allocation']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  indexer?: Resolver<ResolversTypes['Indexer'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  activeForIndexer?: Resolver<Maybe<ResolversTypes['Indexer']>, ParentType, ContextType>;
  subgraphDeployment?: Resolver<ResolversTypes['SubgraphDeployment'], ParentType, ContextType>;
  allocatedTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  effectiveAllocation?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAtEpoch?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAtBlockHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  createdAtBlockNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  closedAtEpoch?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  closedAtBlockHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  closedAtBlockNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  queryFeesCollected?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  queryFeeRebates?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  distributedRebates?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  curatorRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  indexingRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  indexingIndexerRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  indexingDelegatorRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  poolClosedIn?: Resolver<Maybe<ResolversTypes['Pool']>, ParentType, ContextType>;
  delegationFees?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['AllocationStatus'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  closedAt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  poi?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  indexingRewardCutAtStart?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  indexingRewardEffectiveCutAtStart?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  queryFeeCutAtStart?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  queryFeeEffectiveCutAtStart?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  indexingRewardCutAtClose?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  indexingRewardEffectiveCutAtClose?: Resolver<Maybe<ResolversTypes['BigDecimal']>, ParentType, ContextType>;
  queryFeeCutAtClose?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  queryFeeEffectiveCutAtClose?: Resolver<Maybe<ResolversTypes['BigDecimal']>, ParentType, ContextType>;
  totalReturn?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  annualizedReturn?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AttestationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Attestation'] = ResolversParentTypes['Attestation']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  subgraphDeployment?: Resolver<ResolversTypes['SubgraphDeployment'], ParentType, ContextType>;
  requestCID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  responseCID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gasUsed?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  responseNumBytes?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  v?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  r?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  s?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthorizedFunctionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AuthorizedFunction'] = ResolversParentTypes['AuthorizedFunction']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  target?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  sigHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  manager?: Resolver<ResolversTypes['TokenManager'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BridgeDepositTransactionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BridgeDepositTransaction'] = ResolversParentTypes['BridgeDepositTransaction']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  signer?: Resolver<ResolversTypes['GraphAccount'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TransactionType'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  l1Token?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  retryableTicketId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  routed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BridgeWithdrawalTransactionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BridgeWithdrawalTransaction'] = ResolversParentTypes['BridgeWithdrawalTransaction']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  signer?: Resolver<ResolversTypes['GraphAccount'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TransactionType'], ParentType, ContextType>;
  txHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  l1Token?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  transactionIndex?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type CuratorResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Curator'] = ResolversParentTypes['Curator']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['GraphAccount'], ParentType, ContextType>;
  totalSignalledTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalUnsignalledTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  signals?: Resolver<Array<ResolversTypes['Signal']>, ParentType, ContextType, RequireFields<CuratorsignalsArgs, 'skip' | 'first'>>;
  defaultDisplayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalNameSignalledTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalNameUnsignalledTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalWithdrawnTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  nameSignals?: Resolver<Array<ResolversTypes['NameSignal']>, ParentType, ContextType, RequireFields<CuratornameSignalsArgs, 'skip' | 'first'>>;
  realizedRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  annualizedReturn?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalReturn?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  signalingEfficiency?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalNameSignal?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalNameSignalAverageCostBasis?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalAverageCostBasisPerNameSignal?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalSignal?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalSignalAverageCostBasis?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalAverageCostBasisPerSignal?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  signalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  activeSignalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  nameSignalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  activeNameSignalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  combinedSignalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  activeCombinedSignalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CurrentSubgraphDeploymentRelationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CurrentSubgraphDeploymentRelation'] = ResolversParentTypes['CurrentSubgraphDeploymentRelation']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  subgraph?: Resolver<ResolversTypes['Subgraph'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['SubgraphDeployment'], ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DelegatedStakeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DelegatedStake'] = ResolversParentTypes['DelegatedStake']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  indexer?: Resolver<ResolversTypes['Indexer'], ParentType, ContextType>;
  delegator?: Resolver<ResolversTypes['Delegator'], ParentType, ContextType>;
  stakedTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  unstakedTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lockedTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lockedUntil?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  shareAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  personalExchangeRate?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  realizedRewards?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastDelegatedAt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastUndelegatedAt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  transferredToL2?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  transferredToL2At?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferredToL2AtBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferredToL2AtTx?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stakedTokensTransferredToL2?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  idOnL2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idOnL1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DelegatorResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Delegator'] = ResolversParentTypes['Delegator']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['GraphAccount'], ParentType, ContextType>;
  stakes?: Resolver<Array<ResolversTypes['DelegatedStake']>, ParentType, ContextType, RequireFields<DelegatorstakesArgs, 'skip' | 'first'>>;
  totalStakedTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalUnstakedTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalRealizedRewards?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  stakesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  activeStakesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  defaultDisplayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DisputeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Dispute'] = ResolversParentTypes['Dispute']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  subgraphDeployment?: Resolver<ResolversTypes['SubgraphDeployment'], ParentType, ContextType>;
  fisherman?: Resolver<ResolversTypes['GraphAccount'], ParentType, ContextType>;
  deposit?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  closedAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['DisputeStatus'], ParentType, ContextType>;
  tokensSlashed?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  tokensBurned?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  tokensRewarded?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['DisputeType'], ParentType, ContextType>;
  indexer?: Resolver<ResolversTypes['GraphAccount'], ParentType, ContextType>;
  attestation?: Resolver<Maybe<ResolversTypes['Attestation']>, ParentType, ContextType>;
  linkedDispute?: Resolver<Maybe<ResolversTypes['Dispute']>, ParentType, ContextType>;
  allocation?: Resolver<Maybe<ResolversTypes['Allocation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EpochResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Epoch'] = ResolversParentTypes['Epoch']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  startBlock?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  endBlock?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  signalledTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  stakeDeposited?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalQueryFees?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  taxedQueryFees?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  queryFeesCollected?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  curatorQueryFees?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  queryFeeRebates?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalIndexerRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalDelegatorRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GraphAccountResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GraphAccount'] = ResolversParentTypes['GraphAccount']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  names?: Resolver<Array<ResolversTypes['GraphAccountName']>, ParentType, ContextType, RequireFields<GraphAccountnamesArgs, 'skip' | 'first'>>;
  defaultName?: Resolver<Maybe<ResolversTypes['GraphAccountName']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  defaultDisplayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['GraphAccountMeta']>, ParentType, ContextType>;
  operatorOf?: Resolver<Array<ResolversTypes['GraphAccount']>, ParentType, ContextType, RequireFields<GraphAccountoperatorOfArgs, 'skip' | 'first'>>;
  operators?: Resolver<Array<ResolversTypes['GraphAccount']>, ParentType, ContextType, RequireFields<GraphAccountoperatorsArgs, 'skip' | 'first'>>;
  balance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  balanceReceivedFromL1Signalling?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  balanceReceivedFromL1Delegation?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  curationApproval?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  stakingApproval?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gnsApproval?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subgraphs?: Resolver<Array<ResolversTypes['Subgraph']>, ParentType, ContextType, RequireFields<GraphAccountsubgraphsArgs, 'skip' | 'first'>>;
  developerCreatedAt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  subgraphQueryFees?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdDisputes?: Resolver<Array<ResolversTypes['Dispute']>, ParentType, ContextType, RequireFields<GraphAccountcreatedDisputesArgs, 'skip' | 'first'>>;
  disputesAgainst?: Resolver<Array<ResolversTypes['Dispute']>, ParentType, ContextType, RequireFields<GraphAccountdisputesAgainstArgs, 'skip' | 'first'>>;
  curator?: Resolver<Maybe<ResolversTypes['Curator']>, ParentType, ContextType>;
  indexer?: Resolver<Maybe<ResolversTypes['Indexer']>, ParentType, ContextType>;
  delegator?: Resolver<Maybe<ResolversTypes['Delegator']>, ParentType, ContextType>;
  nameSignalTransactions?: Resolver<Array<ResolversTypes['NameSignalTransaction']>, ParentType, ContextType, RequireFields<GraphAccountnameSignalTransactionsArgs, 'skip' | 'first'>>;
  bridgeWithdrawalTransactions?: Resolver<Array<ResolversTypes['BridgeWithdrawalTransaction']>, ParentType, ContextType, RequireFields<GraphAccountbridgeWithdrawalTransactionsArgs, 'skip' | 'first'>>;
  bridgeDepositTransactions?: Resolver<Array<ResolversTypes['BridgeDepositTransaction']>, ParentType, ContextType, RequireFields<GraphAccountbridgeDepositTransactionsArgs, 'skip' | 'first'>>;
  tokenLockWallets?: Resolver<Array<ResolversTypes['TokenLockWallet']>, ParentType, ContextType, RequireFields<GraphAccounttokenLockWalletsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GraphAccountMetaResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GraphAccountMeta'] = ResolversParentTypes['GraphAccountMeta']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  graphAccount?: Resolver<Maybe<ResolversTypes['GraphAccount']>, ParentType, ContextType>;
  graphAccounts?: Resolver<Array<ResolversTypes['GraphAccount']>, ParentType, ContextType, RequireFields<GraphAccountMetagraphAccountsArgs, 'skip' | 'first'>>;
  isOrganization?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  codeRepository?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GraphAccountNameResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GraphAccountName'] = ResolversParentTypes['GraphAccountName']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nameSystem?: Resolver<ResolversTypes['NameSystem'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  graphAccount?: Resolver<Maybe<ResolversTypes['GraphAccount']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GraphNetworkResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GraphNetwork'] = ResolversParentTypes['GraphNetwork']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  controller?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  graphToken?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  epochManager?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  epochManagerImplementations?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  curation?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  curationImplementations?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  staking?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  stakingImplementations?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  disputeManager?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  gns?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  serviceRegistry?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  rewardsManager?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  rewardsManagerImplementations?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  isPaused?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isPartialPaused?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  governor?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  pauseGuardian?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  curationPercentage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  protocolFeePercentage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  delegationRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  channelDisputeEpochs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxAllocationEpochs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  thawingPeriod?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  delegationParametersCooldown?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minimumIndexerStake?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  slashers?: Resolver<Maybe<Array<ResolversTypes['Bytes']>>, ParentType, ContextType>;
  delegationUnbondingPeriod?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rebateRatio?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  rebateAlpha?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  rebateLambda?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  delegationTaxPercentage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  assetHolders?: Resolver<Maybe<Array<ResolversTypes['Bytes']>>, ParentType, ContextType>;
  totalTokensStakedTransferredToL2?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalDelegatedTokensTransferredToL2?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSignalledTokensTransferredToL2?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalTokensStaked?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalTokensClaimable?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalUnstakedTokensLocked?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalTokensAllocated?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalDelegatedTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalTokensSignalled?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalTokensSignalledAutoMigrate?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalTokensSignalledDirectly?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalQueryFees?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalIndexerQueryFeesCollected?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalIndexerQueryFeeRebates?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalDelegatorQueryFeeRebates?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalCuratorQueryFees?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalTaxedQueryFees?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalUnclaimedQueryFeeRebates?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalIndexingRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalIndexingDelegatorRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalIndexingIndexerRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  networkGRTIssuance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  networkGRTIssuancePerBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subgraphAvailabilityOracle?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  defaultReserveRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minimumCurationDeposit?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  curationTaxPercentage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ownerTaxPercentage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  GRTinUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  GRTinETH?: Resolver<Maybe<ResolversTypes['BigDecimal']>, ParentType, ContextType>;
  totalGRTMinted?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalGRTBurned?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  epochLength?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastRunEpoch?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastLengthUpdateEpoch?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastLengthUpdateBlock?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  currentEpoch?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  indexerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stakedIndexersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  delegatorCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  activeDelegatorCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  delegationCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  activeDelegationCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  curatorCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  activeCuratorCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  subgraphCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  activeSubgraphCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  subgraphDeploymentCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  epochCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  allocationCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  activeAllocationCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  arbitrator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  querySlashingPercentage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  indexingSlashingPercentage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  slashingPercentage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minimumDisputeDeposit?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fishermanRewardPercentage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalGRTDeposited?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalGRTWithdrawnConfirmed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalGRTMintedFromL2?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalGRTDepositedConfirmed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalGRTWithdrawn?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  currentL1BlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IndexerResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Indexer'] = ResolversParentTypes['Indexer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['GraphAccount'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  geoHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  defaultDisplayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stakedTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  allocatedTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  unstakedTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lockedTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokensLockedUntil?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  allocations?: Resolver<Array<ResolversTypes['Allocation']>, ParentType, ContextType, RequireFields<IndexerallocationsArgs, 'skip' | 'first'>>;
  totalAllocations?: Resolver<Array<ResolversTypes['Allocation']>, ParentType, ContextType, RequireFields<IndexertotalAllocationsArgs, 'skip' | 'first'>>;
  allocationCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalAllocationCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  queryFeesCollected?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  queryFeeRebates?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  rewardsEarned?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  indexerIndexingRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  delegatorIndexingRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  indexerRewardsOwnGenerationRatio?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  transferredToL2?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  firstTransferredToL2At?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  firstTransferredToL2AtBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  firstTransferredToL2AtTx?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastTransferredToL2At?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  lastTransferredToL2AtBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  lastTransferredToL2AtTx?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stakedTokensTransferredToL2?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  idOnL2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idOnL1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  delegatedCapacity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenCapacity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  availableStake?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  delegators?: Resolver<Array<ResolversTypes['DelegatedStake']>, ParentType, ContextType, RequireFields<IndexerdelegatorsArgs, 'skip' | 'first'>>;
  delegatedTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  ownStakeRatio?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  delegatedStakeRatio?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  delegatorShares?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  delegationExchangeRate?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  indexingRewardCut?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  indexingRewardEffectiveCut?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  overDelegationDilution?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  delegatorQueryFees?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  queryFeeCut?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  queryFeeEffectiveCut?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  delegatorParameterCooldown?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastDelegationParameterUpdate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  forcedClosures?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalReturn?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  annualizedReturn?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  stakingEfficiency?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type NameSignalResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NameSignal'] = ResolversParentTypes['NameSignal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  curator?: Resolver<ResolversTypes['Curator'], ParentType, ContextType>;
  subgraph?: Resolver<ResolversTypes['Subgraph'], ParentType, ContextType>;
  signalledTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  unsignalledTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  withdrawnTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  nameSignal?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  signal?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  signalledTokensSentToL2?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  signalledTokensReceivedOnL2?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transferredToL2?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  transferredToL2At?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferredToL2AtBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferredToL2AtTx?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idOnL2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idOnL1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastNameSignalChange?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  realizedRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  averageCostBasis?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  averageCostBasisPerSignal?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  nameSignalAverageCostBasis?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  nameSignalAverageCostBasisPerSignal?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  signalAverageCostBasis?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  signalAverageCostBasisPerSignal?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  entityVersion?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  linkedEntity?: Resolver<Maybe<ResolversTypes['NameSignal']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NameSignalSubgraphRelationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NameSignalSubgraphRelation'] = ResolversParentTypes['NameSignalSubgraphRelation']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nameSignal?: Resolver<ResolversTypes['NameSignal'], ParentType, ContextType>;
  subgraph?: Resolver<ResolversTypes['Subgraph'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NameSignalTransactionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NameSignalTransaction'] = ResolversParentTypes['NameSignalTransaction']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  signer?: Resolver<ResolversTypes['GraphAccount'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TransactionType'], ParentType, ContextType>;
  nameSignal?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  versionSignal?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subgraph?: Resolver<ResolversTypes['Subgraph'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PoolResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Pool'] = ResolversParentTypes['Pool']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  allocation?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalQueryFees?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  claimedFees?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  curatorRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  closedAllocations?: Resolver<Array<ResolversTypes['Allocation']>, ParentType, ContextType, RequireFields<PoolclosedAllocationsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  graphNetwork?: Resolver<Maybe<ResolversTypes['GraphNetwork']>, ParentType, ContextType, RequireFields<QuerygraphNetworkArgs, 'id' | 'subgraphError'>>;
  graphNetworks?: Resolver<Array<ResolversTypes['GraphNetwork']>, ParentType, ContextType, RequireFields<QuerygraphNetworksArgs, 'skip' | 'first' | 'subgraphError'>>;
  graphAccount?: Resolver<Maybe<ResolversTypes['GraphAccount']>, ParentType, ContextType, RequireFields<QuerygraphAccountArgs, 'id' | 'subgraphError'>>;
  graphAccounts?: Resolver<Array<ResolversTypes['GraphAccount']>, ParentType, ContextType, RequireFields<QuerygraphAccountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  graphAccountMeta?: Resolver<Maybe<ResolversTypes['GraphAccountMeta']>, ParentType, ContextType, RequireFields<QuerygraphAccountMetaArgs, 'id' | 'subgraphError'>>;
  graphAccountMetas?: Resolver<Array<ResolversTypes['GraphAccountMeta']>, ParentType, ContextType, RequireFields<QuerygraphAccountMetasArgs, 'skip' | 'first' | 'subgraphError'>>;
  graphAccountName?: Resolver<Maybe<ResolversTypes['GraphAccountName']>, ParentType, ContextType, RequireFields<QuerygraphAccountNameArgs, 'id' | 'subgraphError'>>;
  graphAccountNames?: Resolver<Array<ResolversTypes['GraphAccountName']>, ParentType, ContextType, RequireFields<QuerygraphAccountNamesArgs, 'skip' | 'first' | 'subgraphError'>>;
  subgraph?: Resolver<Maybe<ResolversTypes['Subgraph']>, ParentType, ContextType, RequireFields<QuerysubgraphArgs, 'id' | 'subgraphError'>>;
  subgraphs?: Resolver<Array<ResolversTypes['Subgraph']>, ParentType, ContextType, RequireFields<QuerysubgraphsArgs, 'skip' | 'first' | 'subgraphError'>>;
  subgraphMeta?: Resolver<Maybe<ResolversTypes['SubgraphMeta']>, ParentType, ContextType, RequireFields<QuerysubgraphMetaArgs, 'id' | 'subgraphError'>>;
  subgraphMetas?: Resolver<Array<ResolversTypes['SubgraphMeta']>, ParentType, ContextType, RequireFields<QuerysubgraphMetasArgs, 'skip' | 'first' | 'subgraphError'>>;
  currentSubgraphDeploymentRelation?: Resolver<Maybe<ResolversTypes['CurrentSubgraphDeploymentRelation']>, ParentType, ContextType, RequireFields<QuerycurrentSubgraphDeploymentRelationArgs, 'id' | 'subgraphError'>>;
  currentSubgraphDeploymentRelations?: Resolver<Array<ResolversTypes['CurrentSubgraphDeploymentRelation']>, ParentType, ContextType, RequireFields<QuerycurrentSubgraphDeploymentRelationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  subgraphVersion?: Resolver<Maybe<ResolversTypes['SubgraphVersion']>, ParentType, ContextType, RequireFields<QuerysubgraphVersionArgs, 'id' | 'subgraphError'>>;
  subgraphVersions?: Resolver<Array<ResolversTypes['SubgraphVersion']>, ParentType, ContextType, RequireFields<QuerysubgraphVersionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  subgraphVersionMeta?: Resolver<Maybe<ResolversTypes['SubgraphVersionMeta']>, ParentType, ContextType, RequireFields<QuerysubgraphVersionMetaArgs, 'id' | 'subgraphError'>>;
  subgraphVersionMetas?: Resolver<Array<ResolversTypes['SubgraphVersionMeta']>, ParentType, ContextType, RequireFields<QuerysubgraphVersionMetasArgs, 'skip' | 'first' | 'subgraphError'>>;
  subgraphDeployment?: Resolver<Maybe<ResolversTypes['SubgraphDeployment']>, ParentType, ContextType, RequireFields<QuerysubgraphDeploymentArgs, 'id' | 'subgraphError'>>;
  subgraphDeployments?: Resolver<Array<ResolversTypes['SubgraphDeployment']>, ParentType, ContextType, RequireFields<QuerysubgraphDeploymentsArgs, 'skip' | 'first' | 'subgraphError'>>;
  subgraphDeploymentSchema?: Resolver<Maybe<ResolversTypes['SubgraphDeploymentSchema']>, ParentType, ContextType, RequireFields<QuerysubgraphDeploymentSchemaArgs, 'id' | 'subgraphError'>>;
  subgraphDeploymentSchemas?: Resolver<Array<ResolversTypes['SubgraphDeploymentSchema']>, ParentType, ContextType, RequireFields<QuerysubgraphDeploymentSchemasArgs, 'skip' | 'first' | 'subgraphError'>>;
  subgraphDeploymentManifest?: Resolver<Maybe<ResolversTypes['SubgraphDeploymentManifest']>, ParentType, ContextType, RequireFields<QuerysubgraphDeploymentManifestArgs, 'id' | 'subgraphError'>>;
  subgraphDeploymentManifests?: Resolver<Array<ResolversTypes['SubgraphDeploymentManifest']>, ParentType, ContextType, RequireFields<QuerysubgraphDeploymentManifestsArgs, 'skip' | 'first' | 'subgraphError'>>;
  indexer?: Resolver<Maybe<ResolversTypes['Indexer']>, ParentType, ContextType, RequireFields<QueryindexerArgs, 'id' | 'subgraphError'>>;
  indexers?: Resolver<Array<ResolversTypes['Indexer']>, ParentType, ContextType, RequireFields<QueryindexersArgs, 'skip' | 'first' | 'subgraphError'>>;
  allocation?: Resolver<Maybe<ResolversTypes['Allocation']>, ParentType, ContextType, RequireFields<QueryallocationArgs, 'id' | 'subgraphError'>>;
  allocations?: Resolver<Array<ResolversTypes['Allocation']>, ParentType, ContextType, RequireFields<QueryallocationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  pool?: Resolver<Maybe<ResolversTypes['Pool']>, ParentType, ContextType, RequireFields<QuerypoolArgs, 'id' | 'subgraphError'>>;
  pools?: Resolver<Array<ResolversTypes['Pool']>, ParentType, ContextType, RequireFields<QuerypoolsArgs, 'skip' | 'first' | 'subgraphError'>>;
  delegator?: Resolver<Maybe<ResolversTypes['Delegator']>, ParentType, ContextType, RequireFields<QuerydelegatorArgs, 'id' | 'subgraphError'>>;
  delegators?: Resolver<Array<ResolversTypes['Delegator']>, ParentType, ContextType, RequireFields<QuerydelegatorsArgs, 'skip' | 'first' | 'subgraphError'>>;
  delegatedStake?: Resolver<Maybe<ResolversTypes['DelegatedStake']>, ParentType, ContextType, RequireFields<QuerydelegatedStakeArgs, 'id' | 'subgraphError'>>;
  delegatedStakes?: Resolver<Array<ResolversTypes['DelegatedStake']>, ParentType, ContextType, RequireFields<QuerydelegatedStakesArgs, 'skip' | 'first' | 'subgraphError'>>;
  curator?: Resolver<Maybe<ResolversTypes['Curator']>, ParentType, ContextType, RequireFields<QuerycuratorArgs, 'id' | 'subgraphError'>>;
  curators?: Resolver<Array<ResolversTypes['Curator']>, ParentType, ContextType, RequireFields<QuerycuratorsArgs, 'skip' | 'first' | 'subgraphError'>>;
  signal?: Resolver<Maybe<ResolversTypes['Signal']>, ParentType, ContextType, RequireFields<QuerysignalArgs, 'id' | 'subgraphError'>>;
  signals?: Resolver<Array<ResolversTypes['Signal']>, ParentType, ContextType, RequireFields<QuerysignalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  nameSignal?: Resolver<Maybe<ResolversTypes['NameSignal']>, ParentType, ContextType, RequireFields<QuerynameSignalArgs, 'id' | 'subgraphError'>>;
  nameSignals?: Resolver<Array<ResolversTypes['NameSignal']>, ParentType, ContextType, RequireFields<QuerynameSignalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  nameSignalSubgraphRelation?: Resolver<Maybe<ResolversTypes['NameSignalSubgraphRelation']>, ParentType, ContextType, RequireFields<QuerynameSignalSubgraphRelationArgs, 'id' | 'subgraphError'>>;
  nameSignalSubgraphRelations?: Resolver<Array<ResolversTypes['NameSignalSubgraphRelation']>, ParentType, ContextType, RequireFields<QuerynameSignalSubgraphRelationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  dispute?: Resolver<Maybe<ResolversTypes['Dispute']>, ParentType, ContextType, RequireFields<QuerydisputeArgs, 'id' | 'subgraphError'>>;
  disputes?: Resolver<Array<ResolversTypes['Dispute']>, ParentType, ContextType, RequireFields<QuerydisputesArgs, 'skip' | 'first' | 'subgraphError'>>;
  attestation?: Resolver<Maybe<ResolversTypes['Attestation']>, ParentType, ContextType, RequireFields<QueryattestationArgs, 'id' | 'subgraphError'>>;
  attestations?: Resolver<Array<ResolversTypes['Attestation']>, ParentType, ContextType, RequireFields<QueryattestationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  epoch?: Resolver<Maybe<ResolversTypes['Epoch']>, ParentType, ContextType, RequireFields<QueryepochArgs, 'id' | 'subgraphError'>>;
  epoches?: Resolver<Array<ResolversTypes['Epoch']>, ParentType, ContextType, RequireFields<QueryepochesArgs, 'skip' | 'first' | 'subgraphError'>>;
  nameSignalTransaction?: Resolver<Maybe<ResolversTypes['NameSignalTransaction']>, ParentType, ContextType, RequireFields<QuerynameSignalTransactionArgs, 'id' | 'subgraphError'>>;
  nameSignalTransactions?: Resolver<Array<ResolversTypes['NameSignalTransaction']>, ParentType, ContextType, RequireFields<QuerynameSignalTransactionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  signalTransaction?: Resolver<Maybe<ResolversTypes['SignalTransaction']>, ParentType, ContextType, RequireFields<QuerysignalTransactionArgs, 'id' | 'subgraphError'>>;
  signalTransactions?: Resolver<Array<ResolversTypes['SignalTransaction']>, ParentType, ContextType, RequireFields<QuerysignalTransactionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bridgeWithdrawalTransaction?: Resolver<Maybe<ResolversTypes['BridgeWithdrawalTransaction']>, ParentType, ContextType, RequireFields<QuerybridgeWithdrawalTransactionArgs, 'id' | 'subgraphError'>>;
  bridgeWithdrawalTransactions?: Resolver<Array<ResolversTypes['BridgeWithdrawalTransaction']>, ParentType, ContextType, RequireFields<QuerybridgeWithdrawalTransactionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bridgeDepositTransaction?: Resolver<Maybe<ResolversTypes['BridgeDepositTransaction']>, ParentType, ContextType, RequireFields<QuerybridgeDepositTransactionArgs, 'id' | 'subgraphError'>>;
  bridgeDepositTransactions?: Resolver<Array<ResolversTypes['BridgeDepositTransaction']>, ParentType, ContextType, RequireFields<QuerybridgeDepositTransactionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  retryableTicket?: Resolver<Maybe<ResolversTypes['RetryableTicket']>, ParentType, ContextType, RequireFields<QueryretryableTicketArgs, 'id' | 'subgraphError'>>;
  retryableTickets?: Resolver<Array<ResolversTypes['RetryableTicket']>, ParentType, ContextType, RequireFields<QueryretryableTicketsArgs, 'skip' | 'first' | 'subgraphError'>>;
  retryableTicketRedeemAttempt?: Resolver<Maybe<ResolversTypes['RetryableTicketRedeemAttempt']>, ParentType, ContextType, RequireFields<QueryretryableTicketRedeemAttemptArgs, 'id' | 'subgraphError'>>;
  retryableTicketRedeemAttempts?: Resolver<Array<ResolversTypes['RetryableTicketRedeemAttempt']>, ParentType, ContextType, RequireFields<QueryretryableTicketRedeemAttemptsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenManager?: Resolver<Maybe<ResolversTypes['TokenManager']>, ParentType, ContextType, RequireFields<QuerytokenManagerArgs, 'id' | 'subgraphError'>>;
  tokenManagers?: Resolver<Array<ResolversTypes['TokenManager']>, ParentType, ContextType, RequireFields<QuerytokenManagersArgs, 'skip' | 'first' | 'subgraphError'>>;
  authorizedFunction?: Resolver<Maybe<ResolversTypes['AuthorizedFunction']>, ParentType, ContextType, RequireFields<QueryauthorizedFunctionArgs, 'id' | 'subgraphError'>>;
  authorizedFunctions?: Resolver<Array<ResolversTypes['AuthorizedFunction']>, ParentType, ContextType, RequireFields<QueryauthorizedFunctionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenLockWallet?: Resolver<Maybe<ResolversTypes['TokenLockWallet']>, ParentType, ContextType, RequireFields<QuerytokenLockWalletArgs, 'id' | 'subgraphError'>>;
  tokenLockWallets?: Resolver<Array<ResolversTypes['TokenLockWallet']>, ParentType, ContextType, RequireFields<QuerytokenLockWalletsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QuerytransactionArgs, 'id' | 'subgraphError'>>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QuerytransactionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  subgraphMetadataSearch?: Resolver<Array<ResolversTypes['SubgraphMeta']>, ParentType, ContextType, RequireFields<QuerysubgraphMetadataSearchArgs, 'text' | 'first' | 'skip' | 'subgraphError'>>;
  curatorSearch?: Resolver<Array<ResolversTypes['Curator']>, ParentType, ContextType, RequireFields<QuerycuratorSearchArgs, 'text' | 'first' | 'skip' | 'subgraphError'>>;
  delegatorSearch?: Resolver<Array<ResolversTypes['Delegator']>, ParentType, ContextType, RequireFields<QuerydelegatorSearchArgs, 'text' | 'first' | 'skip' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type RetryableTicketResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RetryableTicket'] = ResolversParentTypes['RetryableTicket']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  txHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  redeemAttempts?: Resolver<Array<ResolversTypes['RetryableTicketRedeemAttempt']>, ParentType, ContextType, RequireFields<RetryableTicketredeemAttemptsArgs, 'skip' | 'first'>>;
  redeemCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RetryableTicketRedeemAttemptResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RetryableTicketRedeemAttempt'] = ResolversParentTypes['RetryableTicketRedeemAttempt']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ticketId?: Resolver<ResolversTypes['RetryableTicket'], ParentType, ContextType>;
  txHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  sequenceNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SignalResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Signal'] = ResolversParentTypes['Signal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  curator?: Resolver<ResolversTypes['Curator'], ParentType, ContextType>;
  subgraphDeployment?: Resolver<ResolversTypes['SubgraphDeployment'], ParentType, ContextType>;
  signalledTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  unsignalledTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  signal?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  averageCostBasis?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  averageCostBasisPerSignal?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  lastSignalChange?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  realizedRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastUpdatedAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAtBlock?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastUpdatedAtBlock?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SignalTransactionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SignalTransaction'] = ResolversParentTypes['SignalTransaction']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  signer?: Resolver<ResolversTypes['GraphAccount'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TransactionType'], ParentType, ContextType>;
  signal?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subgraphDeployment?: Resolver<ResolversTypes['SubgraphDeployment'], ParentType, ContextType>;
  withdrawalFees?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubgraphResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subgraph'] = ResolversParentTypes['Subgraph']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['GraphAccount'], ParentType, ContextType>;
  currentVersion?: Resolver<Maybe<ResolversTypes['SubgraphVersion']>, ParentType, ContextType>;
  pastVersions?: Resolver<Array<ResolversTypes['SubgraphVersion']>, ParentType, ContextType, RequireFields<SubgraphpastVersionsArgs, 'skip' | 'first'>>;
  versions?: Resolver<Array<ResolversTypes['SubgraphVersion']>, ParentType, ContextType, RequireFields<SubgraphversionsArgs, 'skip' | 'first'>>;
  versionCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  migrated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startedTransferToL2?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startedTransferToL2At?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  startedTransferToL2AtBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  startedTransferToL2AtTx?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transferredToL2?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  transferredToL2At?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferredToL2AtBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferredToL2AtTx?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  signalledTokensSentToL2?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  signalledTokensReceivedOnL2?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  idOnL2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idOnL1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nftID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  oldID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creatorAddress?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  subgraphNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  initializing?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  entityVersion?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  linkedEntity?: Resolver<Maybe<ResolversTypes['Subgraph']>, ParentType, ContextType>;
  signalledTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  unsignalledTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  currentSignalledTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  nameSignalAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  signalAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  reserveRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  withdrawableTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  withdrawnTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  nameSignals?: Resolver<Array<ResolversTypes['NameSignal']>, ParentType, ContextType, RequireFields<SubgraphnameSignalsArgs, 'skip' | 'first'>>;
  nameSignalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  metadataHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['SubgraphMeta']>, ParentType, ContextType>;
  currentVersionRelationEntity?: Resolver<Maybe<ResolversTypes['CurrentSubgraphDeploymentRelation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubgraphDeploymentResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SubgraphDeployment'] = ResolversParentTypes['SubgraphDeployment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ipfsHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  versions?: Resolver<Array<ResolversTypes['SubgraphVersion']>, ParentType, ContextType, RequireFields<SubgraphDeploymentversionsArgs, 'skip' | 'first'>>;
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  deniedAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stakedTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  indexerAllocations?: Resolver<Array<ResolversTypes['Allocation']>, ParentType, ContextType, RequireFields<SubgraphDeploymentindexerAllocationsArgs, 'skip' | 'first'>>;
  indexingRewardAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  indexingIndexerRewardAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  indexingDelegatorRewardAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  queryFeesAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  queryFeeRebates?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  curatorFeeRewards?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  signalledTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  unsignalledTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  signalAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  pricePerShare?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  curatorSignals?: Resolver<Array<ResolversTypes['Signal']>, ParentType, ContextType, RequireFields<SubgraphDeploymentcuratorSignalsArgs, 'skip' | 'first'>>;
  reserveRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  manifest?: Resolver<Maybe<ResolversTypes['SubgraphDeploymentManifest']>, ParentType, ContextType>;
  subgraphCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  activeSubgraphCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  deprecatedSubgraphCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  transferredToL2?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  transferredToL2At?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferredToL2AtBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferredToL2AtTx?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  signalledTokensSentToL2?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  signalledTokensReceivedOnL2?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubgraphDeploymentManifestResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SubgraphDeploymentManifest'] = ResolversParentTypes['SubgraphDeploymentManifest']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  deployment?: Resolver<Maybe<ResolversTypes['SubgraphDeployment']>, ParentType, ContextType>;
  schema?: Resolver<Maybe<ResolversTypes['SubgraphDeploymentSchema']>, ParentType, ContextType>;
  schemaIpfsHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  manifest?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  network?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  poweredBySubstreams?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  startBlock?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubgraphDeploymentSchemaResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SubgraphDeploymentSchema'] = ResolversParentTypes['SubgraphDeploymentSchema']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  manifest?: Resolver<Maybe<ResolversTypes['SubgraphDeploymentManifest']>, ParentType, ContextType>;
  manifests?: Resolver<Array<ResolversTypes['SubgraphDeploymentManifest']>, ParentType, ContextType, RequireFields<SubgraphDeploymentSchemamanifestsArgs, 'skip' | 'first'>>;
  schema?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubgraphMetaResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SubgraphMeta'] = ResolversParentTypes['SubgraphMeta']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  subgraph?: Resolver<Maybe<ResolversTypes['Subgraph']>, ParentType, ContextType>;
  subgraphs?: Resolver<Array<ResolversTypes['Subgraph']>, ParentType, ContextType, RequireFields<SubgraphMetasubgraphsArgs, 'skip' | 'first'>>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nftImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  codeRepository?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubgraphVersionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SubgraphVersion'] = ResolversParentTypes['SubgraphVersion']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  subgraph?: Resolver<ResolversTypes['Subgraph'], ParentType, ContextType>;
  subgraphDeployment?: Resolver<ResolversTypes['SubgraphDeployment'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  metadataHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['SubgraphVersionMeta']>, ParentType, ContextType>;
  entityVersion?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  linkedEntity?: Resolver<Maybe<ResolversTypes['SubgraphVersion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubgraphVersionMetaResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SubgraphVersionMeta'] = ResolversParentTypes['SubgraphVersionMeta']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  subgraphVersion?: Resolver<Maybe<ResolversTypes['SubgraphVersion']>, ParentType, ContextType>;
  subgraphVersions?: Resolver<Array<ResolversTypes['SubgraphVersion']>, ParentType, ContextType, RequireFields<SubgraphVersionMetasubgraphVersionsArgs, 'skip' | 'first'>>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  graphNetwork?: SubscriptionResolver<Maybe<ResolversTypes['GraphNetwork']>, "graphNetwork", ParentType, ContextType, RequireFields<SubscriptiongraphNetworkArgs, 'id' | 'subgraphError'>>;
  graphNetworks?: SubscriptionResolver<Array<ResolversTypes['GraphNetwork']>, "graphNetworks", ParentType, ContextType, RequireFields<SubscriptiongraphNetworksArgs, 'skip' | 'first' | 'subgraphError'>>;
  graphAccount?: SubscriptionResolver<Maybe<ResolversTypes['GraphAccount']>, "graphAccount", ParentType, ContextType, RequireFields<SubscriptiongraphAccountArgs, 'id' | 'subgraphError'>>;
  graphAccounts?: SubscriptionResolver<Array<ResolversTypes['GraphAccount']>, "graphAccounts", ParentType, ContextType, RequireFields<SubscriptiongraphAccountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  graphAccountMeta?: SubscriptionResolver<Maybe<ResolversTypes['GraphAccountMeta']>, "graphAccountMeta", ParentType, ContextType, RequireFields<SubscriptiongraphAccountMetaArgs, 'id' | 'subgraphError'>>;
  graphAccountMetas?: SubscriptionResolver<Array<ResolversTypes['GraphAccountMeta']>, "graphAccountMetas", ParentType, ContextType, RequireFields<SubscriptiongraphAccountMetasArgs, 'skip' | 'first' | 'subgraphError'>>;
  graphAccountName?: SubscriptionResolver<Maybe<ResolversTypes['GraphAccountName']>, "graphAccountName", ParentType, ContextType, RequireFields<SubscriptiongraphAccountNameArgs, 'id' | 'subgraphError'>>;
  graphAccountNames?: SubscriptionResolver<Array<ResolversTypes['GraphAccountName']>, "graphAccountNames", ParentType, ContextType, RequireFields<SubscriptiongraphAccountNamesArgs, 'skip' | 'first' | 'subgraphError'>>;
  subgraph?: SubscriptionResolver<Maybe<ResolversTypes['Subgraph']>, "subgraph", ParentType, ContextType, RequireFields<SubscriptionsubgraphArgs, 'id' | 'subgraphError'>>;
  subgraphs?: SubscriptionResolver<Array<ResolversTypes['Subgraph']>, "subgraphs", ParentType, ContextType, RequireFields<SubscriptionsubgraphsArgs, 'skip' | 'first' | 'subgraphError'>>;
  subgraphMeta?: SubscriptionResolver<Maybe<ResolversTypes['SubgraphMeta']>, "subgraphMeta", ParentType, ContextType, RequireFields<SubscriptionsubgraphMetaArgs, 'id' | 'subgraphError'>>;
  subgraphMetas?: SubscriptionResolver<Array<ResolversTypes['SubgraphMeta']>, "subgraphMetas", ParentType, ContextType, RequireFields<SubscriptionsubgraphMetasArgs, 'skip' | 'first' | 'subgraphError'>>;
  currentSubgraphDeploymentRelation?: SubscriptionResolver<Maybe<ResolversTypes['CurrentSubgraphDeploymentRelation']>, "currentSubgraphDeploymentRelation", ParentType, ContextType, RequireFields<SubscriptioncurrentSubgraphDeploymentRelationArgs, 'id' | 'subgraphError'>>;
  currentSubgraphDeploymentRelations?: SubscriptionResolver<Array<ResolversTypes['CurrentSubgraphDeploymentRelation']>, "currentSubgraphDeploymentRelations", ParentType, ContextType, RequireFields<SubscriptioncurrentSubgraphDeploymentRelationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  subgraphVersion?: SubscriptionResolver<Maybe<ResolversTypes['SubgraphVersion']>, "subgraphVersion", ParentType, ContextType, RequireFields<SubscriptionsubgraphVersionArgs, 'id' | 'subgraphError'>>;
  subgraphVersions?: SubscriptionResolver<Array<ResolversTypes['SubgraphVersion']>, "subgraphVersions", ParentType, ContextType, RequireFields<SubscriptionsubgraphVersionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  subgraphVersionMeta?: SubscriptionResolver<Maybe<ResolversTypes['SubgraphVersionMeta']>, "subgraphVersionMeta", ParentType, ContextType, RequireFields<SubscriptionsubgraphVersionMetaArgs, 'id' | 'subgraphError'>>;
  subgraphVersionMetas?: SubscriptionResolver<Array<ResolversTypes['SubgraphVersionMeta']>, "subgraphVersionMetas", ParentType, ContextType, RequireFields<SubscriptionsubgraphVersionMetasArgs, 'skip' | 'first' | 'subgraphError'>>;
  subgraphDeployment?: SubscriptionResolver<Maybe<ResolversTypes['SubgraphDeployment']>, "subgraphDeployment", ParentType, ContextType, RequireFields<SubscriptionsubgraphDeploymentArgs, 'id' | 'subgraphError'>>;
  subgraphDeployments?: SubscriptionResolver<Array<ResolversTypes['SubgraphDeployment']>, "subgraphDeployments", ParentType, ContextType, RequireFields<SubscriptionsubgraphDeploymentsArgs, 'skip' | 'first' | 'subgraphError'>>;
  subgraphDeploymentSchema?: SubscriptionResolver<Maybe<ResolversTypes['SubgraphDeploymentSchema']>, "subgraphDeploymentSchema", ParentType, ContextType, RequireFields<SubscriptionsubgraphDeploymentSchemaArgs, 'id' | 'subgraphError'>>;
  subgraphDeploymentSchemas?: SubscriptionResolver<Array<ResolversTypes['SubgraphDeploymentSchema']>, "subgraphDeploymentSchemas", ParentType, ContextType, RequireFields<SubscriptionsubgraphDeploymentSchemasArgs, 'skip' | 'first' | 'subgraphError'>>;
  subgraphDeploymentManifest?: SubscriptionResolver<Maybe<ResolversTypes['SubgraphDeploymentManifest']>, "subgraphDeploymentManifest", ParentType, ContextType, RequireFields<SubscriptionsubgraphDeploymentManifestArgs, 'id' | 'subgraphError'>>;
  subgraphDeploymentManifests?: SubscriptionResolver<Array<ResolversTypes['SubgraphDeploymentManifest']>, "subgraphDeploymentManifests", ParentType, ContextType, RequireFields<SubscriptionsubgraphDeploymentManifestsArgs, 'skip' | 'first' | 'subgraphError'>>;
  indexer?: SubscriptionResolver<Maybe<ResolversTypes['Indexer']>, "indexer", ParentType, ContextType, RequireFields<SubscriptionindexerArgs, 'id' | 'subgraphError'>>;
  indexers?: SubscriptionResolver<Array<ResolversTypes['Indexer']>, "indexers", ParentType, ContextType, RequireFields<SubscriptionindexersArgs, 'skip' | 'first' | 'subgraphError'>>;
  allocation?: SubscriptionResolver<Maybe<ResolversTypes['Allocation']>, "allocation", ParentType, ContextType, RequireFields<SubscriptionallocationArgs, 'id' | 'subgraphError'>>;
  allocations?: SubscriptionResolver<Array<ResolversTypes['Allocation']>, "allocations", ParentType, ContextType, RequireFields<SubscriptionallocationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  pool?: SubscriptionResolver<Maybe<ResolversTypes['Pool']>, "pool", ParentType, ContextType, RequireFields<SubscriptionpoolArgs, 'id' | 'subgraphError'>>;
  pools?: SubscriptionResolver<Array<ResolversTypes['Pool']>, "pools", ParentType, ContextType, RequireFields<SubscriptionpoolsArgs, 'skip' | 'first' | 'subgraphError'>>;
  delegator?: SubscriptionResolver<Maybe<ResolversTypes['Delegator']>, "delegator", ParentType, ContextType, RequireFields<SubscriptiondelegatorArgs, 'id' | 'subgraphError'>>;
  delegators?: SubscriptionResolver<Array<ResolversTypes['Delegator']>, "delegators", ParentType, ContextType, RequireFields<SubscriptiondelegatorsArgs, 'skip' | 'first' | 'subgraphError'>>;
  delegatedStake?: SubscriptionResolver<Maybe<ResolversTypes['DelegatedStake']>, "delegatedStake", ParentType, ContextType, RequireFields<SubscriptiondelegatedStakeArgs, 'id' | 'subgraphError'>>;
  delegatedStakes?: SubscriptionResolver<Array<ResolversTypes['DelegatedStake']>, "delegatedStakes", ParentType, ContextType, RequireFields<SubscriptiondelegatedStakesArgs, 'skip' | 'first' | 'subgraphError'>>;
  curator?: SubscriptionResolver<Maybe<ResolversTypes['Curator']>, "curator", ParentType, ContextType, RequireFields<SubscriptioncuratorArgs, 'id' | 'subgraphError'>>;
  curators?: SubscriptionResolver<Array<ResolversTypes['Curator']>, "curators", ParentType, ContextType, RequireFields<SubscriptioncuratorsArgs, 'skip' | 'first' | 'subgraphError'>>;
  signal?: SubscriptionResolver<Maybe<ResolversTypes['Signal']>, "signal", ParentType, ContextType, RequireFields<SubscriptionsignalArgs, 'id' | 'subgraphError'>>;
  signals?: SubscriptionResolver<Array<ResolversTypes['Signal']>, "signals", ParentType, ContextType, RequireFields<SubscriptionsignalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  nameSignal?: SubscriptionResolver<Maybe<ResolversTypes['NameSignal']>, "nameSignal", ParentType, ContextType, RequireFields<SubscriptionnameSignalArgs, 'id' | 'subgraphError'>>;
  nameSignals?: SubscriptionResolver<Array<ResolversTypes['NameSignal']>, "nameSignals", ParentType, ContextType, RequireFields<SubscriptionnameSignalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  nameSignalSubgraphRelation?: SubscriptionResolver<Maybe<ResolversTypes['NameSignalSubgraphRelation']>, "nameSignalSubgraphRelation", ParentType, ContextType, RequireFields<SubscriptionnameSignalSubgraphRelationArgs, 'id' | 'subgraphError'>>;
  nameSignalSubgraphRelations?: SubscriptionResolver<Array<ResolversTypes['NameSignalSubgraphRelation']>, "nameSignalSubgraphRelations", ParentType, ContextType, RequireFields<SubscriptionnameSignalSubgraphRelationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  dispute?: SubscriptionResolver<Maybe<ResolversTypes['Dispute']>, "dispute", ParentType, ContextType, RequireFields<SubscriptiondisputeArgs, 'id' | 'subgraphError'>>;
  disputes?: SubscriptionResolver<Array<ResolversTypes['Dispute']>, "disputes", ParentType, ContextType, RequireFields<SubscriptiondisputesArgs, 'skip' | 'first' | 'subgraphError'>>;
  attestation?: SubscriptionResolver<Maybe<ResolversTypes['Attestation']>, "attestation", ParentType, ContextType, RequireFields<SubscriptionattestationArgs, 'id' | 'subgraphError'>>;
  attestations?: SubscriptionResolver<Array<ResolversTypes['Attestation']>, "attestations", ParentType, ContextType, RequireFields<SubscriptionattestationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  epoch?: SubscriptionResolver<Maybe<ResolversTypes['Epoch']>, "epoch", ParentType, ContextType, RequireFields<SubscriptionepochArgs, 'id' | 'subgraphError'>>;
  epoches?: SubscriptionResolver<Array<ResolversTypes['Epoch']>, "epoches", ParentType, ContextType, RequireFields<SubscriptionepochesArgs, 'skip' | 'first' | 'subgraphError'>>;
  nameSignalTransaction?: SubscriptionResolver<Maybe<ResolversTypes['NameSignalTransaction']>, "nameSignalTransaction", ParentType, ContextType, RequireFields<SubscriptionnameSignalTransactionArgs, 'id' | 'subgraphError'>>;
  nameSignalTransactions?: SubscriptionResolver<Array<ResolversTypes['NameSignalTransaction']>, "nameSignalTransactions", ParentType, ContextType, RequireFields<SubscriptionnameSignalTransactionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  signalTransaction?: SubscriptionResolver<Maybe<ResolversTypes['SignalTransaction']>, "signalTransaction", ParentType, ContextType, RequireFields<SubscriptionsignalTransactionArgs, 'id' | 'subgraphError'>>;
  signalTransactions?: SubscriptionResolver<Array<ResolversTypes['SignalTransaction']>, "signalTransactions", ParentType, ContextType, RequireFields<SubscriptionsignalTransactionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bridgeWithdrawalTransaction?: SubscriptionResolver<Maybe<ResolversTypes['BridgeWithdrawalTransaction']>, "bridgeWithdrawalTransaction", ParentType, ContextType, RequireFields<SubscriptionbridgeWithdrawalTransactionArgs, 'id' | 'subgraphError'>>;
  bridgeWithdrawalTransactions?: SubscriptionResolver<Array<ResolversTypes['BridgeWithdrawalTransaction']>, "bridgeWithdrawalTransactions", ParentType, ContextType, RequireFields<SubscriptionbridgeWithdrawalTransactionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bridgeDepositTransaction?: SubscriptionResolver<Maybe<ResolversTypes['BridgeDepositTransaction']>, "bridgeDepositTransaction", ParentType, ContextType, RequireFields<SubscriptionbridgeDepositTransactionArgs, 'id' | 'subgraphError'>>;
  bridgeDepositTransactions?: SubscriptionResolver<Array<ResolversTypes['BridgeDepositTransaction']>, "bridgeDepositTransactions", ParentType, ContextType, RequireFields<SubscriptionbridgeDepositTransactionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  retryableTicket?: SubscriptionResolver<Maybe<ResolversTypes['RetryableTicket']>, "retryableTicket", ParentType, ContextType, RequireFields<SubscriptionretryableTicketArgs, 'id' | 'subgraphError'>>;
  retryableTickets?: SubscriptionResolver<Array<ResolversTypes['RetryableTicket']>, "retryableTickets", ParentType, ContextType, RequireFields<SubscriptionretryableTicketsArgs, 'skip' | 'first' | 'subgraphError'>>;
  retryableTicketRedeemAttempt?: SubscriptionResolver<Maybe<ResolversTypes['RetryableTicketRedeemAttempt']>, "retryableTicketRedeemAttempt", ParentType, ContextType, RequireFields<SubscriptionretryableTicketRedeemAttemptArgs, 'id' | 'subgraphError'>>;
  retryableTicketRedeemAttempts?: SubscriptionResolver<Array<ResolversTypes['RetryableTicketRedeemAttempt']>, "retryableTicketRedeemAttempts", ParentType, ContextType, RequireFields<SubscriptionretryableTicketRedeemAttemptsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenManager?: SubscriptionResolver<Maybe<ResolversTypes['TokenManager']>, "tokenManager", ParentType, ContextType, RequireFields<SubscriptiontokenManagerArgs, 'id' | 'subgraphError'>>;
  tokenManagers?: SubscriptionResolver<Array<ResolversTypes['TokenManager']>, "tokenManagers", ParentType, ContextType, RequireFields<SubscriptiontokenManagersArgs, 'skip' | 'first' | 'subgraphError'>>;
  authorizedFunction?: SubscriptionResolver<Maybe<ResolversTypes['AuthorizedFunction']>, "authorizedFunction", ParentType, ContextType, RequireFields<SubscriptionauthorizedFunctionArgs, 'id' | 'subgraphError'>>;
  authorizedFunctions?: SubscriptionResolver<Array<ResolversTypes['AuthorizedFunction']>, "authorizedFunctions", ParentType, ContextType, RequireFields<SubscriptionauthorizedFunctionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenLockWallet?: SubscriptionResolver<Maybe<ResolversTypes['TokenLockWallet']>, "tokenLockWallet", ParentType, ContextType, RequireFields<SubscriptiontokenLockWalletArgs, 'id' | 'subgraphError'>>;
  tokenLockWallets?: SubscriptionResolver<Array<ResolversTypes['TokenLockWallet']>, "tokenLockWallets", ParentType, ContextType, RequireFields<SubscriptiontokenLockWalletsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transaction?: SubscriptionResolver<Maybe<ResolversTypes['Transaction']>, "transaction", ParentType, ContextType, RequireFields<SubscriptiontransactionArgs, 'id' | 'subgraphError'>>;
  transactions?: SubscriptionResolver<Array<ResolversTypes['Transaction']>, "transactions", ParentType, ContextType, RequireFields<SubscriptiontransactionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TokenLockWalletResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokenLockWallet'] = ResolversParentTypes['TokenLockWallet']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  manager?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  initHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  beneficiary?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  managedAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  periods?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  releaseStartTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  vestingCliffTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  revocable?: Resolver<Maybe<ResolversTypes['Revocability']>, ParentType, ContextType>;
  tokenDestinationsApproved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tokensReleased?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokensWithdrawn?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokensRevoked?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumberCreated?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenManagerResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokenManager'] = ResolversParentTypes['TokenManager']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  masterCopy?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenDestinations?: Resolver<Maybe<Array<ResolversTypes['Bytes']>>, ParentType, ContextType>;
  authorizedFunctions?: Resolver<Maybe<Array<ResolversTypes['AuthorizedFunction']>>, ParentType, ContextType, RequireFields<TokenManagerauthorizedFunctionsArgs, 'skip' | 'first'>>;
  tokenLockCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransactionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BridgeDepositTransaction' | 'BridgeWithdrawalTransaction' | 'NameSignalTransaction' | 'SignalTransaction', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  signer?: Resolver<ResolversTypes['GraphAccount'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TransactionType'], ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Allocation?: AllocationResolvers<ContextType>;
  Attestation?: AttestationResolvers<ContextType>;
  AuthorizedFunction?: AuthorizedFunctionResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  BridgeDepositTransaction?: BridgeDepositTransactionResolvers<ContextType>;
  BridgeWithdrawalTransaction?: BridgeWithdrawalTransactionResolvers<ContextType>;
  Bytes?: GraphQLScalarType;
  Curator?: CuratorResolvers<ContextType>;
  CurrentSubgraphDeploymentRelation?: CurrentSubgraphDeploymentRelationResolvers<ContextType>;
  DelegatedStake?: DelegatedStakeResolvers<ContextType>;
  Delegator?: DelegatorResolvers<ContextType>;
  Dispute?: DisputeResolvers<ContextType>;
  Epoch?: EpochResolvers<ContextType>;
  GraphAccount?: GraphAccountResolvers<ContextType>;
  GraphAccountMeta?: GraphAccountMetaResolvers<ContextType>;
  GraphAccountName?: GraphAccountNameResolvers<ContextType>;
  GraphNetwork?: GraphNetworkResolvers<ContextType>;
  Indexer?: IndexerResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  NameSignal?: NameSignalResolvers<ContextType>;
  NameSignalSubgraphRelation?: NameSignalSubgraphRelationResolvers<ContextType>;
  NameSignalTransaction?: NameSignalTransactionResolvers<ContextType>;
  Pool?: PoolResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RetryableTicket?: RetryableTicketResolvers<ContextType>;
  RetryableTicketRedeemAttempt?: RetryableTicketRedeemAttemptResolvers<ContextType>;
  Signal?: SignalResolvers<ContextType>;
  SignalTransaction?: SignalTransactionResolvers<ContextType>;
  Subgraph?: SubgraphResolvers<ContextType>;
  SubgraphDeployment?: SubgraphDeploymentResolvers<ContextType>;
  SubgraphDeploymentManifest?: SubgraphDeploymentManifestResolvers<ContextType>;
  SubgraphDeploymentSchema?: SubgraphDeploymentSchemaResolvers<ContextType>;
  SubgraphMeta?: SubgraphMetaResolvers<ContextType>;
  SubgraphVersion?: SubgraphVersionResolvers<ContextType>;
  SubgraphVersionMeta?: SubgraphVersionMetaResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  TokenLockWallet?: TokenLockWalletResolvers<ContextType>;
  TokenManager?: TokenManagerResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = GraphnetworkTypes.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/graphnetwork/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const graphnetworkTransforms = [];
const additionalTypeDefs = [] as any[];
const graphnetworkHandler = new GraphqlHandler({
              name: "graphnetwork",
              config: {"endpoint":"https://gateway.thegraph.com/api/d251e73c747c8f3ebedf01e9ec02972a/subgraphs/id/DZz4kDTdmzWLWsV373w2bSmoar3umKKH9y82SUKr5qmp"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("graphnetwork"),
              logger: logger.child("graphnetwork"),
              importFn,
            });
sources[0] = {
          name: 'graphnetwork',
          handler: graphnetworkHandler,
          transforms: graphnetworkTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));