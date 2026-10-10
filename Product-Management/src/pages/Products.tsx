import { useState } from "react";

import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useDeleteProduct, useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product";

interface ProductsProps {
  onAdd: () => void;
  onEdit: (product: Product) => void;
}

const Products = ({ onAdd, onEdit }: ProductsProps) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isPending, isError, error, isFetching } =
    useProducts(page, search);

  const deleteMutation = useDeleteProduct();

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      deleteMutation.mutate(id);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return (
      <main className="container">
        <h1>Product Management</h1>
        <p className="error-message">
          {error.message || "Failed to load products."}
        </p>
      </main>
    );
  }

  return (
    <main className="container">
      <header className="page-header">
        <div>
          <h1>Product Management</h1>
          <p>Manage your products and inventory.</p>
        </div>

        <button onClick={onAdd}>+ Add Product</button>
      </header>

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {isFetching && <span className="fetching">Refreshing...</span>}
      </div>

      {deleteMutation.isError && (
        <p className="error-message">
          Failed to delete product. Please try again.
        </p>
      )}

      {data.products.length === 0 ? (
        <div className="empty-state">
          <h2>No products found</h2>
          <p>Try another search or add a new product.</p>
        </div>
      ) : (
        <div className="products-grid">
          {data.products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={onEdit}
              onDelete={handleDelete}
              isDeleting={deleteMutation.isPending}
            />
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          className="secondary-btn"
          disabled={page <= 1}
          onClick={() => setPage((current) => current - 1)}
        >
          Previous
        </button>

        <span>
          Page {data.page} of {Math.max(data.totalPages, 1)}
          {" · "}
          {data.total} products
        </span>

        <button
          className="secondary-btn"
          disabled={page >= data.totalPages}
          onClick={() => setPage((current) => current + 1)}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default Products;