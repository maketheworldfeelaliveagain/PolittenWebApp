import type { CSSProperties } from 'react';
import type { PromiseItem } from '@/data/politten';

const dateFormatter = new Intl.DateTimeFormat('lt-LT', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export function StatusProgressHistory({ history, accentColor }: { history: PromiseItem['statusHistory']; accentColor: string }) {
  const currentProgress = history.at(-1)?.percent ?? 0;

  return (
    <section className="status-history" aria-label="Pažado būsenos istorija" style={{ '--history-accent': accentColor } as CSSProperties}>
      <div
        className="history-track"
        role="img"
        aria-label={`Pažanga ${currentProgress} procentų iš 100`}
      >
        <div className="history-track-fill" style={{ width: `${currentProgress}%` }} />
        {history.map((checkpoint) => (
          <span
            className="history-marker"
            key={`${checkpoint.percent}-${checkpoint.reachedAt}`}
            style={{ left: `${checkpoint.percent}%` }}
          />
        ))}
      </div>
      <div className="history-scale" aria-hidden="true"><span>0%</span><span>100%</span></div>
      <ol className="history-checkpoints">
        {history.map((checkpoint) => (
          <li key={`${checkpoint.percent}-${checkpoint.reachedAt}`}>
            <span className="history-checkpoint-dot" />
            <div>
              <strong>{checkpoint.label} · {checkpoint.percent}%</strong>
              <time dateTime={checkpoint.reachedAt}>
                {dateFormatter.format(new Date(`${checkpoint.reachedAt}T00:00:00Z`))}
              </time>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
