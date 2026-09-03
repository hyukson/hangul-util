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
 *
 * 매개변수를 `Record<string, number>`로 좁히면 인덱스 시그니처가 없는 interface를
 * 넘기던 기존 코드가 컴파일되지 않으므로 `any`를 유지한다.
 */
export function makePercentByObject(object: any): Record<string, number> {
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

/**
 * 객체의 키와 값을 뒤집는다.
 *
 * `makePercentByObject`와 같은 이유로 매개변수 타입은 `any`를 유지한다.
 */
export function reverseByObject(object: any): Record<string, string> {
  const result: Record<string, string> = {};

  for (const key in object) {
    result[String(object[key])] = key;
  }

  return result;
}

/**
 * 배열을 (중첩 배열까지) 뒤집는다. 입력 배열은 변경하지 않는다.
 *
 * 반환 타입을 좁히면 기존에 통과하던 호출이 컴파일되지 않을 수 있어
 * 시그니처는 그대로 두고 동작(원본 변경)만 고쳤다.
 */
export function reverseByArray(array: any): any {
  const result: any[] = [];

  for (let index = array.length - 1; index >= 0; index--) {
    const item = array[index];

    result.push(Array.isArray(item) ? reverseByArray(item) : item);
  }

  return result;
}
