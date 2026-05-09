import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../api";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const response = await axios.get(API_URL);
      setNotes(response.data.data);
    } catch (error) {
      console.log("Error fetch data:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      getNotes(); // Refresh daftar setelah hapus
    } catch (error) {
      console.log(error);
    }
  };

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";

    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(tanggal));
  };

  return (
    <div className="container mt-5">
      <h1 className="title">My Notes</h1>
      <Link to="add" className="button is-success mb-4">Add New Note</Link>
      <table className="table is-striped is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>No</th>
            <th>Judul</th>
            <th>Isi</th>
            <th>Dibuat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={note.id}>
              <td>{index + 1}</td>
              <td>{note.judul}</td>
              <td>{note.isi}</td>
              <td>{formatTanggal(note.tanggal_dibuat)}</td>
              <td>
                <Link to={`edit/${note.id}`} className="button is-small is-info mr-2">Edit</Link>
                <button onClick={() => deleteNote(note.id)} className="button is-small is-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoteList;
