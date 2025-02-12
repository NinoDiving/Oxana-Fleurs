import AbstractSeeder from "./AbstractSeeder";

class ProductSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "product", truncate: true });
  }

  run() {
    const products = [
      {
        name: "Délicate Romance",
        type_id: 1,
        description:
          "Tendre bouquet rond de fleurs de saison dans les tons rose pastel et blanc",
        price: 29,
        img_path: "assets/images/fleurs1.webp",
      },
      {
        name: "Coup de Foudre Saint Valentin",
        type_id: 1,
        description: "Ardent bouquet rond composé de sublimes roses rouges",
        price: 39,
        img_path: "assets/images/fleurs6.webp",
      },
      {
        name: "Cœur en Joie",
        type_id: 1,
        description:
          "Pétillant bouquet rond composé de magnifiques fleurs de saison multicolore",
        price: 35,
        img_path: "assets/images/fleurs10.jpg",
      },
      {
        name: "Joies Festives",
        type_id: 1,
        description:
          "Éclatant bouquet rond composé de fleurs de saison dans les tons jaune-orangé",
        price: 37,
        img_path: "assets/images/fleurs3.webp",
      },
      {
        name: "Simple Bonheur",
        type_id: 1,
        description:
          "Charmant bouquet composé de fleurs de saison dans un esprit champêtre",
        price: 35,
        img_path: "assets/images/fleurs2.webp",
      },
      {
        name: "Joie de Vivre",
        type_id: 1,
        description:
          "Pétillant bouquet rond composé de fleurs de saison dans les tons fuchsia et rose",
        price: 39,
        img_path: "assets/images/fleurs5.webp",
      },
      {
        name: "Amour",
        type_id: 1,
        description: "Cœur d’une pure blancheur composé de fleurs de saison",
        price: 169,
        img_path: "assets/images/fleurs8.webp",
      },
      {
        name: "Passion Ardente",
        type_id: 1,
        description:
          "Exquis bouquet rond composé de fleurs de saison dans les tons rouge et vert",
        price: 49,
        img_path: "assets/images/fleurs9.jpg",
      },
      {
        name: "Merveilleuse Harmonie",
        type_id: 1,
        description:
          "Bouquet rond éclat composé de fleurs de saison dans les tons pastel",
        price: 49,
        img_path: "assets/images/fleurs10.webp",
      },
      {
        name: "Sympathie Partagée",
        type_id: 1,
        description:
          "Charmant panier champêtre composé de fleurs de saison en camaïeu de roses",
        price: 35,
        img_path: "assets/images/panier-fleurs.webp",
      },
      {
        name: "Senteurs Printanières",
        type_id: 2,
        description: "Resplendissant coupe de Jacinthes parfumées",
        price: 35,
        img_path: "assets/images/plante1.jpg",
      },
      {
        name: "Petit Jardin",
        type_id: 2,
        description: "Jardin de plantes d’intérieur",
        price: 59,
        img_path: "assets/images/plante2.webp",
      },
      {
        name: "Nature Originale",
        type_id: 2,
        description:
          "Superbe et résistante Zamioculcas, plante d’intérieur originaire d’Afrique tropicale",
        price: 45,
        img_path: "assets/images/plante5.webp",
      },
      {
        name: "Chatoyant Jardin",
        type_id: 2,
        description: "Jardin de plantes d’intérieur, verts et fleuris",
        price: 59,
        img_path: "assets/images/plante6.webp",
      },
      {
        name: "Délicate Nature",
        type_id: 2,
        description:
          "Coupe de cyclamens, plante fleurie d’intérieur ou d’extérieur",
        price: 45,
        img_path: "assets/images/plante7.jpg",
      },
      {
        name: "Tendre Ravissement",
        type_id: 2,
        description:
          "Délicate Orchidée phalaenopsis blanche sublimée dans son contenant naturel",
        price: 35,
        img_path: "assets/images/orchidée1.jpg",
      },
      {
        name: "Somptueuse Harmonie",
        type_id: 2,
        description: "Somptueuse coupe d’Orchidées pures et blanches",
        price: 169,
        img_path: "assets/images/orchide2.webp",
      },
    ];
    for (let i = 0; i < products.length; i++) {
      this.insert(products[i]);
    }
  }
}

export default ProductSeeder;
