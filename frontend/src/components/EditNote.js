import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../api";

const EditNote = () => {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil ID dari URL

  // Fungsi untuk mengambil data lama berdasarkan ID
  const getNoteById = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setJudul(response.data.data.judul);
      setIsi(response.data.data.isi);
    } catch (error) {
      console.log("Gagal mengambil data:", error);
    }
  }, [id]);

  useEffect(() => {
    getNoteById();
  }, [getNoteById]);

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${id}`, {
        judul,
        isi,
      });
      navigate("/"); // Balik ke halaman utama setelah sukses
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <h1 className="title">Edit Note</h1>
        <form onSubmit={updateNote}>
          <div className="field">
            <label className="label">Judul</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Judul Catatan"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Isi</label>
            <div className="control">
              <textarea
                className="textarea"
                value={isi}
                onChange={(e) => setIsi(e.target.value)}
                placeholder="Isi Catatan"
              ></textarea>
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
