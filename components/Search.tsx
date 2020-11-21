import SearchIcon from '@material-ui/icons/Search';

import * as S from './styled';

interface SearchProps {
  onSearch: (event: any) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  return (
    <S.InputBox>
      <S.InputSearch
        onChange={onSearch}
        placeholder="Поиск по карточкам"
        inputProps={{ 'aria-label': 'card name' }}
      />

      <S.InputIcon type="submit" aria-label="search">
        <SearchIcon />
      </S.InputIcon>
    </S.InputBox>
  );
};

export default Search;
