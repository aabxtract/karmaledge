'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { deeds, users } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, UserCheck, Users, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const VERIFICATION_THRESHOLD = 3;

export default function DeedPage() {
  const params = useParams();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  const [showWave, setShowWave] = useState(false);

  const deed = deeds.find(d => d.id === params.id);
  const user = users.find(u => u.id === deed?.submittedBy);

  if (!deed || !user) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Deed not found</h1>
        <p className="text-muted-foreground">This act of kindness could not be located in the ledger.</p>
      </div>
    );
  }

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setShowWave(true);
      toast({
        title: 'Verification Successful!',
        description: 'Your Harmony Score has been updated.',
      });
      setIsVerifying(false);
      setTimeout(() => setShowWave(false), 1500); // Animation duration
    }, 1000);
  };
  
  const verificationProgress = (deed.verifications / VERIFICATION_THRESHOLD) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <Card className={cn('glass-card', showWave && 'karma-wave')}>
        <CardHeader>
          {deed.imageUrl && (
            <div className="relative aspect-video w-full rounded-t-lg -mt-6 -mx-6 overflow-hidden border-b">
              <Image
                src={deed.imageUrl}
                alt={deed.description}
                fill
                className="object-cover"
                data-ai-hint={deed.imageHint}
                priority
              />
            </div>
          )}
          <div className="pt-6">
            <Badge variant="secondary" className="bg-accent/30 text-accent-foreground border-accent/50">{deed.kindnessType}</Badge>
            <CardTitle className="text-3xl font-headline mt-2">{deed.description}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>Submitted by {user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(deed.timestamp), "MMMM d, yyyy")}</span>
                </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center gap-2"><Users className="text-primary"/>Verification Circle</h3>
                <p className="text-muted-foreground">
                    This deed requires {VERIFICATION_THRESHOLD} verifications from the community to become a permanent entry in the ledger.
                </p>
                <div className="flex items-center gap-4">
                    <Progress value={verificationProgress} className="w-full" />
                    <span className="font-mono text-sm">{deed.verifications}/{VERIFICATION_THRESHOLD}</span>
                </div>
            </div>
        </CardContent>
        <CardFooter>
            {deed.isVerified ? (
                 <div className="w-full text-center p-4 bg-primary/10 rounded-lg text-primary font-medium flex items-center justify-center gap-2">
                    <ShieldCheck /> This deed has been permanently recorded in the Karma Ledger.
                 </div>
            ) : (
                <Button onClick={handleVerify} disabled={isVerifying} className="w-full shadow-lg" size="lg">
                    {isVerifying ? 'Verifying...' : (
                        <span className="flex items-center gap-2"><UserCheck />Vouch for this Deed</span>
                    )}
                </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
