import { disassemble, disassembleHangul } from "../src/disassemble";

describe('disassemble', () => {
  test('한글이 아닌 값', () => {
    const result = disassemble('a');
    expect(result.cho).toBe('');
    expect(result.jung).toBe('');
    expect(result.jong).toBe('');
  });

  test('한', () => {
    const result = disassemble('한');
    expect(result.cho).toBe('ㅎ');
    expect(result.jung).toBe('ㅏ');
    expect(result.jong).toBe('ㄴ');
  });

  test('빵', () => {
    const result = disassemble('빵');
    expect(result.cho).toBe('ㅃ');
    expect(result.jung).toBe('ㅏ');
    expect(result.jong).toBe('ㅇ');
  });
});

describe('disassembleHangul', () => {
  it('should correctly disassemble a string of Hangul characters', () => {
    const input = '안녕하세요';
    const expectedOutput = [
      ['ㅇ', 'ㅏ', 'ㄴ'],
      ['ㄴ', 'ㅕ', 'ㅇ'],
      ['ㅎ', 'ㅏ'],
      ['ㅅ', 'ㅔ'],
      ['ㅇ', 'ㅛ'],
    ];

    const output = disassembleHangul(input);

    expect(output).toEqual(expectedOutput);
  });

  it('should handle an empty string', () => {
    const input = '';
    const expectedOutput: string[][] = [];

    const output = disassembleHangul(input);

    expect(output).toEqual(expectedOutput);
  });

  it('should handle a string with non-Hangul characters', () => {
    const input = 'Hello, 안녕하세요';
    const expectedOutput = [
      ['ㅇ', 'ㅏ', 'ㄴ'],
      ['ㄴ', 'ㅕ', 'ㅇ'],
      ['ㅎ', 'ㅏ'],
      ['ㅅ', 'ㅔ'],
      ['ㅇ', 'ㅛ'],
    ];

    const output = disassembleHangul(input);

    expect(output).toEqual(expectedOutput);
  });
});