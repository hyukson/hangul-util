import { toBanmal, toHonorific } from "../src/banmal";

describe("toHonorific", () => {
  test("반말 -> 높임말", () => {
    expect(toHonorific("오늘은 사과이다.")).toEqual("오늘은 사과입니다.");
    expect(toHonorific("내일은 자두이다.")).toEqual("내일은 자두입니다.");
    expect(toHonorific("내가 먹을 사과이다.")).toEqual("내가 먹을 사과입니다.");
    expect(toHonorific("나는 친구와 함께 간다.")).toEqual(
      "저는 친구와 함께 갑니다."
    );
    expect(toHonorific("어제는 비가 왔다.")).toEqual("어제는 비가 왔습니다.");
    expect(toHonorific("나는, 사람이다.")).toEqual("저는, 사람입니다.");
  });
});

describe("toBanmal", () => {
  test("높임말 -> 반말", () => {
    expect(toBanmal("사람이 없습니다.")).toEqual("사람이 없다.");
    expect(toBanmal("하겠습니다.")).toEqual("하겠다.");
    expect(toBanmal("다가옵니다.")).toEqual("다가온다.");
    expect(toBanmal("필수입니다.")).toEqual("필수이다.");
    expect(toBanmal("생깁니다.")).toEqual("생긴다.");
    expect(toBanmal("않습니다.")).toEqual("않다.");
    expect(toBanmal("보겠습니다.")).toEqual("보겠다.");
    expect(toBanmal("하였습니다.")).toEqual("하였다.");
    expect(toBanmal("가능합니다.")).toEqual("가능하다.");
    expect(toBanmal("중요합니다.")).toEqual("중요하다.");
    expect(toBanmal("하십니다.")).toEqual("하신다.");
    expect(toBanmal("바랍니다.")).toEqual("바란다.");
    expect(toBanmal("나옵니다.")).toEqual("나온다.");
    expect(toBanmal("했습니다.")).toEqual("했다.");
    expect(toBanmal("봤습니다.")).toEqual("봤다.");
    expect(toBanmal("쳤습니다.")).toEqual("쳤다.");
    expect(toBanmal("쌌습니다.")).toEqual("쌌다.");
    expect(toBanmal("해주세요.")).toEqual("해라.");
    expect(toBanmal("샀습니다.")).toEqual("샀다.");
    expect(toBanmal("었습니다.")).toEqual("었다.");
    expect(toBanmal("먹습니다.")).toEqual("먹다.");
    expect(toBanmal("있습니다.")).toEqual("있다.");
    expect(toBanmal("좋습니다.")).toEqual("좋다.");
    expect(toBanmal("많습니다.")).toEqual("많다.");
    expect(toBanmal("놓았습니다.")).toEqual("놓았다.");
    expect(toBanmal("어렵습니다.")).toEqual("어렵다.");
    expect(toBanmal("주워주세요.")).toEqual("주워라.");
  });
});
