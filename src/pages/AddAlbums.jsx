import { useEffect, useState } from "react";
import styles from "../css/addAlbums.module.css";
import NavbarResponsive from "../components/NavbarResponsive";
import {
  useGetProfileInfoQuery,
  usePostNewAlbumMutation,
  useUpdateAlbumMutation,
} from "../features/apiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddAlbums = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const { data: userId } = useGetProfileInfoQuery();
  const [addAlbum] = usePostNewAlbumMutation();
  const [editAlbum] = useUpdateAlbumMutation();
  const navigate = useNavigate();
  const { state } = useLocation();

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!state) {
      try {
        await addAlbum({ userId, ...formData }).unwrap();
        toast.success("Album created");
        navigate("/");
      } catch (error) {
        console.log(error);
      }

      setFormData({ name: "", description: "" });
    } else {
      try {
        await editAlbum({
          ...state,
          name: formData.name,
          description: formData.description,
        });
        toast.success("Album Edited");
        navigate("/");
      } catch (error) {
        toast.error(error.message);
      }

      setFormData({ name: "", description: "" });
    }
  };

  useEffect(() => {
    setFormData({
      name: state?.name || "",
      description: state?.description || "",
    });
  }, [state]);

  return (
    <>
      <NavbarResponsive />
      <main className="container">
        <div className="row">
          <div className="col-2"></div>
          <form onSubmit={submitHandler} className="col-8">
            <div className="my-2">
              <label className="form-label">Album Name:</label>
              <input
                type="text"
                className="form-control"
                required
                name="name"
                value={formData.name}
                onChange={changeHandler}
              />
            </div>
            <div className="my-2">
              <label className="form-label">Description:</label>
              <input
                type="text"
                className="form-control"
                required
                name="description"
                value={formData.description}
                onChange={changeHandler}
              />
            </div>

            <button type="submit" className={`my-3 ${styles.createTaskBtn}`}>
              {!state ? "Create Album" : "Edit Album"}
            </button>
          </form>
          <div className="col-2"></div>
        </div>
      </main>
    </>
  );
};

export default AddAlbums;
