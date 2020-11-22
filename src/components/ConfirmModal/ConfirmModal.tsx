import { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface ConfirmModalProps {
  title: string;
  description: string;
  open: boolean;
  onClose?: () => void;
  onAgree?: () => void;
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const {
    title,
    description,
    open = false,
    onClose,
    onAgree,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Нет</Button>

        <Button onClick={onAgree} variant="contained" autoFocus>
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
