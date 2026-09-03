export function isNumber(input: unknown): input is number {
  return typeof input === "number" && !isNaN(input);
}

export function splitByKey(key: string = ""): string[] {
  return key.match(/[ㄱ-힣a-zA-Z0-9]+/g) ?? [];
}

export function getNestedProperty(
  key: string[] | string = [],
  object: unknown = {}
): any {
  const _key = typeof key === "string" ? splitByKey(key) : key;

  if (!_key.length) return undefined;

  return _key.reduce<any>((acc, v) => acc?.[v], object);
}

export function zeroPad(
  string: number | string = "",
  pow: number = 0,
  pad: string = "0"
): string {
  const result = string.toString();
  const count = pow - result.length;

  if (count <= 0) return result;

  return pad.toString().repeat(count) + result;
}

export function chunkAtEnd(value: string = "", n: number = 1): string[] {
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

/**
 * 객체의 숫자 값들을 백분율(소수점 2자리)로 환산한다.
 * 합이 0이면 NaN 대신 모두 0을 반환한다.
 */
export function makePercentByObject(
  object: Record<string, number>
): Record<string, number> {
  const result: Record<string, number> = {};

  let sum = 0;

  for (const key in object) {
    sum += object[key];
  }

  for (const key in object) {
    if (!isNumber(object[key])) continue;

    result[key] = sum === 0 ? 0 : Number(((object[key] / sum) * 100).toFixed(2));
  }

  return result;
}

export function reverseByObject(
  object: Record<string, unknown> | readonly unknown[]
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const key in object) {
    result[String((object as Record<string, unknown>)[key])] = key;
  }

  return result;
}

/**
 * 배열을 (중첩 배열까지) 뒤집는다. 입력 배열은 변경하지 않는다.
 */
export function reverseByArray<T>(array: readonly T[]): T[] {
  const result: T[] = [];

  for (let index = array.length - 1; index >= 0; index--) {
    const item = array[index];

    result.push(Array.isArray(item) ? (reverseByArray(item) as T) : item);
  }

  return result;
}
