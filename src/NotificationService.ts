import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Hora de estudar!',
      body: 'Não se esqueça de revisar seu plano de estudos hoje.',
      sound: 'default',
    },
    trigger: { seconds: 5 },
  });
}
