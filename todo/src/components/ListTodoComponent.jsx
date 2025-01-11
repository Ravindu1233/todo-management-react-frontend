import React, { useEffect, useState } from "react";
import {
  completeTodo,
  deleteTodo,
  getAllTodos,
  inCompleteTodo,
} from "../services/TodoService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListTodoComponent = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    listTodos();
  }, []);

  function listTodos() {
    setLoading(true);
    getAllTodos()
      .then((response) => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to load todos.");
        setLoading(false);
      });
  }

  function addNewTodo() {
    navigate("/add-todo");
  }

  function updateTodo(id) {
    navigate(`/update-todo/${id}`);
  }

  function removeTodo(id) {
    deleteTodo(id)
      .then(() => {
        toast.success("Todo deleted successfully!");
        listTodos();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete the todo.");
      });
  }

  function markCompleteTodo(id) {
    completeTodo(id)
      .then(() => {
        toast.success("Todo marked as complete!");
        listTodos();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to mark the todo as complete.");
      });
  }

  function markInCompleteTodo(id) {
    inCompleteTodo(id)
      .then(() => {
        toast.success("Todo marked as incomplete!");
        listTodos();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to mark the todo as incomplete.");
      });
  }

  return (
    <div className="container">
      <ToastContainer />
      <h2 className="text-center">List of Todos</h2>
      <button className="btn btn-primary mb-2" onClick={addNewTodo}>
        Add Todo
      </button>
      {loading ? (
        <p>Loading todos...</p>
      ) : todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        <div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Todo Title</th>
                <th>Todo Description</th>
                <th>Todo Completed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>{todo.completed ? "YES" : "NO"}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => updateTodo(todo.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeTodo(todo.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => markCompleteTodo(todo.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Complete
                    </button>
                    <button
                      className="btn btn-info"
                      onClick={() => markInCompleteTodo(todo.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Incomplete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListTodoComponent;
