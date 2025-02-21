import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const RefresherHandler = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      if (location.pathname === "/register") {
        navigate("/", { replace: true });
      }
    }
  }, [location, isAuthenticated, navigate]);
};

export default RefresherHandler;
