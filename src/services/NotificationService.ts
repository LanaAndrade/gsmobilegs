import * as Notifications from 'expo-notifications';

export async function scheduleNotification(
  title: string,
  body: string,
  secondsFromNow: number
) {
  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        seconds: secondsFromNow,
      },
    });

    return id;
  } catch (error) {
    console.log('Erro ao agendar notificação', error);
    return null;
  }
}
