import { CronoScriptLexer } from './antlr/TSparser/CronoScriptLexer';
import { CronoScriptParser } from './antlr/TSparser/CronoScriptParser';
import { CharStream, CharStreams, CommonTokenStream } from 'antlr4ts';
import { CronoScriptVisitorImpl } from './utils/CronoScriptVisitorImpl';

console.clear();
console.log('🐊 CronoScript compiler\n');

export default function compile(input: string): string {
    const inputStream: CharStream = CharStreams.fromString(input);
    const lexer: CronoScriptLexer = new CronoScriptLexer(inputStream);
    const tokenStream: CommonTokenStream = new CommonTokenStream(lexer);
    const parser: CronoScriptParser = new CronoScriptParser(tokenStream);
    const tree = parser.cronodile();
    const visitor = new CronoScriptVisitorImpl();
    const result = visitor.visit(tree);
    return JSON.stringify(result, null, 2)
}

