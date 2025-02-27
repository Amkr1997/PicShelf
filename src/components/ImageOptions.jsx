import { useNavigate } from "react-router-dom";
import styles from "../css/albumDetails.module.css";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { useGetSingleImageQuery } from "../features/apiSlice";

const ImageOptions = ({ deleteHandler, image }) => {
  const navigate = useNavigate();
  const { data } = useGetSingleImageQuery(image?._id, { skip: !image?._id });

  return (
    <div className="pt-2 pb-1 d-flex align-items-center justify-content-between">
      <div className={`fs-4 ${styles.trash}`}>
        <BsFillTrashFill
          className={`${styles.trashBtn}`}
          onClick={() => deleteHandler(image)}
        />
      </div>
      <div className={`fs-4 ${styles.edit}`}>
        <BsPencilSquare
          className={`${styles.editBtn}`}
          onClick={() =>
            navigate("/add/images", { state: { data } }, { replace: true })
          }
        />
      </div>
    </div>
  );
};

export default ImageOptions;
