import { TokenType } from "@/Lexer";

export type Match = {
  text: string;
  token_type: TokenType;
};

export class Matcher {
  private readonly regex: RegExp;
  private readonly token_type: TokenType;

  constructor(regex: RegExp, token_type: TokenType) {
    this.regex = RegExp(regex, "y");
    this.token_type = token_type;
  }

  match(input: string, last_index?: number): Match | null {
    this.regex.lastIndex = last_index ?? 0;
    const match = this.regex.exec(input);
    if (match) {
      return {
        text: match[0],
        token_type: this.token_type,
      };
    } else {
      return null;
    }
  }
}
