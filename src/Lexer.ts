export class Lexer {
  rules: Array<RegExp>;

  constructor(matchers: Array<RegExp>) {
    this.rules = matchers;
  }

  *lex(input: string): Generator<Token, Token> {
    let state: LexerState = { row: -1, col: -1, input };

    yield {
      type: undefined,
      row: -1,
      col: -1,
    };

    return {
      type: undefined,
      row: -1,
      col: -1,
    };
  }
}

export type Token = {
  type: TokenType;
  row: number;
  col: number;
};

export type TokenType = "ident" | "no_match" | "end" | undefined;

type LexerState = {
  row: number;
  col: number;
  input: string;
};
