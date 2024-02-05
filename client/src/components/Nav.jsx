import React from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };
  return (
    <div>
      <div>
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link to={'/'}>
                  <img
                    className="h-8 w-8 hidden md:block"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  </Link>
                </div>
                <div className="md:ml-10 flex items-baseline space-x-4">
                  <Link
                    to={"/"}
                    href="#"
                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  {cookies.access_token && (
                    <Link
                      to={"/post"}
                      href="#"
                      className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Your Post
                    </Link>
                  )}
                  {cookies.access_token && (
                    <Link
                      to={"/create"}
                      href="#"
                      className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Create
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                {!cookies.access_token ? (
                  <div>
                    <Link
                      to={"/login"}
                      href="#"
                      className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to={"/register"}
                      href="#"
                      className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={logout}
                    className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
