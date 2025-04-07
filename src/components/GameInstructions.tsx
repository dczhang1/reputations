import React from 'react';
import styled from 'styled-components';
import { GameMode } from '../types/game';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  color: #34495e;
  margin-bottom: 0.8rem;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  color: #555;
  line-height: 1.4;
`;

const ModeSection = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f7f9fc;
  border-radius: 4px;
`;

interface GameInstructionsProps {
  gameMode: GameMode;
}

export const GameInstructions: React.FC<GameInstructionsProps> = ({ gameMode }) => {
  return (
    <Container>
      <Title>How to Play Reputations</Title>
      
      <Section>
        <SectionTitle>Game Overview</SectionTitle>
        <ListItem>
          Reputations is a social deduction card game where players try to match each other's rankings of personality traits.
        </ListItem>
        <ListItem>
          Each round, one player becomes the "subject" while others try to predict how the subject would rank the traits.
        </ListItem>
      </Section>

      <Section>
        <SectionTitle>Gameplay</SectionTitle>
        <List>
          <ListItem>Each round, players receive 5 trait cards</ListItem>
          <ListItem>The subject ranks the traits from 1 (least like them) to 5 (most like them)</ListItem>
          <ListItem>Other players try to match the subject's ranking</ListItem>
          <ListItem>Points are awarded based on how closely players match the subject's ranking</ListItem>
        </List>
      </Section>

      <ModeSection>
        <SectionTitle>Game Mode: {gameMode === GameMode.CLASSICAL ? 'Classical' : 'Competitive'}</SectionTitle>
        {gameMode === GameMode.CLASSICAL ? (
          <>
            <ListItem>2-4 players</ListItem>
            <ListItem>Players work together to achieve the highest team score</ListItem>
            <ListItem>Perfect matches earn 10 points, close matches earn 5 points</ListItem>
          </>
        ) : (
          <>
            <ListItem>3-6 players</ListItem>
            <ListItem>Players compete individually for the highest score</ListItem>
            <ListItem>Perfect matches earn 10 points, close matches earn 5 points</ListItem>
            <ListItem>Additional points for being the best predictor each round</ListItem>
          </>
        )}
      </ModeSection>

      <Section>
        <SectionTitle>Scoring</SectionTitle>
        <List>
          <ListItem>Exact match: 10 points</ListItem>
          <ListItem>Close match (within 1 rank): 5 points</ListItem>
          <ListItem>Maximum points per round: 50</ListItem>
        </List>
      </Section>
    </Container>
  );
}; 