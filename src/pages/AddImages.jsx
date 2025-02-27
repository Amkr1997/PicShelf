import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../css/addImage.module.css";
import NavbarResponsive from "../components/NavbarResponsive";
import {
  usePostImageMutation,
  useUpdateImageMutation,
} from "../features/apiSlice";
import { toast } from "react-toastify";

const AddImages = () => {
  const [imageName, setImageName] = useState("");
  const [tags, setTags] = useState("");
  const [persons, setPersons] = useState("");
  const [isFav, setIsFav] = useState(false);
  const [comments, setComments] = useState("");
  const [postNewImage] = usePostImageMutation();
  const [editImage] = useUpdateImageMutation();
  const { state } = useLocation();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (state?.data) {
      try {
        await editImage({
          ...state?.data,
          tags: tags.split(","),
          persons: persons.split(","),
          comments: comments.split(","),
          isFav,
        }).unwrap();

        toast.success("Image got updated");
      } catch (error) {
        console.log(error);
        toast.error(error);
      }

      setTags("");
      setPersons("");
      setComments("");
      setIsFav(false);
    } else {
      try {
        if (imageName !== "") {
          formData.append("albumId", state);
          formData.append("imageName", imageName);
          formData.append("tags", tags);
          formData.append("persons", persons);
          formData.append("comments", comments);
          formData.append("isFav", isFav);
        }

        await postNewImage(formData).unwrap();
        toast.success("Image Uploaded");
      } catch (error) {
        toast.error(error.data.message);
      }

      setImageName("");
      setTags("");
      setPersons("");
      setComments("");
      setIsFav(false);
    }
  };

  const checkHandler = (e) => {
    const { checked } = e.target;

    checked ? setIsFav(true) : setIsFav(false);
  };

  return (
    <>
      <NavbarResponsive />
      <h2 className="pt-2 pb-4 text-center">
        {state?.data ? "Edit Existing Image" : "Add New Image"}
      </h2>
      <main className="container">
        <div className="row">
          <div className="col-0 col-sm-2"></div>
          <form onSubmit={submitHandler} className="col-12 col-sm-8">
            {!state?.data && (
              <div className="my-1">
                <label className="form-label">Image Name:</label>
                <input
                  type="file"
                  className="form-control"
                  required
                  name="imageName"
                  onChange={(e) => setImageName(e.target.files[0])}
                />
              </div>
            )}
            <div className="my-4">
              <label className="form-label">Tags:</label>
              <textarea
                type="text"
                className="form-control"
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              ></textarea>
            </div>
            <div className="my-4">
              <label className="form-label">Persons to Add:</label>
              <textarea
                type="text"
                className="form-control"
                name="persons"
                value={persons}
                onChange={(e) => setPersons(e.target.value)}
              ></textarea>
            </div>

            <div className="my-4">
              <label className="form-label">Comments:</label>
              <textarea
                type="text"
                className="form-control"
                name="persons"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              ></textarea>
            </div>

            <div className="mt-4 mb-2 form-check">
              <label className="form-check-label">Is Favorite</label>
              <input
                type="checkbox"
                className="form-check-input"
                name="isFav"
                value={isFav}
                checked={isFav === true}
                onChange={checkHandler}
              />
            </div>

            <button type="submit" className={`my-3 ${styles.createImageBtn}`}>
              {state?.data ? "Edit Image" : "Create Image"}
            </button>
          </form>
          <div className="col-0 col-sm-2"></div>
        </div>
      </main>
    </>
  );
};

export default AddImages;
