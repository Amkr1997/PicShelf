import Navbar from "../components/Navbar";
import styles from "../css/register.module.css";
import { BsGoogle } from "react-icons/bs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInUser } from "../features/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("picShelf_access_token", token);
      dispatch(logInUser());

      //window.history.replaceState({}, document.title, "/");
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <main className={`container `}>
      <Navbar />
      <section
        className={`d-flex align-items-center justify-content-center ${styles.registerContainer}`}
      >
        <button
          onClick={() => handleRegister()}
          className={`d-flex align-items-center justify-content-center flex-wrap ${styles.googleBtn}`}
          type="button"
        >
          <span className="fw-medium pe-2">Login With</span>
          <BsGoogle />
          <span className="fw-medium"> oogle</span>
        </button>
      </section>
    </main>
  );
};

export default Register;
