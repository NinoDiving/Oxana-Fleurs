import HomeBouquet from "./HomeBouquet";
import "./Home.css";
import BeMember from "./BeMember";
import FormContact from "./FormContact";
import HomePlants from "./HomePlants";
import Openinghours from "./OpeningHours";
import OurStory from "./OurStory";
export default function Home() {
  return (
    <>
      <HomeBouquet />
      <HomePlants />
      <BeMember />
      <OurStory />
      <FormContact />
      <Openinghours />
    </>
  );
}
