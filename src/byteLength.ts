/**
 * 한글은 인코딩에 따라 글자당 바이트 수가 다르다.
 * SMS(90바이트), DB varchar, 입력 길이 제한 등을 다룰 때 필요하다.
 *
 * - utf8   — 한글 음절 3바이트, ASCII 1바이트
 * - euc-kr — 한글 음절 2바이트, ASCII 1바이트 (cp949 포함)
 */
export type ByteEncoding = "utf8" | "euc-kr";

/** 코드포인트 하나의 바이트 수 (UTF-8) */
function utf8ByteSize(codePoint: number): number {
  if (codePoint <= 0x7f) return 1;
  if (codePoint <= 0x7ff) return 2;
  if (codePoint <= 0xffff) return 3;
  return 4; // 이모지 등 BMP 밖 문자
}

/** 코드포인트 하나의 바이트 수 (EUC-KR / CP949) */
function eucKrByteSize(codePoint: number): number {
  if (codePoint <= 0x7f) return 1;
  // BMP 밖 문자는 EUC-KR로 표현할 수 없다. 대체 문자 2바이트로 셈한다.
  return 2;
}

function byteSizeOf(codePoint: number, encoding: ByteEncoding): number {
  return encoding === "euc-kr"
    ? eucKrByteSize(codePoint)
    : utf8ByteSize(codePoint);
}

/**
 * 문자열의 바이트 길이를 반환한다.
 *
 * @example getByteLength("한글") → 6           // utf8
 * @example getByteLength("한글", "euc-kr") → 4
 * @example getByteLength("abc") → 3
 */
export function getByteLength(
  text: string = "",
  encoding: ByteEncoding = "utf8"
): number {
  let bytes = 0;

  // 서로게이트 쌍을 한 글자로 세기 위해 코드포인트 단위로 순회한다.
  for (const char of text) {
    bytes += byteSizeOf(char.codePointAt(0)!, encoding);
  }

  return bytes;
}

/**
 * 바이트 길이를 기준으로 문자열을 자른다. 글자 중간에서 잘리지 않는다.
 *
 * @example sliceByByte("안녕하세요", 6) → "안녕"          // utf8, 한글 3바이트
 * @example sliceByByte("안녕하세요", 6, "euc-kr") → "안녕하"
 * @example sliceByByte("한글abc", 8) → "한글ab"
 */
export function sliceByByte(
  text: string = "",
  maxBytes: number,
  encoding: ByteEncoding = "utf8"
): string {
  if (maxBytes <= 0) return "";

  let bytes = 0;
  let result = "";

  for (const char of text) {
    const size = byteSizeOf(char.codePointAt(0)!, encoding);

    // 이 글자를 넣으면 넘친다 — 글자를 쪼개지 않고 여기서 멈춘다.
    if (bytes + size > maxBytes) break;

    bytes += size;
    result += char;
  }

  return result;
}
