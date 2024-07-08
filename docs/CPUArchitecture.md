# CPU Architecture

## L1 Cache

-   512 Address
-   When the CPU needs to store more cache but there is no space left, the `CacheController` will randomly replace cached memory address with the new one

## Registers

> [!CAUTION]
> Registers such as `RIP`, `IR`, and `RFLAGS` are special and cannot be modified directly.

| Int | Type            | Abbreviation | Name                 | Description                                   |
| --- | --------------- | ------------ | -------------------- | --------------------------------------------- |
| 0   | General Purpose | RAX          | Accumulator          |                                               |
| 1   | General Purpose | RBX          | Base                 |                                               |
| 2   | General Purpose | RCX          | Counter              |                                               |
| 3   | General Purpose | RDX          | Data                 |                                               |
| 4   | General Purpose | RPX          | Pointer              |                                               |
| 5   | General Purpose | RVX          | Value                |                                               |
| 6   | Special         | RIP          | Instruction Pointer  | Store current instruction address             |
| 7   | Special         | IR           | Instruction Register | Store currently executed instruction          |
| 8   | Stack           | RSP          | Stack Pointer        | Store address to the top of the stack         |
| 9   | Stack           | RBP          | Frame Pointer        | Organize data within a function's stack frame |
| 10  | Special         | RFLAGS       | Flags Register       | Collections of status and control flags       |

### Flags Register

| Bit    | Abbreviation | Flag        | 1        | 0        |
| ------ | ------------ | ----------- | -------- | -------- |
| 0      | PF           | Parity Flag | Even     | Odd      |
| 1      | ZF           | Zero Flag   | Zero     | Not zero |
| 2      | SF           | Sign Flag   | Negative | Positive |
| 3 - 63 | Reserved     |

## Interrupt

-   512 ISR (IVT handlers)
-   64 IRQ lines
-   Higher priority number means higher priority

### IVT Layout

| Int       | Event Type          | Description                    | Priority      |
| --------- | ------------------- | ------------------------------ | ------------- |
| 0         | Processor Exception | Division by zero               | 100           |
| 1         | Processor Exception | Invalid Opcode                 | 100           |
| 2         | Processor Exception | Access to out of bounds memory | 100           |
| 3         | Processor Exception | Access to invalid register     | 100           |
| 4         | Processor Exception | Access to not ready IO port    | 100           |
| 5         | Processor Exception | Access to invalid IO port      | 100           |
| 6 - 63    | Processor Exception | Reserved                       |               |
| 64 - 127  | Hardware Interrupt  | Reserved for IRQ interrupts    | 50 + IRQIndex |
| 128 - 511 | Software Interrupt  | Software Interrupt             | 20            |

## Instruction Set

| Opcode | Type       | Abbreviation | Parameters                   | Description                                                                                                      |
| ------ | ---------- | ------------ | ---------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 0      | Math       | ADD          | [Destination] [Source]       | Performs addition. Destination = Destination + Source                                                            |
| 1      | Math       | SUB          | [Destination] [Source]       | Performs subtraction. Destination = Destination - Source                                                         |
| 2      | Math       | MUL          | [Destination] [Source]       | Performs multiplication. Destination = Destination \* Source                                                     |
| 3      | Math       | DIV          | [Destination] [Source]       | Performs division. Destination = Destination / Source                                                            |
| 4      | Math       | IDIV         | [Destination] [Source]       | Performs int division. Destination = Destination // Source                                                       |
| 5      | Math       | MOD          | [Destination] [Source]       | Performs modulo. Destination = Destination % Source                                                              |
| 6      | Math       | EXP          | [Destination] [Source]       | Performs exponent. Destination = Destination \*\* Source                                                         |
| 7      | Math       | EXPE         | [Destination]                | Performs exponent to the `e`. Destination = Destination \*\* `e`                                                 |
| 8      | Math       | LOG          | [Destination]                | Performs logarithm with base 10. Destination = log 10 (Destination)                                              |
| 9      | Math       | LOGN         | [Destination]                | Performs logarithm with base `e`. Destination = log e (Destination)                                              |
| 10     | Math       | SQRT         | [Destination]                | Performs square root. Destination = sqrt(Destination)                                                            |
| 11     | Math       | MAX          | [Destination] [Source]       | Performs max. Destination = max(Destination, Source)                                                             |
| 12     | Math       | MIN          | [Destination] [Source]       | Performs min. Destination = min(Destination, Source)                                                             |
| 13     | Math       | FLR          | [Destination]                | Performs floor. Destination = floor(Destination)                                                                 |
| 14     | Math       | CEIL         | [Destination]                | Performs ceil. Destination = ceil(Destination)                                                                   |
| 15     | Math       | ABS          | [Destination]                | Performs abs. Destination = abs(Destination)                                                                     |
| 16     | Math       | SIN          | [Destination]                | Performs sine. Destination = sin(Destination)                                                                    |
| 17     | Math       | COS          | [Destination]                | Performs cosine. Destination = cos(Destination)                                                                  |
| 18     | Math       | TAN          | [Destination]                | Performs tangent. Destination = tan(Destination)                                                                 |
| 19     | Math       | ASIN         | [Destination]                | Performs arc-sine. Destination = asin(Destination)                                                               |
| 20     | Math       | ACOS         | [Destination]                | Performs arc-cosine. Destination = acos(Destination)                                                             |
| 21     | Math       | ATAN         | [Destination]                | Performs arc-tangent. Destination = atan(Destination)                                                            |
| 22     | Math       | RAND         | [Destination]                | Performs float random from 0 to Destination. Destination = rand(0, Destination)                                  |
| 23     | Math       | INC          | [Destination]                | Increment by 1. Destination = Destination + 1                                                                    |
| 24     | Math       | DEC          | [Destination]                | Decrement by 1. Destination = Destination - 1                                                                    |
| 25     | Math       | CMP          | [Value1] [Value2]            | Performs `Value2` - `Value1`, set `SF`, `ZF`, `PF` flags and discard the result                                  |
| 26     | Bitwise    | AND          | [Destination] [Source]       | Performs bitwise `AND`. Destination = Destination & Source                                                       |
| 27     | Bitwise    | OR           | [Destination] [Source]       | Performs bitwise `OR`. Destination = Destination \| Source                                                       |
| 28     | Bitwise    | XOR          | [Destination] [Source]       | Performs bitwise `XOR`. Destination = Destination ^ Source                                                       |
| 29     | Bitwise    | NOT          | [Destination]                | Performs bitwise `NOT`. Destination = ~Destination                                                               |
| 30     | Bitwise    | SHL          | [Destination] [Source]       | Performs bitwise `ShiftLeft`. Destination = Destination << Source                                                |
| 31     | Bitwise    | SHR          | [Destination] [Source]       | Performs bitwise `ShiftRight`. Destination = Destination >> Source                                               |
| 32     | Bitwise    | TEST         | [Value1] [Value2]            | Performs `SUB` on operands, set `SF`, `ZF`, `PF` flags and discard the result                                    |
| 33     | ControFlow | CALL         | [Type] [Value]               | Push RIP and Call procedure. If type is 0, it's a relative address else absolute                                 |
| 34     | ControFlow | RET          | [Optional:HowManyToPopAfter] | Return from procedure. The argument is optional and defaults to 0                                                |
| 35     | ControFlow | HLT          |                              | Enter halt state                                                                                                 |
| 36     | ControFlow | IRET         |                              | Return from interrupt                                                                                            |
| 37     | ControFlow | JMP          | [Type] [Value]               | If type is 0, it's a relative address else absolute                                                              |
| 38     | ControFlow | JP           | [Type] [Value]               | Jump if parity. If type is 0, it's a relative address else absolute                                              |
| 39     | ControFlow | JNP          | [Type] [Value]               | Jump if not parity. If type is 0, it's a relative address else absolute                                          |
| 40     | ControFlow | JZ           | [Type] [Value]               | Jump if zero. If type is 0, it's a relative address else absolute                                                |
| 41     | ControFlow | JNZ          | [Type] [Value]               | Jump if not zero. If type is 0, it's a relative address else absolute                                            |
| 42     | ControFlow | JS           | [Type] [Value]               | Jump if sign. If type is 0, it's a relative address else absolute                                                |
| 43     | ControFlow | JNS          | [Type] [Value]               | Jump if not sign. If type is 0, it's a relative address else absolute                                            |
| 45     | ControFlow | JLE          | [Type] [Value]               | Jump if less than or equal. If type is 0, it's a relative address else absolute                                  |
| 47     | ControFlow | JGE          | [Type] [Value]               | Jump if greater than or equal. If type is 0, it's a relative address else absolute                               |
| 48     | ControFlow | LOOP         | [Type] [Value]               | Jump if RCX is not 0. If type is 0, it's a relative address else absolute                                        |
| 49     | Stack      | PUSH         | [Source]                     | Push to the top of the stack                                                                                     |
| 50     | Stack      | PUSHF        |                              | Push the RFLAGS register to the top of the stack                                                                 |
| 51     | Stack      | POP          | [Destination]                | Pop from the top of the stack                                                                                    |
| 52     | Stack      | POPF         |                              | Pop the RFLAGS register from the top of the stack                                                                |
| 53     | Data       | MOV          | [Destination] [Source]       | Copy from source to destination                                                                                  |
| 54     | Data       | CMOVP        | [Destination] [Source]       | Copy from source to destination if parity                                                                        |
| 55     | Data       | CMOVNP       | [Destination] [Source]       | Copy from source to destination if not parity                                                                    |
| 56     | Data       | CMOVZ        | [Destination] [Source]       | Copy from source to destination if zero                                                                          |
| 57     | Data       | CMOVNZ       | [Destination] [Source]       | Copy from source to destination if not zero                                                                      |
| 58     | Data       | CMOVS        | [Destination] [Source]       | Copy from source to destination if sign                                                                          |
| 59     | Data       | CMOVNS       | [Destination] [Source]       | Copy from source to destination if not sign                                                                      |
| 60     | Data       | CMOVLE       | [Destination] [Source]       | Copy from source to destination if less than or equal                                                            |
| 61     | Data       | CMOVGE       | [Destination] [Source]       | Copy from source to destination if greater than or equal                                                         |
| 62     | Data       | SWP          | [Register1] [Register2]      | Swap values with each other                                                                                      |
| 63     | Interrupt  | SETISR       | [InteruptNumber] [Address]   | Set ISR absolute address for an interrupt                                                                        |
| 64     | Interrupt  | INT          | [InteruptNumber]             | Generate a software interrupt. Software should not and cannot generate `Processor Exception` interrupt directly. |
| 65     | Other      | NOP          |                              | No operation                                                                                                     |
| 66     | Other      | CPUID        | [Key]                        | Get information about the CPU, see [CPUID](#cpuid)                                                               |
| 67     | IO         | IN           | [Destination] [Port]         | Read data from IO port and set the inbound ready flag to 0                                                       |
| 68     | IO         | OUT          | [Source] [Port]              | Write data to IO port and set the outbound ready flag to 1                                                       |
| 69     | IO         | INR          | [Destination] [Port]         | Store IO port's inbound data ready flag into register                                                            |
| 70     | IO         | OUTR         | [Destination] [Port]         | Store IO port's outbound data ready flag into register                                                           |

## CPUID

| Key | Description                                                                                                                                                                   |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0   | Write CPU vendor encoded as [`SMCE`](./StandardMindustryCharacterEncoding.md) to stack, the first character will be on top of the stack and write the string length to RAX    |
| 1   | Write CPU vendor id to RAX                                                                                                                                                    |
| 2   | Write CPU full name encoded as [`SMCE`](./StandardMindustryCharacterEncoding.md) to stack, the first character will be on top of the stack and write the string length to RAX |
| 3   | Write CPU id to RAX. Multiple vendor might have the same CPU id.                                                                                                              |

## Instruction Encoding

-   All instructions has same and fixed length
-   128 bits long

> [!CAUTION]
> For some instruction that assign's result to the first value container. If the first value is not a register or memory address it will create an undefined behaviour.
> The CPU does **not** do any check for better performance.
> The CPU assume code is correct

| Bits Range | Total Different Values | Type           | Description                                                                                 |
| ---------- | ---------------------- | -------------- | ------------------------------------------------------------------------------------------- |
| 0 - 7      | 256                    | Unsigned Byte  | Opcode                                                                                      |
| 8 - 15     | 256                    | Unsigned Short | InKind for FirstValue. Where to get value from. 0: Register, 1: Memory, 2: Immediate value  |
| 16 - 31    | 65535                  | Unsigned Short | FirstValue                                                                                  |
| 32 - 44    |                        |                | Reserved                                                                                    |
| 45 - 52    | 256                    | Unsigned Short | InKind for SecondValue. Where to get value from. 0: Register, 1: Memory, 2: Immediate value |
| 64 - 127   | 2^64                   | Signed Double  | SecondValue                                                                                 |

## IO

-   Every port support duplex data transfer
-   There are 128 ports
-   Each port will have 64 bit inbound and outbound data
-   There is data ready flag for each inbound and outbound
-   Outbound means from CPU to device and inbound means from device to CPU
-   When either `in` or `out` instruction is used but the data ready flag is 0 for the corresponding flag the CPU will generates a `Processor Exception` interrupt 5

## TODO

-   [x] IO Instructions
-   [x] Interrupt Prioritization
-   [ ] Interrupt Masking
-   [x] CPUID instructions
-   [x] CMOVCC instruction
-   [x] Cache eviction policy?
-   [ ] IRQ priority should be configurable
-   [ ] Queued interrupt

## Notes

-   If CPU get interrupt when another interrupt is running it will put it in a prioritized queue based on the interrupt priority or discard it (easier, bad)
-   If CPU get interrupt that currently masked it should be queued until it's no longer masked
-   Currently if the CPU gets a lower priority interrupt when running another interrupt it will discard the new one
