import { create } from 'zustand';

interface Coords {
  latitude: number;
  longitude: number;
}

interface Region extends Coords {
  latitudeDelta: number;
  longitudeDelta: number;
}

interface LocationState {
  userLocation: Coords | null;
  selectedRegion: Region | null;
  hasLocationPermission: boolean;
  isLoadingLocation: boolean;
  setUserLocation: (location: Coords) => void;
  setSelectedRegion: (region: Region) => void;
  setLocationPermission: (hasPermission: boolean) => void;
  setLoadingLocation: (isLoading: boolean) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  userLocation: null,
  selectedRegion: null,
  hasLocationPermission: false,
  isLoadingLocation: false,

  setUserLocation: (location) => {
    set({ userLocation: location });
  },

  setSelectedRegion: (region) => {
    set({ selectedRegion: region });
  },

  setLocationPermission: (hasPermission) => {
    set({ hasLocationPermission: hasPermission });
  },

  setLoadingLocation: (isLoading) => {
    set({ isLoadingLocation: isLoading });
  },
}));
