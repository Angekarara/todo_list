import { useState } from "react";

export default function Todo() {
  const [toDos, setToDo] = useState([]);
  const [task, setTask] = useState("");

  const handleformData = (e) => {
    const { value } = e.target;
    setTask(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      const newToDo = {
        id: toDos.length + 1,
        task: task,
        isInserted: true,
      };

      setToDo([...toDos, newToDo]);
      setTask("");
    }
  };
  return (
    <div className="">
      <h1 className="text-[200px] text-center text-[#eaeaea]">Todos</h1>
      <div className="flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add ToDo..."
            name="task"
            onChange={handleformData}
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

      <div className="pl-[300px] pt-16 space-y-6">
        {toDos.map((toDo) => (
          <p key={toDo.id}>{toDo.task}</p>
        ))}
      </div>
    </div>
  );
}
