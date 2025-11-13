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
      title: "Hora de estudar! 📚",
      body: 'Não se esqueça de dedicar um tempinho para seus cursos hoje.',
      data: { data: 'goes here' },
    },
    trigger: { 
      hour: 18, 
      minute: 0,
      repeats: true 
    },
  });
}

export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    alert('Falha ao obter permissão para notificações!');
    return;
  }

  // Agendar notificação
  await schedulePushNotification();
}