import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { InstructorCard } from '@/components/InstructorCard';
import { InstructorMapView } from '@/components/InstructorMapView';
import { useInstructorStore } from '@/stores/instructorStore';
import { useLocationStore } from '@/stores/locationStore';
import { useLocation } from '@/hooks/useLocation';
import { Instructor } from '@/schemas/instructor.schema';

export const HomeScreen: React.FC = () => {
  const { instructors, isLoading, fetchInstructors } = useInstructorStore();
  const { userLocation } = useLocationStore();
  const { isLoadingLocation, error: locationError } = useLocation();
  const mapHeight = 300;

  useEffect(() => {
    fetchInstructors({
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
    });
  }, [userLocation]);

  const calculateDistance = (instructor: Instructor) => {
    if (!userLocation) return 0;

    const R = 6371; // Raio da Terra em km
    const dLat = toRad(instructor.location.latitude - userLocation.latitude);
    const dLon = toRad(instructor.location.longitude - userLocation.longitude);
    const lat1 = toRad(userLocation.latitude);
    const lat2 = toRad(instructor.location.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(lat1) *
        Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (value: number) => {
    return (value * Math.PI) / 180;
  };

  const handleMarkerPress = (instructor: Instructor) => {
    // TODO: Navegar para detalhes ou abrir modal
    console.log('Instrutor selecionado:', instructor.name);
  };

  const renderEmptyState = () => (
    <EmptyStateContainer>
      <Ionicons name="search-outline" size={64} color="#9E9E9E" />
      <EmptyStateTitle>Nenhum instrutor encontrado</EmptyStateTitle>
      <EmptyStateText>
        Não há instrutores disponíveis na sua região no momento.
      </EmptyStateText>
    </EmptyStateContainer>
  );

  if (isLoadingLocation) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator size="large" color="#2196F3" />
          <LoadingText>Obtendo sua localização...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  if (locationError) {
    return (
      <Container>
        <ErrorContainer>
          <Ionicons name="location-outline" size={64} color="#F44336" />
          <ErrorTitle>Erro de Localização</ErrorTitle>
          <ErrorText>{locationError}</ErrorText>
          <ErrorText style={{ fontSize: 13, marginTop: 8 }}>
            Ative a permissão de localização nas configurações do dispositivo.
          </ErrorText>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderTitle>Instrutores Próximos</HeaderTitle>
        <HeaderSubtitle>
          {instructors.length} instrutor{instructors.length !== 1 ? 'es' : ''}{' '}
          disponíveis
        </HeaderSubtitle>
      </Header>

      <MapContainer style={{ height: mapHeight }}>
        <InstructorMapView
          instructors={instructors}
          userLocation={userLocation}
          onMarkerPress={handleMarkerPress}
        />
      </MapContainer>

      <ListHeader>
        <ListTitle>Lista de Instrutores</ListTitle>
        <Ionicons name="list" size={20} color="#2196F3" />
      </ListHeader>

      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#2196F3" />
        </LoadingContainer>
      ) : (
        <FlatList
          data={instructors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <InstructorCard
              instructor={item}
              distance={calculateDistance(item)}
              onPress={() => handleMarkerPress(item)}
            />
          )}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={{ paddingBottom: 16, paddingTop: 8 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.surface};
`;

const Header = styled.View`
  background-color: ${({ theme }) => theme.background};
  padding: 20px 16px 16px 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.border};
`;

const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 4px;
`;

const HeaderSubtitle = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
`;

const MapContainer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.surface};
`;

const ListHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${({ theme }) => theme.background};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.border};
`;

const ListTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LoadingText = styled.Text`
  margin-top: 12px;
  font-size: 16px;
  color: ${({ theme }) => theme.textSecondary};
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const ErrorTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-top: 16px;
  margin-bottom: 8px;
`;

const ErrorText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  line-height: 20px;
`;

const EmptyStateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 48px 32px;
`;

const EmptyStateTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-top: 16px;
  margin-bottom: 8px;
`;

const EmptyStateText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  line-height: 20px;
`;
