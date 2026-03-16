import { days, months } from "../src/days";

describe("days", () => {
  test("고유어 날짜", () => {
    expect(days(1)).toBe("하루");
    expect(days(3)).toBe("사흘");
    expect(days(15)).toBe("보름");
    expect(days(30)).toBe("그믐");
  });

  test("범위 밖", () => {
    expect(days(0)).toBe("");
    expect(days(31)).toBe("");
  });
});

describe("months", () => {
  test("한국어 월 이름", () => {
    expect(months(1)).toBe("일월");
    expect(months(6)).toBe("유월");
    expect(months(10)).toBe("시월");
    expect(months(12)).toBe("십이월");
  });

  test("범위 밖", () => {
    expect(months(0)).toBe("");
    expect(months(13)).toBe("");
  });
});
