import React from "react";
import Header from "../Components/Header";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { api } from "../api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const create_note_validation_schema = yup.object().shape({
  title: yup
    .string()
    .min(10, "Ttile Should Contain Atleast 10 Characters")
    .required("Title is Required"),
  description: yup.string().required("Description is Required"),
});

function CreateNote() {
  const navigate = useNavigate();
  const [cookie] = useCookies(["access_token"]);
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
      },
      validationSchema: create_note_validation_schema,
      onSubmit: async (data) => {
        try {
          axios.post(
            `${api}/notes/create`,
            { ...data, user_id: localStorage.getItem("userID") },
            {
              headers: {
                access_token: cookie.access_token,
              },
            }
          );
          toast.success("Notes Created Successfully", {
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
          toast.error(`${error.response.data.Error}`, {
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
      },
    });
  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="firstname" className="font-medium">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter the Title"
              className="block w-full rounded-lg border border-black px-3 py-2 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 border-solid"
            />
            {errors.title && touched.title && (
              <p className="text-red-500 text-xs italic">{errors.title}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="font-medium">
              Description
            </label>
            <textarea
              type="email"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={"12"}
              placeholder="Enter the Description"
              className="block w-full rounded-lg border border-black px-3 py-2 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 border-solid"
            />
            {errors.description && touched.description && (
              <p className="text-red-500 text-xs italic">
                {errors.description}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-800 p-4 rounded-full hover:text-white transition-all duration-100 hover:opacity-90"
            >
              Create note
            </button>
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
