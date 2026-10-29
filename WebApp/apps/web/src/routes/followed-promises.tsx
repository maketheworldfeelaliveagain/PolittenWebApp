import { Link } from 'react-router';
import type { Route } from './+types/followed-promises';
import { promises } from '@/data/politten';
import { PromiseList } from '@/components/promises/promise-list';
import { useFollowedPromises } from '@/hooks/use-followed-promises';
import { seo } from '@/lib/seo';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'Sekami pažadai – Politten',
    description: 'Jūsų sekamų pažadų sąrašas.',
    image: '/social.svg',
  });
}

export default function FollowedPromisesPage() {
  const { followedIds, isReady } = useFollowedPromises();
  const followedPromises = promises.filter((promise) => followedIds.includes(promise.id));

  return (
    <main className="page-shell">
      <div className="page-intro">
        <p className="eyebrow">JŪSŲ SĄRAŠAS</p>
        <h1>Sekami pažadai.</h1>
        <p>Čia rasite pažadus, kuriuos pasirinkote sekti šiame įrenginyje.</p>
      </div>
      {!isReady ? (
        <p className="empty-state" aria-live="polite">Įkeliami sekami pažadai…</p>
      ) : followedPromises.length ? (
        <PromiseList items={followedPromises} />
      ) : (
        <div className="followed-empty">
          <p className="empty-state">Kol kas nesekate jokių pažadų.</p>
          <Link className="primary-button" to="/pazadai">Naršyti pažadus</Link>
        </div>
      )}
    </main>
  );
}
