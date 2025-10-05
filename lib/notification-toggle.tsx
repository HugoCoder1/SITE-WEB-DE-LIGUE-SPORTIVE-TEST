"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Bell, BellOff } from "lucide-react";
import { useNotifications } from "@/lib/notifications";

export function NotificationToggle() {
  const { isSupported, isEnabled, requestPermission } = useNotifications();

  if (!isSupported) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={requestPermission}
      className="relative"
      title={isEnabled ? "Notifications enabled" : "Enable notifications"}
    >
      {isEnabled ? (
        <Bell className="h-5 w-5" />
      ) : (
        <BellOff className="h-5 w-5" />
      )}
    </Button>
  );
}
