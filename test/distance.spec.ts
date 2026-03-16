import { getDistance, correctByDistance } from "../src/distance";

describe("getDistance", () => {
  test("빈값", () => {
    expect(getDistance("파인애플", "")).toEqual(4);
    expect(getDistance("", "파인애플")).toEqual(4);
    expect(getDistance("", "")).toEqual(0);
  });

  test("파인애플", () => {
    expect(getDistance("파인애플", "파일해플")).toEqual(2);
  });

  test("시간초과 테스트", () => {
    const input = new Array(10000).fill("팝").join("");
    const input2 = new Array(10000).fill("핍").join("");

    expect(getDistance(input, input2)).toEqual(10000);
  });

  test("시간초과 테스트(다양한 문자)", () => {
    const chars1 = ["팝", "핍", "펍", "쉽", "깊"];
    const chars2 = ["핍", "쉽", "깊", "팝", "펍"];
    const input = chars1.map((c) => new Array(2000).fill(c).join("")).join("");
    const input2 = chars2.map((c) => new Array(2000).fill(c).join("")).join("");

    expect(getDistance(input, input2)).toEqual(8000);
  });
});

describe("correctByDistance", () => {
  const wordList = [
    "사자",
    "무과",
    "사과파이",
    "파인애플",
    "망고",
    "변호사",
    "사고",
    "사과",
    "귤",
    "토끼",
    "코끼리",
  ];

  test("사과", () => {
    expect(correctByDistance("사과", wordList)).toEqual([
      "사과",
      "사고",
      "사자",
      "무과",
    ]);

    expect(correctByDistance("사과", wordList, { isSplit: false })).toEqual([
      "사과",
      "사자",
      "무과",
      "사고",
      "사과파이",
      "망고",
      "귤",
      "토끼",
    ]);
  });

  test("시간초과 테스트", () => {
    const input = new Array(1000).fill("팝").join("");
    const input2 = new Array(1000)
      .fill([
        new Array(1000).fill("핍").join(""),
        new Array(1000).fill("쉽").join(""),
      ])
      .flat();

    expect(correctByDistance(input, input2)).toEqual([]);
  });
});
