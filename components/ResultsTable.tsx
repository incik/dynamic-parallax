import mathjs, { format, re } from "mathjs";
import { Symbol } from "./Symbol";
import { FC, Fragment, ReactNode } from "react";
import { ComputedValue } from "./ComputedValue";
import { ResultRecord } from "@/lib/types";

const ResultTableCell: FC<{ children: ReactNode; finished: boolean }> = ({
  children,
  finished,
}) => {
  return (
    <td
      className={`group-hover:bg-info group-hover:text-info-content group-hover:bg-opacity-20 ${
        finished && "bg-success text-success-content bg-opacity-75 font-bold"
      }`}
    >
      {children}
    </td>
  );
};

export type ResultsTableProps = {
  math: mathjs.MathJsStatic;
  results: ResultRecord[];
  expandedCard: number;
  setExpandedCard: (index: number) => void;
};

export const ResultsTable: FC<ResultsTableProps> = ({
  math,
  results,
  expandedCard,
  setExpandedCard,
}) => {
  return (
    <table className="table table-compact w-full table-auto">
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
        {results.length === 0 && (
          <tr>
            <td colSpan={4} className="text-center">
              <p className="text-sm text-gray-500">
                Zatím nebyly provedeny žádné výpočty.
              </p>
            </td>
          </tr>
        )}
        {results.map((result, index) => {
          const finished = (math.compare(result.delta.abs(), 1) as number) <= 0;

          return (
            <Fragment key={index}>
              <tr
                onClick={(_) => setExpandedCard(index)}
                className="cursor-pointer group"
              >
                <th
                  className={`group-hover:bg-info group-hover:text-info-content ${
                    finished
                      ? "bg-success text-success-content"
                      : expandedCard === index
                      ? "bg-info text-info-content"
                      : ""
                  }`}
                >
                  {index + 1}
                </th>
                <ResultTableCell finished={finished}>
                  {result.M_guess.toString()} kg
                </ResultTableCell>
                <ResultTableCell finished={finished}>
                  {result.M_1_2.toString()} kg
                </ResultTableCell>
                <ResultTableCell finished={finished}>
                  {result.delta.abs().toString()}%
                </ResultTableCell>
              </tr>
              {expandedCard === index && (
                <tr>
                  <td
                    colSpan={4}
                    className={
                      finished
                        ? "bg-success text-success-content bg-opacity-60"
                        : ""
                    }
                  >
                    <div className="grid grid-cols-2 gap-3 px-4 py-2">
                      <ComputedValue
                        title="Délka hlavní poloosy"
                        symbol={<Symbol letter="a" index="i" />}
                        value={`${format(result.a_i, {
                          notation: "exponential",
                        })} m`}
                      />

                      <ComputedValue
                        title="Vzdálenost od Země"
                        symbol={<Symbol letter="d" index="i" />}
                        value={`${format(result.d_i, {
                          notation: "exponential",
                        })} m`}
                        extraValue={`= ${result.d_i_pc.toString()} pc`}
                      />

                      <ComputedValue
                        title={
                          <>
                            Absolutní magnituda složky <strong>A</strong>
                          </>
                        }
                        symbol={<Symbol letter="Mag" index="1" />}
                        value={result.Mag_1.toString()}
                      />

                      <ComputedValue
                        title={
                          <>
                            Absolutní magnituda složky <strong>B</strong>
                          </>
                        }
                        symbol={<Symbol letter="Mag" index="2" />}
                        value={result.Mag_2.toString()}
                      />

                      <ComputedValue
                        title={
                          <>
                            Zářivý výkon složky <strong>A</strong>
                          </>
                        }
                        symbol={<Symbol letter="L" index="1" />}
                        value={`${format(result.L_1, {
                          notation: "exponential",
                        })} W`}
                      />

                      <ComputedValue
                        title={
                          <>
                            Zářivý výkon složky <strong>B</strong>
                          </>
                        }
                        symbol={<Symbol letter="L" index="2" />}
                        value={`${format(result.L_2, {
                          notation: "exponential",
                        })} W`}
                      />

                      <ComputedValue
                        title={
                          <>
                            Vypočtená hmotnost <strong>primární</strong> složky
                          </>
                        }
                        symbol={<Symbol letter="M" index="1" />}
                        value={`${format(result.M_1, {
                          notation: "exponential",
                        })} kg`}
                      />

                      <ComputedValue
                        title={
                          <>
                            Vypočtená hmotnost <strong>sekundární</strong>{" "}
                            složky
                          </>
                        }
                        symbol={<Symbol letter="M" index="2" />}
                        value={`${format(result.M_2, {
                          notation: "exponential",
                        })} kg`}
                      />

                      <ComputedValue
                        title="Vypočtená hmotnost soustavy"
                        symbol={
                          <>
                            <Symbol letter="M" index="1" /> +
                            <Symbol letter="M" index="2" />
                          </>
                        }
                        value={`${format(result.M_1_2, {
                          notation: "exponential",
                        })} kg`}
                      />

                      <ComputedValue
                        title="Odchylka odhadnuté a vypočtené hmotnosti"
                        value={`${result.delta.toString()} %`}
                      />
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};
