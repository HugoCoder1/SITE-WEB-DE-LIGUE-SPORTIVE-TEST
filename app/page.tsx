import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getRecentMatches, getUpcomingMatches } from "@/lib/data/matches"
import { getTeamById } from "@/lib/data/teams"
import { ArrowRight, Calendar, Trophy, Users } from "lucide-react"

export default function HomePage() {
  const recentMatches = getRecentMatches(4)
  const upcomingMatches = getUpcomingMatches(4)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background z-10" />
        <Image
          src="/basketball-arena-crowd-atmosphere.jpg"
          alt="Basketball arena"
          fill
          className="object-cover"
          priority
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center">
          <Badge className="mb-4 animate-fade-in" variant="secondary">
            2025 Season
          </Badge>
          <h1 className="font-display text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl animate-fade-in text-balance">
            AFRICAN ELITE
            <br />
            BASKETBALL LEAGUE
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90 md:text-xl animate-fade-in text-pretty">
            Experience the pinnacle of African basketball. Follow the continent's best teams and players as they compete
            for glory.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center animate-fade-in">
            <Button size="lg" asChild>
              <Link href="/schedule">
                View Schedule
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              <Link href="/teams">Explore Teams</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Results */}
      <section className="container py-16 md:py-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Recent Results</h2>
            <p className="mt-2 text-muted-foreground">Latest match outcomes from the league</p>
          </div>
          <Button variant="ghost" asChild className="hidden md:inline-flex">
            <Link href="/schedule">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {recentMatches.map((match, index) => {
            const homeTeam = getTeamById(match.homeTeamId)
            const awayTeam = getTeamById(match.awayTeamId)
            if (!homeTeam || !awayTeam) return null

            return (
              <Card
                key={match.id}
                className="overflow-hidden transition-all hover:shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">Final</Badge>
                    <span className="text-sm text-muted-foreground">{new Date(match.date).toLocaleDateString()}</span>
                  </div>

                  <div className="space-y-4">
                    {/* Home Team */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <Image
                            src={homeTeam.logo || "/placeholder.svg"}
                            alt={homeTeam.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{homeTeam.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{homeTeam.city}</p>
                        </div>
                      </div>
                      <span className="font-display text-3xl font-bold ml-4">{match.homeScore}</span>
                    </div>

                    {/* Away Team */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <Image
                            src={awayTeam.logo || "/placeholder.svg"}
                            alt={awayTeam.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{awayTeam.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{awayTeam.city}</p>
                        </div>
                      </div>
                      <span className="font-display text-3xl font-bold ml-4">{match.awayScore}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Button variant="outline" asChild className="w-full mt-6 md:hidden bg-transparent">
          <Link href="/schedule">
            View All Results
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      {/* Upcoming Matches */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Upcoming Matches</h2>
              <p className="mt-2 text-muted-foreground">Don't miss these exciting matchups</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:inline-flex">
              <Link href="/schedule">
                Full Schedule
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {upcomingMatches.map((match, index) => {
              const homeTeam = getTeamById(match.homeTeamId)
              const awayTeam = getTeamById(match.awayTeamId)
              if (!homeTeam || !awayTeam) return null

              return (
                <Card
                  key={match.id}
                  className="overflow-hidden transition-all hover:shadow-lg animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge>Scheduled</Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(match.date).toLocaleDateString()} • {match.time}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Home Team */}
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <Image
                            src={homeTeam.logo || "/placeholder.svg"}
                            alt={homeTeam.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{homeTeam.name}</p>
                          <p className="text-sm text-muted-foreground truncate">
                            {homeTeam.wins}-{homeTeam.losses}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <span className="text-sm font-medium text-muted-foreground">VS</span>
                      </div>

                      {/* Away Team */}
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <Image
                            src={awayTeam.logo || "/placeholder.svg"}
                            alt={awayTeam.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{awayTeam.name}</p>
                          <p className="text-sm text-muted-foreground truncate">
                            {awayTeam.wins}-{awayTeam.losses}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground truncate">{match.venue}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Button variant="outline" asChild className="w-full mt-6 md:hidden bg-transparent">
            <Link href="/schedule">
              View Full Schedule
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="text-center p-8 transition-all hover:shadow-lg">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="font-display text-4xl font-bold">8</h3>
            <p className="mt-2 text-muted-foreground">Elite Teams</p>
            <Button variant="link" asChild className="mt-4">
              <Link href="/teams">
                View Teams
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>

          <Card className="text-center p-8 transition-all hover:shadow-lg">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="font-display text-4xl font-bold">24</h3>
            <p className="mt-2 text-muted-foreground">Games Played</p>
            <Button variant="link" asChild className="mt-4">
              <Link href="/standings">
                View Standings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>

          <Card className="text-center p-8 transition-all hover:shadow-lg">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="font-display text-4xl font-bold">32</h3>
            <p className="mt-2 text-muted-foreground">Upcoming Games</p>
            <Button variant="link" asChild className="mt-4">
              <Link href="/schedule">
                View Schedule
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  )
}
