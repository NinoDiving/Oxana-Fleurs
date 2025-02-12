import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { Autoplay, Navigation } from "swiper/modules";
import FetchTopProductsFlowers from "../../services/Product/FetchTopFlowers";
export default function HomeBouquet() {
  const { topProductFlowers } = FetchTopProductsFlowers();
  return (
    <section className="bouquets">
      <h2>Nos Bouquets</h2>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={2}
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
  );
}
