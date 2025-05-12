// src/types.ts
export type NodeType = 'folder' | 'file';

export interface NodeModel {
  id: string;
  name: string;
  type: NodeType;
  children?: NodeModel[]; // Only for folders
}

// Action types for the reducer
export enum ActionType {
  ADD_NODE = 'ADD_NODE',
  DELETE_NODE = 'DELETE_NODE',
  // Potentially others like RENAME_NODE, MOVE_NODE if extending
}

// Payload for adding a node
export interface AddNodePayload {
  name: string;
  type: NodeType;
  parentId: string | null; // null for root nodes
}

// Action definitions
export type TreeAction =
  | { type: ActionType.ADD_NODE; payload: AddNodePayload }
  | { type: ActionType.DELETE_NODE; payload: { nodeId: string } };

// State shape
export interface TreeState {
  nodes: NodeModel[];
  // Could include other global state e.g., currently selected node, etc.
}