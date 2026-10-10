import { useState } from "react";
import type { FormEvent } from "react";

import { useCreateProduct } from "../hooks/useProducts";
import type { ProductInput } from "../types/product";

interface AddProductProps {
  onCancel: () => void;
  onSaved: () => void;
}

const AddProduct = ({ onCancel, onSaved }: AddProductProps) => {
  const [form, setForm] = useState<ProductInput>({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
  });

  const mutation = useCreateProduct();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      {
        ...form,
        name: form.name.trim(),
        description: form.description.trim(),
        category: form.category.trim(),
      },
      {
        onSuccess: onSaved,
      }
    );
  };

  return (
    <section className="form-page">
      <h1>Add Product</h1>

      <form className="product-form" onSubmit={handleSubmit}>
        <label>
          Product name
          <input
            required
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            placeholder="Enter product name"
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
            placeholder="Enter description"
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
            placeholder="Electronics, Clothing..."
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
            Failed to add product. Please try again.
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
            {mutation.isPending ? "Saving..." : "Add Product"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;