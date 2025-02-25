import NavbarResponsive from "../components/NavbarResponsive";
import { Link, useLocation } from "react-router-dom";
import styles from "../css/albumDetails.module.css";

const AlbumDetails = () => {
  const { state } = useLocation();

  console.log(state);

  return (
    <>
      <NavbarResponsive />
      <main className="container py-4">
        <h1 className="py-4">{state?.name} Images</h1>
        <section className="row">
          {state?.imageId?.map((image) => {
            return (
              <Link
                to={`/image/${image?._id}`}
                className={`col-lg-6 col-xl-4 mb-3 ${styles.imageContainer}`}
                key={image?._id}
                state={image}
              >
                <div className="card">
                  <img
                    src={
                      image?.imageName ||
                      "https://placehold.co/900x450/orange/white"
                    }
                    alt="album-image"
                  />
                  <div className="card-body">
                    <h4 className="card-text text-center">
                      {image?.name || "Image 1"}
                    </h4>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default AlbumDetails;
