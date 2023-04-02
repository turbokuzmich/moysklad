import getApi from "./api";
import type { ProductFolder, ProductFoldersResponse } from "./types";

export async function getProductFolders(): Promise<ProductFolder[]> {
  const api = await getApi();

  const {
    data: { rows },
  } = await api.get<ProductFoldersResponse>("/entity/productfolder");

  return rows;
}
