import { KarmaIndexClient } from '@/components/KarmaIndexClient';
import { deeds, users } from '@/lib/data';
import { Sparkles } from 'lucide-react';

export default function KarmaIndexPage() {
    const verifiedDeedsCount = deeds.filter(d => d.isVerified).length;
    const recentDeedsList = deeds.slice(0, 5).map(d => d.description).join('; ');
    const activeUsersCount = users.length;
  
    return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-primary via-accent to-primary">
                Global Karma Index
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
                A reflection of our collective kindness. Generate AI-powered insights based on community actions.
            </p>
        </div>
        <KarmaIndexClient
            verifiedDeedsCount={verifiedDeedsCount}
            recentDeeds={recentDeedsList}
            activeUsersCount={activeUsersCount}
        />
    </div>
  );
}
