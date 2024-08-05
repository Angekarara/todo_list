import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

export default function Todo() {
  const [toDos, setToDos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [task, setTask] = useState("");

  // useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem("todos"));
  //   setToDos(storedTodos);
  // }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDos));
  }, [toDos]);

  const handleFormData = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      const newToDo = {
        id: Date.now(),
        task: task,
        isCompleted: false,
      };
      setToDos([...toDos, newToDo]);
      setTask("");
    }
  };

  const handleDelete = (id) => {
    setToDos(toDos.filter((todo) => todo.id !== id));
  };

  const toggleCompletion = (id) => {
    setToDos(
      toDos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div>
      <i class="ri-add-circle-fill"></i>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[200px] text-center text-[#eaeaea]">Todos</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add ToDo..."
            name="task"
            onChange={handleFormData}
            value={task}
            className="w-[1000px] border rounded-full p-7"
          />
          <button
            type="submit"
            className="border bg-[#008d8c] p-1 rounded-full text-white font-bold text-2xl w-10 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"></path>
            </svg>
          </button>
        </form>
      </div>
      <div className="mt-10 space-y-5">
        {toDos.map((todo) => (
          <div key={todo.id} className="flex pl-[300px]">
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleCompletion(todo.id)}
            />

            <p
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.task}
            </p>
            <div
              onClick={() => handleDelete(todo.id)}
              className="p-1 rounded-full text-white font-bold text-xl ml-[900px]"
            >
              <FaTrash className="text-[#ff2700] text-2xl font-extrabold " />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
