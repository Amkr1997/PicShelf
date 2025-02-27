import { replace, useNavigate } from "react-router-dom";
import styles from "../css/albumDetails.module.css";
import { BsShareFill, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";

const AlbumOptions = ({ deleteHandler, index, handleShareDisplay, data }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="pt-4 pb-1 d-flex align-items-center justify-content-evenly">
        <div className={`fs-4 ${styles.share}`}>
          <BsShareFill
            className={`${styles.shareBtn}`}
            onClick={() => handleShareDisplay(index)}
          />
        </div>
        <div className={`fs-4 ${styles.trash}`}>
          <BsFillTrashFill
            className={`${styles.trashBtn}`}
            onClick={() => deleteHandler(data)}
          />
        </div>
        <div className={`fs-4 ${styles.edit}`}>
          <BsPencilSquare
            className={`${styles.editBtn}`}
            onClick={() =>
              navigate("/add/album", { state: data }, { replace: true })
            }
          />
        </div>
      </div>
    </>
  );
};

export default AlbumOptions;
