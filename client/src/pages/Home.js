import Map from "../components/Map";

const Home = (props) => {
  const { parkClicked, setParkClicked } = props;

  return <Map parkClicked={parkClicked} setParkClicked={setParkClicked} />;
};

export default Home;
