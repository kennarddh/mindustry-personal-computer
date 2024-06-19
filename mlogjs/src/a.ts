// @mlog-skip

export const x = { x: 1 }

export const func = () => {
	draw.image({ x: Math.PI * x.x, y: 0, image: Units.aegires, size: 100, rotation: 0 })
}
