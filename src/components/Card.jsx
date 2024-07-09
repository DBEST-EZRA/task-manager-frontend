import React from "react";

const Card = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.content}</p>
      <small>{new Date(task.date).toLocaleString()}</small>
      <div>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Card;
