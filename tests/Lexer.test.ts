import { Lexer, Token } from "@/Lexer";

test("instantiate lexer", () => {
  const lexer = new Lexer([]);
  expect(lexer).toBeInstanceOf(Lexer);
});

test("lex with no matchers", () => {
  const lexer = new Lexer([]);
  const tokens = [...lexer.lex("test input")];

  expect(tokens).toStrictEqual<Token[]>([
    { type: undefined, row: -1, col: -1 },
  ]);
});

test("lex with empty input", () => {
  const lexer = new Lexer([]);
  const tokens = [...lexer.lex("")];
});
