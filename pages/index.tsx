import { create, all, BigNumber } from "mathjs";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { G, M_S, L_S, Mag_S, PC } from "../lib/constants";
import { compute, computeStatic, findBestGuess } from "../lib/compute";

import { Chart } from "@/components/Chart";
import { IterationCard } from "@/components/IterationCard";
import { Constants } from "@/components/Constants";
import { ResultRecord } from "@/lib/types";
import { Header } from "@/components/Header";

const math = create(all, { number: "BigNumber", precision: 6 });

const { bignumber, format } = math;

enum ComputeMode {
  MANUAL,
  AUTO,
}

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [mode, setMode] = useState(ComputeMode.MANUAL);

  const [results, setResults] = useState<ResultRecord[]>([]);

  const [a, setA] = useState(bignumber("4.5"));
  const alpha = a.div(3600);
  const [b, setB] = useState(bignumber("3.4"));
  const beta = b.div(3600);
  const [observedFor, setObservedFor] = useState(11); // years
  const [mag_1, setmag_1] = useState(3.9);
  const [mag_2, setmag_2] = useState(5.3);

  const [expandedCard, setExpandedCard] = useState(0);

  const expandToggle = (index) => {
    setExpandedCard(index === expandedCard ? null : index);
  };

  // console.log("--");
  // console.log("h/a", math.round(h.div(a), 4).toString());
  // console.log("h/a^2", math.round(h.div(a.pow(2)), 4).toString());
  // console.log("h^2", math.round(h.pow(2), 4).toString());
  // console.log("acos(h/a)", math.round(math.acos(h.div(a)), 4).toString());
  // console.log("a^2 - h^2", a.pow(2).minus(h.pow(2)).toString());
  // console.log(
  //   "sqrt(a^2 - h^2)",
  //   math.round(sqrt(a.pow(2).minus(h.pow(2))), 4).toString()
  // );

  // console.log("total", math.evaluate("15.3*(0.8565 - 0.1456*3.4)").toString());

  const staticData = computeStatic(a, b, observedFor);

  // Usage example
  const initialGuess = M_S.times(2);
  console.log("Initial guess:", initialGuess.toString());
  const maxIterations = 10;
  // const results = [
  //   {
  //     M_guess: initialGuess,
  //     ...compute(staticData.T, initialGuess, alpha, mag_1, mag_2),
  //   },
  // ];
  // useMemo(() => {

  //}, [alpha, initialGuess, mag_1, mag_2, mode, staticData.T]);

  useEffect(() => {
    setExpandedCard(results.length - 1);
  }, [results]);

  useEffect(() => {
    const sessionResults = JSON.parse(
      sessionStorage.getItem("results") || "[]",
      math.reviver
    );
    setResults(
      mode === ComputeMode.MANUAL
        ? sessionResults.length > 0
          ? sessionResults
          : [
              {
                M_guess: initialGuess,
                ...compute(staticData.T, initialGuess, alpha, mag_1, mag_2),
              },
            ]
        : findBestGuess(
            initialGuess,
            staticData.T,
            alpha,
            mag_1,
            mag_2,
            maxIterations
          )
    );
  }, [mode]);

  return (
    <div className="App">
      <Header />
      <div className="flex justify-evenly">
        <div className="">
          <div>{/* <Constants /> */}</div>

          <div>
            <h2 className="text-lg font-bold mb-1 pl-2">Pozorování</h2>
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
                            ({alpha.toString()}&deg;)
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
                            ({beta.toString()}&deg;)
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

              <div className="stats ml-1">
                <div className="stat">
                  <div className="stat-title">Perioda</div>
                  <div className="stat-value text-lg">
                    {staticData.T_years.toString()} let
                    <br />
                    {staticData.T.toString()} s
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <h2>Calculations</h2>
            <pre>
              h = {staticData.h.toString()}
              <br />
              epsilon = {staticData.epsilon.toString()}
              <br />S = {staticData.S.toString()}
              <br />T = {staticData.T_years.toString()} years
              <br />
              {"  "}= {staticData.T.toString()} s
            </pre> */}

          <div className="form-control w-5/12">
            <label className="cursor-pointer label">
              <span className="label-text">Ruční odhad</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={mode === ComputeMode.AUTO}
                onChange={() =>
                  setMode(
                    mode === ComputeMode.AUTO
                      ? ComputeMode.MANUAL
                      : ComputeMode.AUTO
                  )
                }
              />
              <span className="label-text">Automatický odhad</span>
            </label>
          </div>

          <div className="form-control">
            <form
              onSubmit={handleSubmit((data) => {
                const newGuess = bignumber(data.nextGuess);
                const newResults = [
                  ...results,
                  {
                    M_guess: newGuess,
                    ...compute(staticData.T, newGuess, alpha, mag_1, mag_2),
                  },
                ];
                setResults(newResults);
                window.sessionStorage.setItem(
                  "results",
                  JSON.stringify(newResults)
                );
              })}
            >
              <label className="label">
                <span className="label-text">Odhad hmotnosti soustavy</span>
              </label>
              <label className="input-group">
                <input
                  defaultValue={M_S.times(2).toString()}
                  type="text"
                  className="input input-bordered"
                  {...register("nextGuess", {
                    required: true,
                    pattern: /^[-+]?[0-9]+\.?[0-9]+([eE][-+]?[0-9]+)$/i,
                  })}
                />
                <span>kg</span>
              </label>
              {errors.nextGuess?.type == "required" && "Musí být zadáno číslo"}
              {errors.nextGuess?.type == "pattern" &&
                "Číslo musí být ve tvaru 1.23e+4"}
              <button type="submit" className="btn btn-primary btn-sm ml-2">
                <span className="material-icons">Compute!</span>
              </button>
            </form>
            <button
              className="btn btn-error btn-sm ml-2"
              onClick={() => {
                if (confirm("Opravdu chcete vymazat všechny výpočty?")) {
                  setResults([]);
                  window.sessionStorage.removeItem("results");
                }
              }}
            >
              Vymazat výpočty
            </button>
          </div>

          <Chart data={results} />
        </div>

        <div>
          <h3>Iterations</h3>
          <div>
            {results.map((result, index) => {
              // const result = compute(
              //   staticData.T,
              //   M_guess,
              //   alpha,
              //   mag_1,
              //   mag_2
              // );
              // results.push(result.delta);

              const finished =
                (math.compare(result.delta.abs(), 1) as number) <= 0;

              return (
                <IterationCard
                  key={index}
                  index={index}
                  finished={finished}
                  iteration={result}
                  expanded={expandedCard === index}
                  expandToggle={(index) => setExpandedCard(index)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
