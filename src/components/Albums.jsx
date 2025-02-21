import { Link } from "react-router-dom";
import styles from "../css/albums.module.css";
import { BsShareFill, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { useState } from "react";

const Albums = () => {
  const [showShare, setShowShare] = useState(false);

  const handleShareDisplay = () => {
    if (showShare === false) setShowShare(true);
    else setShowShare(false);
  };

  return (
    <main className="container">
      <h4 className="pt-3 pb-4 fw-medium">ALBUMS</h4>

      <div className="row">
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="card border-2">
            <div className="card-body py-0 text-center">
              <h3 className="my-0 pb-2">Album Title</h3>
            </div>
            <img
              src="https://placehold.co/600x300/orange/white"
              alt="album-image"
            />
            <div className="card-body text-center">
              <Link
                to={"/album/details/1"}
                className={`rounded-pill px-4 ${styles.btn} fs-5 fw-medium text-light`}
                type="button"
              >
                Visit
              </Link>

              <div className="pt-4 pb-1 d-flex align-items-center justify-content-evenly">
                <div className={`fs-4 ${styles.share}`}>
                  <BsShareFill
                    className={`${styles.shareBtn}`}
                    onClick={handleShareDisplay}
                  />
                </div>
                <div className={`fs-4 ${styles.trash}`}>
                  <BsFillTrashFill className={`${styles.trashBtn}`} />
                </div>
                <div className={`fs-4 ${styles.edit}`}>
                  <BsPencilSquare className={`${styles.editBtn}`} />
                </div>
              </div>
            </div>

            {showShare && (
              <div className={`${styles.shareContainer}`}>
                <div className="py-3 d-flex align-items-center justify-content-evenly flex-wrap">
                  <div className="form-check d-flex gap-1">
                    <input className="form-check-input" type="checkbox" />
                    User 1
                  </div>
                  <div className="form-check d-flex gap-1">
                    <input className="form-check-input" type="checkbox" />
                    User 1
                  </div>
                  <div className="form-check d-flex gap-1">
                    <input className="form-check-input" type="checkbox" />
                    User 1
                  </div>
                </div>
                <div className="my-1 text-center">
                  <button
                    className={`rounded-pill px-4 py-0 fs-5 fw-medium text-light mb-2 w-75 ${styles.shareSubmitbtn}`}
                  >
                    Share
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Albums;
