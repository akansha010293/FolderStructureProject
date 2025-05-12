// src/TreeContext.tsx
import React, {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
} from "react";
import { TreeAction, TreeState } from "../types";
import { treeReducer } from "./reducer/treeReducer";

const initialState: TreeState = {
  nodes: [],
};

interface TreeContextProps {
  state: TreeState;
  dispatch: Dispatch<TreeAction>;
}

const TreeContext = createContext<TreeContextProps | null>(null);

export const TreeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(treeReducer, initialState);

  return (
    <TreeContext.Provider value={{ state, dispatch }}>
      {children}
    </TreeContext.Provider>
  );
};

export const useTreeContext = () => {
  const context = useContext(TreeContext);
  if (context === null) {
    throw new Error("useTree must be used within a TreeProvider");
  }
  return context;
};
