import { create, all, BigNumber } from "mathjs";
import { useEffect, useMemo, useState } from "react";

import { G, M_S, L_S, Mag_S, PC } from "../lib/constants";
import { compute, computeStatic, findBestGuess } from "../lib/compute";

import { Chart } from "@/components/Chart";
import { IterationCard } from "@/components/IterationCard";
import { ResultRecord } from "@/lib/types";
import { Header } from "@/components/Header";
import { ObservationsForm } from "@/components/ObservationsForm";
import { ComputeForm } from "@/components/ComputeForm";
import { Heading } from "@/components/Heading";
import { Symbol } from "@/components/Symbol";
import { Period } from "@/components/Period";

const math = create(all, { number: "BigNumber", precision: 6 });

const { bignumber, format } = math;

export enum ComputeMode {
  MANUAL,
  AUTO,
}

export default function App() {
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

  const staticData = computeStatic(a, b, observedFor);

  // Usage example
  const initialGuess = M_S.times(2);
  const maxIterations = 10;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <div className="App bg-base-300">
      <Header />

      <div className="container mx-auto flex flex-col lg:flex-row justify-evenly">
        <div className="flex flex-col lg:w-5/12">
          <Heading>Pozorování</Heading>
          <ObservationsForm
            a={a}
            b={b}
            alpha={alpha}
            beta={beta}
            mag_1={mag_1}
            mag_2={mag_2}
            observedFor={observedFor}
            setA={setA}
            setB={setB}
            setmag_1={setmag_1}
            setmag_2={setmag_2}
            setObservedFor={setObservedFor}
            T={staticData.T}
            T_years={staticData.T_years}
          />
          <ComputeForm
            mode={mode}
            setMode={setMode}
            results={results}
            setResults={setResults}
            T={staticData.T}
            T_years={staticData.T_years}
            alpha={alpha}
            mag_1={mag_1}
            mag_2={mag_2}
          />
        </div>

        <div className="flex flex-col lg:w-6/12">
          <div className="">
            <Heading>
              Rozdíl odhadnuté a vypočtené <Symbol letter="M" index={"1"} /> +{" "}
              <Symbol letter="M" index={"2"} />
            </Heading>
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body p-3">
                <Chart data={results} />
              </div>
            </div>
          </div>

          <div>
            <Heading>Iterace výpočtů</Heading>

            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    Odhad <Symbol letter="M" index="1" /> +{" "}
                    <Symbol letter="M" index="2" />
                  </th>
                  <th>
                    Vypočtené <Symbol letter="M" index="1" /> +{" "}
                    <Symbol letter="M" index="2" />
                  </th>
                  <th>&delta;</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => {
                  const finished =
                    (math.compare(result.delta.abs(), 1) as number) <= 0;

                  return (
                    <tr key={index} className={finished ? "text-primary" : ""}>
                      <th>{index}</th>
                      <td>{result.M_guess.toString()} kg</td>
                      <td>{result.M_1_2.toString()} kg</td>
                      <td
                        className={
                          finished ? "bg-primary text-primary-content" : ""
                        }
                      >
                        {result.delta.abs().toString()}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex justify-evenly flex-wrap w-11/12">
              {results.map((result, index) => {
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
    </div>
  );
}
