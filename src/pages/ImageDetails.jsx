import { useLocation } from "react-router-dom";
import NavbarResponsive from "../components/NavbarResponsive";

const ImageDetails = () => {
  const { state } = useLocation();

  return (
    <>
      <NavbarResponsive />
      <main className="container">
        <div className="card mt-5 mb-3 border-1">
          <div className="row g-0">
            <div className="col-md-8">
              <img
                src={state?.imageName}
                className="img-fluid rounded-start"
                alt="main-image"
                style={{ height: "30rem", objectFit: "cover", width: "100%" }}
              />
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-3">
              <div className="card-body">
                <h5 className="card-title fs-4">Comments</h5>
                <ul>
                  {state?.comments.length > 0 ? (
                    state?.comments?.map((comment, index) => {
                      return (
                        <li className="card-text" key={index}>
                          {comment}
                        </li>
                      );
                    })
                  ) : (
                    <>
                      <p>No Comments</p>
                    </>
                  )}
                </ul>
                <h5 className="card-title fs-4">Tags</h5>
                <ul>
                  {state?.tags.length > 0 ? (
                    state?.tags?.map((tag, index) => {
                      return (
                        <li className="card-text" key={index}>
                          {tag}
                        </li>
                      );
                    })
                  ) : (
                    <>
                      <p>No Tags</p>
                    </>
                  )}
                </ul>
                <h5 className="card-title fs-4">Persons</h5>
                <ul>
                  {state?.persons.length > 0 ? (
                    state?.persons?.map((person, index) => {
                      return (
                        <li className="card-text" key={index}>
                          {person}
                        </li>
                      );
                    })
                  ) : (
                    <>
                      <p>No Persons</p>
                    </>
                  )}
                </ul>
                <p className="py-2 fs-5">
                  Is Favorite:{" "}
                  <span className="fw-medium">
                    {state?.isFav ? "Yes" : "No"}
                  </span>
                </p>
                <p className="fs-5">
                  Size:{" "}
                  <span className="fs-6 fw-medium">
                    {(Number(state?.size) / 1024).toFixed(2)} KB
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ImageDetails;
