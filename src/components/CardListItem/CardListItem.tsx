import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { Card } from "../../services/cards.service";

import { parseMD } from "../../utils/parseMD";

import ConfirmModal from "../ConfirmModal/ConfirmModal";

import * as S from "./styled";
import { Box, Button } from "@material-ui/core";

interface CardListItemProps {
  card: Card;
  onUse?: (cardId: string) => Promise<void>;
}

const CardListItem = ({ card, onUse }: CardListItemProps) => {
  const [open, setOpen] = useState(false);

  const hasCard = card.count > 0;

  const handleUse = async () => {
    setOpen(false);

    await onUse(card.id.toString());
  };

  return (
    <>
      {hasCard && (
        <ConfirmModal
          title={`Use ${card.title}?`}
          description={card.description}
          open={open}
          onAgree={handleUse}
          onClose={() => setOpen(false)}
        />
      )}

      <S.CardWrapper
        $drops={card.count ? true : card.drops}
        rarity={card.rarity}
        component={Paper}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        minHeight={64}
        mb={2}
        p={2}
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1">
            {card.count ? `${card.count}x ${card.title}` : card.title}
          </Typography>

          {hasCard && (
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => setOpen(true)}
            >
              Use
            </Button>
          )}
        </Box>

        <Typography variant="body2">{parseMD(card.description)}</Typography>
      </S.CardWrapper>
    </>
  );
};

export default CardListItem;
