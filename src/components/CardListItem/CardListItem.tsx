import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { Card } from "../../services/cards.service";

import { parseMD } from "../../utils/parseMD";

import * as S from "./styled";

interface CardListItemProps {
  card: Card;
  onUse?: (card: Card) => void;
}

const CardListItem = ({ card, onUse }: CardListItemProps) => {
  return (
    <S.CardWrapper
      drops={card.count ? true : card.drops}
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
        {card.count ? `${card.count}x ${card.title}` : card.title}
      </Typography>

      <Typography variant="body2">{parseMD(card.description)}</Typography>
    </S.CardWrapper>
  );
};

export default CardListItem;
