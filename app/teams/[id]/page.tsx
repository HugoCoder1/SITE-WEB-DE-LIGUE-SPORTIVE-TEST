import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTeamById, teams } from "@/lib/data/teams";
import { getPlayersByTeam } from "@/lib/data/players";
import { matches } from "@/lib/data/matches";
import { ArrowLeft, MapPin } from "lucide-react";
import { TeamRecentScoresChart } from "@/components/team-recent-scores-chart";

export function generateStaticParams() {
  return teams.map((team) => ({
    id: team.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const team = getTeamById(id);
  if (!team) return {};

  return {
    title: `${team.name} - AEBL`,
    description: `View roster, stats, and schedule for ${team.name}`,
  };
}

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const team = getTeamById(id);
  const roster = getPlayersByTeam(id);

  if (!team) {
    notFound();
  }

  const teamMatches = matches
    .filter(
      (match) => match.homeTeamId === team.id || match.awayTeamId === team.id
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const winPercentage = ((team.wins / (team.wins + team.losses)) * 100).toFixed(
    1
  );

  return (
    <div className="container py-12 md:py-16">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/teams">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Teams
        </Link>
      </Button>

      {/* Team Header */}
      <div className="mb-12 grid gap-8 md:grid-cols-[300px_1fr]">
        <div className="flex justify-center md:justify-start">
          <div className="relative h-64 w-64 rounded-2xl bg-gradient-to-br from-muted to-muted/50 p-8 shadow-xl">
            <Image
              src={team.logo || "/placeholder.svg"}
              alt={team.name}
              fill
              className="object-contain p-8"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <Badge className="mb-4 w-fit">{team.conference} Conference</Badge>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
            {team.name}
          </h1>
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span className="text-lg">
              {team.city}, {team.country}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold">{team.wins}</p>
              <p className="text-sm text-muted-foreground">Wins</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{team.losses}</p>
              <p className="text-sm text-muted-foreground">Losses</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{winPercentage}%</p>
              <p className="text-sm text-muted-foreground">Win Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Scores Chart */}
      <section className="mb-12">
        <h2 className="font-display text-3xl font-bold mb-6">Recent Scores</h2>
        <Card>
          <CardContent className="p-6">
            <TeamRecentScoresChart teamId={team.id} />
          </CardContent>
        </Card>
      </section>

      {/* Roster */}
      <section className="mb-12">
        <h2 className="font-display text-3xl font-bold mb-6">Team Roster</h2>
        {roster.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {roster.map((player, index) => (
              <Card
                key={player.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={player.photo || "/placeholder.svg"}
                        alt={player.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg truncate">
                            {player.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            #{player.number} • {player.position}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="font-semibold">{player.stats.ppg}</p>
                          <p className="text-xs text-muted-foreground">PPG</p>
                        </div>
                        <div>
                          <p className="font-semibold">{player.stats.rpg}</p>
                          <p className="text-xs text-muted-foreground">RPG</p>
                        </div>
                        <div>
                          <p className="font-semibold">{player.stats.apg}</p>
                          <p className="text-xs text-muted-foreground">APG</p>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {player.height} • {player.weight} • {player.age} years
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                Roster information coming soon
              </p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Recent Matches */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6">
          Recent & Upcoming Matches
        </h2>
        <div className="space-y-4">
          {teamMatches.map((match) => {
            const homeTeam = getTeamById(match.homeTeamId);
            const awayTeam = getTeamById(match.awayTeamId);
            if (!homeTeam || !awayTeam) return null;

            const isHome = match.homeTeamId === team.id;

            return (
              <Card key={match.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          match.status === "finished" ? "secondary" : "default"
                        }
                      >
                        {match.status === "finished" ? "Final" : "Scheduled"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(match.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-6 flex-1 justify-center">
                      <div className="flex items-center gap-3">
                        <Image
                          src={homeTeam.logo || "/placeholder.svg"}
                          alt={homeTeam.name}
                          width={40}
                          height={40}
                        />
                        <span className="font-semibold">{homeTeam.name}</span>
                      </div>

                      {match.status === "finished" ? (
                        <div className="flex items-center gap-4">
                          <span className="font-display text-2xl font-bold">
                            {match.homeScore}
                          </span>
                          <span className="text-muted-foreground">-</span>
                          <span className="font-display text-2xl font-bold">
                            {match.awayScore}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          vs
                        </span>
                      )}

                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{awayTeam.name}</span>
                        <Image
                          src={awayTeam.logo || "/placeholder.svg"}
                          alt={awayTeam.name}
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
