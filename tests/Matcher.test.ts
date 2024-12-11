import { Match, Matcher } from "@/Matcher";

test("instantiate matcher", () => {
  const matcher = new Matcher(/./, "end");
  expect(matcher).toBeInstanceOf(Matcher);
});

test("match failure returns null", () => {
  const matcher = new Matcher(/./, "end");
  const match = matcher.match("");

  expect(match).toBeNull();
});

test("match word", () => {
  const matcher = new Matcher(/\w+/, "ident");
  const match = matcher.match("hello world!");

  expect(match).toStrictEqual<Match>({
    text: "hello",
    token_type: "ident",
  });
});
