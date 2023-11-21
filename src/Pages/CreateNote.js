import React, { useState } from "react";
import Header from "../Components/Header";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { api } from "../api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateNote() {
  const navigate = useNavigate();
  const [cookie] = useCookies(["access_token"]);
  const [loading, setloading] = useState(false);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [error, seterror] = useState(false);
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  var modules = {
    toolbar: toolbarOptions,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "" || description === "") {
      seterror(true);
    } else {
      seterror(false);
      try {
        await axios.post(
          `${api}/notes/create`,
          { title, description, user_id: localStorage.getItem("userID") },
          {
            headers: {
              access_token: cookie.access_token,
            },
          }
        );
        toast.success("Note Created Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          navigate("/home");
        }, 3000);
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
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="firstname" className="font-medium">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              placeholder="Enter the Title"
              className="block w-full rounded-lg border border-black px-3 py-2 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 border-solid"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="font-medium">
              Description
            </label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setdescription}
              modules={modules}
            />
          </div>
          {error && (
            <p className="text-red-600 text-center font-semibold text-xl">
              Title and Description must not be empty
            </p>
          )}
          <div className="flex justify-center">
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <button
                type="submit"
                className="bg-blue-800 p-4 rounded-full hover:text-white transition-all duration-100 hover:opacity-90 text-white uppercase"
              >
                Create note
              </button>
            )}
          </div>
        </form>
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
      </div>
    </>
  );
}

export default CreateNote;
