import "react-datepicker/dist/react-datepicker.css";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import FetchTopPlants from "../../services/Product/FetchTopPlants";
import AllPlants from "./AllPlants";

export default function Plants() {
  const { topProductPlants } = FetchTopPlants();
  return (
    <>
      <section className="banner-shop-bouquet">
        <h1>Nos Plantes de saison </h1>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          slidesPerView={2}
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
          {topProductPlants.map((plants) => (
            <article
              key={plants.product_id}
              className="bouquet-slider"
              style={{ cursor: "pointer" }}
            >
              <SwiperSlide>
                <Link to={`/product/${plants.product_id}`}>
                  <img
                    src={`${import.meta.env.VITE_URL}/${plants.img_path}`}
                    alt={plants.name}
                  />
                </Link>

                <h3>{plants.name}</h3>
              </SwiperSlide>
            </article>
          ))}
        </Swiper>
      </section>
      <AllPlants />
    </>
  );
}
