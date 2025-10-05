"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { matches } from "@/lib/data/matches"
import { getTeamById } from "@/lib/data/teams"
import { Calendar, MapPin } from "lucide-react"

export default function SchedulePage() {
  const [filter, setFilter] = useState<"all" | "finished" | "scheduled">("all")

  const filteredMatches = matches
    .filter((match) => {
      if (filter === "all") return true
      return match.status === filter
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Group matches by date
  const matchesByDate = filteredMatches.reduce(
    (acc, match) => {
      const date = match.date
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(match)
      return acc
    },
    {} as Record<string, typeof matches>,
  )

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-balance">Match Schedule</h1>
        <p className="mt-4 text-lg text-muted-foreground text-pretty">View all matches, results, and upcoming games</p>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="all">All Matches</TabsTrigger>
          <TabsTrigger value="finished">Results</TabsTrigger>
          <TabsTrigger value="scheduled">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-8">
          {Object.entries(matchesByDate).map(([date, dateMatches]) => (
            <div key={date} className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <h2 className="font-display text-2xl font-bold">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h2>
              </div>

              <div className="grid gap-4">
                {dateMatches.map((match, index) => {
                  const homeTeam = getTeamById(match.homeTeamId)
                  const awayTeam = getTeamById(match.awayTeamId)
                  if (!homeTeam || !awayTeam) return null

                  return (
                    <Card
                      key={match.id}
                      className="overflow-hidden transition-all hover:shadow-lg animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-6">
                          {/* Match Header */}
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <Badge variant={match.status === "finished" ? "secondary" : "default"}>
                              {match.status === "finished" ? "Final" : match.status === "live" ? "Live" : "Scheduled"}
                            </Badge>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{match.time}</span>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span className="hidden sm:inline">{match.venue}</span>
                              </div>
                            </div>
                          </div>

                          {/* Teams */}
                          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr]">
                            {/* Home Team */}
                            <div className="flex items-center gap-4">
                              <div className="relative h-16 w-16 flex-shrink-0">
                                <Image
                                  src={homeTeam.logo || "/placeholder.svg"}
                                  alt={homeTeam.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-lg truncate">{homeTeam.name}</h3>
                                <p className="text-sm text-muted-foreground truncate">{homeTeam.city}</p>
                                <p className="text-xs text-muted-foreground">
                                  {homeTeam.wins}-{homeTeam.losses}
                                </p>
                              </div>
                              {match.status === "finished" && (
                                <div className="font-display text-4xl font-bold">{match.homeScore}</div>
                              )}
                            </div>

                            {/* VS or Score Separator */}
                            <div className="flex items-center justify-center">
                              <span className="text-2xl font-bold text-muted-foreground">
                                {match.status === "finished" ? "-" : "VS"}
                              </span>
                            </div>

                            {/* Away Team */}
                            <div className="flex items-center gap-4 md:flex-row-reverse">
                              <div className="relative h-16 w-16 flex-shrink-0">
                                <Image
                                  src={awayTeam.logo || "/placeholder.svg"}
                                  alt={awayTeam.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <div className="flex-1 min-w-0 md:text-right">
                                <h3 className="font-semibold text-lg truncate">{awayTeam.name}</h3>
                                <p className="text-sm text-muted-foreground truncate">{awayTeam.city}</p>
                                <p className="text-xs text-muted-foreground">
                                  {awayTeam.wins}-{awayTeam.losses}
                                </p>
                              </div>
                              {match.status === "finished" && (
                                <div className="font-display text-4xl font-bold md:order-first">{match.awayScore}</div>
                              )}
                            </div>
                          </div>

                          {/* Venue on mobile */}
                          <div className="sm:hidden flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
                            <MapPin className="h-4 w-4" />
                            <span>{match.venue}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}

          {filteredMatches.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No matches found for this filter</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
