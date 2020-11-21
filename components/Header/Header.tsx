import { useState } from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Input from "../Input";

import { login } from "../../services/users.service";

const Header = ({ userId }) => {
  const [userIdInput, setUserIdInput] = useState(userId);

  const handleSubmit = () => {
    login(userIdInput);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid gray"
    >
      <Typography variant="h1">Deck</Typography>

      {!userId && (
        <Input
          placeholder="Введите свой ID"
          inputProps={{ "aria-label": "card name" }}
          onSubmit={handleSubmit}
          onChange={(event) => setUserIdInput(event.target.value)}
        />
      )}

      {userId && (
        <Typography component="span" variant="h6">
          {userId}
        </Typography>
      )}
    </Box>
  );
};

export default Header;
