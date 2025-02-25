import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Autoplay, Navigation } from "swiper/modules";
import FetchTopProductsFlowers from "../../services/Product/FetchTopFlowers";
import HeroBanner from "../HeroBanner/HeroBanner";
export default function HomeBouquet() {
  const { topProductFlowers } = FetchTopProductsFlowers();
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
      <section className="bouquets">
        <h2>Nos Bouquets</h2>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          slidesPerView={isDesktop ? 2 : 5}
          initialSlide={2}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          {topProductFlowers.map((flower) => (
            <SwiperSlide key={flower.product_id}>
              <Link to={`/product/${flower.product_id}`}>
                <img
                  src={`${import.meta.env.VITE_URL}/${flower.img_path}`}
                  alt={flower.name}
                />
              </Link>

              <h3>{flower.name}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
