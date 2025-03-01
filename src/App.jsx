import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
//import Profile from "./pages/Profile";
import RefresherHandler from "./components/RefresherHandler";
import Register from "./pages/Register";
import AlbumDetails from "./pages/AlbumDetails";
import AddAlbums from "./pages/AddAlbums";
import ImageDetails from "./pages/ImageDetails";
import AddImages from "./pages/AddImages";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <RefresherHandler />
          <Routes>
            <Route path="/" element={<PrivateRoute element={<Home />} />} />
            {/*<Route
              path="/profile"
              element={<PrivateRoute element={<Profile />} />}
            />*/}
            <Route path="/register" element={<Register />} />
            <Route
              path="/album/details/:albumId"
              element={<PrivateRoute element={<AlbumDetails />} />}
            />
            <Route
              path="/add/album"
              element={<PrivateRoute element={<AddAlbums />} />}
            />
            <Route
              path="/add/images"
              element={<PrivateRoute element={<AddImages />} />}
            />
            <Route
              path="/image/:imageId"
              element={<PrivateRoute element={<ImageDetails />} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
