import { useState } from "react";
import type { FormEvent } from "react";

import { useUpdateProduct } from "../hooks/useProducts";
import type { Product, ProductInput } from "../types/product";

interface EditProductProps {
  product: Product;
  onCancel: () => void;
  onSaved: () => void;
}

const EditProduct = ({
  product,
  onCancel,
  onSaved,
}: EditProductProps) => {
  const [form, setForm] = useState<ProductInput>({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    stock: product.stock,
  });

  const mutation = useUpdateProduct();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      {
        id: product._id,
        product: {
          ...form,
          name: form.name.trim(),
          description: form.description.trim(),
          category: form.category.trim(),
        },
      },
      {
        onSuccess: onSaved,
      }
    );
  };

  return (
    <section className="form-page">
      <h1>Edit Product</h1>

      <form className="product-form" onSubmit={handleSubmit}>
        <label>
          Product name
          <input
            required
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </label>

        <label>
          Description
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </label>

        <label>
          Category
          <input
            required
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />
        </label>

        <div className="form-row">
          <label>
            Price (₹)
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
            />
          </label>

          <label>
            Stock
            <input
              type="number"
              required
              min="0"
              step="1"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: Number(e.target.value) })
              }
            />
          </label>
        </div>

        {mutation.isError && (
          <p className="error-message">
            Failed to update product. Please try again.
          </p>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="secondary-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditProduct;