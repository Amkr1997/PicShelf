import NavbarResponsive from "../components/NavbarResponsive";
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "../css/albumDetails.module.css";
import {
  useDeleteImageMutation,
  useGetProfileInfoQuery,
  useGetSingleAlbumQuery,
} from "../features/apiSlice";
import HiddenFeatures from "../components/HiddenFeatures";
import ImageOptions from "../components/ImageOptions";
import { toast } from "react-toastify";
import ImageLoader from "../components/ImageLoader";
import { useState } from "react";

const AlbumDetails = () => {
  const [showFilteredImg, setShowFilteredImg] = useState(false);
  const { data: userId } = useGetProfileInfoQuery();
  const { state } = useLocation();
  const { albumId } = useParams();
  const [deleteImage] = useDeleteImageMutation();
  const {
    data: singleAlbumData,
    isLoading: albumIsLoading,
    isError: albumHasError,
    error: albumError,
  } = useGetSingleAlbumQuery(albumId, { skip: !albumId });

  const deleteHandler = async (image) => {
    try {
      await deleteImage({ imageId: image?._id, userId, albumId }).unwrap();
      toast.success("Image deleted");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleFilter = (e) => {
    setShowFilteredImg((prev) => {
      if (prev === false) {
        return true;
      } else {
        return false;
      }
    });
  };

  const filteredImages = showFilteredImg
    ? singleAlbumData?.imageId?.filter((img) => img?.isFav === true)
    : singleAlbumData?.imageId;

  return (
    <>
      <NavbarResponsive />
      <main className="container py-4">
        <h1 className="pt-2 pb-4">{state?.name} Images</h1>
        <div className="pb-5 d-flex align-items-center justify-content-evenly">
          <div className="w-100 text-center">
            <button className={`${styles.filterBtn}`} onClick={handleFilter}>
              {!showFilteredImg ? "Filter by Favorite" : "Filter by All"}
            </button>
          </div>
          {singleAlbumData?.userId === userId && (
            <div className="text-center w-100">
              <Link
                to={"/add/images"}
                type="button"
                className={`${styles.createAlbumBtn}`}
                state={albumId}
              >
                Add New Image+
              </Link>
            </div>
          )}
        </div>
        <section className="row">
          {albumHasError && (
            <h2 className="text-center mt-5">{albumError.message}</h2>
          )}
          {albumIsLoading ? (
            <ImageLoader />
          ) : (
            filteredImages?.map((image, index) => {
              return (
                <div
                  to={`/image/${image?._id}`}
                  className={`col-lg-6 col-xl-4 mb-3 ${styles.imageContainer}`}
                  key={image?._id}
                  style={{ height: "22rem" }}
                >
                  <div className="card h-100">
                    <img
                      src={
                        image?.imageName ||
                        "https://placehold.co/900x450/orange/white"
                      }
                      className={`img-fluid ${styles.foodImg}`}
                      alt="album-image"
                    />
                    <div className="card-body">
                      <Link
                        to={`/image/${image?._id}`}
                        className={`${styles.imageTitle}`}
                        state={image}
                      >
                        <h4 className={`card-text text-center m-0`}>
                          {image?.name || `Image ${index + 1}`}
                        </h4>
                      </Link>

                      {singleAlbumData?.userId === userId ? (
                        <ImageOptions
                          deleteHandler={deleteHandler}
                          image={image}
                        />
                      ) : (
                        <HiddenFeatures />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </main>
    </>
  );
};

export default AlbumDetails;
