"use client";

import { useState, useEffect } from "react";

export function useNotifications() {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
      setIsEnabled(Notification.permission === "granted");
    }
  }, []);

  const requestPermission = async () => {
    if (!isSupported) return false;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      setIsEnabled(result === "granted");
      return result === "granted";
    } catch (error) {
      console.error(
        "Erreur lors de la demande de permission de notification :",
        error
      );
      return false;
    }
  };

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (!isEnabled || !isSupported) return;

    try {
      new Notification(title, {
        icon: "/basketball-icon.png",
        badge: "/basketball-badge.png",
        ...options,
      });
    } catch (error) {
      console.error("Erreur lors de l’affichage de la notification :", error);
    }
  };

  return {
    isSupported,
    permission,
    isEnabled,
    requestPermission,
    showNotification,
  };
}
