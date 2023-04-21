import { create, all } from "mathjs";

const math = create(all, { number: "BigNumber", precision: 6 });

const { bignumber } = math;

/**
 * Mass of the Sun (kg)
 */
export const M_S = bignumber("1.99e+30");
/**
 * Gravitational constant (m^3 kg^-1 s^-2)
 */
export const G = bignumber("6.67e-11");
/**
 * Parsec (m)
 */
export const PC = bignumber("3.09e16");
/**
 * Absolute magnitude of the Sun
 */
export const Mag_S = 4.9;
/**
 * Luminosity of the Sun (W)
 */
export const L_S = bignumber("3.82e26");
