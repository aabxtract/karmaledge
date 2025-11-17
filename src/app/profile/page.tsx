import { KarmaAura } from '@/components/KarmaAura';
import { users } from '@/lib/data';
import { AURA_LEVELS, type KindnessType } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HandHeart, Sprout, Award, MessageSquareHeart, Users, Leaf, Icon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const shardIcons: Record<KindnessType, Icon> = {
  Help: HandHeart,
  Charity: Sprout,
  Service: Award,
  Encouragement: MessageSquareHeart,
  Community: Users,
  Environment: Leaf,
};

export default function ProfilePage() {
  const user = users[0]; // Mocking the logged-in user as 'Aria'
  const currentAura = AURA_LEVELS.find(a => a.level === user.auraLevel) || AURA_LEVELS[0];
  const nextAura = AURA_LEVELS.find(a => a.level === user.auraLevel + 1);
  const deedsCount = user.shards.length;
  
  let progress = 0;
  if(nextAura) {
    const deedsForNextLevel = nextAura.deedsRequired - currentAura.deedsRequired;
    const deedsProgress = deedsCount - currentAura.deedsRequired;
    progress = (deedsProgress / deedsForNextLevel) * 100;
  }

  const shardCounts = user.shards.reduce((acc, shard) => {
    acc[shard.type] = (acc[shard.type] || 0) + 1;
    return acc;
  }, {} as Record<KindnessType, number>);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-8">
        <Card className="glass-card text-center">
            <CardContent className="pt-6">
                <Avatar className="h-24 w-24 mx-auto border-4 border-primary/50">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="text-3xl font-bold mt-4 font-headline">{user.name}</h1>
                <p className="text-muted-foreground break-all text-sm">{user.walletAddress}</p>
            </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Aura Progression</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Current Level</p>
                <p className="text-xl font-bold text-primary">{currentAura.name}</p>
              </div>
              {nextAura ? (
                <div>
                  <Progress value={progress} />
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    {nextAura.deedsRequired - deedsCount} deeds to reach <span className="font-bold text-foreground">{nextAura.name}</span>
                  </p>
                </div>
              ) : (
                <p className="text-center font-semibold text-accent">You have reached the highest Aura level!</p>
              )}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-8">
        <Card className="glass-card h-96 flex flex-col items-center justify-center">
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Karma Aura</h2>
            <div className="w-64 h-64">
                <KarmaAura level={user.auraLevel} />
            </div>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Karma Shard Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(shardCounts).map(([type, count]) => {
                const Icon = shardIcons[type as KindnessType];
                return (
                  <div key={type} className="p-4 rounded-lg bg-background/50 flex flex-col items-center justify-center text-center">
                    <Icon className="h-8 w-8 text-primary mb-2" />
                    <p className="font-semibold">{type}</p>
                    <p className="text-2xl font-bold">{count}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
