import React from 'react';
import { statusSlugToDisplayName } from './StatusMapping'; // Assuming StatusMapping.js is in the same directory

function Todolist({ item, status, deleteItem, updateStatus }) {
  const formatStatus = (status) => {
    // Using the mapping object to get the display name of the status
    return statusSlugToDisplayName[status];
  };

  return (
    <li className={`list-item ${status}`}>
      <div className="todo-content">
        <p className="todo-item">{item}</p>
        <p className="todo-status">Status: {formatStatus(status)}</p>
      </div>
      <div className="icons">
        {status !== 'done' && (
          <button className="status-btn" onClick={updateStatus}>
            <i className="fa-solid fa-square-check"></i>
          </button>
        )}
        <button className="icon-delete" onClick={deleteItem}>
          <i className="fa-solid fa-square-minus icon-delete"></i>
        </button>
      </div>
    </li>
  );
}

export default Todolist;
