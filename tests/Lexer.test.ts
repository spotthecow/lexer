import { Lexer, Token } from "@/Lexer";
import { Matcher } from "@/Matcher";

test("instantiate lexer", () => {
  const lexer = new Lexer([]);
  expect(lexer).toBeInstanceOf(Lexer);
});

test("lex with empty input", () => {
  const lexer = new Lexer([]);
  const tokens = [...lexer.lex("")];

  expect(tokens).toStrictEqual<Token[]>([{ token_type: "end", text: "" }]);
});

test("lex by word", () => {
  const word_matcher = new Matcher(/\w+/, "ident");
  const whitespace_matcher = new Matcher(/\s+/, "whitespace");
  const lexer = new Lexer([word_matcher, whitespace_matcher]);
  const tokens = [...lexer.lex("hello world")];

  const hello: Token = {
    token_type: "ident",
    text: "hello",
    span: {
      start: { row: 0, col: 0 },
      end: { row: 0, col: 5 },
    },
  };

  const whitespace: Token = {
    token_type: "whitespace",
    text: " ",
    span: {
      start: { row: 0, col: 5 },
      end: { row: 0, col: 6 },
    },
  };

  const world: Token = {
    token_type: "ident",
    text: "world",
    span: {
      start: { row: 0, col: 6 },
      end: { row: 0, col: 11 },
    },
  };

  const end: Token = {
    token_type: "end",
    text: "",
  };

  expect(tokens).toStrictEqual<Token[]>([hello, whitespace, world, end]);
});

test("lex by word with unmatched token", () => {
  const word_matcher = new Matcher(/\w+/, "ident");
  const whitespace_matcher = new Matcher(/\s+/, "whitespace");
  const lexer = new Lexer([word_matcher, whitespace_matcher]);
  const tokens = [...lexer.lex("hello world!")];

  const hello: Token = {
    token_type: "ident",
    text: "hello",
    span: {
      start: { row: 0, col: 0 },
      end: { row: 0, col: 5 },
    },
  };

  const whitespace: Token = {
    token_type: "whitespace",
    text: " ",
    span: {
      start: { row: 0, col: 5 },
      end: { row: 0, col: 6 },
    },
  };

  const world: Token = {
    token_type: "ident",
    text: "world",
    span: {
      start: { row: 0, col: 6 },
      end: { row: 0, col: 11 },
    },
  };

  const exclamation: Token = {
    token_type: "no_match",
    text: "!",
    span: {
      start: { row: 0, col: 11 },
      end: { row: 0, col: 12 },
    },
  };

  const end: Token = {
    token_type: "end",
    text: "",
  };

  expect(tokens).toStrictEqual<Token[]>([
    hello,
    whitespace,
    world,
    exclamation,
    end,
  ]);
});

test("lex by word with long unmatched token", () => {
  const word_matcher = new Matcher(/\w+/, "ident");
  const whitespace_matcher = new Matcher(/\s+/, "whitespace");
  const lexer = new Lexer([word_matcher, whitespace_matcher]);
  const tokens = [...lexer.lex("hello world!abc!!")];

  const hello: Token = {
    token_type: "ident",
    text: "hello",
    span: {
      start: { row: 0, col: 0 },
      end: { row: 0, col: 5 },
    },
  };

  const whitespace: Token = {
    token_type: "whitespace",
    text: " ",
    span: {
      start: { row: 0, col: 5 },
      end: { row: 0, col: 6 },
    },
  };

  const world: Token = {
    token_type: "ident",
    text: "world",
    span: {
      start: { row: 0, col: 6 },
      end: { row: 0, col: 11 },
    },
  };

  const exclamation: Token = {
    token_type: "no_match",
    text: "!abc!!",
    span: {
      start: { row: 0, col: 11 },
      end: { row: 0, col: 12 },
    },
  };

  const end: Token = {
    token_type: "end",
    text: "",
  };

  expect(tokens).toStrictEqual<Token[]>([
    hello,
    whitespace,
    world,
    exclamation,
    end,
  ]);
});
