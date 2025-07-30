import { useParams } from "react-router-dom";
import DisplayProperty from "../components/properties/DisplayProperty";

export const DisplayPropertyPage = () => {
  const { id } = useParams();
  
  return (
    <DisplayProperty propertyId={id!} />
  );
};

export default DisplayPropertyPage;