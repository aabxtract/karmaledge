import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { PopulatedDeed } from '@/lib/types';
import { ShieldCheck, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

export function DeedCard({ deed }: { deed: PopulatedDeed }) {
  return (
    <Card className="glass-card flex flex-col h-full overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <CardHeader className="flex-row gap-4 items-center">
        <Avatar>
          <AvatarImage src={deed.user.avatarUrl} alt={deed.user.name} />
          <AvatarFallback>{deed.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base">{deed.user.name}</CardTitle>
          <CardDescription>
            {formatDistanceToNow(new Date(deed.timestamp), { addSuffix: true })}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {deed.imageUrl && (
          <div className="relative aspect-video w-full rounded-lg overflow-hidden">
            <Image
              src={deed.imageUrl}
              alt={deed.description}
              fill
              className="object-cover"
              data-ai-hint={deed.imageHint}
            />
          </div>
        )}
        <p className="text-foreground/90">{deed.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-accent/30 text-accent-foreground border-accent/50">{deed.kindnessType}</Badge>
            {deed.isVerified ? (
                <Badge variant="default" className="bg-primary/80 text-primary-foreground flex items-center gap-1.5">
                    <ShieldCheck size={14} /> Verified
                </Badge>
            ) : (
                <Badge variant="outline" className="flex items-center gap-1.5">
                    <Users size={14} /> {deed.verifications} Verifications
                </Badge>
            )}
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/deeds/${deed.id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
