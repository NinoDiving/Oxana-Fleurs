import FetchTopProductsFlowers from "../../../services/Product/FetchTopFlowers";
import FetchTopPlants from "../../../services/Product/FetchTopPlants";
import BackOfficeNav from "../BackOfficeNav";

export default function TopProducts() {
  const { topProductFlowers } = FetchTopProductsFlowers();
  const { topProductPlants } = FetchTopPlants();
  return (
    <main className="backOffice-products">
      <BackOfficeNav />
      <h1>Vos Produits phares</h1>
      <h2>Les fleurs</h2>
      {topProductFlowers.map((product) => (
        <section key={product.product_id} className="backOffice-products-cards">
          <img src={`${import.meta.env.VITE_URL}${product.img_path}`} alt="" />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}€</p>
        </section>
      ))}
      <h2>Les plantes</h2>
      {topProductPlants.map((product) => (
        <section key={product.product_id} className="backOffice-products-cards">
          <img src={`${import.meta.env.VITE_URL}${product.img_path}`} alt="" />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}€</p>
        </section>
      ))}
    </main>
  );
}
