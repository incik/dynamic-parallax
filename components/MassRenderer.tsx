import { M_S } from "../lib/constants";

export enum RenderMode {
  "KILOGRAM", "SUN_MASSES"
};

export const MassRenderer = ({ mass, mode }: { mass: number }) => {