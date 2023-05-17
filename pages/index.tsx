import { create, all } from "mathjs";
import { useEffect, useState } from "react";

import { M_S } from "../lib/constants";
import { compute, computeStatic, findBestGuess } from "../lib/compute";

import { Chart } from "@/components/Chart";
import { ResultRecord } from "@/lib/types";
import { Header } from "@/components/Header";
import { ObservationsForm } from "@/components/ObservationsForm";
import { ComputeForm } from "@/components/ComputeForm";
import { Heading } from "@/components/Heading";
import { Symbol } from "@/components/Symbol";
import { ResultsTable } from "@/components/ResultsTable";
import Head from "next/head";

const math = create(all, { number: "BigNumber", precision: 6 });

const { bignumber } = math;

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
              /* {
                M_guess: initialGuess,
                ...compute(staticData.T, initialGuess, alpha, mag_1, mag_2),
              }, */
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
  }, [mode, a, b, observedFor, mag_1, mag_2]);

  return (
    <div className="App bg-base-300">
      <Head>
        <title>Dynamická paralaxa</title>
      </Head>
      <Header />

      <div className="container mx-auto mt-8">
        <div className="container mx-auto flex flex-col lg:flex-row justify-evenly pb-4">
          <div className="flex flex-col lg:w-5/12 mb-4">
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

            <div className="mt-2">
              <Heading>Iterace výpočtů</Heading>

              <ResultsTable
                {...{ math, results, expandedCard, setExpandedCard }}
              />
            </div>
          </div>
        </div>

        <div className="text-center text-xs p-8">
          Made on 🌍 with ❤ by Tomáš Vaisar
        </div>
      </div>
    </div>
  );
}
