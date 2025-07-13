import { useEffect, useState } from "react";
import useUserStore from "../store/user";
import { useNavigate } from "react-router-dom";

const useLoggedBase = () => { 
  const navigate = useNavigate();
  const { user } = useUserStore();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !user) {
      navigate("/auth/login");
    }

    setIsAuthenticated(true);
  }, []);

  return { isAuthenticated };
}

export default useLoggedBase;
