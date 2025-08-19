import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: "https://project-server1.vercel.app",
  });

  return instance;
};

export default useAxiosPublic;
