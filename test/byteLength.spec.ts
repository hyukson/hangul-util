import { getByteLength, sliceByByte } from "../src/byteLength";
import { toHalfWidth, toFullWidth } from "../src/width";

describe("getByteLength", () => {
  test("utf8 (기본값)", () => {
    expect(getByteLength("한글")).toBe(6);
    expect(getByteLength("abc")).toBe(3);
    expect(getByteLength("한글abc")).toBe(9);
    expect(getByteLength("")).toBe(0);
  });

  test("euc-kr", () => {
    expect(getByteLength("한글", "euc-kr")).toBe(4);
    expect(getByteLength("abc", "euc-kr")).toBe(3);
    expect(getByteLength("한글abc", "euc-kr")).toBe(7);
  });

  test("Node의 Buffer 계산과 일치한다 (utf8)", () => {
    const samples = ["한글", "안녕하세요", "a한b글c", "!@#", "ㄱㅏ"];

    samples.forEach((text) => {
      expect(getByteLength(text)).toBe(Buffer.byteLength(text, "utf8"));
    });
  });

  test("서로게이트 쌍(이모지)을 한 글자로 센다", () => {
    expect(getByteLength("😀")).toBe(4);
    expect(getByteLength("😀")).toBe(Buffer.byteLength("😀", "utf8"));
  });
});

describe("sliceByByte", () => {
  test("글자 중간에서 자르지 않는다", () => {
    expect(sliceByByte("안녕하세요", 6)).toBe("안녕");
    expect(sliceByByte("안녕하세요", 7)).toBe("안녕");
    expect(sliceByByte("안녕하세요", 8)).toBe("안녕");
    expect(sliceByByte("안녕하세요", 9)).toBe("안녕하");
  });

  test("euc-kr 기준", () => {
    expect(sliceByByte("안녕하세요", 6, "euc-kr")).toBe("안녕하");
    expect(sliceByByte("안녕하세요", 5, "euc-kr")).toBe("안녕");
  });

  test("한글과 ASCII가 섞인 경우", () => {
    expect(sliceByByte("한글abc", 8)).toBe("한글ab");
  });

  test("경계값", () => {
    expect(sliceByByte("한글", 0)).toBe("");
    expect(sliceByByte("한글", -1)).toBe("");
    expect(sliceByByte("한글", 100)).toBe("한글");
    expect(sliceByByte("", 10)).toBe("");
  });

  test("자른 결과는 항상 한도 이내다", () => {
    const text = "안녕하세요 반갑습니다 hello";

    for (let max = 0; max <= 40; max++) {
      expect(getByteLength(sliceByByte(text, max))).toBeLessThanOrEqual(max);
    }
  });
});

describe("전각/반각 변환", () => {
  test("toHalfWidth", () => {
    expect(toHalfWidth("ＡＢＣ")).toBe("ABC");
    expect(toHalfWidth("１２３")).toBe("123");
    expect(toHalfWidth("！？")).toBe("!?");
    expect(toHalfWidth("한글　테스트")).toBe("한글 테스트");
    expect(toHalfWidth("한글")).toBe("한글");
  });

  test("toFullWidth", () => {
    expect(toFullWidth("ABC")).toBe("ＡＢＣ");
    expect(toFullWidth("123")).toBe("１２３");
    expect(toFullWidth("한글")).toBe("한글");
  });

  test("왕복 변환이 유지된다", () => {
    expect(toHalfWidth(toFullWidth("abc 123!"))).toBe("abc 123!");
  });
});
