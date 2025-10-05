"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Play, Pause, RotateCcw, Users, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { matches } from "@/lib/data/matches";
import { getTeamById } from "@/lib/data/teams";
import { useNotifications } from "@/lib/notifications";

type GameEventType =
  | "score"
  | "foul"
  | "timeout"
  | "substitution"
  | "quarter_end";
type GameTeam = "home" | "away";
type GameStatus = "not_started" | "live" | "paused" | "finished";

type GameEvent = {
  id: string;
  type: GameEventType;
  team: GameTeam;
  description: string;
  timestamp: number;
  quarter: number;
};

type LiveGameState = {
  homeScore: number;
  awayScore: number;
  quarter: number;
  timeRemaining: number; // in seconds
  gameStatus: GameStatus;
  events: GameEvent[];
  lastUpdate: number;
};

export default function LivePage() {
  const [selectedMatch, setSelectedMatch] = useState(
    matches.find((m) => m.status === "scheduled") || matches[0]
  );

  const [gameState, setGameState] = useState<LiveGameState>({
    homeScore: 0,
    awayScore: 0,
    quarter: 1,
    timeRemaining: 12 * 60, // 12 minutes per quarter
    gameStatus: "not_started",
    events: [],
    lastUpdate: Date.now(),
  });

  const [isLive, setIsLive] = useState(false);
  const { showNotification } = useNotifications();

  const homeTeam = getTeamById(selectedMatch.homeTeamId);
  const awayTeam = getTeamById(selectedMatch.awayTeamId);

  // Generate random game events
  const generateRandomEvent = useCallback((): GameEvent => {
    const eventTypes: GameEventType[] = [
      "score",
      "foul",
      "timeout",
      "substitution",
    ];
    const teams: GameTeam[] = ["home", "away"];
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const team = teams[Math.floor(Math.random() * teams.length)];

    const descriptions: Record<GameEventType, string[]> = {
      score: [
        "Fast break layup",
        "Three-pointer from downtown",
        "Mid-range jumper",
        "Free throw",
        "Slam dunk",
        "Step-back three",
        "Alley-oop finish",
      ],
      foul: [
        "Personal foul called",
        "Shooting foul",
        "Defensive foul",
        "Offensive foul",
      ],
      timeout: ["Timeout called", "TV timeout", "Official timeout"],
      substitution: ["Player substitution", "Lineup change"],
      quarter_end: ["End of quarter"],
    };

    return {
      id: Math.random().toString(36).substring(2, 9),
      type,
      team,
      description:
        descriptions[type][
          Math.floor(Math.random() * descriptions[type].length)
        ],
      timestamp: Date.now(),
      quarter: gameState.quarter,
    };
  }, [gameState.quarter]);

  // Update game state
  const updateGameState = useCallback(() => {
    if (!isLive || gameState.gameStatus === "finished") return;

    setGameState((prev) => {
      const newState = { ...prev };

      // Decrease time
      newState.timeRemaining -= 1;

      // Check if quarter ended
      if (newState.timeRemaining <= 0) {
        if (newState.quarter >= 4) {
          newState.gameStatus = "finished";
          setIsLive(false);
        } else {
          newState.quarter += 1;
          newState.timeRemaining = 12 * 60;
        }
      }

      // Generate random events occasionally
      if (Math.random() < 0.15 && newState.timeRemaining % 30 === 0) {
        const event = generateRandomEvent();

        // Update score for scoring events
        if (event.type === "score") {
          const points = Math.floor(Math.random() * 3) + 1;
          if (event.team === "home") {
            newState.homeScore += points;
            showNotification(`${homeTeam?.name} scores!`, {
              body: `${newState.homeScore} - ${newState.awayScore}`,
              tag: "score-update",
            });
          } else {
            newState.awayScore += points;
            showNotification(`${awayTeam?.name} scores!`, {
              body: `${newState.homeScore} - ${newState.awayScore}`,
              tag: "score-update",
            });
          }
        }

        newState.events = [event, ...newState.events];
        newState.lastUpdate = Date.now();
      }

      return newState;
    });
  }, [
    isLive,
    gameState.gameStatus,
    generateRandomEvent,
    showNotification,
    homeTeam,
    awayTeam,
  ]);

  // Game loop
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(updateGameState, 1000);
    return () => clearInterval(interval);
  }, [isLive, updateGameState]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const startGame = (): void => {
    setGameState({
      homeScore: 0,
      awayScore: 0,
      quarter: 1,
      timeRemaining: 12 * 60,
      gameStatus: "live",
      events: [],
      lastUpdate: Date.now(),
    });
    setIsLive(true);
  };

  const pauseGame = (): void => {
    setIsLive(false);
    setGameState((prev) => ({ ...prev, gameStatus: "paused" }));
  };

  const resumeGame = (): void => {
    setIsLive(true);
    setGameState((prev) => ({ ...prev, gameStatus: "live" }));
  };

  const resetGame = (): void => {
    setIsLive(false);
    setGameState({
      homeScore: 0,
      awayScore: 0,
      quarter: 1,
      timeRemaining: 12 * 60,
      gameStatus: "not_started",
      events: [],
      lastUpdate: Date.now(),
    });
  };

  if (!homeTeam || !awayTeam) return <div>Teams not found</div>;

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-balance">
          Live Spectator Mode
        </h1>
        <p className="mt-4 text-lg text-muted-foreground text-pretty">
          Experience real-time basketball action with live play-by-play
        </p>
      </div>

      {/* Game Controls */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Game Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 justify-center">
            {gameState.gameStatus === "not_started" && (
              <Button onClick={startGame} size="lg">
                <Play className="mr-2 h-4 w-4" />
                Start Game
              </Button>
            )}

            {gameState.gameStatus === "live" && (
              <Button onClick={pauseGame} variant="outline" size="lg">
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </Button>
            )}

            {gameState.gameStatus === "paused" && (
              <>
                <Button onClick={resumeGame} size="lg">
                  <Play className="mr-2 h-4 w-4" />
                  Resume
                </Button>
                <Button onClick={resetGame} variant="outline" size="lg">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </>
            )}

            <Button onClick={resetGame} variant="outline" size="lg">
              <RotateCcw className="mr-2 h-4 w-4" />
              New Game
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Live Scoreboard */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-center">
            {gameState.gameStatus === "live" && (
              <Badge className="mb-4 bg-red-500 animate-pulse">● LIVE</Badge>
            )}
            {homeTeam.name} vs {awayTeam.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Home Team */}
            <div className="text-center">
              <div className="relative h-24 w-24 mx-auto mb-4">
                <Image
                  src={homeTeam.logo || "/placeholder.svg"}
                  alt={homeTeam.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-xl mb-2">{homeTeam.name}</h3>
              <p className="text-muted-foreground mb-4">{homeTeam.city}</p>
              <div className="text-6xl font-display font-bold">
                {gameState.homeScore}
              </div>
            </div>

            {/* Game Info */}
            <div className="text-center">
              <div className="mb-4">
                <Badge variant="outline" className="mb-2">
                  Q{gameState.quarter} • {formatTime(gameState.timeRemaining)}
                </Badge>
              </div>

              {gameState.gameStatus === "finished" ? (
                <div className="text-2xl font-bold">
                  {gameState.homeScore > gameState.awayScore
                    ? homeTeam.name
                    : awayTeam.name}{" "}
                  Wins!
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Game Clock
                  </div>
                  <Progress
                    value={(gameState.timeRemaining / (12 * 60)) * 100}
                    className="w-full max-w-xs mx-auto"
                  />
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="text-center">
              <div className="relative h-24 w-24 mx-auto mb-4">
                <Image
                  src={awayTeam.logo || "/placeholder.svg"}
                  alt={awayTeam.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-xl mb-2">{awayTeam.name}</h3>
              <p className="text-muted-foreground mb-4">{awayTeam.city}</p>
              <div className="text-6xl font-display font-bold">
                {gameState.awayScore}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Live Play-by-Play
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {gameState.events.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                {gameState.gameStatus === "not_started"
                  ? "Game hasn't started yet"
                  : "Waiting for game action..."}
              </div>
            ) : (
              gameState.events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                >
                  <Badge
                    variant={event.team === "home" ? "default" : "secondary"}
                  >
                    Q{event.quarter}
                  </Badge>
                  <div className="flex-1">
                    <p className="font-semibold">{event.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {event.team === "home" ? homeTeam.name : awayTeam.name}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
