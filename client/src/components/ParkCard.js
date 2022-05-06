import { Link } from "react-router-dom";

const ParkCard = ({ park }) => {
  return (
    <div>
      <Link to={`/park/${park.parkCode}`}>
        <h2>{park.fullName}</h2>
      </Link>
      <p>{park.parkCode}</p>
    </div>
  );
};

export default ParkCard;
