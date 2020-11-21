import styled from "styled-components";

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

export const InputBox = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  max-width: 400px;
  width: 100%;
`;

export const InputSearch = styled(InputBase)`
  margin-left: 8px;
  flex: 1;
`;

export const InputIcon = styled(IconButton)`
  padding: 10px;
`;