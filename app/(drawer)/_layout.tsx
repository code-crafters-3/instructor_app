import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { useTheme } from '@/theme';
import { CustomDrawerContent } from '@/components/CustomDrawerContent';

export default function DrawerLayout() {
  const theme = useTheme();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerPosition: 'left',
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: theme.background,
          width: 280,
        },
        headerStyle: {
          backgroundColor: theme.surface,
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4,
        },
        headerTintColor: theme.primary[500],
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: '',
        }}
      />
    </Drawer>
  );
}