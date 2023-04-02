import Filter from "./filter";
import { getAssortment } from "./assortment";
import { Project, Assortment, FilterPredicate } from "./types";
import { getSalePrice, isVariantAssortment } from "./helpers";

export async function getNeonAssortment() {
  const neonFilter = Filter.instance().add(
    "pathname",
    FilterPredicate.contains,
    Project.neon
  );

  return (await getAssortment(neonFilter)).reduce(
    (
      variants: Array<{
        id: string;
        name: string;
        balance: number;
        price: number;
      }>,
      item: Assortment
    ) =>
      isVariantAssortment(item)
        ? [
            ...variants,
            {
              id: item.externalCode,
              name: item.name,
              balance: item.quantity,
              price: getSalePrice(item),
            },
          ]
        : variants,
    []
  );
}
