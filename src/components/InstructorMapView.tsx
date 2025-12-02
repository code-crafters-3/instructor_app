import React, { useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Instructor } from '@/schemas/instructor.schema';

interface InstructorMapViewProps {
  instructors: Instructor[];
  userLocation: { latitude: number; longitude: number } | null;
  onMarkerPress?: (instructor: Instructor) => void;
  onRegionChange?: (region: Region) => void;
}

export function InstructorMapView({
  instructors,
  userLocation,
  onMarkerPress,
  onRegionChange,
}: InstructorMapViewProps) {
  const mapRef = useRef<MapView>(null);

  const initialRegion = {
    latitude: userLocation?.latitude || -23.5505,
    longitude: userLocation?.longitude || -46.6333,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const centerOnUserLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000
      );
    }
  };

  return (
    <Container>
      <StyledMapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton={false}
        onRegionChangeComplete={onRegionChange}
      >
        {instructors.map((instructor) => (
          <Marker
            key={instructor.id}
            coordinate={{
              latitude: instructor.location.latitude,
              longitude: instructor.location.longitude,
            }}
            onPress={() => onMarkerPress?.(instructor)}
          >
            <CustomMarker>
              <MarkerIcon
                name={
                  instructor.categories.includes('motorcycle')
                    ? 'bicycle'
                    : 'car-sport'
                }
                size={20}
                color="#fff"
              />
            </CustomMarker>
          </Marker>
        ))}
      </StyledMapView>

      {userLocation && (
        <CenterButton onPress={centerOnUserLocation} activeOpacity={0.8}>
          <Ionicons name="locate" size={24} color="#2196F3" />
        </CenterButton>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  position: relative;
`;

const StyledMapView = styled(MapView)`
  flex: 1;
`;

const CustomMarker = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.primary[500]};
  align-items: center;
  justify-content: center;
  border-width: 3px;
  border-color: #ffffff;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  elevation: 5;
`;

const MarkerIcon = styled(Ionicons)``;

const CenterButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;
