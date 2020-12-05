import Box from "@material-ui/core/Box";

import styled from "styled-components";

interface CardWrapperProps {
  $drops: boolean;
  rarity: number;
}

const rarityColors = ["#78909C", "#66BB6A", "#42A5F5", "#AB47BC", "#FFA726"];

export const CardWrapper = styled(Box)<CardWrapperProps>`
  position: relative;

  opacity: ${({ $drops }) => ($drops ? 1 : 0.5)};
  cursor: ${({ $drops }) => ($drops ? "default" : "not-allowed")};

  overflow: hidden;

  &:before {
    content: "";

    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;

    height: 100%;
    width: 4px;

    background-color: ${({ rarity }) => rarityColors[rarity]};
  }
`;
