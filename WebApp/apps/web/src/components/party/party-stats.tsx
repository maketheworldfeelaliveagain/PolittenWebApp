import type { PromiseItem } from '@/data/politten';

export function PartyStats({ items }: { items: PromiseItem[] }) {
	const total = items.length;
	const completed = items.filter((p) => p.status.percent === 100 || p.status.percent === 50).length;
	const avg = total === 0 ? 0 : Math.round(items.reduce((s, p) => s + p.status.percent, 0) / total);
	return (
		<section className="party-stats" aria-label="Partijos pažadų statistika">
			<div className="party-stat">
				<span className="party-stat-label">Viso pažadų</span>
				<span className="party-stat-value">{total}</span>
			</div>
			<div className="party-stat party-stat-accent">
				<span className="party-stat-label">Įvykdyti</span>
				<span className="party-stat-value">{completed}</span>
			</div>
			<div className="party-stat party-stat-progress">
				<span className="party-stat-label">Vidutinė pažanga</span>
				<div className="party-stat-bar">
					<div className="party-stat-bar-track">
						<div style={{ width: `${avg}%` }} />
					</div>
					<span className="party-stat-value">{avg}%</span>
				</div>
			</div>
		</section>
	);
}
