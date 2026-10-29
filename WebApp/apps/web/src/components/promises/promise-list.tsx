import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { parties, type PromiseItem } from '@/data/politten';
import { StatusIndicator } from '@/components/status-indicator';
import { FollowPromiseButton } from '@/components/promises/follow-promise-button';
export function PromiseList({ items }: { items: PromiseItem[] }) {
	return (
		<div className="promise-list">
			<div className="list-labels">
				<span>PAŽADAS / PARTIJA</span>
				<span>SRITIS</span>
				<span>DEMONSTRACINĖ BŪSENA</span>
			</div>
			{items.length === 0 ? (
				<p className="empty-state">Pažadų pagal pasirinktus filtrus nerasta. Pabandykite kitus kriterijus.</p>
			) : items.map((promise) => (
				<div className="promise-row" key={promise.id}>
					<Link className="promise-row-main" to={`/pazadai/${promise.id}`}>
						<span className="fiction-label">PAŽADAS · {promise.id.toUpperCase()}</span>
						<h2>{promise.summary}</h2>
						<p>{parties.find((party) => party.id === promise.partyId)?.name}</p>
					</Link>
					<span className="category-label">{promise.category}</span>
					<div className="promise-row-actions">
						<StatusIndicator status={promise.status} />
						<FollowPromiseButton promiseId={promise.id} compact />
						<Link className="row-arrow" to={`/pazadai/${promise.id}`} aria-label={`Peržiūrėti pažadą: ${promise.summary}`}>
							<ArrowUpRight size={19} />
						</Link>
					</div>
				</div>
			))}
		</div>
	);
}
