import { compute } from "@/lib/compute";
import { M_S } from "@/lib/constants";
import { ResultRecord } from "@/lib/types";
import { ComputeMode } from "@/pages";
import { BigNumber, bignumber } from "mathjs";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Symbol } from "./Symbol";
import { Heading } from "./Heading";

export type ComputeFormProps = {
  mode: ComputeMode;
  setMode: (mode: ComputeMode) => void;
  results: ResultRecord[];
  setResults: (results: ResultRecord[]) => void;
  T_years: BigNumber;
  T: BigNumber;
  alpha: BigNumber;
  mag_1: number;
  mag_2: number;
};

export const ComputeForm: FC<ComputeFormProps> = ({
  mode,
  setMode,
  results,
  setResults,
  T_years,
  T,
  alpha,
  mag_1,
  mag_2,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="mt-3">
      <Heading>Výpočty</Heading>

      <div className="flex">
        <div className="flex flex-col mt-2">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-3">
              <p className="text-xs">
                V režimu <strong>ruční odhad</strong> je na uživateli, aby sám
                zadával hodnoty pro odhad <Symbol letter="M" index={"1"} /> +{" "}
                <Symbol letter="M" index={"2"} />. V režimu{" "}
                <strong>automatický odhad</strong> se výpočet provede
                automaticky na základě výsledků předchozích výpočtů.
              </p>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Ruční odhad</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={mode === ComputeMode.AUTO}
                    onChange={() =>
                      setMode(
                        mode === ComputeMode.AUTO
                          ? ComputeMode.MANUAL
                          : ComputeMode.AUTO
                      )
                    }
                  />
                  <span className="label-text">Automatický odhad</span>
                </label>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-sm mt-2">
            <div className="card-body p-3">
              <form
                onSubmit={handleSubmit((data) => {
                  const newGuess = bignumber(data.nextGuess);
                  const newResults = [
                    ...results,
                    {
                      M_guess: newGuess,
                      ...compute(T, newGuess, alpha, mag_1, mag_2),
                    },
                  ];
                  setResults(newResults);
                  window.sessionStorage.setItem(
                    "results",
                    JSON.stringify(newResults)
                  );
                })}
              >
                <p className="text-xs">
                  Zadejte váš odhad hodnoty <Symbol letter="M" index={"1"} /> +{" "}
                  <Symbol letter="M" index={"2"} /> a klikněte na{" "}
                  <strong>Spočítat!</strong>. Proběhne výpočet a zobrazí se
                  výsledná odchylka od vypočtené hodnoty. Poté můžete svůj odhad
                  upravit a zopakovat proces.
                </p>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Odhad hmotnosti soustavy</span>
                  </label>
                  <label className="input-group">
                    <input
                      defaultValue={M_S.times(2).toString()}
                      type="text"
                      className="input input-bordered"
                      {...register("nextGuess", {
                        required: true,
                        pattern: /^[-+]?[0-9]+\.?[0-9]+([eE][-+]?[0-9]+)$/i,
                      })}
                      disabled={mode === ComputeMode.AUTO}
                    />
                    <span>kg</span>
                  </label>
                  {errors.nextGuess?.type == "required" &&
                    "Musí být zadáno číslo"}
                  {errors.nextGuess?.type == "pattern" &&
                    "Číslo musí být ve tvaru 1.23e+4"}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-sm mt-2 w-full"
                  disabled={mode === ComputeMode.AUTO}
                >
                  <span className="material-icons">Provést iteraci!</span>
                </button>
              </form>
            </div>
          </div>

          <button
            className="btn btn-error text-error-content btn-sm mt-2 mx-4"
            onClick={() => {
              if (confirm("Opravdu chcete vymazat všechny výpočty?")) {
                setResults([]);
                window.sessionStorage.removeItem("results");
              }
            }}
            disabled={mode === ComputeMode.AUTO}
          >
            Vymazat výpočty
          </button>
          <p className="text-xs text-center">
            Vymaže výsledky všech dosud provedených iterací a můžete začít s
            čistým štítem.
          </p>
        </div>
      </div>
    </div>
  );
};
