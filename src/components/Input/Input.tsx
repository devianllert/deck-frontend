import { ChangeEvent, FormEvent } from "react";

import SearchIcon from "@material-ui/icons/Search";
import { InputBaseProps } from "@material-ui/core";

import * as S from "./styled";

interface InputProps extends InputBaseProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (event: FormEvent<HTMLDivElement>) => void;
}

const Input = (props: InputProps) => {
  const {
    onChange,
    onSubmit,
    ...otherProps
  } = props;

  return (
    <S.InputBox component="form" onSubmit={onSubmit}>
      <S.InputSearch
        onChange={onChange}
        {...otherProps}
      />

      <S.InputIcon type="submit" aria-label="search">
        <SearchIcon />
      </S.InputIcon>
    </S.InputBox>
  );
};

export default Input;
