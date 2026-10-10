import { useState } from "react";

import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

import type { Product } from "./types/product";

type Page = "products" | "add" | "edit";

function App() {
  const [page, setPage] = useState<Page>("products");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setPage("edit");
  };

  const handleSaved = () => {
    setSelectedProduct(null);
    setPage("products");
  };

  if (page === "add") {
    return (
      <AddProduct
        onCancel={() => setPage("products")}
        onSaved={handleSaved}
      />
    );
  }

  if (page === "edit" && selectedProduct) {
    return (
      <EditProduct
        product={selectedProduct}
        onCancel={() => {
          setSelectedProduct(null);
          setPage("products");
        }}
        onSaved={handleSaved}
      />
    );
  }

  return (
    <Products
      onAdd={() => setPage("add")}
      onEdit={handleEdit}
    />
  );
}

export default App;