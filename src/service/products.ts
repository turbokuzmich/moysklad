import getApi from "./api";
import type { Product, ProductResponse } from "./types";

export async function getProducts(): Promise<Product[]> {
  const api = await getApi();

  const {
    data: { rows },
  } = await api.get<ProductResponse>("/entity/product");

  return rows;
}
