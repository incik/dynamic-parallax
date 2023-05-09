import { G, L_S, M_S, Mag_S, PC } from "@/lib/constants";
import { Symbol } from "./Symbol";
import { format } from "mathjs";

export const Constants = () => {
  return (
    <>
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
    </>
  );
};
