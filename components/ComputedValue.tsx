import { FC, ReactNode } from "react";

export type ComputedValueProps = {
  title: ReactNode;
  symbol?: ReactNode;
  value: string;
};

export const ComputedValue: FC<ComputedValueProps> = ({
  title,
  symbol,
  value,
}) => {
  return (
    <div className="">
      {symbol && <div className="text-md">{symbol}</div>}
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs whitespace-pre-wrap text-">{title}</div>
    </div>
  );
};
