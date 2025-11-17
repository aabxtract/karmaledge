'use client';

import { useState, useTransition } from 'react';
import { getKarmaSuggestion } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Skeleton } from './ui/skeleton';

type KarmaIndexClientProps = {
    verifiedDeedsCount: number;
    recentDeeds: string;
    activeUsersCount: number;
};

export function KarmaIndexClient({
    verifiedDeedsCount,
    recentDeeds,
    activeUsersCount
}: KarmaIndexClientProps) {
  const [isPending, startTransition] = useTransition();
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetSuggestion = () => {
    startTransition(async () => {
      setError(null);
      setSuggestion(null);
      const result = await getKarmaSuggestion({
        verifiedDeedsCount,
        recentdeeds: recentDeeds,
        activeUsersCount,
      });

      if (result.success) {
        setSuggestion(result.suggestion);
      } else {
        setError(result.error || 'An unknown error occurred.');
      }
    });
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Community Insights</CardTitle>
        <CardDescription>Current snapshot of our collective harmony.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-background/50">
                <p className="text-3xl font-bold text-primary">{verifiedDeedsCount}</p>
                <p className="text-sm text-muted-foreground">Verified Deeds</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
                <p className="text-3xl font-bold text-accent-foreground">{activeUsersCount}</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
                <p className="text-3xl font-bold text-primary">{(verifiedDeedsCount / activeUsersCount).toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Deeds per Member</p>
            </div>
        </div>
        
        <div className="text-center">
            <Button onClick={handleGetSuggestion} disabled={isPending} size="lg" className="shadow-lg">
              <Sparkles className="mr-2 h-4 w-4" />
              {isPending ? 'Generating Insight...' : 'Generate AI Suggestion'}
            </Button>
        </div>

        {isPending && (
            <div className="space-y-2 pt-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        )}

        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {suggestion && (
            <div className="pt-4">
                <Alert className="bg-primary/10 border-primary/20 text-primary-foreground">
                    <Sparkles className="h-4 w-4 !text-primary" />
                    <AlertTitle className="text-primary font-bold">AI-Powered Suggestion</AlertTitle>
                    <AlertDescription className="text-foreground/90">
                        {suggestion}
                    </AlertDescription>
                </Alert>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
