// src/components/NodeItem.tsx
import React, { useState } from "react";
import { NodeModel, ActionType, NodeType } from "../types";
import NodeInputForm from "./NodeInputForm";
import { useTreeContext } from "../hooks/useTreeContext";

interface NodeItemProps {
  node: NodeModel;
}

/*@review: store this in component if this grows */
const folderSvg = (
  <svg width={15} height={15} style={{ marginRight: 4 }}>
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="folder-open"
      className="svg-inline--fa fa-folder-open fa-w-18"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
    >
      <path
        fill="currentColor"
        d="M527.9 224H480v-48c0-26.5-21.5-48-48-48H272l-64-64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h400c16.5 0 31.9-8.5 40.7-22.6l79.9-128c20-31.9-3-73.4-40.7-73.4zM48 118c0-3.3 2.7-6 6-6h134.1l64 64H426c3.3 0 6 2.7 6 6v42H152c-16.8 0-32.4 8.8-41.1 23.2L48 351.4zm400 282H72l77.2-128H528z"
      ></path>
    </svg>
  </svg>
);

const fileSvg = (
  <svg width={15} height={15} style={{ marginRight: 4 }}>
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="file"
      className="svg-inline--fa fa-file fa-w-12"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <path
        fill="currentColor"
        d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"
      ></path>
    </svg>
  </svg>
);

const NodeItem: React.FC<NodeItemProps> = ({ node }) => {
  const { dispatch } = useTreeContext();
  const [isHovering, setIsHovering] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true); // Folders can be collapsed/expanded

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${node.name}"?`)) {
      dispatch({ type: ActionType.DELETE_NODE, payload: { nodeId: node.id } });
    }
  };

  const handleAddChildSubmit = (
    name: string,
    type: NodeType,
    parentId: string | null
  ) => {
    if (name.trim()) {
      dispatch({
        type: ActionType.ADD_NODE,
        payload: { name, type, parentId },
      });
    }
    setIsAddingChild(false);
  };

  const nodeIcon = node.type === "folder" ? <>{folderSvg}</> : <>{fileSvg}</>;

  return (
    <div
      className="node-item"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="node-content">
        <span
          onClick={() => node.type === "folder" && setIsExpanded(!isExpanded)}
          style={{ cursor: node.type === "folder" ? "pointer" : "default" }}
        >
          {nodeIcon}
          {node.name}
        </span>
        {isHovering && (
          <div className="node-actions">
            {node.type === "folder" && (
              <button
                onClick={() => setIsAddingChild(true)}
                title="Add child node"
              >
                +
              </button>
            )}
            <button onClick={handleDelete} title="Delete node">
              -
            </button>
          </div>
        )}
      </div>

      {isAddingChild && node.type === "folder" && (
        <div style={{ marginLeft: "20px" }}>
          <NodeInputForm
            parentId={node.id}
            isRootLevel={false}
            onSubmit={handleAddChildSubmit}
            onCancel={() => setIsAddingChild(false)}
          />
        </div>
      )}

      {node.type === "folder" &&
        isExpanded &&
        node.children &&
        node.children.length > 0 && (
          <div style={{ marginLeft: "20px" }}>
            {node.children.map((child) => (
              <NodeItem key={child.id} node={child} />
            ))}
          </div>
        )}
      {node.type === "folder" &&
        isExpanded &&
        node.children &&
        node.children.length === 0 &&
        !isAddingChild && (
          <div
            style={{ marginLeft: "20px", fontStyle: "italic", color: "#888" }}
          >
            (empty)
          </div>
        )}
    </div>
  );
};

export default NodeItem;
