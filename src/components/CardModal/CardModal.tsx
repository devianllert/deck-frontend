import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Card } from "../../services/cards.service";
import { parseMD } from "../../utils/parseMD";

interface CardModalProps {
  open: boolean;
  onClose?: () => void;
  card: Card;
}

const CardModal = (props: CardModalProps) => {
  const { open = false, onClose, card } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{card?.title}</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {parseMD(card?.description)}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Окей</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardModal;
