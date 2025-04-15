import "./Product.css";
import { useEffect, useState } from "react";
import { useSaveToCart } from "../../services/Context/CartContext";
import FetchProduct from "../../services/Product/FetchProduct";
import { StyledButton } from "../../style/StyledButton";

export default function Product() {
  const { product } = FetchProduct();
  const baseUrl = import.meta.env.VITE_URL;
  const [mainImage, setMainImage] = useState<string | null>(null);
  const { addToCart, isProductSaved } = useSaveToCart();
  useEffect(() => {
    if (product?.img_path) {
      setMainImage(`${baseUrl}/${product.img_path}`);
    }
  }, [product]);

  const smallImages = [
    "/img/fleurs1.webp",
    "/img/fleurs2.webp",
    "/img/fleurs3.webp",
  ];
  const isProductInCart = isProductSaved(product?.id ?? 0);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  return (
    <main className="product-container">
      <h1>{product?.name}</h1>
      <div className="wrapper-picture">
        <article className="main-picture-product">
          {mainImage && <img src={mainImage} alt={product?.name} />}
          <div className="small-picture-product">
            {smallImages.map((image) => (
              <img
                onKeyDown={() => setMainImage(image)}
                key={image}
                src={image}
                alt=""
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </article>
        <section className="description-product">
          <p>{product?.description}</p>
          <p>Prix : {product?.price}€</p>
        </section>
      </div>

      <StyledButton onClick={handleAddToCart}>
        {isProductInCart ? "Produit ajouté" : "Commandez"}
      </StyledButton>
    </main>
  );
}
