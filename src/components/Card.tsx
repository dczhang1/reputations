import React from 'react';
import styled from 'styled-components';

interface CardProps {
  text: string;
  category: string;
  rank?: number;
  isSelected: boolean;
}

const Container = styled.div<{ isSelected: boolean }>`
  width: 200px;
  height: 300px;
  background-color: ${props => props.isSelected ? '#3498db' : 'white'};
  color: ${props => props.isSelected ? 'white' : '#2c3e50'};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CardText = styled.div`
  font-size: 1.2rem;
  line-height: 1.4;
  margin-bottom: 1rem;
`;

const CardCategory = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors?.textSecondary || '#7f8c8d'};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const RankBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: ${props => props.theme.colors?.primary || '#3498db'};
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export const Card: React.FC<CardProps> = ({ text, category, rank, isSelected }) => {
  return (
    <Container isSelected={isSelected}>
      {rank !== undefined && <RankBadge>{rank}</RankBadge>}
      <CardText>{text}</CardText>
      <CardCategory>{category}</CardCategory>
    </Container>
  );
}; 