import React, { useEffect, useState } from "react";
import axios from "axios";

const Prof = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [studentName, setStudentName] = useState("");
  const [editName, setEditName] = useState("");
  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const baseURL = "http://localhost:3000";

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${baseURL}/students`);
      setStudents(res.data.data || []);
    } catch (error) {
      alert("Error fetching student data.");
    }
  };

  const handleAdd = async () => {
    if (!studentName.trim()) return alert("Please enter a name.");
    try {
      const res = await axios.post(`${baseURL}/students`, { title: studentName });
      setStudents((prev) => [...prev, res.data.data]);
      setStudentName("");
    } catch (error) {
      alert("Failed to add student.");
    }
  };

  const handleUpdate = async () => {
    if (!editName.trim()) return alert("Please enter a name.");
    try {
      const res = await axios.put(`${baseURL}/students/${editingId}`, { title: editName });
      const updated = students.map((student) =>
        student._id === editingId ? res.data.data : student
      );
      setStudents(updated);
      setEditName("");
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      alert("Failed to update student.");
    }
  };

  const handleEditClick = (id, currentName) => {
    setEditingId(id);
    setEditName(currentName);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`${baseURL}/students/${id}`);
      const filtered = students.filter((student) => student._id !== id);
      setStudents(filtered);
    } catch (error) {
      alert("Failed to delete student.");
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    const filtered = students.filter((student) =>
      student.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStudents(filtered);
    setSearchTerm("");
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Student Management Dashboard</h1>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search by name"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Add or Update */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={isEditing ? editName : studentName}
          placeholder="Enter student name"
          onChange={(e) =>
            isEditing ? setEditName(e.target.value) : setStudentName(e.target.value)
          }
          className="border px-4 py-2 rounded w-full"
        />
        <button
          onClick={isEditing ? handleUpdate : handleAdd}
          className={`${
            isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"
          } text-white px-6 py-2 rounded`}
        >
          {isEditing ? "Update" : "Add"}
        </button>
      </div>

      {/* Student List */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 border-b font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td className="px-6 py-4 text-gray-500" colSpan="2">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 border-b">{student.title}</td>
                  <td className="px-6 py-3 border-b space-x-3">
                    <button
                      onClick={() => handleEditClick(student._id, student.title)}
                      className="text-yellow-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Prof;
