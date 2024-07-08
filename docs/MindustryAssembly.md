# Mindustry Assembly

-   Also called `MASM`
-   The file extension for `MASM` is `.masm`

## File Structures

```
ImmediateValue = <Double>
MemoryAddress = "[" <Max53BitsInteger> "]"
Register = RAX | RBX | RCX | RDX | RPX | RDX | RSI | RDI | RIP | IR | RSP | RBP | RFLAGS
Value = ImmediateValue | MemoryAddress  | Register
InCaseSensitiveOpcodeAbbreviation = <IncaseSensitiveOpcodes>
Comment = ";" <String>
Line = (InCaseSensitiveOpcodeAbbreviation Value ", " Value [Comment]) | <LineFeed>
Program = {Line}
```
