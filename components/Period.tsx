import type { BigNumber } from "mathjs";
import { FC } from "react";

export type PeriodProps = {
  T: BigNumber;
  T_years: BigNumber;
};

export const Period: FC<PeriodProps> = ({ T, T_years }) => {
  return (
    <div className="card ml-1 text-success-content bg-success bg-opacity-20 shadow-sm">
      <div className="card-body p-3">
        <div className="stat-title text-success-content">Perioda</div>
        <div className="stat-value text-lg">{T_years.toString()} let</div>
        <div className="stat-desc text-success-content">
          <span className="normal text-md">{T.toString()} s</span>
        </div>
      </div>
    </div>
  );
};
