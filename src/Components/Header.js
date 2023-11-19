import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav class="flex justify-between lg:px-20 md:px-20 py-5 items-center sm:px-10 shadow-md">
      <h1 class="text-xl font-bold">
        <Link to={"/home"} >
        Notes App
        </Link>
      </h1>
      <div class="flex items-center">
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 pt-0.5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            class="ml-2 outline-none bg-transparent font-"
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
          />
        </div>
      </div>
    </nav>
  );
}

export default Header;
