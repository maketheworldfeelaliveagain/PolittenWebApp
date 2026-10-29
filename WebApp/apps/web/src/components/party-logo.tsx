import type { parties } from '@/data/politten';

type Party = (typeof parties)[number];

export function PartyLogo({ party, size = 44 }: { party: Party; size?: number }) {
	return (
		<span className="party-logo" style={{ width: size, height: size }}>
			<img className="party-logo-image" src={party.logo} alt={`${party.name} logotipas`} loading="lazy" />
		</span>
	);
}
