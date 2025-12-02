import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Instructor } from '@/schemas/instructor.schema';

interface InstructorCardProps {
  instructor: Instructor;
  distance?: number;
  onPress?: () => void;
}

export function InstructorCard({
  instructor,
  distance,
  onPress,
}: InstructorCardProps) {
  const getCategoryIcon = (category: 'car' | 'motorcycle') => {
    return category === 'car' ? 'car-sport' : 'bicycle';
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <CardContainer>
        <Header>
          <Avatar
            source={{
              uri: instructor.avatar || 'https://i.pravatar.cc/150?img=1',
            }}
          />
          <HeaderInfo>
            <InstructorName>{instructor.name}</InstructorName>
            <RatingContainer>
              <Ionicons name="star" size={14} color="#FFB74D" />
              <RatingText>
                {instructor.rating.toFixed(1)} ({instructor.totalClasses}{' '}
                aulas)
              </RatingText>
            </RatingContainer>
          </HeaderInfo>
        </Header>

        <Content>
          <InfoRow>
            <CategoryBadges>
              {instructor.categories.map((category) => (
                <CategoryBadge key={category}>
                  <Ionicons
                    name={getCategoryIcon(category)}
                    size={14}
                    color="#2196F3"
                  />
                  <CategoryText>
                    {category === 'car' ? 'Carro' : 'Moto'}
                  </CategoryText>
                </CategoryBadge>
              ))}
            </CategoryBadges>
          </InfoRow>

          <InfoRow>
            <InfoItem>
              <Ionicons name="cash-outline" size={16} color="#4CAF50" />
              <InfoText>{formatPrice(instructor.pricePerHour)}/hora</InfoText>
            </InfoItem>
            <InfoItem>
              <Ionicons name="ribbon-outline" size={16} color="#FF9800" />
              <InfoText>{instructor.yearsOfExperience} anos exp.</InfoText>
            </InfoItem>
          </InfoRow>

          {distance !== undefined && (
            <InfoRow>
              <InfoItem>
                <Ionicons name="location-outline" size={16} color="#9E9E9E" />
                <InfoText>{distance.toFixed(1)} km de você</InfoText>
              </InfoItem>
            </InfoRow>
          )}
        </Content>
      </CardContainer>
    </TouchableOpacity>
  );
}

const CardContainer = styled.View`
  background-color: ${({ theme }) => theme.background};
  border-radius: 16px;
  padding: 16px;
  margin-horizontal: 16px;
  margin-bottom: 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 3;
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const Avatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${({ theme }) => theme.surface};
`;

const HeaderInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const InstructorName = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 4px;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RatingText = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
  margin-left: 4px;
`;

const Content = styled.View`
  gap: 8px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CategoryBadges = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const CategoryBadge = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.primary[100]};
  padding: 6px 12px;
  border-radius: 20px;
  gap: 4px;
`;

const CategoryText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary[700]};
`;

const InfoItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const InfoText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 500;
`;
