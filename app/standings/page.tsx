import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { teams } from "@/lib/data/teams"
import { Trophy, TrendingUp, TrendingDown } from "lucide-react"

export const metadata = {
  title: "Standings - AEBL",
  description: "View current league standings and team rankings",
}

export default function StandingsPage() {
  const eastTeams = teams
    .filter((team) => team.conference === "East")
    .sort((a, b) => {
      const aWinPct = a.wins / (a.wins + a.losses)
      const bWinPct = b.wins / (b.wins + b.losses)
      return bWinPct - aWinPct
    })

  const westTeams = teams
    .filter((team) => team.conference === "West")
    .sort((a, b) => {
      const aWinPct = a.wins / (a.wins + a.losses)
      const bWinPct = b.wins / (b.wins + b.losses)
      return bWinPct - aWinPct
    })

  const renderStandingsTable = (conferenceTeams: typeof teams, conferenceName: string) => (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-2xl">{conferenceName} Conference</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="pb-3 font-medium">Rank</th>
                <th className="pb-3 font-medium">Team</th>
                <th className="pb-3 font-medium text-center">W</th>
                <th className="pb-3 font-medium text-center">L</th>
                <th className="pb-3 font-medium text-center">Win %</th>
                <th className="pb-3 font-medium text-center hidden md:table-cell">GB</th>
                <th className="pb-3 font-medium text-center hidden lg:table-cell">Streak</th>
              </tr>
            </thead>
            <tbody>
              {conferenceTeams.map((team, index) => {
                const winPct = (team.wins / (team.wins + team.losses)) * 100
                const gamesBack =
                  index === 0
                    ? "-"
                    : ((conferenceTeams[0].wins - team.wins + (team.losses - conferenceTeams[0].losses)) / 2).toFixed(1)

                return (
                  <tr key={team.id} className="border-b border-border/50 transition-colors hover:bg-muted/50">
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{index + 1}</span>
                        {index === 0 && <Trophy className="h-4 w-4 text-yellow-500" />}
                      </div>
                    </td>
                    <td className="py-4">
                      <Link
                        href={`/teams/${team.id}`}
                        className="flex items-center gap-3 hover:text-primary transition-colors"
                      >
                        <div className="relative h-10 w-10 flex-shrink-0">
                          <Image
                            src={team.logo || "/placeholder.svg"}
                            alt={team.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{team.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{team.city}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="py-4 text-center font-semibold">{team.wins}</td>
                    <td className="py-4 text-center font-semibold">{team.losses}</td>
                    <td className="py-4 text-center font-semibold">{winPct.toFixed(1)}%</td>
                    <td className="py-4 text-center text-muted-foreground hidden md:table-cell">{gamesBack}</td>
                    <td className="py-4 text-center hidden lg:table-cell">
                      <div className="flex items-center justify-center gap-1">
                        {team.wins > team.losses ? (
                          <>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-green-500 font-semibold">W{Math.min(team.wins, 3)}</span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-4 w-4 text-red-500" />
                            <span className="text-red-500 font-semibold">L{Math.min(team.losses, 3)}</span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-balance">League Standings</h1>
        <p className="mt-4 text-lg text-muted-foreground text-pretty">Current rankings and team performance</p>
      </div>

      {/* Playoff Picture */}
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Playoff Picture</h3>
            </div>
            <p className="text-sm text-muted-foreground">Top 4 teams from each conference advance to playoffs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Legend</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>W - Wins | L - Losses | Win % - Win Percentage</p>
              <p className="hidden md:block">GB - Games Behind | Streak - Current Win/Loss Streak</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Standings Tables */}
      <div className="space-y-8">
        {renderStandingsTable(eastTeams, "Eastern")}
        {renderStandingsTable(westTeams, "Western")}
      </div>

      {/* Playoff Bracket Preview */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-2xl">Playoff Bracket Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Badge>Eastern Conference</Badge>
                </h3>
                <div className="space-y-2">
                  {eastTeams.slice(0, 4).map((team, index) => (
                    <div key={team.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <span className="font-semibold text-muted-foreground">#{index + 1}</span>
                      <Image src={team.logo || "/placeholder.svg"} alt={team.name} width={32} height={32} />
                      <span className="font-semibold">{team.name}</span>
                      <span className="ml-auto text-sm text-muted-foreground">
                        {team.wins}-{team.losses}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Badge>Western Conference</Badge>
                </h3>
                <div className="space-y-2">
                  {westTeams.slice(0, 4).map((team, index) => (
                    <div key={team.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <span className="font-semibold text-muted-foreground">#{index + 1}</span>
                      <Image src={team.logo || "/placeholder.svg"} alt={team.name} width={32} height={32} />
                      <span className="font-semibold">{team.name}</span>
                      <span className="ml-auto text-sm text-muted-foreground">
                        {team.wins}-{team.losses}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
