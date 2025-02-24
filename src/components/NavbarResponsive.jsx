import { NavLink } from "react-router-dom";
import styles from "../css/navbar.module.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice";
//import { BsPersonFill } from "react-icons/bs";

const NavbarResponsive = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <nav className="container navbar navbar-expand-lg bg-white">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <h2 className="mb-0 fs-3 d-flex">
              <span className={`${styles.pix}`}>Pic</span>
              <span className={`${styles.kavios}`}>Shelf</span>
              <span className={`${styles.cameraLogo} fs-6`}>📸</span>
            </h2>
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link fs-4 fw-semibold fw-medium"
                  aria-current="page"
                  to="/add/album"
                >
                  {" "}
                  Add Album
                  {/*<span className="d-flex align-items-center justify-content-center bg-body-secondary p-2 rounded-circle">
                    <BsPersonFill className="fs-4" />
                  </span>*/}
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  className="btn fs-4 fw-semibold"
                  onClick={() => handleLogout()}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarResponsive;
