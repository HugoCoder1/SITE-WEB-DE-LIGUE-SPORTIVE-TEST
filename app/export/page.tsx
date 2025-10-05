"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { teams } from "@/lib/data/teams"
import { players } from "@/lib/data/players"
import { matches } from "@/lib/data/matches"
import { getTeamById } from "@/lib/data/teams"
import { Download, FileText, Table } from "lucide-react"
import jsPDF from 'jspdf'

export default function ExportPage() {
  const [isExporting, setIsExporting] = useState(false)

  // Export functions
  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0] || {})
    const csvContent = [
      headers.join(','),
      ...data.map(row =>
        headers.map(header => {
          const value = row[header]
          return typeof value === 'string' && value.includes(',') ? `"${value}"` : value
        }).join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const exportToPDF = (data: any[], title: string, filename: string) => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text(title, 20, 20)

    let yPosition = 40
    const lineHeight = 10

    data.forEach((item, index) => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      const text = `${index + 1}. ${JSON.stringify(item).replace(/"/g, '')}`
      const lines = doc.splitTextToSize(text, 170)
      doc.setFontSize(10)
      doc.text(lines, 20, yPosition)
      yPosition += lines.length * lineHeight
    })

    doc.save(`${filename}.pdf`)
  }

  const exportTeamsCSV = () => {
    const teamData = teams.map(team => ({
      name: team.name,
      city: team.city,
      country: team.country,
      conference: team.conference,
      wins: team.wins,
      losses: team.losses,
      winPercentage: ((team.wins / (team.wins + team.losses)) * 100).toFixed(1) + '%'
    }))
    exportToCSV(teamData, 'aebl_teams')
  }

  const exportPlayersCSV = () => {
    const playerData = players.map(player => ({
      name: player.name,
      position: player.position,
      number: player.number,
      team: getTeamById(player.teamId)?.name || 'Unknown',
      height: player.height,
      weight: player.weight,
      age: player.age,
      ppg: player.stats.ppg,
      rpg: player.stats.rpg,
      apg: player.stats.apg
    }))
    exportToCSV(playerData, 'aebl_players')
  }

  const exportMatchesCSV = () => {
    const matchData = matches.map(match => ({
      date: new Date(match.date).toLocaleDateString(),
      time: match.time,
      homeTeam: getTeamById(match.homeTeamId)?.name || 'Unknown',
      awayTeam: getTeamById(match.awayTeamId)?.name || 'Unknown',
      homeScore: match.homeScore || '',
      awayScore: match.awayScore || '',
      status: match.status,
      venue: match.venue
    }))
    exportToCSV(matchData, 'aebl_matches')
  }

  const exportStandingsCSV = () => {
    const eastTeams = teams.filter(t => t.conference === 'East').sort((a, b) => {
      const aWinPct = a.wins / (a.wins + a.losses)
      const bWinPct = b.wins / (b.wins + b.losses)
      return bWinPct - aWinPct
    })

    const westTeams = teams.filter(t => t.conference === 'West').sort((a, b) => {
      const aWinPct = a.wins / (a.wins + a.losses)
      const bWinPct = b.wins / (b.wins + b.losses)
      return bWinPct - aWinPct
    })

    const standingsData = [
      { conference: 'Eastern Conference' },
      ...eastTeams.map((team, index) => ({
        rank: index + 1,
        team: team.name,
        wins: team.wins,
        losses: team.losses,
        winPercentage: ((team.wins / (team.wins + team.losses)) * 100).toFixed(1) + '%'
      })),
      { conference: 'Western Conference' },
      ...westTeams.map((team, index) => ({
        rank: index + 1,
        team: team.name,
        wins: team.wins,
        losses: team.losses,
        winPercentage: ((team.wins / (team.wins + team.losses)) * 100).toFixed(1) + '%'
      }))
    ]
    exportToCSV(standingsData, 'aebl_standings')
  }

  const exportTeamsPDF = () => {
    const teamData = teams.map(team => ({
      name: team.name,
      city: team.city,
      country: team.country,
      conference: team.conference,
      wins: team.wins,
      losses: team.losses,
      winPercentage: ((team.wins / (team.wins + team.losses)) * 100).toFixed(1) + '%'
    }))
    exportToPDF(teamData, 'AEBL Teams', 'aebl_teams')
  }

  const exportPlayersPDF = () => {
    const playerData = players.map(player => ({
      name: player.name,
      position: player.position,
      number: player.number,
      team: getTeamById(player.teamId)?.name || 'Unknown',
      height: player.height,
      weight: player.weight,
      age: player.age,
      ppg: player.stats.ppg,
      rpg: player.stats.rpg,
      apg: player.stats.apg
    }))
    exportToPDF(playerData, 'AEBL Players', 'aebl_players')
  }

  const exportMatchesPDF = () => {
    const matchData = matches.map(match => ({
      date: new Date(match.date).toLocaleDateString(),
      time: match.time,
      homeTeam: getTeamById(match.homeTeamId)?.name || 'Unknown',
      awayTeam: getTeamById(match.awayTeamId)?.name || 'Unknown',
      homeScore: match.homeScore || '',
      awayScore: match.awayScore || '',
      status: match.status,
      venue: match.venue
    }))
    exportToPDF(matchData, 'AEBL Matches', 'aebl_matches')
  }

  const exportStandingsPDF = () => {
    const eastTeams = teams.filter(t => t.conference === 'East').sort((a, b) => {
      const aWinPct = a.wins / (a.wins + a.losses)
      const bWinPct = b.wins / (b.wins + b.losses)
      return bWinPct - aWinPct
    })

    const westTeams = teams.filter(t => t.conference === 'West').sort((a, b) => {
      const aWinPct = a.wins / (a.wins + a.losses)
      const bWinPct = b.wins / (b.wins + b.losses)
      return bWinPct - aWinPct
    })

    const standingsData = [
      { conference: 'Eastern Conference' },
      ...eastTeams.map((team, index) => ({
        rank: index + 1,
        team: team.name,
        wins: team.wins,
        losses: team.losses,
        winPercentage: ((team.wins / (team.wins + team.losses)) * 100).toFixed(1) + '%'
      })),
      { conference: 'Western Conference' },
      ...westTeams.map((team, index) => ({
        rank: index + 1,
        team: team.name,
        wins: team.wins,
        losses: team.losses,
        winPercentage: ((team.wins / (team.wins + team.losses)) * 100).toFixed(1) + '%'
      }))
    ]
    exportToPDF(standingsData, 'AEBL Standings', 'aebl_standings')
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-balance">
          Data Export
        </h1>
        <p className="mt-4 text-lg text-muted-foreground text-pretty">
          Export league data in CSV or PDF format for analysis and reporting
        </p>
      </div>

      <Tabs defaultValue="teams" className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="standings">Standings</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Teams Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button onClick={exportTeamsCSV} variant="outline">
                  <Table className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
                <Button onClick={exportTeamsPDF} variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Teams Data Preview:</h4>
                <div className="text-sm text-muted-foreground">
                  <p>• Team names, cities, countries</p>
                  <p>• Conference assignments</p>
                  <p>• Win-loss records and percentages</p>
                  <p>• Current standings information</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="players" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Players Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button onClick={exportPlayersCSV} variant="outline">
                  <Table className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
                <Button onClick={exportPlayersPDF} variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Players Data Preview:</h4>
                <div className="text-sm text-muted-foreground">
                  <p>• Player names, positions, jersey numbers</p>
                  <p>• Physical attributes (height, weight, age)</p>
                  <p>• Team affiliations</p>
                  <p>• Performance statistics (PPG, RPG, APG)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Matches Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button onClick={exportMatchesCSV} variant="outline">
                  <Table className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
                <Button onClick={exportMatchesPDF} variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Matches Data Preview:</h4>
                <div className="text-sm text-muted-foreground">
                  <p>• Match dates and times</p>
                  <p>• Home and away team information</p>
                  <p>• Final scores (when available)</p>
                  <p>• Match status and venues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Standings Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button onClick={exportStandingsCSV} variant="outline">
                  <Table className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
                <Button onClick={exportStandingsPDF} variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Standings Data Preview:</h4>
                <div className="text-sm text-muted-foreground">
                  <p>• Current conference standings</p>
                  <p>• Team rankings by win percentage</p>
                  <p>• Win-loss records</p>
                  <p>• Games behind leaders</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Export Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong>CSV Files:</strong> Perfect for data analysis in spreadsheet applications like Microsoft Excel or Google Sheets.
            </p>
            <p>
              <strong>PDF Files:</strong> Great for sharing formatted reports and documentation with stakeholders.
            </p>
            <p>
              <strong>Data Sources:</strong> All exported data is based on the current AEBL season statistics and match information.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
