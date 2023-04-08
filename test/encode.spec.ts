import { encode, decode } from "../src/encode";

describe("formatNumber", () => {
  test("문자", () => {
    expect(decode(encode("구오"))).toEqual("구오");
  });

  test("혼합 문자", () => {
    expect(decode(encode("감!사3합$니다."))).toEqual("감!사3합$니다.");
  });

  test("배열", () => {
    expect(decode(encode([1, 2, 3]))).toEqual([1, 2, 3]);
  });

  test("객체", () => {
    expect(decode(encode({ a: 1, b: 2 }))).toEqual({ a: 1, b: 2 });
  });

  test("혼합 객체", () => {
    expect(
      decode(
        encode([
          { a: 1, b: 2 },
          { a: 1, b: 2 },
        ])
      )
    ).toEqual([
      { a: 1, b: 2 },
      { a: 1, b: 2 },
    ]);
  });

  test("시간초과 테스트", () => {
    const input = new Array(40000).fill("감!사3합$니다.").join('');
    expect(decode(encode(input))).toEqual(input);
  });
});
