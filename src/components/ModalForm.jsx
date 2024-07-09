import React, { useState, useEffect } from "react";

const ModalForm = ({ task, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setContent(task.content);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...task, title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default ModalForm;
