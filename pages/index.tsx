import { useEffect, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import { QueryCache, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import ExitToApp from "@material-ui/icons/ExitToApp";

import Input from "../components/Input";
import CardListItem from "../components/CardListItem";

import { fetchAllCards, Card, fetchUserCards } from "../services/cards.service";
import { login, logout } from "../services/users.service";
import { getCookie } from "../utils/cookie";

const Home: NextPage<{ userID: string }> = (props) => {
  const { userID } = props;

  const { data: allCards } = useQuery("cards-all", fetchAllCards);
  const { data: myCards } = useQuery(["cards-my", userID], () => fetchUserCards(userID), {
    enabled: !!userID,
  });

  const [isAuth, setAuth] = useState(!!userID)
  const [searchCardsInput, setSearchCardsInput] = useState("");
  const [searchCards, setSearchCards] = useState(userID ? myCards : allCards);
  const [userIdInput, setUserIdInput] = useState(userID);
  const [isMy, setIsMy] = useState(!!userID);

  const filterCards = (): void => {
    const currentCards = isMy ? myCards : allCards;

    const filteredCards = currentCards.filter((card) => {
      const lowercasedTitle = card.title.toLowerCase();

      return lowercasedTitle.includes(searchCardsInput);
    });

    setSearchCards(filteredCards);
  };

  const handleSubmit = () => {
    login(userIdInput);

    fetchUserCards(userIdInput);
  };

  const handleChange = async () => {
    const nextState = !isMy;

    setIsMy(nextState);

    setSearchCards(nextState ? myCards : allCards);
  };

  const handleLogout = () => {
    setAuth(false);
    setIsMy(false);

    logout();
  }

  useEffect(() => {
    filterCards();
  }, [searchCardsInput, isMy]);

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid gray"
      >
        <Typography variant="h1">Deck</Typography>

        {isAuth && (
          <Box display="flex" alignItems="center">
            <Typography component="span" variant="h6">
              {userID.slice(-4)}
            </Typography>

            <IconButton aria-label="logout" onClick={handleLogout}>
              <ExitToApp />
            </IconButton>
          </Box>
        )}
      </Box>

      <Box my={2}>
        {!isAuth && (
          <Input
            placeholder="Введите свой ID"
            inputProps={{ "aria-label": "card name" }}
            onSubmit={handleSubmit}
            onChange={(event) => setUserIdInput(event.target.value)}
          />
        )}

        <Box display="flex" alignItems="center" flexWrap="wrap-reverse" my={2}>
          <Input
            placeholder="Поиск по карточкам"
            inputProps={{ "aria-label": "card name" }}
            onChange={(event) =>
              setSearchCardsInput(event.target.value.toLowerCase())
            }
          />

          {isAuth && (
            <Box ml="auto">
              <FormControlLabel
                control={<Switch checked={isMy} onChange={handleChange} />}
                label={isMy ? "Мои" : "Все"}
              />
            </Box>
          )}
        </Box>
      </Box>

      <Box>
        {searchCards.map((card: Card) => (
          <CardListItem key={card.id} card={card} my={isMy} />
        ))}
      </Box>
    </Container>
  );
};

Home.getInitialProps = async (ctx) => {
  const queryCache = new QueryCache();

  const userID = getCookie(ctx.req.headers.cookie, "userId");

  await queryCache.prefetchQuery("cards-all", fetchAllCards);
  await queryCache.prefetchQuery(["cards-my", userID], () => fetchUserCards(userID));

  return {
    dehydratedState: dehydrate(queryCache),
    userID,
  };
};

export default Home;
