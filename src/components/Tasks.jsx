import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import ModalForm from "./ModalForm";
import Modal from "react-modal";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:5000/tasks");
    console.log("Fetched tasks:", response.data);
    setTasks(response.data);
  };

  const handleSave = async (task) => {
    if (task.id) {
      await axios.put(`http://localhost:5000/tasks/${task.id}`, task);
    } else {
      const response = await axios.post("http://localhost:5000/tasks", task);
      task.id = response.data.id;
    }
    fetchTasks();
    setModalIsOpen(false);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  const handleAdd = () => {
    setCurrentTask(null);
    setModalIsOpen(true);
  };

  return (
    <div className="task-list">
      <button onClick={handleAdd}>New Task</button>
      <div className="task-cards">
        {tasks.map((task) => (
          <Card
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <ModalForm task={currentTask} onSave={handleSave} />
      </Modal>
    </div>
  );
};

export default Tasks;
