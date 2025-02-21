import styles from "../css/navbar.module.css";

const Navbar = () => {
  return (
    <>
      <nav
        className={`d-flex align-items-center justify-content-center ${styles.navContain}`}
      >
        <h2 className="mb-0 fs-3 d-flex">
          <span className={`${styles.pix}`}>Pic</span>
          <span className={`${styles.kavios}`}>Shelf</span>
          <span className={`${styles.cameraLogo} fs-6`}>📸</span>
        </h2>
      </nav>
    </>
  );
};

export default Navbar;
