import HomeBouquet from "./HomeBouquet";
import "./Home.css";
import { useEffect, useState } from "react";
import useObserver from "../../hooks/Observer/useObserver";
import BeMember from "./BeMember";
import FormContact from "./FormContact";
import HomePlants from "./HomePlants";
import Openinghours from "./OpeningHours";
import OurStory from "./OurStory";

export default function Home() {
  const components = [
    <HomeBouquet key="homeBouquet" />,
    <HomePlants key="homePlants" />,
    <BeMember key="beMember" />,
    <OurStory key="ourStory" />,
    <FormContact key="formContact" />,
    <Openinghours key="openingHours" />,
  ];

  return (
    <>
      {components.map((Component) => {
        const { isVisible, elementRef } = useObserver({
          rootMargin: "0px",
        });

        const [hasAppeared, setHasAppeared] = useState(false);

        useEffect(() => {
          if (isVisible && !hasAppeared) {
            setHasAppeared(true);
          }
        }, [isVisible, hasAppeared]);

        return (
          <div
            key={Component.key}
            ref={elementRef as React.RefObject<HTMLDivElement>}
            style={{
              opacity: hasAppeared ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            {Component}
          </div>
        );
      })}
    </>
  );
}
