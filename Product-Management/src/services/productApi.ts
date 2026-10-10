import api from "./api";
import type {
  Product,
  ProductInput,
  ProductListResponse,
} from "../types/product";

export const getProducts = async (
  page: number,
  search: string
): Promise<ProductListResponse> => {
  const response = await api.get<ProductListResponse>("/products", {
    params: {
      page,
      limit: 6,
      search,
    },
  });

  return response.data;
};

export const createProduct = async (
  product: ProductInput
): Promise<Product> => {
  const response = await api.post<Product>("/products", product);
  return response.data;
};

export const updateProduct = async (
  id: string,
  product: ProductInput
): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};