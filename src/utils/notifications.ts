import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { api } from '@/api/apiClient';

export const setupNotifications = async (): Promise<string | null> => {
  try {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Permissão para notificações não concedida');
      return null;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        sound: 'default',
      });
    }

    return token;
  } catch (error) {
    console.error('Erro ao configurar notificações:', error);
    return null;
  }
};

export const scheduleLocalNotification = async (
  title: string,
  body: string,
  delay: number = 0
) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: delay > 0 ? { seconds: delay } as Notifications.TimeIntervalTriggerInput : null,
    });
  } catch (error) {
    console.error('Erro ao agendar notificação local:', error);
  }
};

export const registerPushNotificationAsync = async (userId: string): Promise<boolean> => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Permissão para notificações push não concedida!');
      return false;
    }

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'OneCar Notifications',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#2196F3',
        sound: 'default',
        description: 'Notificações do aplicativo OneCar',
      });
    }

    const token = await Notifications.getExpoPushTokenAsync();
    console.log('token', token);
    console.log('🔔 Token push obtido:', token.data);

    const result = await api.post('/verificationToken/create', { 
      userId: userId, 
      tokenId: token.data 
    });
    
    console.log('✅ Token push registrado no backend:', result);

    return true;

  } catch (error) {
    console.error('❌ Erro ao registrar push notification:', error);
    return false;
  }
};