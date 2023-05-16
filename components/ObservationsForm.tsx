import { bignumber, BigNumber, format } from "mathjs";
import { FC } from "react";
import { Heading } from "./Heading";

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
}) => {
  return (
    <div>
      <Heading>Pozorování</Heading>
      <div className="flex">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex justify-around">
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
                    min={b.toString()}
                    className="input input-bordered w-24"
                    onChange={(e) => {
                      setA(bignumber(e.target.value));
                    }}
                  />
                  <span>
                    &quot;{" "}
                    <span className="text-xs italic">
                      ({format(alpha, { notation: "fixed", precision: 6 })}
                      &deg;)
                    </span>
                  </span>
                </label>
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
                    max={a.toString()}
                    className="input input-bordered w-24"
                    onChange={(e) => {
                      setB(bignumber(e.target.value));
                    }}
                  />
                  <span>
                    &quot;{" "}
                    <span className="text-xs italic">
                      ({format(beta, { notation: "fixed", precision: 6 })}&deg;)
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-around">
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

              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Relativní magnituda složky A
                  </span>
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
                    Relativní magnituda složky B
                  </span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
