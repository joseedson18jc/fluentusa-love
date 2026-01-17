import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configurar handler de notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

interface UseNotificationsOptions {
  onNotificationReceived?: (notification: Notifications.Notification) => void;
  onNotificationTapped?: (notification: Notifications.Notification) => void;
}

export function useNotifications(options: UseNotificationsOptions = {}) {
  const { onNotificationReceived, onNotificationTapped } = options;
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    // Registrar listeners
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        onNotificationReceived?.(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        onNotificationTapped?.(response.notification);
      }
    );

    // Cleanup
    return () => {
      notificationListener.current && notificationListener.current.remove();
      responseListener.current && responseListener.current.remove();
    };
  }, [onNotificationReceived, onNotificationTapped]);

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF6B9D",
      });
    }

    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  };

  const scheduleNotification = async (
    title: string,
    body: string,
    seconds: number = 5,
    data?: Record<string, any>
  ) => {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: data || {},
          sound: "default",
          badge: 1,
        },
        trigger: {
          seconds,
        } as any,
      });

      return notificationId;
    } catch (error) {
      console.error("Erro ao agendar notificação:", error);
      return null;
    }
  };

  const scheduleDailyNotification = async (
    title: string,
    body: string,
    hour: number = 9,
    minute: number = 0,
    data?: Record<string, any>
  ) => {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: data || {},
          sound: "default",
          badge: 1,
        },
        trigger: {
          hour,
          minute,
          repeats: true,
        } as any,
      });

      return notificationId;
    } catch (error) {
      console.error("Erro ao agendar notificação diária:", error);
      return null;
    }
  };

  const cancelNotification = async (notificationId: string) => {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error("Erro ao cancelar notificação:", error);
    }
  };

  const cancelAllNotifications = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error("Erro ao cancelar todas as notificações:", error);
    }
  };

  return {
    requestPermissions,
    scheduleNotification,
    scheduleDailyNotification,
    cancelNotification,
    cancelAllNotifications,
  };
}
