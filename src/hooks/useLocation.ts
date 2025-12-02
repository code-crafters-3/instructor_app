import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useLocationStore } from '@/stores/locationStore';

export function useLocation() {
  const {
    userLocation,
    hasLocationPermission,
    isLoadingLocation,
    setUserLocation,
    setLocationPermission,
    setLoadingLocation,
  } = useLocationStore();

  const [error, setError] = useState<string | null>(null);

  const requestLocationPermission = async () => {
    try {
      setLoadingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setError('Permissão de localização negada');
        setLocationPermission(false);
        setLoadingLocation(false);
        return false;
      }

      setLocationPermission(true);
      return true;
    } catch {
      setError('Erro ao solicitar permissão de localização');
      setLoadingLocation(false);
      return false;
    }
  };

  const getCurrentLocation = async () => {
    try {
      setLoadingLocation(true);
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setLoadingLocation(false);
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch {
      setError('Erro ao obter localização');
      setLoadingLocation(false);
      return null;
    }
  };

  const initializeLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      await getCurrentLocation();
    }
  };

  useEffect(() => {
    initializeLocation();
  }, []);

  return {
    userLocation,
    hasLocationPermission,
    isLoadingLocation,
    error,
    requestLocationPermission,
    getCurrentLocation,
    initializeLocation,
  };
}
