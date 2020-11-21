import { useState } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import { parseMD } from '../utils/parseMD';
import { fetchAllCards, Card } from '../services/cards.service';

import Search from '../components/Search';

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
  const [searchCards, setSearchCards] = useState(cards);

  const filterCards = (event): void => {
    const filteredCards = cards.filter((card) => {
      const lowercasedTitle = card.title.toLowerCase();

      return lowercasedTitle.includes(event.target.value.toLowerCase())
    });

    setSearchCards(filteredCards);
  }

  return (
    <Container maxWidth="md">
    <Box my={4} borderBottom="1px solid gray">
      <Typography variant="h1">
        Deck
      </Typography>
    </Box>

    <Box mb={2}>
      <Search onSearch={filterCards} />
    </Box>

    <Box>
      {searchCards.map((card: Card) => (
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
  const cards = await fetchAllCards();

  return {    
    cards,
  };
};

export default Home;
