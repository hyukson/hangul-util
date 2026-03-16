import { romanize } from "../src/romanize";

describe("romanize", () => {
  test("기본 변환", () => {
    expect(romanize("한글")).toBe("hangeul");
    expect(romanize("가나다")).toBe("ganada");
  });

  test("종성 포함", () => {
    expect(romanize("받침")).toBe("batchim");
    expect(romanize("한국")).toBe("hanguk");
  });

  test("대문자 옵션", () => {
    expect(romanize("서울", { capitalize: true })).toBe("Seoul");
    expect(romanize("부산", { capitalize: true })).toBe("Busan");
  });

  test("비한글 유지", () => {
    expect(romanize("hello")).toBe("hello");
    expect(romanize("한글123")).toBe("hangeul123");
  });
});
