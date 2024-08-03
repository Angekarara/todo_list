import { useState } from "react";

export default function Todo() {
  const [toDo, setToDo] = useState([
    {
      id: 1,
      task: "",
      isInserted: true,
    },
  ]);
  const handleformData = (e) => {
    const { name, type, value, checked } = e.target;
    setToDo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-[200px] text-center text-[#eaeaea]">Todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add ToDo..."
          name="task"
          onChange={handleformData}
          value={toDo.task}
          className="w-[1000px] border rounded-full p-7"
        />
        <button
          type="submit"
          className="border bg-[#008d8c] p-1 rounded-full text-white font-bold text-2xl w-10 text-center"
        >
          +
        </button>
      </form>

      <p>{toDo.task} </p>
    </div>
  );
}
