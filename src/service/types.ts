export enum Type {
  store = "store",
  image = "image",
  product = "product",
  variant = "variant",
  currency = "currency",
  pricetype = "pricetype",
  assortment = "assortment",
  productfolder = "productfolder",
  attributemetadata = "attributemetadata",
}

export enum Project {
  neon = "Neon Beard",
  delux = "Delux SPA",
  yoko = "YOKO cosmetics",
}

export enum FilterPredicate {
  equals = "=",
  greaterThan = ">",
  lessThan = ">",
  greaterThanOrEqual = ">=",
  lessThanOrEqual = ">=",
  notEqual = "!=",
  contains = "~",
  notContains = "!~",
  startsWith = "~=",
  endsWith = "=~",
}

export interface Filter {
  add(field: string, predicate: FilterPredicate, value?: string): Filter;
  get(): string;
}

export interface BaseMeta<T extends Type> {
  href: string;
  type: T;
}

export interface EntityMeta<T extends Type> extends BaseMeta<T> {
  uuidHref: string;
  metadataHref: string;
}

export interface ListMeta<T extends Type> extends BaseMeta<T> {
  size: number;
  limit: number;
  offset: number;
  nextHref?: string;
  previousHref?: string;
}

export interface Characteristic {
  meta: BaseMeta<Type.attributemetadata>;
  id: string;
  name: string;
  value: string;
}

export interface Currency {
  id: string;
  name: string;
  code: string;
  isoCode: string;
  default: boolean;
  fullName: string;
  minorUnit: {
    gender: string;
    s1: string;
    s2: string;
    s3: string;
  };
  majorUnit: {
    gender: string;
    s1: string;
    s2: string;
    s3: string;
  };
}

export interface PriceType {
  meta: BaseMeta<Type.pricetype>;
  id: string;
  name: string;
  externalCode: string;
}

export interface Price {
  value: number;
  currency: {
    meta: EntityMeta<Type.currency>;
  };
}

export interface SalePrice extends Price {
  priceType: PriceType;
}

export interface AssortmentBalance {
  stock: number; // остаток
  reserve: number; // резерв
  inTransit: number; // ожидание
  quantity: number; // доступно
}

export interface ProductAssortment extends Product, AssortmentBalance {}
export interface VariantAssortment extends Variant, AssortmentBalance {}

export type Assortment = ProductAssortment | VariantAssortment;

export interface Store {
  id: string;
  name: string;
  updated: string;
  externalCode: string;
  meta: EntityMeta<Type.store>;
}

// FIXME + uom
// FIXME + files
// FIXME + images
export interface Product {
  meta: EntityMeta<Type.product>;
  id: string;
  code: string;
  name: string;
  weight: number;
  volume: number;
  minPrice: Price;
  buyPrice: Price;
  updated: string;
  article: string;
  pathName: string;
  description: string;
  externalCode: string;
  variantsCount: number;
  salePrices: SalePrice[];
  images: {
    meta: ListMeta<Type.image>;
  };
}

export interface Variant {
  meta: EntityMeta<Type.variant>;
  id: string;
  code: string;
  name: string;
  externalCode: string;
  updated: string;
  salePrices: SalePrice[];
  characteristics: Characteristic[];
  images: {
    meta: ListMeta<Type.image>;
  };
  product: {
    meta: EntityMeta<Type.product>;
  };
}

export interface ProductFolder {
  meta: EntityMeta<Type.productfolder>;
  id: string;
  updated: string;
  name: string;
  externalCode: string;
  pathName: string;
  productFolder: {
    meta: EntityMeta<Type.productfolder>;
  };
}

export interface TokenResponse {
  access_token: string;
}

export interface AssortmentResponse {
  meta: ListMeta<Type.assortment>;
  rows: Assortment[];
}

export interface StoresResponse {
  meta: ListMeta<Type.store>;
  rows: Store[];
}

export interface ProductResponse {
  meta: ListMeta<Type.product>;
  rows: Product[];
}

export interface VariantsResponse {
  meta: ListMeta<Type.variant>;
  rows: Variant[];
}

export interface ProductFoldersResponse {
  meta: ListMeta<Type.productfolder>;
  rows: ProductFolder[];
}

export interface CurrenciesResponse {
  meta: ListMeta<Type.currency>;
  rows: Currency[];
}

export type PriceTypesResponse = PriceType[];
