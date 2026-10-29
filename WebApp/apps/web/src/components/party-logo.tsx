import type { parties } from '@/data/politten';

type Party = (typeof parties)[number];

/**
 * Stylized monogram badge — a distinctive, copyright-safe mark built from each
 * party's accent color and abbreviation. Not the official party logo.
 */
export function PartyLogo({ party, size = 44 }: { party: Party; size?: number }) {
	return (
		<span
			className="party-logo"
			style={
				{
					width: size,
					height: size,
					background: party.color,
					'--logo-size': `${Math.round(size * 0.34)}px`,
				} as React.CSSProperties
			}
			aria-hidden="true"
		>
			<span className="party-logo-mark">{party.monogram}</span>
			<span className="party-logo-dot" />
		</span>
	);
}
