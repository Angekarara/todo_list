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
            +
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
            <p>
              {todo.task}
            </p>
            <div
              onClick={() => handleDelete(todo.id)}
              className="p-1 rounded-full text-white font-bold text-xl"
            >
              <FaTrash className="text-[#ff2700] text-2xl font-extrabold " />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
