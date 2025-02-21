import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? element : <Navigate to={"/register"} />;
};

export default PrivateRoute;
