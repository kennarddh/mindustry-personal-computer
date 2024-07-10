# Mindustry Assembly

-   Also called `MASM`
-   The file extension for `MASM` is `.masm`

## File Structures

-   Any sequence of characters given in single-quotes and monospace font denote a terminal sequence;
-   Special terminal sequences that needs specification are given in angle brackets: <…>;
-   Normal parentheses are used sparingly to specify priority between other operations;
-   A sequence of rules `A` and `B`: `(A B)`;
-   Choice between rules `A` and `B`: `(A | B)`;
-   Optional use of rule A: `[A]`;
-   Repetition of rule `A`: `{A}`.

```
UnsignedShortImmediateValue = <UnsignedShort>
DoubleImmediateValue = <Double>
MemoryAddress = "[" <53BitsSignedInteger> "]"
Register = RAX | RBX | RCX | RDX | RPX | RDX | RSI | RDI | RIP | IR | RSP | RBP | RFLAGS
Value1 = UnsignedShortImmediateValue | MemoryAddress  | (CaseInsestive:Register)
Value2 = ImmediateValue | MemoryAddress  | (CaseInsestive:Register)
CaseInsensitiveOpcodeAbbreviation = <caseInsensitiveOpcodes>
Comment = ";" <String>
Line = (CaseInsensitiveOpcodeAbbreviation Value1 ", " Value2 [Comment]) | <LineFeed>
Program = {Line}
```
