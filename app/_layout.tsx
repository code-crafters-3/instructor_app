import { useEffect, useState } from 'react';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Platform, StyleSheet } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { ThemeProvider } from '@/theme';
import { QueryProvider } from '@/providers/QueryProvider';
import { NotificationProvider } from '@/context/NotificationContext';
import { SocketProvider } from '@/context/SocketContext';
import { ModalManagerProvider } from '@/context/ModalManagerContext';
import { useAuthStore } from '@/stores/authStore';
import { useAuthNavigation } from '@/hooks/useAuthNavigation';
import { SocketListenerWrapper } from '@/components/SocketListenerWrapper';
import { PushNotificationManager } from '@/components/PushNotificationManager';
import styled from 'styled-components/native';

const ContentContainer = styled.View<{ paddingBottom: number }>`
  flex-grow: 1;
  padding-bottom: ${props => props.paddingBottom}px;
`;

export default function RootLayout() {
  const { isLoading } = useAuthStore();
  const [splashHidden, setSplashHidden] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const keyboardHeight = 0;
  const isKeyboardVisible = false;
  
  const { isNavigationReady } = useAuthNavigation();

  useEffect(() => {
    setIsMounted(true);
    
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  useEffect(() => {
    if (isMounted && isNavigationReady && !isLoading && !splashHidden) {
      const hideSplashScreen = async () => {
        try {
          await SplashScreen.hideAsync();
          setSplashHidden(true);
        } catch (error) {
          setSplashHidden(true);
        }
      };

      const timer = setTimeout(hideSplashScreen, 150);
      return () => clearTimeout(timer);
    }
  }, [isMounted, isNavigationReady, isLoading, splashHidden]);

  if (!isMounted || (isLoading && !splashHidden)) {
    return null;
  }

    const contentPaddingBottom = isKeyboardVisible 
    ? Platform.OS === 'ios' ? 32 : keyboardHeight + 32
    : 32;


  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <QueryProvider>
          <NotificationProvider>
            <ModalManagerProvider>
              <SocketProvider>
                <SocketListenerWrapper />
                {
                  /*
                  <PushNotificationManager />
                  */
                }
                <StatusBar style="auto" backgroundColor="transparent" translucent />
                <SafeAreaView style={styles.container} edges={['top']}>
                   <ContentContainer paddingBottom={contentPaddingBottom}>
                     <Slot />
                   </ContentContainer>
                </SafeAreaView>
              </SocketProvider>
            </ModalManagerProvider>
          </NotificationProvider>
        </QueryProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});