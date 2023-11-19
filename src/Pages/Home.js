import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { api } from "../api";
import { useCookies } from "react-cookie";

function Home() {
  const [Notes, setNotes] = useState([]);
  const [cookie] = useCookies(["access_token"]);
  useEffect(() => {
    async function getnotes(){
        const response = await axios.get(`${api}/notes/get/${localStorage.getItem("userID")}`,{
            headers:{
                access_token : cookie.access_token
            }
        })
        setNotes(response.data.find_notes);
    }
    getnotes();
  }, []);
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:mx-0 md:max-w-none py-16">
            { Notes.map((data,index)=>(
                <div key={index} className="border-solid border-2 border-black rounded-lg max-w-[300px] py-3 px-1">
                    <div className="flex flex-col ">
                        <h1 className="font-semibold text-xl">Title</h1>
                    </div>
                </div>
            )) }
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
