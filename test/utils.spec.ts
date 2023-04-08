import {
  isNumber,
  chunkAtEnd,
  makePercentByObject,
  zeroPad,
  reverseByObject,
  reverseByArray,
  getNestedProperty,
  splitByKey,
} from "../src/utils";

describe("isNumber", () => {
  test("숫자가 아닌 값", () => {
    expect(isNumber("")).toEqual(false);
    expect(isNumber(null)).toEqual(false);
    expect(isNumber(undefined)).toEqual(false);
    expect(isNumber(NaN)).toEqual(false);
    expect(isNumber("abc")).toEqual(false);
    expect(isNumber("test")).toEqual(false);
    expect(isNumber("100,000.123")).toEqual(false);
    expect(isNumber(true)).toEqual(false);
    expect(isNumber(false)).toEqual(false);
    expect(isNumber([])).toEqual(false);
    expect(isNumber({})).toEqual(false);
  });

  test("숫자", () => {
    expect(isNumber(0)).toEqual(true);
    expect(isNumber(123)).toEqual(true);
    expect(isNumber(-123)).toEqual(true);
    expect(isNumber(0.123)).toEqual(true);
    expect(isNumber(123.213)).toEqual(true);
  });
});

describe("splitByKey", () => {
  test("빈값", () => {
    expect(splitByKey("")).toEqual([]);
  });

  test("[0].a", () => {
    expect(splitByKey("[0].a")).toEqual(["0", "a"]);
  });

  test("name.detail", () => {
    expect(splitByKey("name.detail")).toEqual(["name", "detail"]);
  });
});

describe("getNestedProperty", () => {
  test("빈값", () => {
    expect(getNestedProperty("", "")).toEqual(undefined);
    expect(getNestedProperty("", {})).toEqual(undefined);
  });

  test("[0].a", () => {
    expect(getNestedProperty("[2].a", "test")).toEqual(undefined);
    expect(getNestedProperty(splitByKey("[2].a"), "test")).toEqual(undefined);
    expect(getNestedProperty("[0].a", [{ a: 2 }, { b: 1 }])).toEqual(2);
    expect(getNestedProperty("[0].a", [{ b: 1 }, { a: 2 }])).toEqual(undefined);
  });

  test("name.detail", () => {
    expect(
      getNestedProperty("name.detail", { name: { detail: "테스트" } })
    ).toEqual("테스트");
    expect(getNestedProperty("name.detail", { name: "테스트" })).toEqual(
      undefined
    );
  });
});

describe("zeroPad", () => {
  test("5", () => {
    expect(zeroPad(5, 2)).toEqual("05");
  });

  test("test", () => {
    expect(zeroPad("test", 10)).toEqual("000000test");
    expect(zeroPad("test", 10, "-")).toEqual("------test");
  });

  test("123", () => {
    expect(zeroPad(123, 2)).toEqual("123");
    expect(zeroPad(123, 5)).toEqual("00123");
    expect(zeroPad(123, 3, "-")).toEqual("123");
    expect(zeroPad(123, 0)).toEqual("123");
    expect(zeroPad(12345, 3)).toEqual("12345");
  });

  test("빈값", () => {
    expect(zeroPad("", 3)).toEqual("000");
  });

  test("시간초과 테스트", () => {
    const result = new Array(10000000).fill("0").join("");
    expect(zeroPad("", 10000000)).toEqual(result);
  });
});

describe("chunkAtEnd", () => {
  test("abcdefg", () => {
    expect(chunkAtEnd("abcdefg", 2)).toEqual(["fg", "de", "bc", "a"]);
    expect(chunkAtEnd("abcdefg", 4)).toEqual(["defg", "abc"]);
  });

  test("abc", () => {
    expect(chunkAtEnd("abc")).toEqual(["c", "b", "a"]);
    expect(chunkAtEnd("abc", 3)).toEqual(["abc"]);
  });

  test("00000001", () => {
    expect(chunkAtEnd("00000001", 4)).toEqual(["0001", "0000"]);
    expect(chunkAtEnd("00000001", 2)).toEqual(["01", "00", "00", "00"]);
  });

  test("빈값", () => {
    expect(chunkAtEnd("")).toEqual([]);
  });

  test("시간초과 테스트", () => {
    const input = new Array(400000).fill("0101").join("");
    const result = new Array(400000).fill(['1', '0', '1', '0']).flat();
    expect(chunkAtEnd(input, 1)).toEqual(result);
  });
});

describe("makePercentByObject", () => {
  test("빈값", () => {
    expect(makePercentByObject({})).toEqual({});
  });

  test("3개 값", () => {
    expect(makePercentByObject({ a: 10, b: 20, c: 30 })).toEqual({
      a: 16.67,
      b: 33.33,
      c: 50,
    });
  });

  test("2개 값", () => {
    expect(makePercentByObject({ a: 0, b: 10 })).toEqual({ a: 0, b: 100 });
  });
});

describe("reverseByObject", () => {
  test("Object", () => {
    expect(reverseByObject({ a: 1, b: 2, c: 3 })).toEqual({
      1: "a",
      2: "b",
      3: "c",
    });
    expect(reverseByObject({ 1: "a", 2: "b", 3: "c" })).toEqual({
      a: "1",
      b: "2",
      c: "3",
    });
    expect(reverseByObject(["a", "b", "c"])).toEqual({
      a: "0",
      b: "1",
      c: "2",
    });
  });
});

describe("reverseByArray", () => {
  test("Array", () => {
    expect(
      reverseByArray([
        [["습니다"], ["다", "어", "음"]],
        [["입니다"], ["이다"]],
      ])
    ).toEqual([
      [["이다"], ["입니다"]],
      [["음", "어", "다"], ["습니다"]],
    ]);
  });

  test("Array", () => {
    expect(reverseByArray([1, 2, 3, [4, [5, 6, 7]]])).toEqual([
      [[7, 6, 5], 4],
      3,
      2,
      1,
    ]);
  });
});
