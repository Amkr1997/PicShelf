import { useLocation } from "react-router-dom";
import NavbarResponsive from "../components/NavbarResponsive";

const ImageDetails = () => {
  const { state } = useLocation();

  console.log(state);

  return (
    <>
      <NavbarResponsive />
    </>
  );
};

export default ImageDetails;
