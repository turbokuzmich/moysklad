import getApi from "./api";
import type { Store, StoresResponse } from "./types";

export async function getStores(): Promise<Store[]> {
  const api = await getApi();

  const {
    data: { rows },
  } = await api.get<StoresResponse>("/entity/store");

  return rows;
}
