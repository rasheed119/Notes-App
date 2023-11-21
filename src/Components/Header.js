import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const navigate = useNavigate();
  const [Cookie, setCookie, removeCookie] = useCookies(["access_token"]);
  const Logout = () => {
    localStorage.removeItem("UserID");
    removeCookie("access_token");
    toast.warn("🦄 Wow so easy!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };
  return (
    <>
      <nav class="flex justify-between lg:px-20 md:px-20 py-5 items-center sm:px-10 shadow-md">
        <h1 class="text-xl font-bold">
          <Link to={"/home"}>Notes App</Link>
        </h1>
        <div>
          <button
            onClick={Logout}
            className="flex items-center gap-3 border-black border-2 px-3 py-2  rounded-full"
          >
            <CiLogout className="text-xl" />
            Logout
          </button>
        </div>
      </nav>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
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

export default Header;
