export interface Player {
  id: string
  name: string
  number: number
  position: "PG" | "SG" | "SF" | "PF" | "C"
  height: string
  weight: string
  age: number
  teamId: string
  photo: string
  stats: {
    ppg: number
    rpg: number
    apg: number
  }
}

export const players: Player[] = [
  // Lagos Lions
  {
    id: "player-1",
    name: "Chukwudi Okonkwo",
    number: 23,
    position: "SF",
    height: "6'8\"",
    weight: "220 lbs",
    age: 27,
    teamId: "lagos-lions",
    photo: "/african-basketball-player-action-shot.jpg",
    stats: { ppg: 24.5, rpg: 7.2, apg: 5.1 },
  },
  {
    id: "player-2",
    name: "Emeka Nwosu",
    number: 10,
    position: "PG",
    height: "6'2\"",
    weight: "185 lbs",
    age: 25,
    teamId: "lagos-lions",
    photo: "/african-basketball-point-guard.jpg",
    stats: { ppg: 18.3, rpg: 3.5, apg: 9.2 },
  },
  // Cairo Pharaohs
  {
    id: "player-3",
    name: "Ahmed Hassan",
    number: 7,
    position: "SG",
    height: "6'5\"",
    weight: "200 lbs",
    age: 26,
    teamId: "cairo-pharaohs",
    photo: "/egyptian-basketball-shooting-guard.jpg",
    stats: { ppg: 22.1, rpg: 4.8, apg: 3.9 },
  },
  {
    id: "player-4",
    name: "Omar Farouk",
    number: 15,
    position: "C",
    height: "7'0\"",
    weight: "250 lbs",
    age: 29,
    teamId: "cairo-pharaohs",
    photo: "/tall-basketball-center-player.jpg",
    stats: { ppg: 16.7, rpg: 11.3, apg: 2.1 },
  },
  // Johannesburg Thunder
  {
    id: "player-5",
    name: "Thabo Sefolosha",
    number: 3,
    position: "SF",
    height: "6'7\"",
    weight: "215 lbs",
    age: 28,
    teamId: "johannesburg-thunder",
    photo: "/south-african-basketball-forward.jpg",
    stats: { ppg: 20.4, rpg: 6.5, apg: 4.2 },
  },
  {
    id: "player-6",
    name: "Mandla Dlamini",
    number: 21,
    position: "PF",
    height: "6'10\"",
    weight: "235 lbs",
    age: 30,
    teamId: "johannesburg-thunder",
    photo: "/basketball-power-forward-dunking.jpg",
    stats: { ppg: 17.8, rpg: 9.6, apg: 2.8 },
  },
  // Nairobi Warriors
  {
    id: "player-7",
    name: "Victor Oladipo",
    number: 4,
    position: "SG",
    height: "6'4\"",
    weight: "195 lbs",
    age: 24,
    teamId: "nairobi-warriors",
    photo: "/kenyan-basketball-guard-shooting.jpg",
    stats: { ppg: 21.6, rpg: 5.1, apg: 4.7 },
  },
  {
    id: "player-8",
    name: "James Mwangi",
    number: 12,
    position: "PG",
    height: "6'1\"",
    weight: "180 lbs",
    age: 23,
    teamId: "nairobi-warriors",
    photo: "/placeholder.svg?height=400&width=300",
    stats: { ppg: 15.9, rpg: 3.2, apg: 8.5 },
  },
]

export function getPlayersByTeam(teamId: string): Player[] {
  return players.filter((player) => player.teamId === teamId)
}

export function getPlayerById(id: string): Player | undefined {
  return players.find((player) => player.id === id)
}
