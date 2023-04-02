import getApi from "./api";
import { Currency, CurrenciesResponse } from "./types";

export async function getCurrencies(): Promise<Currency[]> {
  const api = await getApi();

  const {
    data: { rows },
  } = await api.get<CurrenciesResponse>("/entity/currency");

  return rows;
}
