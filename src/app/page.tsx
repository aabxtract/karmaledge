import { DeedCard } from '@/components/DeedCard';
import { deeds, users } from '@/lib/data';
import type { Deed, User } from '@/lib/types';

interface PopulatedDeed extends Deed {
  user: User;
}

export default function Home() {
  const populatedDeeds: PopulatedDeed[] = deeds
    .map(deed => ({
      ...deed,
      user: users.find(u => u.id === deed.submittedBy)!,
    }))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-accent">
          Karma Ledger
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          A chronicle of kindness, verified on the chain of humanity.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {populatedDeeds.map(deed => (
          <DeedCard key={deed.id} deed={deed} />
        ))}
      </div>
    </div>
  );
}
