import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ApiTodo = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [isLoading, setIsLoaded] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [result, setResult] = useState([]);
  const [isCreating, setCreating] = useState(true);
  const [len, setLen] = useState(0);

  const base = "http://localhost:3000";

  const search = () => {
    const filtered = result.filter((items) => items.title === value1);
    setResult(filtered);
    setValue1("");
  };

  const add = () => {
    if (!value2.trim()) return alert("Please enter a title");
    axios.post(`${base}/students`, { title: value2 })
      .then((res) => {
        setResult((prev) => [...prev, res.data.data]);
        setValue2("");
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log("Error:", error.message);
        alert("Failed to add student.");
      });
  };

  const update = async () => {
    try {
      const puted = await axios.put(`${base}/students/${updateId}`, { title: value3 });
      const filtered = result.map((items) =>
        items._id === updateId ? puted.data.data : items
      );
      setResult(filtered);
      setValue3("");
      setIsLoaded(true);
      setCreating(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const markAsUpdate = (ID) => {
    setUpdateId(ID);
    setCreating(false);
  };

  const markAsComplete = async (ID) => {
    try {
      await axios.delete(`${base}/students/${ID}`);
      const complete = result.filter((items) => items._id !== ID);
      setResult(complete);
    } catch (error) {
      alert(error.message);
    }
  };

  const markAsDelete = async (ID) => {
    try {
      await axios.delete(`${base}/students/${ID}`);
      const complete = result.filter((items) => items._id !== ID);
      setResult(complete);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetched = async () => {
      try {
        const res = await axios.get(`${base}/students`);
        if (!res.data.data) return setIsLoaded(false);
        setResult(res.data.data);
        setIsLoaded(true);
      } catch (error) {
        alert(error.message);
      }
    };
    fetched();
  }, []);

  useEffect(() => {
    setLen(result.length);
  }, [result]);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-semibold text-center mb-6">📋 Task Manager</h1>
      <h2 className="text-lg font-medium text-gray-600 mb-4">Total Tasks: {len}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          value={value1}
          placeholder="Search by title"
          onChange={(e) => setValue1(e.target.value)}
          className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={search}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          🔍 Search
        </button>

        {isCreating ? (
          <>
            <input
              type="text"
              value={value2}
              placeholder="Enter task title"
              onChange={(e) => setValue2(e.target.value)}
              className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={add}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              ➕ Add
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={value3}
              placeholder="Update task"
              onChange={(e) => setValue3(e.target.value)}
              className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={update}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              ✏️ Update
            </button>
          </>
        )}
      </div>

      {isLoading && (
        <div className="space-y-4">
          {result.map((items) => (
            <div
              key={items._id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded shadow"
            >
              <li className="flex-1 list-none text-gray-800 font-medium">{items.title}</li>
              <div className="flex space-x-2">
                <button
                  onClick={() => markAsUpdate(items._id)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  📝
                </button>
                <button
                  onClick={() => markAsComplete(items._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  ✔
                </button>
                <button
                  onClick={() => markAsDelete(items._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  ✖
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiTodo;
