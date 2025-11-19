import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export async function shareTextAsFile(filename: string, content: string) {
  try {
    const fileUri = FileSystem.cacheDirectory + filename;

    await FileSystem.writeAsStringAsync(fileUri, content, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const isAvailable = await Sharing.isAvailableAsync();

    if (!isAvailable) {
      console.log('Compartilhamento não está disponível neste dispositivo.');
      return;
    }

    await Sharing.shareAsync(fileUri);
  } catch (error) {
    console.error('Erro ao compartilhar arquivo:', error);
  }
}
