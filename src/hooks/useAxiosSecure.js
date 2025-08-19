import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);
 // console.log("🚀 ~ useAxiosSecure ~ accessToken:", user.accessToken);
  const instance = axios.create({
    baseURL: "https://project-server1.vercel.app",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });


  useEffect(() => {
  }, [])
  

  return instance;
};

export default useAxiosSecure;
