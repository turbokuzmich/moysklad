import getApi from "./api";
import { PriceType, PriceTypesResponse } from "./types";

export async function getPriceTypes(): Promise<PriceType[]> {
  const api = await getApi();

  //   const {
  //     data: { rows },
  //   } = await api.get<PriceTypesResponse>("/context/companysettings/pricetype");
  const response = await api.get<PriceTypesResponse>(
    "/context/companysettings/pricetype"
  );
  console.log(response.data);

  //   return rows;
  return [];
}
