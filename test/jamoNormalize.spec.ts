import {
  normalizeHangul,
  toCompatibilityJamo,
  toConjoiningJamo,
  hasConjoiningJamo,
} from "../src/jamoNormalize";
import { isHangul } from "../src/isHangul";
import { getChoseong } from "../src/choseong";
import { extractHangul } from "../src/extract";
import { hangulIncludes } from "../src/hangulSearch";
import { divideHangul } from "../src/divide";

const NFD = "한글".normalize("NFD");

describe("hasConjoiningJamo", () => {
  test("NFD 문자열을 검출한다", () => {
    expect(hasConjoiningJamo(NFD)).toBe(true);
    expect(hasConjoiningJamo("한글")).toBe(false);
    expect(hasConjoiningJamo("ㄱㅏ")).toBe(false);
    expect(hasConjoiningJamo("")).toBe(false);
    expect(hasConjoiningJamo("hello")).toBe(false);
  });
});

describe("toCompatibilityJamo", () => {
  test("조합형 초성/중성/종성을 호환 자모로 바꾼다", () => {
    expect(toCompatibilityJamo("ᄀ")).toBe("ㄱ"); // 초성 ᄀ
    expect(toCompatibilityJamo("ᅡ")).toBe("ㅏ"); // 중성 ᅡ
    expect(toCompatibilityJamo("ᆨ")).toBe("ㄱ"); // 종성 ᆨ
    expect(toCompatibilityJamo("ᇂ")).toBe("ㅎ"); // 종성 ᇂ (마지막)
    expect(toCompatibilityJamo("ᄒ")).toBe("ㅎ"); // 초성 ᄒ (마지막)
    expect(toCompatibilityJamo("ᅵ")).toBe("ㅣ"); // 중성 ᅵ (마지막)
  });

  test("NFD 문자열 전체를 자모로 편다", () => {
    expect(toCompatibilityJamo(NFD)).toBe("ㅎㅏㄴㄱㅡㄹ");
  });

  test("완성형과 그 밖의 문자는 그대로 둔다", () => {
    expect(toCompatibilityJamo("한글")).toBe("한글");
    expect(toCompatibilityJamo("abc 123")).toBe("abc 123");
  });
});

describe("toConjoiningJamo", () => {
  test("호환 자모를 조합형으로 바꾼다", () => {
    expect(toConjoiningJamo("ㄱ")).toBe("ᄀ");
    expect(toConjoiningJamo("ㅏ")).toBe("ᅡ");
    expect(toConjoiningJamo("ㄱ", "jong")).toBe("ᆨ");
  });

  test("왕복 변환이 유지된다", () => {
    expect(toCompatibilityJamo(toConjoiningJamo("ㅎㅏㄴ"))).toBe("ㅎㅏㄴ");
  });

  test("변환할 수 없는 문자는 그대로 둔다", () => {
    expect(toConjoiningJamo("가b1")).toBe("가b1");
  });
});

describe("normalizeHangul", () => {
  test("NFD를 완성형으로 되돌린다", () => {
    expect(normalizeHangul(NFD)).toBe("한글");
    expect(normalizeHangul(NFD).length).toBe(2);
  });

  test("이미 정상인 문자열은 그대로 둔다", () => {
    expect(normalizeHangul("한글")).toBe("한글");
    expect(normalizeHangul("hello 123")).toBe("hello 123");
    expect(normalizeHangul("")).toBe("");
  });

  test("합쳐지지 않는 홑 조합형 자모는 호환 자모로 바꾼다", () => {
    expect(normalizeHangul("ᄀ")).toBe("ㄱ");
    expect(normalizeHangul("ᅡ")).toBe("ㅏ");
  });
});

describe("NFD 입력이 다른 함수들과 맞물린다", () => {
  test("정규화 전에는 조용히 실패한다", () => {
    expect(isHangul(NFD)).toBe(false);
    expect(extractHangul(NFD)).toBe("");
    expect(hangulIncludes(NFD, "ㅎㄱ")).toBe(false);
  });

  test("정규화 후에는 정상 동작한다", () => {
    const fixed = normalizeHangul(NFD);

    expect(isHangul(fixed)).toBe(true);
    expect(extractHangul(fixed)).toBe("한글");
    expect(getChoseong(fixed)).toBe("ㅎㄱ");
    expect(hangulIncludes(fixed, "ㅎㄱ")).toBe(true);
    expect(divideHangul(fixed)).toEqual(["ㅎ", "ㅏ", "ㄴ", "ㄱ", "ㅡ", "ㄹ"]);
  });
});
