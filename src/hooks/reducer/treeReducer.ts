// src/treeReducer.ts

import { ActionType, NodeModel, TreeAction, TreeState } from "../../types";

const addNodeRecursive = (
  nodes: NodeModel[],
  newNode: NodeModel,
  parentId: string | null
): NodeModel[] => {
  if (parentId === null) {
    // Add to root
    return [...nodes, newNode];
  }
  return nodes.map((node) => {
    if (node.id === parentId) {
      if (node.type === "folder") {
        return {
          ...node,
          children: [...(node.children || []), newNode],
        };
      }
      return node; // Cannot add child to a file
    }
    if (node.children) {
      return {
        ...node,
        children: addNodeRecursive(node.children, newNode, parentId),
      };
    }
    return node;
  });
};

const deleteNodeRecursive = (
  nodes: NodeModel[],
  nodeId: string
): NodeModel[] => {
  return nodes
    .filter((node) => node.id !== nodeId)
    .map((node) => {
      if (node.children) {
        return {
          ...node,
          children: deleteNodeRecursive(node.children, nodeId),
        };
      }
      return node;
    });
};

export const treeReducer = (
  state: TreeState,
  action: TreeAction
): TreeState => {
  switch (action.type) {
    case ActionType.ADD_NODE: {
      const { name, type, parentId } = action.payload;
      const newNode: NodeModel = {
        id: crypto.randomUUID(),
        name,
        type,
        ...(type === "folder" && { children: [] }),
      };
      return {
        ...state,
        nodes: addNodeRecursive(state.nodes, newNode, parentId),
      };
    }
    case ActionType.DELETE_NODE: {
      const { nodeId } = action.payload;
      return {
        ...state,
        nodes: deleteNodeRecursive(state.nodes, nodeId),
      };
    }
    default:
      return state;
  }
};
