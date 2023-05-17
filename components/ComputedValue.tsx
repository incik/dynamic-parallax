import { FC, ReactNode } from "react";

export type ComputedValueProps = {
  title: ReactNode;
  symbol?: ReactNode;
  value: string;
  extraValue?: string;
};

export const ComputedValue: FC<ComputedValueProps> = ({
  title,
  symbol,
  value,
  extraValue,
}) => {
  return (
    <div className="">
      {symbol && <div className="text-md">{symbol}</div>}
      <div className="text-xl font-bold">{value}</div>
      {extraValue && <div className="text-xs mb-2">{extraValue}</div>}
      <div className="text-xs whitespace-pre-wrap text-">{title}</div>
    </div>
  );
};
