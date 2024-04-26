
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Landing from "./componet/Landing";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import Home from "./Component/Home";
import { useEffect, useState } from "react";
import API from "./API/api";
import { Navigate } from "react-router-dom";


function Auth() {
  const [isVerify, setVerify] = useState(false)
  const [loader, setLoader] = useState(true)// Set loader to true initially
  useEffect(() => {
    async function fetchData() {
      try {
        await Verify()
        // If verification is successful, isVerify will be true, otherwise false
        setLoader(false)
      }
      catch (error) {
        console.error("Error during verification:", error);
        setLoader(false);
      }
    }
    fetchData()
  }, [])

  async function Verify() {
    return API.get("/verify").then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        setVerify(true);
        console.log(isVerify);
      } else {
        setVerify(false);
      }

    })
  }
  if (loader) {
    return <>Loading...</>;
  }
  if (isVerify) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;

}



function App() {

  const IsNotAuth = () => {
    const [isVerify, setVerify] = useState(false);
    const [loader, setLoader] = useState(true); // Set loader to true initially
    useEffect(() => {
      async function fetchData() {
        try {
          await Verify();
          // If verification is successful, isVerify will be true, otherwise false
          setLoader(false);
        } catch (error) {
          console.error("Error during verification:", error);
          setLoader(false);
        }
      }
      fetchData();
    }, []);
    async function Verify() {
      return await API.get("/verify").then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          setVerify(true);
          console.log(isVerify);
        } else {
          setVerify(false);
        }
      });
    }
    if (loader) {
      return <>Loading...</>;
    }
    if (isVerify) {
      return  <Navigate to="/home" />;
    }
    return <Outlet />;
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <IsNotAuth />,
      children: [
        {
          path: "/signup",
          element: <Signup />
        },
        {
          path: "/login",
          element: <Login />

        },

      ]
    },

    {
      path: '/home',
      element: <Auth />,
      children: [
        {
          path: '/home',
          element: <Home />
        }
      ]
    }


  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
