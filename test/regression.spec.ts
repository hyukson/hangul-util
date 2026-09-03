import { hangulToNumber } from "../src/hangulToNumber";
import { josa, formatJosa } from "../src/josa";
import { includesByCho } from "../src/includesByCho";
import {
  hangulIncludes,
  hangulEndsWith,
  hangulHighlight,
  hangulFilter,
} from "../src/hangulSearch";
import { makePercentByObject, reverseByArray } from "../src/utils";
import { getLocal, getLocalByGroups } from "../src/getLocal";
import { sortByASC, sortByDESC } from "../src/sortHangul";
import { formatDate } from "../src/formatDate";
import { sinoKoreanNumber } from "../src/nativeNumber";
import { romanize } from "../src/romanize";
import { normalize } from "../src/normalize";

describe("hangulToNumber: 큰 수 단위와 숫자 낱자 충돌", () => {
  test('"구"는 10^32이 아니라 숫자 9로 읽는다', () => {
    expect(hangulToNumber("구")).toBe(9);
    expect(hangulToNumber("구십")).toBe(90);
    expect(hangulToNumber("구백구십구")).toBe(999);
    expect(hangulToNumber("삼백구십")).toBe(390);
  });

  test("겹치지 않는 큰 수 단위는 그대로 동작한다", () => {
    expect(hangulToNumber("만")).toBe(10000);
    expect(hangulToNumber("구만")).toBe(90000);
    expect(hangulToNumber("일억 이천삼백만")).toBe(123000000);
  });
});

describe("josa: 받침 판별", () => {
  test("ㄹ 받침 뒤에서는 '으로'가 아니라 '로'", () => {
    expect(josa("서울", "으로")).toBe("로");
    expect(josa("지하철", "으로")).toBe("로");
    expect(josa("부산", "으로")).toBe("으로");
    expect(josa("버스", "으로")).toBe("로");
  });

  test("숫자는 읽는 소리로 받침을 판단한다", () => {
    expect(josa("1", "은")).toBe("은"); // 일
    expect(josa("2", "은")).toBe("는"); // 이
    expect(josa("3", "이")).toBe("이"); // 삼
    expect(josa("5", "이")).toBe("가"); // 오
    expect(josa("1", "으로")).toBe("로"); // 일 → ㄹ 받침
  });

  test("빈 문자열과 한글이 아닌 값도 안전하다", () => {
    expect(josa("", "은")).toBe("는");
    expect(josa("apple", "은")).toBe("는");
  });

  test("formatJosa는 숫자 뒤 조사도 처리한다", () => {
    expect(formatJosa("사과 3[은/는]")).toBe("사과 3은");
  });
});

describe("초성 검색: 정규식 메타문자", () => {
  test("메타문자가 있어도 예외가 나지 않는다", () => {
    expect(() => includesByCho("(", "가")).not.toThrow();
    expect(() => includesByCho("a+b", "a+b")).not.toThrow();
    expect(() => hangulIncludes("가격 (특가)", "(특")).not.toThrow();
  });

  test("메타문자를 문자 그대로 찾는다", () => {
    expect(includesByCho("(", "(가)")).toBe(true);
    expect(includesByCho(".", "가나")).toBe(false);
    expect(hangulIncludes("가격 (특가)", "(특가)")).toBe(true);
  });

  test("초성 검색은 그대로 동작한다", () => {
    expect(hangulIncludes("프로그래밍", "ㅍㄹㄱ")).toBe(true);
    expect(hangulEndsWith("프로그래밍", "ㄱㄹㅁ")).toBe(true);
    expect(hangulEndsWith("프로그래밍", "ㅍㄹ")).toBe(false);
    expect(hangulFilter(["사과", "바나나", "수박"], "ㅅ")).toEqual([
      "사과",
      "수박",
    ]);
  });

  test("hangulHighlight는 무한 루프에 빠지지 않는다", () => {
    expect(hangulHighlight("프로그래밍", "ㅍㄹ")).toEqual({
      matched: true,
      ranges: [[0, 2]],
    });
    expect(hangulHighlight("a.b", ".")).toEqual({
      matched: true,
      ranges: [[1, 2]],
    });
  });
});

describe("utils: 0으로 나누기와 입력 변경", () => {
  test("합이 0이면 NaN 대신 0", () => {
    expect(makePercentByObject({ a: 0, b: 0 })).toEqual({ a: 0, b: 0 });
  });

  test("reverseByArray는 원본을 변경하지 않는다", () => {
    const input = [1, [2, 3]];
    expect(reverseByArray(input)).toEqual([[3, 2], 1]);
    expect(input).toEqual([1, [2, 3]]);
  });

  test("getLocalByGroups(percent)는 빈 문자열에서 NaN을 내지 않는다", () => {
    expect(getLocalByGroups("", true)).toEqual({
      ko: 0,
      en: 0,
      number: 0,
      special: 0,
      etc: 0,
    });
  });
});

describe("getLocal: 문자 클래스 안의 파이프", () => {
  test("'|'는 한글이나 영어가 아니라 특수문자다", () => {
    expect(getLocal("|")).toBe("special");
    expect(getLocal("가|나")).toBe("etc");
    expect(getLocal("a|b")).toBe("etc");
    expect(getLocal("가나다")).toBe("ko");
    expect(getLocal("abc")).toBe("en");
  });
});

describe("정렬: 원본 배열 보존", () => {
  test("sortByASC / sortByDESC 모두 원본을 유지한다", () => {
    const array = ["다", "가", "나"];

    expect(sortByASC(array)).toEqual(["가", "나", "다"]);
    expect(array).toEqual(["다", "가", "나"]);

    expect(sortByDESC(array)).toEqual(["다", "나", "가"]);
    expect(array).toEqual(["다", "가", "나"]);
  });
});

describe("formatDate: 잘못된 날짜", () => {
  test("Invalid Date는 'NaN년...' 대신 빈 문자열", () => {
    expect(formatDate("이건 날짜가 아님")).toBe("");
  });

  test("정상 날짜는 그대로 포맷된다", () => {
    expect(formatDate("2022-02-22", "YYYY년MM월DD일")).toBe("2022년02월22일");
  });
});

describe("sinoKoreanNumber: 표현 범위", () => {
  test("안전한 정수 범위를 넘으면 빈 문자열", () => {
    expect(sinoKoreanNumber(1e21)).toBe("");
    expect(sinoKoreanNumber(-1)).toBe("");
  });

  test("범위 안에서는 정상 동작", () => {
    expect(sinoKoreanNumber(10000)).toBe("일만");
    expect(sinoKoreanNumber(123000000)).toBe("일억이천삼백만");
  });
});

describe("romanize: 발음 적용 옵션", () => {
  test("기본값은 글자 그대로 옮긴다", () => {
    expect(romanize("신라")).toBe("sinra");
    expect(romanize("국물")).toBe("gukmul");
  });

  test("usePronunciation이면 음운 변동을 먼저 적용한다", () => {
    expect(romanize("신라", { usePronunciation: true })).toBe("silla");
    expect(romanize("국물", { usePronunciation: true })).toBe("gungmul");
  });
});

describe("normalize: 한글이 아닌 문자", () => {
  test("영문/숫자/기호를 그대로 둔다", () => {
    expect(normalize("a한글")).toBe("ahan geur");
    expect(normalize("123")).toBe("123");
    expect(normalize("!@#")).toBe("!@#");
  });
});
