import * as Sharing from 'expo-sharing';

export async function shareAchievement(achievement: string) {
  const message = `Acabei de conquistar: ${achievement} no CareerMatch+! 🎉`;
  
  // Em uma versão futura, podemos gerar uma imagem para compartilhar
  // Por enquanto, compartilhamos apenas texto
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(message);
  } else {
    alert('Compartilhamento não disponível neste dispositivo');
  }
}