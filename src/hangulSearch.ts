import { makeRegexByCho } from "./includesByCho";
import { CHO_HANGUL } from "./constant";

const CHO_SET = new Set(CHO_HANGUL);

function hasChoChar(str: string): boolean {
  for (let i = 0; i < str.length; i++) {
    if (CHO_SET.has(str[i])) return true;
  }
  return false;
}

/** 정규식 메타문자를 이스케이프한다. */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** 검색어를 초성 검색 또는 리터럴 검색 정규식으로 만든다. */
function makeSearchRegex(search: string, flags: string = "g"): RegExp {
  const source = hasChoChar(search)
    ? makeRegexByCho(search).source
    : `(${escapeRegex(search)})`;

  return new RegExp(source, flags);
}

/**
 * 초성 검색을 포함한 한글 검색
 * @example hangulIncludes("프로그래밍", "ㅍㄹㄱ") → true
 * @example hangulIncludes("프로그래밍", "프로") → true
 */
export function hangulIncludes(word: string, search: string): boolean {
  if (!word || !search) return false;
  if (word.includes(search)) return true;

  if (hasChoChar(search)) {
    return makeRegexByCho(search).test(word);
  }

  return false;
}

/**
 * 초성 검색을 포함한 startsWith
 * @example hangulStartsWith("프로그래밍", "ㅍㄹ") → true
 */
export function hangulStartsWith(word: string, search: string): boolean {
  if (!word || !search) return false;
  if (word.startsWith(search)) return true;

  if (hasChoChar(search)) {
    return new RegExp("^" + makeRegexByCho(search).source).test(word);
  }

  return false;
}

/**
 * 초성 검색을 포함한 endsWith
 * @example hangulEndsWith("프로그래밍", "래밍") → true
 */
export function hangulEndsWith(word: string, search: string): boolean {
  if (!word || !search) return false;
  if (word.endsWith(search)) return true;

  if (hasChoChar(search)) {
    return new RegExp(makeRegexByCho(search).source + "$").test(word);
  }

  return false;
}

/**
 * 초성 검색으로 배열 필터링
 * @example hangulFilter(["사과", "바나나", "수박"], "ㅅ") → ["사과", "수박"]
 */
export function hangulFilter(list: string[], search: string): string[] {
  if (!search) return list;
  return list.filter((item) => hangulIncludes(item, search));
}

/**
 * 초성 검색으로 일치하는 부분을 하이라이트 정보 반환
 * @example hangulHighlight("프로그래밍", "ㅍㄹ") → { matched: true, ranges: [[0, 2]] }
 */
export function hangulHighlight(
  word: string,
  search: string
): { matched: boolean; ranges: [number, number][] } {
  if (!word || !search) return { matched: false, ranges: [] };

  const regex = makeSearchRegex(search, "g");

  const ranges: [number, number][] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(word)) !== null) {
    ranges.push([match.index, match.index + match[0].length]);

    // 빈 문자열에 매칭되면 lastIndex가 진행되지 않아 무한 루프가 된다.
    if (match[0].length === 0) regex.lastIndex++;
  }

  return { matched: ranges.length > 0, ranges };
}
