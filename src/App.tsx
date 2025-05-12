// src/App.tsx
import React, { useState } from "react";
import NodeItem from "./components/NodeItem";
import NodeInputForm from "./components/NodeInputForm";
import { ActionType, NodeType } from "./types"; // Ensure NodeType is imported
import "./App.css"; // We'll create basic styles here
import { useTreeContext } from "./hooks/useTreeContext";

function App() {
  const { state, dispatch } = useTreeContext();
  const [isAddingRootFolder, setIsAddingRootFolder] = useState(false);

  const handleAddRootFolderSubmit = (name: string) => {
    if (name.trim()) {
      // Ensure name is not blank
      dispatch({
        type: ActionType.ADD_NODE,
        payload: { name, type: "folder", parentId: null }, // Root nodes are folders
      });
    }
    setIsAddingRootFolder(false);
  };

  const handleAddRootFolderCancel = () => {
    setIsAddingRootFolder(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Folder Structure Maker (React)</h1>
      </header>
      <main>
        <button
          onClick={() => setIsAddingRootFolder(true)}
          disabled={isAddingRootFolder}
          className="add-root-button"
        >
          Add root folder
        </button>

        {isAddingRootFolder && (
          <div className="root-input-form-container">
            <NodeInputForm
              parentId={null}
              isRootLevel={true}
              onSubmit={handleAddRootFolderSubmit}
              onCancel={handleAddRootFolderCancel}
            />
          </div>
        )}

        <div className="tree-container">
          {state.nodes.length === 0 && !isAddingRootFolder && (
            <p>No folders yet. Add a root folder to start.</p>
          )}
          {state.nodes.map((node) => (
            <NodeItem key={node.id} node={node} />
          ))}
        </div>

        <div className="json-output-container">
          <h2>JSON Representation:</h2>
          <textarea
            readOnly
            value={JSON.stringify(state.nodes, null, 2)}
            rows={15}
            cols={80}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
