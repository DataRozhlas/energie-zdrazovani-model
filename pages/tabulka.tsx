import type { NextPage } from "next";
import { usePostMessageWithHeight } from "../utils/hooks";

const transactions = [
  {
    rok: "2013",
    celkem: 419749,
    leden: 0,
    unor: 36300,
    brezen: 154275,
    duben: 0,
    kveten: 0,
    cerven: 42108,
    cervenec: 172546,
    srpen: 14520,
    zari: 0,
    rijen: 0,
    listopad: 0,
    prosinec: 0,
  },
  {
    rok: "2014",
    celkem: 815612.6,
    leden: 62436,
    unor: 127413,
    brezen: 52344.6,
    duben: 50094,
    kveten: 0,
    cerven: 0,
    cervenec: 112530,
    srpen: 111078,
    zari: 70059,
    rijen: 105270,
    listopad: 124388,
    prosinec: 0,
  },
  {
    rok: "2015",
    celkem: 346120,
    leden: 0,
    unor: 0,
    brezen: 0,
    duben: 0,
    kveten: 0,
    cerven: 97768,
    cervenec: 0,
    srpen: 26620,
    zari: 106177,
    rijen: 15488,
    listopad: 15488,
    prosinec: 84579,
  },
  {
    rok: "2016",
    celkem: 1569915.38,
    leden: 79442,
    unor: 137093,
    brezen: 123178,
    duben: 46464,
    kveten: 68074,
    cerven: 212324,
    cervenec: 47724,
    srpen: 123310.5,
    zari: 227964,
    rijen: 210540,
    listopad: 174496.88,
    prosinec: 119305,
  },
  {
    rok: "2017",
    celkem: 1756082.03,
    leden: 89419,
    unor: 162062.27,
    brezen: 190786,
    duben: 265837.46,
    kveten: 306493.01,
    cerven: 137394,
    cervenec: 0,
    srpen: 17061,
    zari: 96675.48,
    rijen: 143247.38,
    listopad: 281660.55,
    prosinec: 65445.88,
  },
  {
    rok: "2018",
    celkem: 4021394.37,
    leden: 457051.22,
    unor: 712448,
    brezen: 314961.15,
    duben: 262327,
    kveten: 442216.25,
    cerven: 197093.88,
    cervenec: 214170,
    srpen: 294072.96,
    zari: 264430.38,
    rijen: 274064.4,
    listopad: 312376.63,
    prosinec: 276182.5,
  },
  {
    rok: "2019",
    celkem: 3974661.27,
    leden: 525654.25,
    unor: 615762.88,
    brezen: 382192.87,
    duben: 307521.5,
    kveten: 396638,
    cerven: 248095,
    cervenec: 220053.63,
    srpen: 363952.88,
    zari: 324839.63,
    rijen: 242030.25,
    listopad: 227041.38,
    prosinec: 120879,
  },
  {
    rok: "2020",
    celkem: 2597544.32,
    leden: 166072.5,
    unor: 115373.5,
    brezen: 155893.38,
    duben: 204626.13,
    kveten: 264264,
    cerven: 377701,
    cervenec: 283155.13,
    srpen: 265156.38,
    zari: 308988.63,
    rijen: 181500,
    listopad: 181068.88,
    prosinec: 93744.79,
  },
  {
    rok: "2021",
    celkem: 1877541.02,
    leden: 55811.25,
    unor: 73386.5,
    brezen: 99969.37,
    duben: 148391.38,
    kveten: 110185.63,
    cerven: 104256.63,
    cervenec: 81962.38,
    srpen: 168310.75,
    zari: 123828.38,
    rijen: 339556.25,
    listopad: 364633.5,
    prosinec: 207249,
  },
  {
    rok: "2022 (leden – srpen)",
    celkem: 2444947.38,
    leden: 323762.75,
    unor: 266913.25,
    brezen: 434919.38,
    duben: 325535.38,
    kveten: 350873.12,
    cerven: 381002.25,
    cervenec: 89570.25,
    srpen: 272371,
    zari: undefined,
    rijen: undefined,
    listopad: undefined,
    prosinec: undefined,
  },
];

const Tabulka: NextPage = () => {
  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("cro-tabulka");

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Výdaje Hradu na právní služby Advokátní kanceláře Nespala
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Podívejte se na součet faktur za služby Advokátní kaceláře Nespala
            pro Kancelář prezidenta republiky za jednotlivé měsíce funkčního
            období prezidenta Miloše Zemana. Za období září až prosinec 2022
            data chybí – v době zaslání žádosti o informace ještě nebyla
            dostupná.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <a href="https://data.irozhlas.cz/energie-zdrazovani-model/faktury-nespala.xlsx">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Stáhnout data
            </button>
          </a>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-red-50">
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Rok
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Celkem
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Leden
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Únor
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Březen
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Duben
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Květen
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Červen
                    </th>{" "}
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Červenec
                    </th>{" "}
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Srpen
                    </th>{" "}
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Září
                    </th>{" "}
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Říjen
                    </th>{" "}
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Listopad
                    </th>{" "}
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Prosinec
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {transactions.map(transaction => (
                    <tr
                      key={transaction.rok}
                      className={
                        transaction.rok === "2018"
                          ? "divide-y divide-gray-500"
                          : ""
                      }
                    >
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm  text-gray-500 sm:pl-6">
                        {transaction.rok}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                        {`${
                          transaction.celkem
                            ? Math.floor(transaction.celkem).toLocaleString(
                                "cs-CZ"
                              )
                            : "--"
                        } Kč`}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {`${
                          transaction.leden !== undefined
                            ? Math.floor(transaction.leden).toLocaleString(
                                "cs-CZ"
                              )
                            : "--"
                        } Kč`}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {`${
                          transaction.unor !== undefined
                            ? Math.floor(transaction.unor).toLocaleString(
                                "cs-CZ"
                              )
                            : "--"
                        } Kč`}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {`${
                          transaction.brezen !== undefined
                            ? Math.floor(transaction.brezen).toLocaleString(
                                "cs-CZ"
                              )
                            : "--"
                        } Kč`}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {`${
                          transaction.duben !== undefined
                            ? Math.floor(transaction.duben).toLocaleString(
                                "cs-CZ"
                              )
                            : "--"
                        } Kč`}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {`${
                          transaction.kveten !== undefined
                            ? Math.floor(transaction.kveten).toLocaleString(
                                "cs-CZ"
                              )
                            : "--"
                        } Kč`}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {`${
                          transaction.cerven !== undefined
                            ? Math.floor(transaction.cerven).toLocaleString(
                                "cs-CZ"
                              )
                            : "--"
                        } Kč`}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {`${
                          transaction.cervenec !== undefined
                            ? Math.floor(transaction.cervenec).toLocaleString(
                                "cs-CZ"
                              )
                            : "--"
                        } Kč`}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {`${
                          transaction.srpen !== undefined
                            ? Math.floor(transaction.srpen).toLocaleString(
                                "cs-CZ"
                              )
                            : "--"
                        } Kč`}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {`${
                          transaction.zari !== undefined
                            ? Math.floor(transaction.zari).toLocaleString(
                                "cs-CZ"
                              )
                            : "--"
                        } Kč`}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {`${
                          transaction.rijen !== undefined
                            ? Math.floor(transaction.rijen).toLocaleString(
                                "cs-CZ"
                              )
                            : "--"
                        } Kč`}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {`${
                          transaction.listopad !== undefined
                            ? Math.floor(transaction.listopad).toLocaleString(
                                "cs-CZ"
                              )
                            : "--"
                        } Kč`}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {`${
                          transaction.prosinec !== undefined
                            ? Math.floor(transaction.prosinec).toLocaleString(
                                "cs-CZ"
                              )
                            : "--"
                        } Kč`}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-red-50">
                  <tr>
                    <th
                      scope="row"
                      className="whitespace-nowrap pl-4 pr-3 pt-3 pb-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Celkem
                    </th>
                    <td className="whitespace-nowrap pl-2 pr-3 pt-3 pb-4 text-left text-sm font-semibold text-gray-900">
                      19 823 567,37 Kč
                    </td>
                    <td
                      colSpan={12}
                      className="whitespace-nowrap pl-2 pr-3 pt-3 pb-4 text-left text-sm font-semibold text-gray-900"
                    ></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabulka;
