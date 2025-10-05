"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Bell, BellOff } from "lucide-react";

type UseNotificationsReturn = {
  isSupported: boolean;
  permission: NotificationPermission;
  isEnabled: boolean;
  requestPermission: () => Promise<boolean>;
  showNotification: (title: string, options?: NotificationOptions) => void;
};

export function useNotifications(): UseNotificationsReturn {
  const [isSupported, setIsSupported] = React.useState<boolean>(false);
  const [permission, setPermission] =
    React.useState<NotificationPermission>("default");
  const [isEnabled, setIsEnabled] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
      setIsEnabled(Notification.permission === "granted");
    }
  }, []);

  const requestPermission = React.useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      setIsEnabled(result === "granted");
      return result === "granted";
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  }, [isSupported]);

  const showNotification = React.useCallback(
    (title: string, options?: NotificationOptions) => {
      if (!isEnabled || !isSupported) return;

      try {
        new Notification(title, {
          icon: "/basketball-icon.png",
          badge: "/basketball-badge.png",
          ...options,
        });
      } catch (error) {
        console.error("Error showing notification:", error);
      }
    },
    [isEnabled, isSupported]
  );

  return {
    isSupported,
    permission,
    isEnabled,
    requestPermission,
    showNotification,
  };
}

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
