export function isNumber(input: any) {
  return typeof input === "number" && !isNaN(input);
}

export function splitByKey(key: string = ""): string[] {
  return key.match(/[ㄱ-힣a-zA-Z0-9]+/g) ?? ([] as any);
}

export function getNestedProperty(
  key: string[] | string = [],
  object: any = {}
) {
  const _key = typeof key === "string" ? splitByKey(key) : key;

  if (!_key.length) return undefined;

  return _key?.reduce((acc, v) => acc?.[v], object);
}

export function zeroPad(
  string: number | string = "",
  pow: number = 0,
  pad: string = "0"
) {
  let result = String(string);
  const padString = String(pad);

  for (let i = pow - result.length; i > 0; i--) {
    result = padString + result;
  }

  return result;
}

export function chunkAtEnd(value: string = "", n: number = 1) {
  const result: string[] = [];

  let start = value.length;

  while ((start -= n) > 0) {
    result.push(value.substring(start, start + n));
  }

  if (start > -n) {
    result.push(value.substring(0, start + n));
  }

  return result;
}

export function makePercentByObject(object: any) {
  const result: Record<string, number> = {};

  let sum = 0;

  for (const key in object) {
    sum += object[key];
  }

  for (const key in object) {
    if (isNumber(object[key])) {
      result[key] = Number(((object[key] / sum) * 100).toFixed(2));
    }
  }

  return result;
}

export function reverseByObject(object: any) {
  const result: Record<string | number, string> = {};

  for (const key in object) {
    result[object[key]] = key;
  }

  return result;
}

export function reverseByArray(array: any) {
  const result: any = [];

  for (let index = 0; index < array.length; index++) {
    if (Array.isArray(array[index])) {
      array[index] = reverseByArray(array[index]);
    }

    result.unshift(array[index]);
  }

  return result;
}