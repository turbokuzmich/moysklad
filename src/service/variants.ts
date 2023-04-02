import getApi from "./api";
import type { Variant, VariantsResponse } from "./types";

export async function getVariants(): Promise<Variant[]> {
  const api = await getApi();

  const {
    data: { rows },
  } = await api.get<VariantsResponse>("/entity/variant");

  return rows;
}
