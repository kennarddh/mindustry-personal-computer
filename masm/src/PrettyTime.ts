const scale = {
	w: 604800000000000n,
	d: 86400000000000n,
	h: 3600000000000n,
	m: 60000000000n,
	s: 1000000000n,
	ms: 1000000n,
	μs: 1000n,
	ns: 1n,
}

const PrettyTime = (duration: bigint) => {
	let num = duration

	let results = new Map<string, bigint>()

	for (const [unit, step] of Object.entries(scale)) {
		const value = num / step

		if (value === 0n) continue

		num -= value * step

		results.set(unit, value)
	}

	return [...results.entries()].map(result => `${result[1]}${result[0]}`).join(' ')
}

export default PrettyTime
