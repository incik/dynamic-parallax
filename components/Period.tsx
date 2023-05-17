import type { BigNumber } from "mathjs";
import { FC } from "react";

export type PeriodProps = {
  T: BigNumber;
  T_years: BigNumber;
};

export const Period: FC<PeriodProps> = ({ T, T_years }) => {
  return (
    <div className="card ml-1 bg-base-200 shadow-sm">
      <div className="card-body p-3">
        <div className="stat-title">Perioda</div>
        <div className="stat-value text-lg text-secondary">
          {T_years.toString()} let
        </div>
        <div className="stat-desc">
          <span className="normal text-md">{T.toString()} s</span>
        </div>
      </div>
    </div>
  );
};
