import { useEffect, useState, FormEvent } from "react";
import { GetServerSideProps, NextPage } from "next";
import { QueryCache, useMutation, useQuery, useQueryCache } from "react-query";
import { dehydrate } from "react-query/hydration";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";

import Input from "../components/Input";
import CardListItem from "../components/CardListItem";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";
import CardModal from "../components/CardModal/CardModal";

import {
  fetchAllCards,
  Card,
  fetchUserCards,
  drawCard,
} from "../services/cards.service";
import { login, logout } from "../services/users.service";
import { getCookie } from "../utils/cookie";

const Home: NextPage<{ userID: string }> = (props) => {
  const { userID } = props;

  const { data: allCards } = useQuery("cards-all", fetchAllCards);
  const { data: myCards, refetch } = useQuery(
    "cards-my",
    () => fetchUserCards(userID),
    {
      enabled: !!userID,
    }
  );

  const [mutateDraw, { data: drawnedCard, isLoading }] = useMutation(drawCard, {
    onSettled: async () => {
      const cards = await refetch();

      if (isMy) {
        setSearchCards(cards);
      }
    },
  });

  const [isAuth, setAuth] = useState(!!userID);
  const [searchCardsInput, setSearchCardsInput] = useState("");
  const [searchCards, setSearchCards] = useState(userID ? myCards : allCards);
  const [userIdInput, setUserIdInput] = useState(userID);
  const [isMy, setIsMy] = useState(!!userID);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false);

  const filterCards = (): void => {
    const currentCards = isMy ? myCards : allCards;

    const filteredCards = currentCards.filter((card) => {
      const lowercasedTitle = card.title.toLowerCase();

      return lowercasedTitle.includes(searchCardsInput);
    });

    setSearchCards(filteredCards);
  };

  const handleSubmit = () => login(userIdInput);

  const handleChange = async () => {
    const nextState = !isMy;

    setIsMy(nextState);

    setSearchCards(nextState ? myCards : allCards);
  };

  const handleDraw = async () => {
    if (isLoading) return;

    await mutateDraw(userID);

    setOpenConfirmModal(false);
    setOpenCardModal(true);
  };

  const handleLogout = () => {
    setAuth(false);
    setIsMy(false);

    logout();
  };

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

        <Box display="flex" alignItems="center" flexDirection="column" my={2}>
          {isAuth && (
            <Box
              width="100%"
              display="flex"
              justifyContent="space-between"
              mb={2}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpenConfirmModal(true)}
              >
                Draw
              </Button>

              <FormControlLabel
                control={<Switch checked={isMy} onChange={handleChange} />}
                label={isMy ? "Мои" : "Все"}
              />
            </Box>
          )}

          <Box width="100%">
            <Input
              placeholder="Поиск по карточкам"
              inputProps={{ "aria-label": "card name" }}
              onChange={(event) =>
                setSearchCardsInput(event.target.value.toLowerCase())
              }
            />
          </Box>
        </Box>
      </Box>

      <Box>
        {searchCards.map((card: Card) => (
          <CardListItem key={card.id} card={card} />
        ))}

        {searchCards.length <= 0 && searchCardsInput && (
          <Box
            my={4}
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body1">
              По вашему запросу карт не найдено
            </Typography>
          </Box>
        )}

        {searchCards.length <= 0 && isMy && !searchCardsInput && (
          <Box
            my={4}
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body1">
              В вашем инвентаре нет карточек
            </Typography>
          </Box>
        )}
      </Box>

      <ConfirmModal
        open={openConfirmModal}
        onAgree={handleDraw}
        onClose={() => setOpenConfirmModal(false)}
      />

      <CardModal
        open={openCardModal}
        onClose={() => setOpenCardModal(false)}
        card={drawnedCard}
      />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryCache = new QueryCache();

  const userID = getCookie(ctx.req.headers.cookie, "userId");

  await queryCache.prefetchQuery("cards-all", fetchAllCards);

  if (userID) {
    await queryCache.prefetchQuery("cards-my", () => fetchUserCards(userID));
  }

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
      userID,
    },
  };
};

export default Home;
