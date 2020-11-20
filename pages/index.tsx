import { NextPage } from 'next';
import axios from 'axios';
import styled from 'styled-components';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import { parseMD } from '../utils/parseMD';

interface Card {
  id: number;
  title: string;
  description: string;
  rarity: number;
  drops: boolean;
}

interface CardItemProps {
  drops: boolean;
  rarity: number;
}

const rarityColors = ['#78909C', '#66BB6A', '#42A5F5', '#AB47BC', '#FFA726'];

const CardItem = styled(Box)<CardItemProps>`
  position: relative;

  opacity: ${({ drops }) => drops ? 1 : 0.5};
  cursor: ${({ drops }) => drops ? 'default' : 'not-allowed'};

  overflow: hidden;

  &:before {
    content: '';

    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;

    height: 100%;
    width: 4px;

    background-color: ${({ rarity }) => rarityColors[rarity]};
  }
`;

const Home: NextPage<{ cards: Card[]; }> = ({ cards }) => {
  return (
    <Container maxWidth="md">
    <Box my={4} borderBottom="1px solid gray">
      <Typography variant="h1">
        Deck
      </Typography>
    </Box>

    <Box>
      {cards.map((card) => (
        <CardItem
          key={card.id}
          drops={card.drops}
          rarity={card.rarity}
          component={Paper}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          minHeight={64}
          mb={2}
          p={2}
        >
          <Typography variant="subtitle1">
            {card.title}
          </Typography>

          <Typography variant="body2">
            {parseMD(card.description)}
          </Typography>
        </CardItem>
      ))}
    </Box>
  </Container>
  );
};

Home.getInitialProps = async () => {
  const { data } = await axios.get<Card[]>('http://176.119.157.171:3000/cards');

  const sortedCards = data.sort((a, b) => a.rarity > b.rarity ? 1 : -1);

  return {    
    cards: sortedCards,
  };
};

export default Home;
