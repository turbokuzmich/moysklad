import {
  Type,
  Variant,
  Assortment,
  VariantAssortment,
  ProductAssortment,
} from "./types";

export function isVariantAssortment(
  item: Assortment
): item is VariantAssortment {
  return item.meta.type === Type.variant;
}

export function isProductAssortment(
  item: Assortment
): item is ProductAssortment {
  return item.meta.type === Type.product;
}

export function getSalePrice(item: Variant): number {
  const price = item.salePrices.find(
    (price) => price.priceType.externalCode === process.env.SALE_PRICE_ID
  );

  return price ? price.value / 100 : 0;
}
