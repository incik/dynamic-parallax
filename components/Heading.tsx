import { FC, ReactNode } from "react";

export type HeadingProps = {
  children: ReactNode;
};

export const Heading: FC<HeadingProps> = ({ children }) => {
  return <h2 className="text-lg font-bold mb-1 pl-2">{children}</h2>;
};
