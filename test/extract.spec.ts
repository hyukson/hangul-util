import {
  extractHangul,
  containsHangul,
  removeHangul,
  hangulLength,
} from "../src/extract";

describe("extractHangul", () => {
  test("한글만 추출", () => {
    expect(extractHangul("hello안녕world세계")).toBe("안녕세계");
    expect(extractHangul("123가나다456")).toBe("가나다");
    expect(extractHangul("hello")).toBe("");
    expect(extractHangul("")).toBe("");
  });

  test("자모도 추출", () => {
    expect(extractHangul("aㄱbㅏc")).toBe("ㄱㅏ");
  });
});

describe("containsHangul", () => {
  test("한글 포함 확인", () => {
    expect(containsHangul("hello안녕")).toBe(true);
    expect(containsHangul("hello")).toBe(false);
    expect(containsHangul("")).toBe(false);
  });
});

describe("removeHangul", () => {
  test("한글 제거", () => {
    expect(removeHangul("hello안녕world")).toBe("helloworld");
    expect(removeHangul("한글만")).toBe("");
  });
});

describe("hangulLength", () => {
  test("한글 글자 수", () => {
    expect(hangulLength("hello안녕")).toBe(2);
    expect(hangulLength("한글")).toBe(2);
    expect(hangulLength("hello")).toBe(0);
  });
});
