import { hasJongseong, hasJongseongByGroups } from "../src/hasJongseong";

describe("hasJongseong", () => {
  test("받침 있는 글자", () => {
    expect(hasJongseong("한")).toBe(true);
    expect(hasJongseong("글")).toBe(true);
    expect(hasJongseong("받침")).toBe(true);
  });

  test("받침 없는 글자", () => {
    expect(hasJongseong("하")).toBe(false);
    expect(hasJongseong("가나")).toBe(false);
  });

  test("빈 문자열", () => {
    expect(hasJongseong("")).toBe(false);
  });

  test("영문", () => {
    expect(hasJongseong("a")).toBe(false);
  });
});

describe("hasJongseongByGroups", () => {
  test("각 글자의 받침 유무", () => {
    expect(hasJongseongByGroups("한글아")).toEqual([true, true, false]);
    expect(hasJongseongByGroups("가나다")).toEqual([false, false, false]);
  });
});
