import { BigNumber } from "mathjs";

export type ComputeResult = {
  a_i: BigNumber;
  d_i: BigNumber;
  d_i_pc: BigNumber;
  Mag_1: number;
  Mag_2: number;
  L_1: BigNumber;
  L_2: BigNumber;
  M_1: BigNumber;
  M_2: BigNumber;
  M_1_2: BigNumber;
  M_1_MS: BigNumber;
  M_2_MS: BigNumber;
  M_1_2_MS: BigNumber;
  delta: BigNumber;
};

export type ResultRecord = {
  M_guess: BigNumber;
} & ComputeResult;
