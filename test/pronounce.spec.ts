import { pronounce } from "../src/pronounce";

describe("pronounce", () => {
  test("연음법칙", () => {
    expect(pronounce("음악을")).toBe("으마글");
    expect(pronounce("먹어")).toBe("머거");
    expect(pronounce("있어")).toBe("이써");
  });

  test("비음화", () => {
    expect(pronounce("국물")).toBe("궁물");
    expect(pronounce("학년")).toBe("항년");
    expect(pronounce("십만")).toBe("심만");
  });

  test("경음화", () => {
    expect(pronounce("학교")).toBe("학꾜");
    expect(pronounce("국밥")).toBe("국빱");
  });

  test("격음화", () => {
    expect(pronounce("좋다")).toBe("조타");
    expect(pronounce("놓고")).toBe("노코");
    expect(pronounce("입학")).toBe("이팍");
  });

  test("유음화", () => {
    expect(pronounce("신라")).toBe("실라");
    expect(pronounce("칼날")).toBe("칼랄");
  });

  test("ㅎ탈락", () => {
    expect(pronounce("좋아")).toBe("조아");
    expect(pronounce("놓아")).toBe("노아");
  });

  test("비한글 문자 유지", () => {
    expect(pronounce("hello")).toBe("hello");
    expect(pronounce("123")).toBe("123");
  });
});
