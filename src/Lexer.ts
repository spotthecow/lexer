import { Matcher } from "@/Matcher";

export type Token = {
  token_type: TokenType;
  text: string;
  span?: Span;
};

export type TokenType = "ident" | "no_match" | "whitespace" | "end";

export type Span = {
  start: Cell;
  end: Cell;
};

export type Cell = {
  row: number;
  col: number;
};

export type LexerState = {
  row: number;
  col: number;
  input: string;
  last_token?: Token;
};

export class Lexer {
  readonly matchers: Array<Matcher>;

  constructor(matchers: Array<Matcher>) {
    this.matchers = matchers;
  }

  *lex(input: string): Generator<Token> {
    const state: LexerState = {
      row: -1,
      col: -1,
      input,
      last_token: undefined,
    };

    if (input === "") {
      const token: Token = {
        token_type: "end",
        text: "",
      };
      state.last_token = token;

      yield token;
      return;
    }

    state.row = 0;
    state.col = 0;

    outer: while (state.col < input.length) {
      for (const matcher of this.matchers) {
        const match = matcher.match(input, state.col);
        if (match) {
          const start: Cell = { row: state.row, col: state.col };
          state.col += match.text.length; // not tracking multi-line spans yet
          const end: Cell = { row: state.row, col: state.col };
          const span: Span = { start, end };

          const token: Token = {
            token_type: match.token_type,
            text: match.text,
            span,
          };

          yield token;
          continue outer;
        }
      }
      // case: no matches
      const start: Cell = { row: state.row, col: state.col };
      state.col += 1;
      const end: Cell = { row: state.row, col: state.col };
      const span = { start, end };

      const token: Token = {
        token_type: "no_match",
        text: input.slice(state.col - 1),
        span,
      };

      yield token;
      break;
    }

    const token: Token = {
      token_type: "end",
      text: "",
    };

    yield token;
    return;
  }
}
