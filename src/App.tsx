import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GameProvider } from './context/GameContext';
import { GameBoard } from './components/GameBoard';
import { WelcomeScreen } from './components/WelcomeScreen';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
`;

const Header = styled.header`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.sm};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.xxl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  text-align: center;
  margin: 0;
`;

const GameContent: React.FC = () => {
  const { currentRound } = useGameState();
  
  return currentRound === 0 ? <WelcomeScreen /> : <GameBoard />;
};

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <GameProvider>
        <Container>
          <Header>
            <Title>Reputations</Title>
          </Header>
          <GameContent />
        </Container>
      </GameProvider>
    </ThemeProvider>
  );
}; 