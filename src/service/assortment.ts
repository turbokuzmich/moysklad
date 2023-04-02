import getApi from "./api";
import { Assortment, AssortmentResponse, Filter } from "./types";

export async function getAssortment(filter?: Filter): Promise<Assortment[]> {
  const api = await getApi();

  const {
    data: { rows },
  } = await api.get<AssortmentResponse>(
    "/entity/assortment",
    filter
      ? {
          params: {
            filter: filter.get(),
          },
        }
      : {}
  );

  return rows;
}
