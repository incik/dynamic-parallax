import { create, all, BigNumber } from "mathjs";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { G, M_S, L_S, Mag_S, PC } from "../lib/constants";
import { compute, computeStatic } from "../lib/compute";

import { Symbol } from "../components/Symbol";

const math = create(all, { number: "BigNumber", precision: 6 });

const { bignumber, format } = math;

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [a, setA] = useState(bignumber("4.5"));
  const alpha = a.div(3600);
  const [b, setB] = useState(bignumber("3.4"));
  const beta = b.div(3600);
  const [observedFor, setObservedFor] = useState(11); // years
  const [mag_1, setmag_1] = useState(3.9);
  const [mag_2, setmag_2] = useState(5.3);

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

  let results: BigNumber[] = [];

  return (
    <div className="App">
      <div className="flex justify-evenly">
        <div className="">
          <div>
            <h2 className="text-lg font-bold mb-1 pl-2">Konstanty</h2>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">
                  <Symbol letter="M" index="S" /> (kg)
                </div>
                <div className="stat-value text-lg">{M_S.toString()}</div>
                <div className="stat-desc">Hmotnost Slunce</div>
              </div>
              <div className="stat">
                <div className="stat-title">
                  G (m<sup>3</sup>&times;kg<sup>−1</sup>&times;s
                  <sup>−2</sup>)
                </div>
                <div className="stat-value text-lg">{G.toString()}</div>
                <div className="stat-desc">Gravitační konstanta</div>
              </div>
              <div className="stat">
                <div className="stat-title">1 pc (m)</div>
                <div className="stat-value text-lg">
                  {format(PC, { notation: "exponential" })}
                </div>
                <div className="stat-desc">Parsec</div>
              </div>
              <div className="stat">
                <div className="stat-title">
                  <Symbol letter="L" index="S" /> (W)
                </div>
                <div className="stat-value text-lg">
                  {format(L_S, { notation: "exponential" })}
                </div>
                <div className="stat-desc">Zářivý výkon Slunce</div>
              </div>
              <div className="stat">
                <div className="stat-title">
                  <Symbol letter="Mag" index="S" />
                </div>
                <div className="stat-value text-lg">{Mag_S.toString()}</div>
                <div className="stat-desc">
                  Absolutní magnituda
                  <br />
                  Slunce
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-1 pl-2">Pozorování</h2>
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
          </div>

          <div>
            <h2>Calculations</h2>
            <pre>
              h = {staticData.h.toString()}
              <br />
              epsilon = {staticData.epsilon.toString()}
              <br />S = {staticData.S.toString()}
              <br />T = {staticData.T_years.toString()} years
              <br />
              {"  "}= {staticData.T.toString()} s
            </pre>
          </div>
        </div>

        <div>
          <h3>Iterations</h3>
          <div>
            {[
              M_S.times(2),
              bignumber("3.22e+30"),
              bignumber("3.0953e+30"),
              bignumber("3.07196e+30"),
              bignumber("3.0676e+30"),
              // bignumber("3e+30"),
              // bignumber("3.5e+30"),
              //  bignumber("3.25e+30"),
              // bignumber("3.12e+30"),
              // bignumber("3.10e+30"),
              // bignumber("3.08e+30"),
              // bignumber("3.07e+30"),
              // bignumber("3.067e+30")
            ].map((M_guess, index) => {
              const result = compute(
                staticData.T,
                M_guess,
                alpha,
                bignumber(mag_1),
                bignumber(mag_2)
              );
              results.push(result.delta);

              const finished = (math.compare(result.delta, 1) as number) <= 0;

              return (
                <div
                  className={`card ${
                    finished ? "bg-[#88dc88]" : "bg-base-100"
                  } shadow-sm`}
                  key={`iteration-${index}`}
                >
                  <div className="indicator">
                    <span className="indicator-item badge badge-primary left-0 right-auto">
                      #{index + 1}
                    </span>
                    <div className="card-body">
                      <h2 className="card-title">
                        <Symbol letter="M" index="1" /> +{" "}
                        <Symbol letter="M" index="2" /> = {M_guess.toString()}{" "}
                        kg
                      </h2>
                      <div className="stats shadow">
                        <div className="stat">
                          <div className="stat-title">
                            <Symbol letter="a" index="i" />
                          </div>
                          <div className="stat-value text-lg">
                            {format(result.a_i, {
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
                            {format(result.d_i, {
                              notation: "exponential",
                            })}{" "}
                            m = {result.d_i_pc.toString()} pc
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
                            {result.Mag_1.toString()}
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
                            {result.Mag_2.toString()}
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
                            {format(result.L_1, {
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
                            {format(result.L_2, {
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
                            {format(result.M_1, {
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
                            {format(result.M_2, {
                              notation: "exponential",
                            })}{" "}
                            kg
                          </div>
                          <div className="stat-desc">
                            Vypočtená hmotnost <strong>sekundární</strong>{" "}
                            složky
                          </div>
                        </div>
                        <div className="stat">
                          <div className="stat-title">
                            <Symbol letter="M" index="1" /> +{" "}
                            <Symbol letter="M" index="2" />
                          </div>
                          <div className="stat-value text-lg">
                            {format(result.M_1_2, {
                              notation: "exponential",
                            })}{" "}
                            kg
                          </div>
                          <div className="stat-desc">
                            Vypočtená hmotnost soustavy
                          </div>
                        </div>
                      </div>
                      <div className="stats shadow">
                        <div className="stat">
                          <div className="stat-title">Odchylka</div>
                          <div className="stat-value">
                            {result.delta.toString()} %
                          </div>
                          <div className="stat-desc">
                            Odchylka odhadnuté a vypočtené hmotnosti
                          </div>
                        </div>
                      </div>
                      <br />
                      M_1 = {result.M_1_MS.toString()} M_S
                      <br />
                      M_2 = {result.M_2_MS.toString()} M_S
                      <br />
                      M_1 + M_2 ={" "}
                      {format(result.M_1_2, {
                        notation: "exponential",
                      })}{" "}
                      kg
                      <br />
                      {"    "}= {result.M_1_2_MS.toString()} M_S
                      <br />
                      <br />
                      delta guess = {result.delta.toString()} %
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
