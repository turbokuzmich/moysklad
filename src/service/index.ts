import first from "lodash/first";
import Filter from "./filter";
import { getAssortment } from "./assortment";
import {
  Project,
  Assortment,
  FilterPredicate,
  Product,
  VariantAssortment,
} from "./types";
import {
  getSalePrice,
  isProductAssortment,
  isVariantAssortment,
} from "./helpers";

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

export async function getDeluxAssortment() {
  const deluxFilter = Filter.instance().add(
    "pathname",
    FilterPredicate.contains,
    Project.delux
  );

  const assortment = await getAssortment(deluxFilter);

  const products: Record<string, Product> = assortment
    .filter((item) => isProductAssortment(item))
    .reduce(
      (products, product) => ({ ...products, [product.meta.href]: product }),
      {}
    );

  return assortment
    .filter((item) => isVariantAssortment(item))
    .map((item) => {
      const variant = item as VariantAssortment;

      const product = products[variant.product.meta.href];
      const value = first(variant.characteristics)?.value;
      const unit = first(variant.characteristics)?.name;
      const code = first(variant.characteristics)?.id;

      return {
        unit,
        code,
        id: variant.externalCode,
        category: product.externalCode,
        variant: value,
        name: variant.name,
        balance: variant.quantity,
        price: getSalePrice(variant),
      };
    });
}
