import React, { FC } from "react";

export type SymbolProps = {
  letter: string;
  index: string;
};

export const Symbol: FC<SymbolProps> = ({ letter, index }) => {
  return (
    <span>
      {letter}
      <sub>{index}</sub>
    </span>
  );
};
