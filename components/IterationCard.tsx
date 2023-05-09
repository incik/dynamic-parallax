import { format, i } from "mathjs";
import { Symbol } from "./Symbol";
import { type ResultRecord } from "../lib/types";
import { type FC } from "react";

export type ResultRecordProps = {
  iteration: ResultRecord;
  index: number;
  finished: boolean;
  expanded: boolean;
  expandToggle: (index: number) => void;
};

export const IterationCard: FC<ResultRecordProps> = ({
  iteration,
  index,
  finished,
  expanded,
  expandToggle,
}) => {
  return (
    <div
      className={`card ${
        finished ? "bg-primary text-primary-content" : "bg-base-100" //[#88dc88]
      } shadow-sm mb-2`}
      key={`iteration-${index}`}
    >
      <div className="indicator w-auto">
        <span className="indicator-item badge badge-primary left-0 right-auto">
          #{index + 1}
        </span>

        <div className="card-body w-auto">
          <div
            className="card-title flex justify-between cursor-pointer"
            onClick={() => expandToggle(index)}
          >
            <h2>
              <Symbol letter="M" index="1" /> + <Symbol letter="M" index="2" />{" "}
              = {iteration.M_guess.toString()} kg
            </h2>
            <div className={finished ? "text-while" : "text-primary"}>
              &delta;: {iteration.delta.abs().toString()}%
            </div>
          </div>
          {expanded && (
            <>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">
                    <Symbol letter="a" index="i" />
                  </div>
                  <div className="stat-value text-lg">
                    {format(iteration.a_i, {
                      notation: "exponential",
                    })}{" "}
                    m
                  </div>
                  <div className="stat-desc">Délka hlavní poloosy</div>
                </div>

                <div className="stat">
                  <div className="stat-title">
                    <Symbol letter="d" index="i" />
                  </div>
                  <div className="stat-value text-lg">
                    {format(iteration.d_i, {
                      notation: "exponential",
                    })}{" "}
                    m = {iteration.d_i_pc.toString()} pc
                  </div>
                  <div className="stat-desc">Vzdálenost od Země</div>
                </div>
              </div>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">
                    <Symbol letter="Mag" index="1" />
                  </div>
                  <div className="stat-value text-lg">
                    {iteration.Mag_1.toString()}
                  </div>
                  <div className="stat-desc">
                    Absolutní magnituda složky <strong>A</strong>
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-title">
                    <Symbol letter="Mag" index="2" />
                  </div>
                  <div className="stat-value text-lg">
                    {iteration.Mag_2.toString()}
                  </div>
                  <div className="stat-desc">
                    Absolutní magnituda složky <strong>B</strong>
                  </div>
                </div>
              </div>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">
                    <Symbol letter="L" index="1" />
                  </div>
                  <div className="stat-value text-lg">
                    {format(iteration.L_1, {
                      notation: "exponential",
                    })}{" "}
                    W
                  </div>
                  <div className="stat-desc">
                    Zářivý výkon složky <strong>A</strong>
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">
                    <Symbol letter="L" index="2" />
                  </div>
                  <div className="stat-value text-lg">
                    {format(iteration.L_2, {
                      notation: "exponential",
                    })}{" "}
                    W
                  </div>
                  <div className="stat-desc">
                    Zářivý výkon složky <strong>B</strong>
                  </div>
                </div>
              </div>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">
                    <Symbol letter="M" index="1" />
                  </div>
                  <div className="stat-value text-lg">
                    {format(iteration.M_1, {
                      notation: "exponential",
                    })}{" "}
                    kg
                  </div>
                  <div className="stat-desc">
                    Vypočtená hmotnost <strong>primární</strong> složky
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">
                    <Symbol letter="M" index="2" />
                  </div>
                  <div className="stat-value text-lg">
                    {format(iteration.M_2, {
                      notation: "exponential",
                    })}{" "}
                    kg
                  </div>
                  <div className="stat-desc">
                    Vypočtená hmotnost <strong>sekundární</strong> složky
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">
                    <Symbol letter="M" index="1" /> +{" "}
                    <Symbol letter="M" index="2" />
                  </div>
                  <div className="stat-value text-lg">
                    {format(iteration.M_1_2, {
                      notation: "exponential",
                    })}{" "}
                    kg
                  </div>
                  <div className="stat-desc">Vypočtená hmotnost soustavy</div>
                </div>
              </div>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Odchylka</div>
                  <div className="stat-value">
                    {iteration.delta.toString()} %
                  </div>
                  <div className="stat-desc">
                    Odchylka odhadnuté a vypočtené hmotnosti
                  </div>
                </div>
              </div>
              <br />
            </>
          )}
          {/* M_1 = {guess.M_1_MS.toString()} M_S
        <br />
        M_2 = {guess.M_2_MS.toString()} M_S
        <br />
        M_1 + M_2 ={" "}
        {format(guess.M_1_2, {
          notation: "exponential",
        })}{" "}
        kg
        <br />
        {"    "}= {guess.M_1_2_MS.toString()} M_S
        <br />
        <br />
        delta guess = {guess.delta.toString()} % */}
        </div>
      </div>
    </div>
  );
};
