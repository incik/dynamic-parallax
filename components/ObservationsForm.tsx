import { bignumber, BigNumber, format, max } from "mathjs";
import { FC } from "react";
import { Period } from "./Period";

export type ObservationsFormProps = {
  a: BigNumber;
  b: BigNumber;
  alpha: BigNumber;
  beta: BigNumber;
  observedFor: number;
  mag_1: number;
  mag_2: number;
  setA: (a: BigNumber) => void;
  setB: (b: BigNumber) => void;
  setObservedFor: (observedFor: number) => void;
  setmag_1: (mag_1: number) => void;
  setmag_2: (mag_2: number) => void;
  T: BigNumber;
  T_years: BigNumber;
};

export const ObservationsForm: FC<ObservationsFormProps> = ({
  a,
  b,
  alpha,
  beta,
  observedFor,
  mag_1,
  mag_2,
  setA,
  setB,
  setObservedFor,
  setmag_1,
  setmag_2,
  T,
  T_years,
}) => {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Úhlová velikost hlavní poloosy <strong>a</strong>
              </span>
            </label>
            <label className="input-group">
              <input
                defaultValue={a.toString()}
                type="number"
                step="0.1"
                placeholder="0.01"
                min={max(0.1, b).toString()}
                className="input input-bordered w-24"
                onChange={(e) => {
                  setA(bignumber(e.target.value));
                }}
              />
              <span>&quot; </span>
            </label>
            <span className="text-xs italic ml-4">
              ({format(alpha, { notation: "fixed", precision: 6 })}
              &deg;)
            </span>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Relativní magnituda složky A</span>
            </label>
            <input
              defaultValue={mag_1.toString()}
              type="number"
              step={0.1}
              className="input input-bordered w-24"
              onChange={(e) => {
                setmag_1(parseFloat(e.target.value));
              }}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Úhlová velikost vedlejší poloosy <strong>b</strong>
              </span>
            </label>
            <label className="input-group">
              <input
                defaultValue={b.toString()}
                type="number"
                step="0.1"
                placeholder="0.01"
                min={0.1}
                max={a.toString()}
                className="input input-bordered w-24"
                onChange={(e) => {
                  setB(bignumber(e.target.value));
                }}
              />
              <span>&quot; </span>
            </label>
            <span className="text-xs italic ml-4">
              ({format(beta, { notation: "fixed", precision: 6 })}&deg;)
            </span>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Relativní magnituda složky B</span>
            </label>
            <input
              defaultValue={mag_2.toString()}
              type="number"
              step={0.1}
              className="input input-bordered w-24"
              onChange={(e) => {
                setmag_2(parseFloat(e.target.value));
              }}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Soustava pozorována</span>
            </label>
            <label className="input-group">
              <input
                defaultValue={observedFor.toString()}
                type="number"
                step={1}
                min={1}
                className="input input-bordered w-24"
                onChange={(e) => {
                  setObservedFor(parseInt(e.target.value, 10));
                }}
              />
              <span>let</span>
            </label>
          </div>

          <Period T={T} T_years={T_years} />
        </div>
      </div>
    </div>
  );
};
