"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { teams } from "@/lib/data/teams"
import { players } from "@/lib/data/players"
import { Search, Users, User } from "lucide-react"

export default function SearchPage() {
  const [query, setQuery] = useState("")

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return { teams: [], players: [] }
    }

    const lowerQuery = query.toLowerCase()

    const matchedTeams = teams.filter(
      (team) =>
        team.name.toLowerCase().includes(lowerQuery) ||
        team.city.toLowerCase().includes(lowerQuery) ||
        team.country.toLowerCase().includes(lowerQuery),
    )

    const matchedPlayers = players.filter(
      (player) =>
        player.name.toLowerCase().includes(lowerQuery) ||
        player.position.toLowerCase().includes(lowerQuery) ||
        teams
          .find((t) => t.id === player.teamId)
          ?.name.toLowerCase()
          .includes(lowerQuery),
    )

    return { teams: matchedTeams, players: matchedPlayers }
  }, [query])

  const hasResults = searchResults.teams.length > 0 || searchResults.players.length > 0

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-balance">Search</h1>
        <p className="mt-4 text-lg text-muted-foreground text-pretty">Find teams, players, and more</p>
      </div>

      {/* Search Input */}
      <div className="mx-auto max-w-2xl mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for teams, players, cities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 h-14 text-lg"
            autoFocus
          />
        </div>
      </div>

      {/* Results */}
      {query.trim() ? (
        <div className="space-y-12">
          {/* Teams Results */}
          {searchResults.teams.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-6 w-6" />
                <h2 className="font-display text-2xl font-bold">Teams</h2>
                <Badge variant="secondary">{searchResults.teams.length}</Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.teams.map((team) => (
                  <Link key={team.id} href={`/teams/${team.id}`}>
                    <Card className="group transition-all hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 flex-shrink-0">
                            <Image
                              src={team.logo || "/placeholder.svg"}
                              alt={team.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                              {team.name}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {team.city}, {team.country}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {team.conference}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {team.wins}-{team.losses}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Players Results */}
          {searchResults.players.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <User className="h-6 w-6" />
                <h2 className="font-display text-2xl font-bold">Players</h2>
                <Badge variant="secondary">{searchResults.players.length}</Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {searchResults.players.map((player) => {
                  const team = teams.find((t) => t.id === player.teamId)
                  return (
                    <Link key={player.id} href={`/teams/${player.teamId}`}>
                      <Card className="group transition-all hover:shadow-lg">
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
                              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                                {player.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                #{player.number} • {player.position}
                              </p>
                              {team && (
                                <div className="mt-2 flex items-center gap-2">
                                  <Image src={team.logo || "/placeholder.svg"} alt={team.name} width={20} height={20} />
                                  <span className="text-sm text-muted-foreground truncate">{team.name}</span>
                                </div>
                              )}
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
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}

          {/* No Results */}
          {!hasResults && (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold text-lg mb-2">No results found</h3>
                <p className="text-muted-foreground">Try searching for a different team, player, or city</p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold text-lg mb-2">Start searching</h3>
            <p className="text-muted-foreground">Enter a team name, player name, or city to begin</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
