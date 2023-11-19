import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const login_validation_schema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

function Login() {
  const navigate = useNavigate();
  const [, SetCookie] = useCookies(["access_token"]);
  const [showpassword, setshowpassword] = useState(true);
  const [loading, setloading] = useState(false);
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: login_validation_schema,
      onSubmit: async (data) => {
        setloading(true);
        try {
          const response = await axios.post(`${api}/auth/log-in`, data);
          localStorage.setItem("userID", response.data.userID);
          SetCookie("access_token", response.data.token);
          toast.success("Log In Successfull", {
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
          setloading(false);
          console.log(error);
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
    <div className="w-full h-screen flex items-center">
      <div className="flex flex-col gap-10 border-solid border-2 rounded-lg border-red-600  py-4 px-6 sm:w-[500px] w-[600px] mx-auto">
        <h1 className="text-center flex-1 text-2xl font-semibold">Login</h1>
        <form onSubmit={handleSubmit} className="w-[100%] flex flex-col gap-5">
          <input
            className=" px-3 py-4 border-solid border-2 focus:outline-none border-slate-500  rounded-lg"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
          <div className="flex gap-3">
            <input
              className="flex-1 px-3 py-4 border-solid border-2 focus:outline-none border-slate-500  rounded-lg"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type={showpassword ? "password" : "text"}
            />
            <button
              type="button"
              onClick={() => setshowpassword(!showpassword)}
              className="w-[60px] border-solid border-2 hover:opacity-90 border-black rounded-lg"
            >
              {showpassword ? (
                <FaEye className="mx-auto  text-2xl" />
              ) : (
                <FaEyeSlash className="mx-auto  text-2xl" />
              )}
            </button>
          </div>
          {errors.password && touched.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
          {loading ? (
            <div className="w-full flex justify-center">
              <div className="spinner"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="bg-slate-400 py-4 rounded-lg text-xl hover:opacity-90 uppercase font-semibold"
            >
              Log In
            </button>
          )}
          <div className="text-right">
            <Link to={"/sign-up"} className="text-blue-600 underline ">
              Don't have an account? ,Sign up
            </Link>
          </div>
        </form>
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
    </div>
  );
}

export default Login;
