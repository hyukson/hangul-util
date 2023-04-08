import { splitByKey, getNestedProperty, reverseByObject } from "./utils";

const intlCollator = Intl.Collator();

function baseCompare(str1: any, str2: any, orderASC: boolean) {
  if (orderASC) {
    return intlCollator.compare(str1, str2);
  }

  return intlCollator.compare(str2, str1);
}

function baseSortBy(
  array: any[] = [],
  compare?: string[] | string,
  orderASC: boolean = true
) {
  if (Array.isArray(compare)) {
    const keys = compare.map((x) => splitByKey(x));

    return array.sort((a, b) => {
      for (let i = 0; i < compare.length; i++) {
        const result = baseCompare(
          getNestedProperty(keys[i], a),
          getNestedProperty(keys[i], b),
          orderASC
        );

        if (result !== 0) return result;
      }

      return 0;
    });
  }

  if (!compare) {
    return array.sort((a, b) => baseCompare(a, b, orderASC));
  }

  const keys = splitByKey(compare);

  return array.sort((a, b) =>
    baseCompare(
      getNestedProperty(keys, a),
      getNestedProperty(keys, b),
      orderASC
    )
  );
}

export function sortByASC(array: any[] = [], compare?: string[] | string) {
  return baseSortBy(array, compare, true);
}

export function sortByDESC(array: any[] = [], compare?: string[] | string) {
  return baseSortBy(array, compare, false);
}

/**
 * orderASC: true -> 오름차순
 * orderASC: false -> 내림차순
 */
export function sortByGroups(
  array: any[] = [],
  groups: (number | string)[] = [],
  orderASC: boolean = true,
  compare?: string
) {
  const objectBygroup: any = reverseByObject(groups);

  const keys = splitByKey(compare);

  const mapped = array.map((item, index) => {
    return { index, value: compare ? getNestedProperty(keys, item) : item };
  });

  const baseSortByGroups = (a: any, b: any) => {
    const status1 = objectBygroup[a.value] ?? -1;
    const status2 = objectBygroup[b.value] ?? -1;

    const condition1 = orderASC ? status1 - status2 : status2 - status1;
    const condition2 = baseCompare(a.value, b.value, orderASC);

    if (status1 === status2) {
      return condition2 || 0;
    }
    if (status1 === -1) {
      return orderASC ? 1 : -1;
    }
    if (status2 === -1) {
      return orderASC ? -1 : 1;
    }

    return condition1 || condition2 || 0;
  };

  return mapped.sort(baseSortByGroups).map((item) => array[item.index]);
}
