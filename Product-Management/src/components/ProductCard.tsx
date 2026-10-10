import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const ProductCard = ({
  product,
  onEdit,
  onDelete,
  isDeleting,
}: ProductCardProps) => {
  return (
    <article className="product-card">
      <div className="product-card-header">
        <span className="category">{product.category}</span>

        <span className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
          {product.stock > 0 ? "In stock" : "Out of stock"}
        </span>
      </div>

      <h2>{product.name}</h2>

      <p className="description">{product.description}</p>

      <div className="product-details">
        <strong>₹{product.price.toLocaleString("en-IN")}</strong>
        <span>Stock: {product.stock}</span>
      </div>

      <div className="card-actions">
        <button
          className="secondary-btn"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>

        <button
          className="danger-btn"
          disabled={isDeleting}
          onClick={() => onDelete(product._id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default ProductCard;