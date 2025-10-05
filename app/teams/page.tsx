import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { teams } from "@/lib/data/teams"
import { Trophy } from "lucide-react"

export const revalidate = 3600

export async function generateMetadata() {
  return {
    title: "Teams - AEBL",
    description: "Explore all teams competing in the African Elite Basketball League",
  }
}

export default function TeamsPage() {
  const eastTeams = teams.filter((team) => team.conference === "East").sort((a, b) => b.wins - a.wins)
  const westTeams = teams.filter((team) => team.conference === "West").sort((a, b) => b.wins - a.wins)

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-balance">League Teams</h1>
        <p className="mt-4 text-lg text-muted-foreground text-pretty">
          Meet the elite teams competing for the championship
        </p>
      </div>

      {/* Eastern Conference */}
      <section className="mb-16">
        <div className="mb-8 flex items-center gap-3">
          <h2 className="font-display text-3xl font-bold">Eastern Conference</h2>
          <Badge variant="secondary">{eastTeams.length} Teams</Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {eastTeams.map((team, index) => (
            <Link key={team.id} href={`/teams/${team.id}`}>
              <Card
                className="group overflow-hidden transition-all hover:shadow-xl animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={team.logo || "/placeholder.svg"}
                      alt={team.name}
                      width={120}
                      height={120}
                      className="object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                  {index === 0 && (
                    <div className="absolute top-4 right-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500">
                        <Trophy className="h-4 w-4 text-yellow-900" />
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                    {team.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {team.city}, {team.country}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">
                        {team.wins}-{team.losses}
                      </p>
                      <p className="text-xs text-muted-foreground">Record</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {((team.wins / (team.wins + team.losses)) * 100).toFixed(0)}%
                      </p>
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Western Conference */}
      <section>
        <div className="mb-8 flex items-center gap-3">
          <h2 className="font-display text-3xl font-bold">Western Conference</h2>
          <Badge variant="secondary">{westTeams.length} Teams</Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {westTeams.map((team, index) => (
            <Link key={team.id} href={`/teams/${team.id}`}>
              <Card
                className="group overflow-hidden transition-all hover:shadow-xl animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={team.logo || "/placeholder.svg"}
                      alt={team.name}
                      width={120}
                      height={120}
                      className="object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                  {index === 0 && (
                    <div className="absolute top-4 right-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500">
                        <Trophy className="h-4 w-4 text-yellow-900" />
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                    {team.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {team.city}, {team.country}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">
                        {team.wins}-{team.losses}
                      </p>
                      <p className="text-xs text-muted-foreground">Record</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {((team.wins / (team.wins + team.losses)) * 100).toFixed(0)}%
                      </p>
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
