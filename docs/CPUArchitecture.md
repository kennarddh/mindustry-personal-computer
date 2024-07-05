# CPU Architecture

## L1 Cache

-   512 Address

## Registers

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

### IVT Layout

| Int       | Event Type          | Description                    |
| --------- | ------------------- | ------------------------------ |
| 0         | Processor Exception | Division by zero               |
| 1         | Processor Exception | Invalid Opcode                 |
| 2         | Processor Exception | Access to out of bounds memory |
| 3         | Processor Exception | Access to invalid register     |
| 4         | Processor Exception | Access to not ready IO port    |
| 5         | Processor Exception | Access to invalid IO port      |
| 6 - 63    | Processor Exception | Reserved                       |
| 64 - 127  | Hardware Interrupt  | Reserved for IRQ interrupts    |
| 128 - 511 | Software Interrupt  | Software Interrupt             |

## Instruction Set

| Opcode | Type       | Abbreviation | Parameters                                | Description                                                                                             |
| ------ | ---------- | ------------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 0      | Math       | ADD          | [Destination:Register] [Source:Register]  | Performs addition. Destination = Destination + Source                                                   |
| 1      | Math       | SUB          | [Destination:Register] [Source:Register]  | Performs subtraction. Destination = Destination - Source                                                |
| 2      | Math       | MUL          | [Destination:Register] [Source:Register]  | Performs multiplication. Destination = Destination \* Source                                            |
| 3      | Math       | DIV          | [Destination:Register] [Source:Register]  | Performs division. Destination = Destination / Source                                                   |
| 4      | Math       | IDIV         | [Destination:Register] [Source:Register]  | Performs int division. Destination = Destination // Source                                              |
| 5      | Math       | MOD          | [Destination:Register] [Source:Register]  | Performs modulo. Destination = Destination % Source                                                     |
| 6      | Math       | EXP          | [Destination:Register] [Source:Register]  | Performs exponent. Destination = Destination \*\* Source                                                |
| 7      | Math       | EXPE         | [Destination:Register]                    | Performs exponent to the `e`. Destination = Destination \*\* `e`                                        |
| 8      | Math       | LOG          | [Destination:Register]                    | Performs logarithm with base 10. Destination = log 10 (Destination)                                     |
| 9      | Math       | LOGN         | [Destination:Register]                    | Performs logarithm with base `e`. Destination = log e (Destination)                                     |
| 10     | Math       | SQRT         | [Destination:Register]                    | Performs square root. Destination = sqrt(Destination)                                                   |
| 11     | Math       | MAX          | [Destination:Register] [Source:Register]  | Performs max. Destination = max(Destination, Source)                                                    |
| 12     | Math       | MIN          | [Destination:Register] [Source:Register]  | Performs min. Destination = min(Destination, Source)                                                    |
| 13     | Math       | FLR          | [Destination:Register]                    | Performs floor. Destination = floor(Destination)                                                        |
| 14     | Math       | CEIL         | [Destination:Register]                    | Performs ceil. Destination = ceil(Destination)                                                          |
| 15     | Math       | ABS          | [Destination:Register]                    | Performs abs. Destination = abs(Destination)                                                            |
| 16     | Math       | SIN          | [Destination:Register]                    | Performs sine. Destination = sin(Destination)                                                           |
| 17     | Math       | COS          | [Destination:Register]                    | Performs cosine. Destination = cos(Destination)                                                         |
| 18     | Math       | TAN          | [Destination:Register]                    | Performs tangent. Destination = tan(Destination)                                                        |
| 19     | Math       | ASIN         | [Destination:Register]                    | Performs arc-sine. Destination = asin(Destination)                                                      |
| 20     | Math       | ACOS         | [Destination:Register]                    | Performs arc-cosine. Destination = acos(Destination)                                                    |
| 21     | Math       | ATAN         | [Destination:Register]                    | Performs arc-tangent. Destination = atan(Destination)                                                   |
| 22     | Math       | RAND         | [Destination:Register]                    | Performs float random from 0 to Destination. Destination = rand(0, Destination)                         |
| 23     | Math       | INC          | [Destination:Register]                    | Increment by 1. Destination = Destination + 1                                                           |
| 24     | Math       | DEC          | [Destination:Register]                    | Decrement by 1. Destination = Destination - 1                                                           |
| 25     | Math       | CMP          | [Value1:Register] [Value2:Register]       | Performs `Value2` - `Value1`, set `SF`, `ZF`, `PF` flags and discard the result                         |
| 26     | Bitwise    | AND          | [Destination:Register] [Source:Register]  | Performs bitwise `AND`. Destination = Destination & Source                                              |
| 27     | Bitwise    | OR           | [Destination:Register] [Source:Register]  | Performs bitwise `OR`. Destination = Destination \| Source                                              |
| 28     | Bitwise    | XOR          | [Destination:Register] [Source:Register]  | Performs bitwise `XOR`. Destination = Destination ^ Source                                              |
| 29     | Bitwise    | NOT          | [Destination:Register]                    | Performs bitwise `NOT`. Destination = ~Destination                                                      |
| 30     | Bitwise    | SHL          | [Destination:Register] [Source:Register]  | Performs bitwise `ShiftLeft`. Destination = Destination << Source                                       |
| 31     | Bitwise    | SHR          | [Destination:Register] [Source:Register]  | Performs bitwise `ShiftRight`. Destination = Destination >> Source                                      |
| 32     | Bitwise    | TEST         | [Value1:Register] [Value2:Register]       | Performs `SUB` on operands, set `SF`, `ZF`, `PF` flags and discard the result                           |
| 33     | ControFlow | CALL         | [Type:Byte] [Value:Register]              | Push RIP and Call procedure. If type is 0, it's a relative address else absolute                        |
| 34     | ControFlow | RET          | [O:HowManyToPopAfter:Register]            | Return from procedure. The argument is optional and defaults to 0                                       |
| 35     | ControFlow | HLT          |                                           | Enter halt state                                                                                        |
| 36     | ControFlow | IRET         |                                           | Return from interrupt                                                                                   |
| 37     | ControFlow | JMP          | [Type:Byte] [Value:Register]              | If type is 0, it's a relative address else absolute                                                     |
| 38     | ControFlow | JP           | [Type:Byte] [Value:Register]              | Jump if parity. If type is 0, it's a relative address else absolute                                     |
| 39     | ControFlow | JNP          | [Type:Byte] [Value:Register]              | Jump if not parity. If type is 0, it's a relative address else absolute                                 |
| 40     | ControFlow | JZ           | [Type:Byte] [Value:Register]              | Jump if zero. If type is 0, it's a relative address else absolute                                       |
| 41     | ControFlow | JNZ          | [Type:Byte] [Value:Register]              | Jump if not zero. If type is 0, it's a relative address else absolute                                   |
| 42     | ControFlow | JS           | [Type:Byte] [Value:Register]              | Jump if sign. If type is 0, it's a relative address else absolute                                       |
| 43     | ControFlow | JNS          | [Type:Byte] [Value:Register]              | Jump if not sign. If type is 0, it's a relative address else absolute                                   |
| 44     | ControFlow | JL           | [Type:Byte] [Value:Register]              | Jump if less than. If type is 0, it's a relative address else absolute                                  |
| 45     | ControFlow | JLE          | [Type:Byte] [Value:Register]              | Jump if less than or equal. If type is 0, it's a relative address else absolute                         |
| 46     | ControFlow | JG           | [Type:Byte] [Value:Register]              | Jump if greater than. If type is 0, it's a relative address else absolute                               |
| 47     | ControFlow | JGE          | [Type:Byte] [Value:Register]              | Jump if greater than or equal. If type is 0, it's a relative address else absolute                      |
| 48     | ControFlow | LOOP         | [Type:Byte] [Value:Register]              | Jump if RCX is not 0. If type is 0, it's a relative address else absolute                               |
| 49     | Stack      | PUSH         | [Source:Register]                         | Push to the top of the stack                                                                            |
| 50     | Stack      | PUSHF        |                                           | Push the RFLAGS register to the top of the stack                                                        |
| 51     | Stack      | POP          | [Destination:Register]                    | Pop from the top of the stack                                                                           |
| 52     | Stack      | POPF         |                                           | Pop the RFLAGS register from the top of the stack                                                       |
| 53     | Data       | MOV          | [Destination:Register] [Source:Register]  | Copy data from one register to another                                                                  |
| 54     | Data       | SWP          | [Register1:Register] [Register2:Register] | Swap two registers with each other                                                                      |
| 55     | Data       | LOAD         | [Type:Byte] [Destination:Register]        | Load from memory address stored in the destination register itself and load memory to the same register |
| 56     | Data       | STRR         | [Destination:Register] [Source:Register]  | Store register to relative memory address stored in register                                            |
| 57     | Data       | STRA         | [Destination:Register] [Source:Register]  | Store register to absolute memory address stored in register                                            |
| 58     | Data       | LDI          | [Destination:Register] [Source:Number]    | Load immediate value to destination register                                                            |
| 59     | Data       | RIP          | [Destination:Register]                    | Load `Instruction Pointer` special register to destination register                                     |
| 60     | Interrupt  | SETISRR      | [InterruptVector:Byte] [Address:Register] | Set ISR relative address from register for an interrupt vector                                          |
| 61     | Interrupt  | SETISRA      | [InterruptVector:Byte] [Address:Register] | Set ISR absolute address from register for an interrupt vector                                          |
| 62     | Interrupt  | INT          | [InteruptVector:Register]                 | Call to interrupt.                                                                                      |
| 63     | Other      | NOP          |                                           | No operation                                                                                            |
| 64     | IO         | IN           | [Destination:Register] [Port:Register]    | Read data from IO port and set the inbound ready flag to 0                                              |
| 65     | IO         | OUT          | [Source:Register] [Port:Register]         | Write data to IO port and set the outbound ready flag to 1                                              |
| 66     | IO         | INR          | [Destination:Register] [Port:Register]    | Store IO port's inbound data ready flag into register                                                   |
| 67     | IO         | OUTR         | [Destination:Register] [Port:Register]    | Store IO port's outbound data ready flag into register                                                  |

## Instruction Encoding

-   All instructions has same and fixed length
-   128 bits long

| Bits Range | Total Different Values | Type           | Description  |
| ---------- | ---------------------- | -------------- | ------------ |
| 0 - 7      | 256                    | Unsigned Byte  | Opcode       |
| 8 - 23     | 65535                  | Unsigned Short | First value  |
| 14 - 63    |                        |                | Reserved     |
| 64 - 127   | 2^64                   | Signed Double  | Second value |

## IO

-   Every port support duplex data transfer
-   There are 128 ports
-   Each port will have 64 bit inbound and outbound data
-   There is data ready flag for each inbound and outbound
-   Outbound means from cpu to device and inbound means from device to cpu
-   When either `in` or `out` instruction is used but the data ready flag is 0 for the corresponding flag the cpu will interrupt with vector 5

## TODO

-   [ ] IO Instructions
-   [ ] Pipelining
-   [ ] Interrupt Prioritization
-   [ ] Interrupt Masking
-   [ ] CPUID instructions
-   [ ] CMOVCC instruction?
-   [ ] Cache eviction policy?
-   [ ] IRQ priority should be configurable

## Notes

-   If cpu get interrupt when another interrupt is running it will put it in a prioritized queue based on the interrupt priority or discard it (easier, bad)
-   If cpu get interrupt that currently masked it should be queued until it's no longer masked
