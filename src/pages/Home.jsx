import SectionHeading from "../components/common/SectionHeading";
import SectionLabel from "../components/common/SectionLabel";

const Home = () => {
  return (
    <div className="pt-16">
      <SectionLabel text="Welcome" />
      <SectionHeading title="Home Page" />
      <p>This is the home page of your website.</p>
    </div>
  );
};

export default Home;