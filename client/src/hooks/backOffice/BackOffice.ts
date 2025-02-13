import { useState } from "react";
import type { ProductProps } from "../../types/Product/ProductProps";

export default function useBackOffice() {
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    type: "",
    description: "",
    price: "",
    img_path: "",
  });

  const handleEdit = (product: ProductProps) => {
    setEditingProduct(product.id);
    setFormFields({
      name: product.name,
      description: product.description,
      type: product.type,
      price: product.price.toString(),
      img_path: product.img_path,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPreviewFile(imageUrl);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (productId: number) => {
    if (!isConfirmed) {
      const confirmSubmit = window.confirm("Validez les modifications ?");
      if (!confirmSubmit) {
        alert("Modification annulé");
        return;
      }
      setIsConfirmed(true);
    }
    const updatedFormData = new FormData();

    if (formFields.name) updatedFormData.append("name", formFields.name);
    if (formFields.description)
      updatedFormData.append("description", formFields.description);
    if (formFields.price)
      updatedFormData.append("price", formFields.price.toString());

    if (file) updatedFormData.append("image", file);

    await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`, {
      method: "PUT",
      body: updatedFormData,
    });

    setEditingProduct(null);
    setIsConfirmed(false);
  };

  const handleSubmitToTopProducts = async (product_id: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/top-products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id }),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de la donnée");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Erreur lors de l'envoi de la donnée: ${error}`);
    }
  };

  const handleSubmitCreateProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isConfirmed) {
      const confirmSubmit = window.confirm(
        "Validez l'ajout du nouveau produit ?",
      );
      if (!confirmSubmit) {
        alert("Modification annulé");
        return;
      }
      setIsConfirmed(true);
    }
    const formData = new FormData();

    for (const [key, value] of Object.entries(formFields)) {
      if (value) {
        formData.append(key, value);
      }
    }

    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de la donnée");
      }

      const data = await response.json();

      console.info("Produit ajouté avec succès:", data);
      setFormFields({
        name: "",
        description: "",
        type: "",
        price: "",
        img_path: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi de la donnée:", error);
    }
  };

  return {
    handleChange,
    handleEdit,
    handleFileChange,
    handleSubmit,
    handleSubmitToTopProducts,
    handleSubmitCreateProduct,
    editingProduct,
    previewFile,
    formFields,
  };
}
