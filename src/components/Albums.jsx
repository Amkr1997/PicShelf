import { Link } from "react-router-dom";
import styles from "../css/albums.module.css";
import { useState } from "react";
import ShareComponent from "./ShareComponent";
import {
  useDeleteAlbumMutation,
  useGetAllAlbumsQuery,
  useGetProfileInfoQuery,
} from "../features/apiSlice";
import Loader from "./Loader";
import { toast } from "react-toastify";
import HiddenFeatures from "./HiddenFeatures";
import AlbumOptions from "./AlbumOptions";

const Albums = () => {
  const [showShare, setShowShare] = useState(null);
  const { data: userId } = useGetProfileInfoQuery();
  const { data: albumData, isLoading, isError, error } = useGetAllAlbumsQuery();
  const [deleteTheAlbum] = useDeleteAlbumMutation();

  const handleShareDisplay = (indexVal) => {
    if (showShare === null) setShowShare(indexVal);
    else setShowShare(null);
  };

  const deleteHandler = async (album) => {
    try {
      await deleteTheAlbum({ userId, album }).unwrap();
      toast.success("Album deleted");
    } catch (error) {
      toast.error(error?.data?.message);
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
                style={{ height: showShare !== index ? "25rem" : "32rem" }}
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
                      state={albums?._id}
                    >
                      Visit
                    </Link>

                    <p className="mb-0 pt-3 fs-5 fw-medium">
                      {albums?.description}
                    </p>

                    {albums?.userId === userId ? (
                      <AlbumOptions
                        handleShareDisplay={handleShareDisplay}
                        index={index}
                        deleteHandler={deleteHandler}
                        data={albums}
                      />
                    ) : (
                      <HiddenFeatures />
                    )}
                  </div>

                  {showShare === index && <ShareComponent album={albums} />}
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
