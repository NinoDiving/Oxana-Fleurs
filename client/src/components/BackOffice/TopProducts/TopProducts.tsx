import FetchTopProductsFlowers from "../../../services/Product/FetchTopFlowers";

export default function TopProducts() {
  const { topProductFlowers } = FetchTopProductsFlowers();
  return (
    <main className="backOffice-products">
      <h1>Vos Produits phares</h1>
      {topProductFlowers.map((product) => (
        <section key={product.product_id} className="backOffice-products-cards">
          <img src={`${import.meta.env.VITE_URL}${product.img_path}`} alt="" />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>product.price</p>
        </section>
      ))}
    </main>
  );
}
