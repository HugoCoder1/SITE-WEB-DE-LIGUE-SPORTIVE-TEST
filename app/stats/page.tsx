"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { teams } from "@/lib/data/teams"
import { players } from "@/lib/data/players"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter
} from "recharts"
import { TrendingUp, Users, Target, Activity } from "lucide-react"

export default function StatsPage() {
  // Prepare team statistics data
  const teamStatsData = teams.map(team => ({
    name: team.name,
    wins: team.wins,
    losses: team.losses,
    winPercentage: ((team.wins / (team.wins + team.losses)) * 100).toFixed(1),
    points: team.wins * 2, // Assuming 2 points per win
  }))

  // Prepare player statistics data
  const playerStatsData = players.slice(0, 10).map(player => ({
    name: player.name,
    ppg: player.stats.ppg,
    rpg: player.stats.rpg,
    apg: player.stats.apg,
    efficiency: (player.stats.ppg + player.stats.rpg + player.stats.apg).toFixed(1)
  }))

  // Conference distribution data
  const conferenceData = [
    { name: 'Eastern Conference', value: teams.filter(t => t.conference === 'East').length, color: '#8884d8' },
    { name: 'Western Conference', value: teams.filter(t => t.conference === 'West').length, color: '#82ca9d' }
  ]

  // Player positions data
  const positionStats = players.reduce((acc, player) => {
    const pos = player.position
    if (!acc[pos]) {
      acc[pos] = { position: pos, count: 0, avgPpg: 0, totalPpg: 0 }
    }
    acc[pos].count++
    acc[pos].totalPpg += player.stats.ppg
    acc[pos].avgPpg = (acc[pos].totalPpg / acc[pos].count).toFixed(1)
    return acc
  }, {} as Record<string, any>)

  const positionData = Object.values(positionStats)

  // Top performers
  const topScorers = [...players].sort((a, b) => b.stats.ppg - a.stats.ppg).slice(0, 5)
  const topRebounders = [...players].sort((a, b) => b.stats.rpg - a.stats.rpg).slice(0, 5)
  const topAssists = [...players].sort((a, b) => b.stats.apg - a.stats.apg).slice(0, 5)

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-balance">
          Advanced Statistics
        </h1>
        <p className="mt-4 text-lg text-muted-foreground text-pretty">
          Comprehensive analytics and insights for teams and players
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="comparisons">Compare</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{teams.length}</div>
                <p className="text-xs text-muted-foreground">
                  Across 2 conferences
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Players</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{players.length}</div>
                <p className="text-xs text-muted-foreground">
                  Active roster players
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg PPG</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(players.reduce((sum, p) => sum + p.stats.ppg, 0) / players.length).toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">
                  League average
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {((teams.reduce((sum, t) => sum + t.wins, 0) / (teams.reduce((sum, t) => sum + t.wins + t.losses, 0))) * 100).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  League average
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Conference Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Conference Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={conferenceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {conferenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Team Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={teamStatsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="wins" fill="#8884d8" name="Wins" />
                  <Bar dataKey="losses" fill="#82ca9d" name="Losses" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Team Win-Loss Records</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={teamStatsData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="wins" fill="#8884d8" />
                  <Bar dataKey="losses" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Win Percentage by Team</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={teamStatsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Win Percentage']} />
                  <Line type="monotone" dataKey="winPercentage" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="players" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Top Scorers</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={topScorers.map(p => ({ name: p.name, ppg: p.stats.ppg }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="ppg" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Rebounders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topRebounders.map((player, index) => (
                    <div key={player.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{index + 1}</Badge>
                        <div>
                          <p className="font-semibold">{player.name}</p>
                          <p className="text-sm text-muted-foreground">{player.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{player.stats.rpg}</p>
                        <p className="text-xs text-muted-foreground">RPG</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Playmakers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topAssists.map((player, index) => (
                    <div key={player.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{index + 1}</Badge>
                        <div>
                          <p className="font-semibold">{player.name}</p>
                          <p className="text-sm text-muted-foreground">{player.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{player.stats.apg}</p>
                        <p className="text-xs text-muted-foreground">APG</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparisons" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Player Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={playerStatsData}>
                  <CartesianGrid />
                  <XAxis dataKey="ppg" name="Points per Game" />
                  <YAxis dataKey="apg" name="Assists per Game" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Players" dataKey="efficiency" fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Position Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={positionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="position" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" name="Players" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
