// src/components/NodeInputForm.tsx
import React, { useState } from 'react';
import { NodeType } from '../types';

interface NodeInputFormProps {
  parentId: string | null; // To know where to add this node
  isRootLevel: boolean; // True if adding a root folder
  onSubmit: (name: string, type: NodeType, parentId: string | null) => void;
  onCancel: () => void;
}

const NodeInputForm: React.FC<NodeInputFormProps> = ({ parentId, isRootLevel, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<NodeType>(isRootLevel ? 'folder' : 'file'); // Default to file for children, folder for root

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '') {
      alert('Name cannot be blank.'); // Or handle deletion as per requirement
                                   // For now, just preventing submission
      return;
    }
    onSubmit(name, type, parentId);
  };

  return (
    <form onSubmit={handleSubmit} className="node-input-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={isRootLevel ? "Folder name" : "Node name"}
        autoFocus
      />
      {!isRootLevel && (
        <select value={type} onChange={(e) => setType(e.target.value as NodeType)}>
          <option value="file">File</option>
          <option value="folder">Folder</option>
        </select>
      )}
      <button type="submit">Create</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default NodeInputForm;