import { Link, useNavigate } from "react-router-dom";
import styles from "../css/albums.module.css";
import { BsShareFill, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { useState } from "react";
import ShareComponent from "./ShareComponent";
import {
  useDeleteAlbumMutation,
  useGetAllAlbumsQuery,
} from "../features/apiSlice";
import Loader from "./Loader";
import { toast } from "react-toastify";

const Albums = () => {
  const [showShare, setShowShare] = useState(null);
  const { data: albumData, isLoading, isError, error } = useGetAllAlbumsQuery();
  const [deleteTheAlbum] = useDeleteAlbumMutation();
  const navigate = useNavigate();

  const handleShareDisplay = (indexVal) => {
    if (showShare === null) setShowShare(indexVal);
    else setShowShare(null);
  };

  const deleteHandler = async (album) => {
    try {
      await deleteTheAlbum(album);
      toast.success("Album deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className="container">
      <h4 className="pt-3 pb-4 fw-medium">ALBUMS</h4>

      <div className="row">
        {isError && <h2 className="text-center mt-5">{error.message}</h2>}
        {isLoading ? (
          <Loader />
        ) : (
          albumData?.map((albums, index) => {
            return (
              <div
                className="col-sm-6 col-lg-4 col-xl-3 mb-3"
                key={albums?._id}
                style={{ height: showShare !== index ? "25rem" : "30rem" }}
              >
                <div className="card border-2 h-100">
                  <img
                    src={
                      albumData?.[index]?.imageId?.[0]?.imageName ||
                      "https://placehold.co/900x450/orange/white"
                    }
                    className={`img-thumbnail ${styles.albumThumbnail}`}
                    alt="album-image"
                  />
                  <div className="card-body pb-0 text-center">
                    <h3 className="my-0 pb-2 text-capitalize">
                      {albums?.name}
                    </h3>
                    <Link
                      to={`/album/details/${albums?._id}`}
                      className={`rounded-pill px-4 ${styles.btn} fs-5 fw-medium text-light`}
                      type="button"
                    >
                      Visit
                    </Link>

                    <p className="mb-0 pt-3 fs-5 fw-medium">
                      {albums?.description}
                    </p>

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
                          onClick={() => deleteHandler(albums)}
                        />
                      </div>
                      <div className={`fs-4 ${styles.edit}`}>
                        <BsPencilSquare
                          className={`${styles.editBtn}`}
                          onClick={() => {
                            navigate("/add/album", { state: albums });
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {showShare === index && <ShareComponent />}
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
};

export default Albums;
