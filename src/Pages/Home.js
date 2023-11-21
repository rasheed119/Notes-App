import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../api";
import { useCookies } from "react-cookie";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOpenInNew } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();
  const [Notes, setNotes] = useState([]);
  const [id, setid] = useState();
  const [cookie] = useCookies(["access_token"]);
  const [loading, setloading] = useState(true);
  async function getnotes() {
    setloading(true);
    const response = await axios.get(
      `${api}/notes/get/${localStorage.getItem("userID")}`,
      {
        headers: {
          access_token: cookie.access_token,
        },
      }
    );
    setNotes(response.data.find_notes);
    setloading(false);
  }
  useEffect(() => {
    getnotes();
  }, []);
  async function deletenotes(id) {
    try {
      await axios.delete(`${api}/notes/delete/${id}`, {
        headers: {
          access_token: cookie.access_token,
        },
      });
      toast.success("Note Deleted Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setid();
      getnotes();
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.Error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  const editNote = (title, description, id) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);
    const encodedID = encodeURIComponent(id);
    navigate(`/edit/${encodedTitle}/${encodedDescription}/${encodedID}`);
  };
  return (
    <>
      <Header />
      <div className="py-16">
        <div className="container mx-auto">
          <Link
            to={"/create"}
            className={`p-4 rounded-full bg-[#2C4251] text-white `}
          >
            Create Note
          </Link>
          {!loading && Notes.length === 0 && (
            <div className="w-full bg-red-300 mt-16 rounded-lg">
              <p className=" text-2xl py-8 px-4">
                No Notes found Found, Create a note to See here
              </p>
            </div>
          )}
          {loading && (
            <div className="mt-16 flex justify-center">
              <div className="spinner"></div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:mx-0 md:max-w-none py-16">
            {Notes.map((data, index) => (
              <div
                key={index}
                className="border-solid border-2 border-black rounded-lg max-w-[300px] py-3 px-2 flex flex-col gap-4"
              >
                <div>
                  <h1 className="font-semibold text-xl">Title :</h1>
                  <span>{data.title}</span>
                </div>
                <div>
                  <h1 className="font-semibold text-xl ">Description :</h1>
                  <span className="line-clamp-2">{data.description}</span>
                </div>

                <div className="flex gap-4 justify-center">
                  <MdDelete
                    onClick={() => {
                      setid(data._id);
                      document.getElementById("my_modal_1").showModal();
                    }}
                    title="delete"
                    className="text-red-500 text-2xl"
                  />
                  <CiEdit
                    onClick={() =>
                      editNote(data.title, data.description, data._id)
                    }
                    title="Edit"
                    className="text-red-500 text-2xl"
                  />
                  <Link to={`/notes/${data._id}`}>
                    <MdOpenInNew
                      title="open"
                      className="text-red-500 text-2xl"
                    />
                  </Link>
                </div>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Note</h3>
                    <p className="py-4">
                      Are You Sure want to Delete the Note?
                    </p>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button
                          onClick={() => deletenotes(id)}
                          className="bg-red-500 text-white py-3 px-4 mr-4 rounded-full hover:opacity-90"
                        >
                          Delete
                        </button>
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Home;
