// @mlog-skip

interface NamedBasicBuilding extends BasicBuilding, Nameable {}

export const DetermineMemoryBlockCapacity = (building: NamedBasicBuilding): MemoryCapacity => {
	if (building.size === 1) return 64
	if (building.size === 2) return 512

	return 64
}
