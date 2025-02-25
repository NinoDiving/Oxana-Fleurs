import "./Bouquet.css";
import "react-datepicker/dist/react-datepicker.css";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FetchDataFlowers from "../../services/FetchDataFlowers";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroBanner from "../HeroBanner/HeroBanner";
import AllBouquets from "./AllBouquet";
export default function Bouquet() {
  const { flowers } = FetchDataFlowers();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <HeroBanner />
      <main className="catalogue-product">
        <h1>Nos bouquets du moment </h1>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          slidesPerView={isDesktop ? 2 : 5}
          initialSlide={2}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="mySwiper2"
        >
          {flowers.map((flower) => (
            <article
              key={flower.id}
              className="bouquet-slider"
              style={{ cursor: "pointer" }}
            >
              <SwiperSlide>
                <Link to={`/product/${flower.id}`}>
                  <img
                    src={`${import.meta.env.VITE_URL}/${flower.img_path}`}
                    alt={flower.name}
                  />
                  <h3>{flower.name}</h3>
                </Link>
              </SwiperSlide>
            </article>
          ))}
        </Swiper>
        <AllBouquets />
      </main>
    </>
  );
}
