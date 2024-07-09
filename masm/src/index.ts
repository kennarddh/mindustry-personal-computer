import Compiler from 'Compiler'

const compiler = new Compiler()

const code = `mov RAX, 10  ; load 10 to RAX
mov RDX, 20   
add RAX,  rDX ; add value
add RAX,  rDX ; add value
ADD rax, 1   0 ; add 10 to RAX
mov [255], RaX ; store result to memory address 255
`

const result = compiler.compile(code)

console.log(
	result.buffer
		.toString('hex')
		.match(/.{1,32}/g)
		?.map(each => each.match(/.{1,2}/g)?.join(' '))
		?.join('\n'),
)
