import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";

const AddNote = () => {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const navigate = useNavigate();

  const saveNote = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { judul, isi });
      navigate("/"); // Balik ke halaman utama setelah simpan
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <h2 className="title">Add New Note</h2>
        <form onSubmit={saveNote}>
          <div className="field">
            <label className="label">Judul</label>
            <div className="control">
              <input type="text" className="input" value={judul} 
                onChange={(e) => setJudul(e.target.value)} placeholder="Judul Catatan" required />
            </div>
          </div>
          <div className="field">
            <label className="label">Isi</label>
            <div className="control">
              <textarea className="textarea" value={isi} 
                onChange={(e) => setIsi(e.target.value)} placeholder="Tulis isi catatan di sini..." required></textarea>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-success">Save</button>
            <button type="button" onClick={() => navigate("/")} className="button is-light ml-2">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
