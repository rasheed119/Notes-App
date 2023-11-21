import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { useCookies } from "react-cookie";
import Header from "../Components/Header";
import { IoMdArrowRoundBack } from "react-icons/io";

function Notes() {
  const { id } = useParams();
  const [Cookies] = useCookies(["access_token"]);
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${api}/notes/getone/${id}`, {
          headers: {
            access_token: Cookies.access_token,
          },
        });
        setNotes(response.data.find_note);
        setLoading(false);
      } catch (error) {
        // Handle error
        setLoading(false);
      }
    };
    fetchData();
  }, [Cookies.access_token, id]);

  const { title, description } = notes;

  return (
    <>
      <Header />

      <section className="container mx-auto py-16">
        {!loading && Object.keys(notes).length === 0 && (
          <div>
            <div className="spinner"></div>
          </div>
        )}
        {Object.keys(notes).length > 1 && (
          <div className="flex flex-col gap-7 border-black border-2 p-5 rounded-lg overflow-auto">
            <Link
              to={"/home"}
              className="flex justify-center items-center gap-2 bg-[#2C4251] w-[100px] text-white p-4 rounded-full hover:opacity-90"
            >
              <IoMdArrowRoundBack />
              <button>Back</button>
            </Link>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold underline uppercase">
                Title :
              </h1>
              <p className="font-semibold text-2xl">{title}</p>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold underline uppercase">
                Description :
              </h1>
              <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Notes;
