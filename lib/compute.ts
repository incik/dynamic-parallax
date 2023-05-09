import { create, all, BigNumber, Infinity as MathJSInfinity } from "mathjs";

import { G, M_S, L_S, Mag_S, PC } from "./constants";
import { ComputeResult } from "./types";

const math = create(all, { number: "BigNumber", precision: 6 });

const { bignumber, sqrt, nthRoot, format } = math;

/**
 * This function computes the static information about the binary system, but mainly the orbital period
 * (by static, I mean that it does not change with the guessed mass of the binary system)
 * @param a Semi-major axis of the orbit
 * @param b Semi-minor axis of the orbit
 * @param observedFor Number of years the orbit has been observed
 * @returns
 */
export const computeStatic = (
  a: BigNumber,
  b: BigNumber,
  observedFor: number
) => {
  const h = math.round(sqrt(a.pow(2).minus(b.pow(2))), 4); // excentricity
  const epsilon = math.round(
    a
      .times(b)
      .times(
        math
          .acos(h.div(a))
          .minus(
            h.div(a.pow(2)).times(math.round(sqrt(a.pow(2).minus(h.pow(2))), 4))
          )
      ),
    4
  );

  const S = math.round(bignumber(Math.PI).times(a).times(b), 4);

  const T_years = math.round(S.times(observedFor).div(epsilon), 4); // years!
  const T = T_years.times(365.25).times(24).times(60).times(60); // seconds

  return { h, epsilon, S, T_years, T };
};

/**
 * Compute the information about the binary system
 * @param T Orbital period in seconds
 * @param M_guess Guess of the mass of the binary system in kg
 * @param alpha Angle of the semi-major axis in degrees
 * @param mag_1 Relative magnitude of the primary star
 * @param mag_2 Relative magnitude of the secondary star
 */
export const compute = (
  T: BigNumber,
  M_guess: BigNumber,
  alpha: BigNumber,
  mag_1: number,
  mag_2: number
): ComputeResult => {
  // Semi-major axis of the orbit
  // a_i = nthRoot(T^2 * G * M_guess / (pi^2 * 4), 3)
  const a_i = bignumber(
    nthRoot(
      T.pow(2).times(G).times(M_guess).div(bignumber(Math.PI).pow(2).times(4)),
      3
    ) as number
  );

  // Distance to the star
  // d_i = (a_i / 2) / tan(alpha / 2)
  const d_i: BigNumber = a_i
    .div(2)
    .div(math.tan(math.unit(alpha.div(2), "deg")));
  const d_i_pc = d_i.div(PC);

  // Absolute magnitude of the primary star
  // Mag_1 = mag_1 + 5 - 5 * log10(d_i_pc)
  const Mag_1 = math.round(mag_1 + 5 - 5 * (math.log10(d_i_pc) as any), 4);

  // Absolute magnitude of the secondary star
  // Mag_2 = mag_2 + 5 - 5 * log10(d_i_pc)
  const Mag_2 = math.round(mag_2 + 5 - 5 * (math.log10(d_i_pc) as any), 4);

  // Luminosity of the primary star
  // L_1 = L_S * 10^((Mag_S - Mag_1) / 2.5)
  const L_1 = L_S.times(
    bignumber(10).pow(
      math
        .chain(Mag_S - Mag_1)
        .divide(2.5)
        .done()
    )
  );

  // Luminosity of the secondary star
  // L_2 = L_S * 10^((Mag_S - Mag_2) / 2.5)
  const L_2 = L_S.times(
    bignumber(10).pow(
      math
        .chain(Mag_S - Mag_2)
        .divide(2.5)
        .done()
    )
  );

  // Mass of the primary star
  // M_1 = (L_1 / L_S)^(1/3.5) * M_S
  const M_1 = L_1.div(L_S).pow(math.evaluate("1/3.5")).times(M_S);

  // Mass of the secondary star
  // M_2 = (L_2 / L_S)^(1/3.5) * M_S
  const M_2 = L_2.div(L_S).pow(math.evaluate("1/3.5")).times(M_S);

  // Mass of the primary star in solar masses
  const M_1_MS = M_1.div(M_S);

  // Mass of the secondary star in solar masses
  const M_2_MS = M_2.div(M_S);

  // Mass of the binary system
  const M_1_2 = M_1.add(M_2);
  // Mass of the binary system in solar masses
  const M_1_2_MS = M_1.add(M_2).div(M_S);

  // Difference between the guessed mass and the computed mass (in %)
  const delta = bignumber(100).sub(M_1_2.times(100).div(M_guess));

  return {
    a_i,
    d_i,
    d_i_pc,
    Mag_1,
    Mag_2,
    L_1,
    L_2,
    M_1,
    M_2,
    M_1_2,
    M_1_MS,
    M_2_MS,
    M_1_2_MS,
    delta,
  };
};

export const findBestGuess = (
  initialGuess: BigNumber,
  T: BigNumber,
  // M_guess: BigNumber,
  alpha: BigNumber,
  mag_1: number,
  mag_2: number,
  maxIterations: number = 10
) => {
  const targetDelta = bignumber(1);
  let currentGuess = initialGuess;
  let result = compute(T, currentGuess, alpha, mag_1, mag_2);
  let delta = result.delta.abs();
  let iteration = 0;

  let lowerBound = bignumber(-Infinity);
  let upperBound = bignumber(Infinity);

  let previousDelta = bignumber(delta);
  let previousGuess = bignumber(0);

  let results = [{ M_guess: currentGuess, ...result }];

  /*
  while (delta.gt(targetDelta) && iteration < maxIterations) {
    // we still have a delta > 1%

    if (delta.gt(previousDelta)) {

    }



    // if (delta.gte(previousDelta)) {
    //   const adjustment = previousGuess.plus(currentGuess).div(4);
    //   currentGuess = result.delta.gt(0)
    //     ? previousGuess.plus(adjustment)
    //     : previousGuess.minus(adjustment);
    // } else {
    //   previousGuess = currentGuess;

    if (result.delta.gt(0)) {
      console.log("D > 0 - now I should be here");
      //lowerBound = currentGuess;
      currentGuess = result.M_1_2; //upperBound.eq(Infinity)
      // ? result.M_1_2
      // : lowerBound.plus(upperBound).div(2);
      console.log("using", currentGuess.toString(), "as the new guess");
    } else {
      console.log("D < 0 - I'm clearly here");
      // upperBound = currentGuess;
      currentGuess = previousGuess.times(2);
    }
    //}

    result = compute(T, currentGuess, alpha, mag_1, mag_2);
    previousDelta = delta;
    delta = result.delta.abs();

    results.push({ M_guess: currentGuess, ...result });
    iteration++;
  }*/

  while (delta.gt(targetDelta) && iteration < maxIterations) {
    if (result.delta.gt(0)) {
      lowerBound = currentGuess;
      currentGuess = upperBound.eq(Infinity)
        ? result.M_1_2
        : lowerBound.plus(upperBound).div(2);
    } else {
      upperBound = currentGuess;
      currentGuess = lowerBound.plus(upperBound).div(2);
    }

    result = compute(T, currentGuess, alpha, mag_1, mag_2);
    delta = result.delta.abs();
    results.push({ M_guess: currentGuess, ...result });
    iteration++;
  }

  return results;
};
