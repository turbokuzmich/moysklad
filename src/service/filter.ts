import { Filter, FilterPredicate } from "./types";

interface FilterItem {
  field: string;
  predicate: FilterPredicate;
  value?: string;
}

export default class FilterImp implements Filter {
  private items: FilterItem[];

  static instance(): FilterImp {
    return new FilterImp();
  }

  constructor() {
    this.items = [];
  }

  add(
    field: string,
    predicate: FilterPredicate,
    value?: string | undefined
  ): Filter {
    const item: FilterItem = {
      field,
      predicate,
      value,
    };

    const filter = new FilterImp();

    filter.items.push(...this.items, item);

    return filter;
  }

  get(): string {
    return this.items
      .map(({ field, predicate, value = "" }) => `${field}${predicate}${value}`)
      .join(";");
  }
}
