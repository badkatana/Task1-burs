import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { getReports } from "../../http/functions";
import { useLocation } from "react-router-dom";
import { REPORT_TYPE } from "../../constants/strings";
import { IReport } from "../../interfaces/IReport";

export const ListReports = () => {
  const [rows, setRows] = useState<IReport[]>([]);
  const location = useLocation();

  const getSortedData = (param: string, data: IReport[]) => {
    const extractSortingValues = (param: string) => {
      return decodeURIComponent(param)
        .split("=")[1]
        .split(",")
        .map((item) => item.trim());
    };

    const sortData = (
      data: IReport[],
      sortingValues: string[],
      key: keyof IReport
    ) => {
      return [...data].sort((a, b) => {
        const aContains = sortingValues.some((value) => a[key].includes(value));
        const bContains = sortingValues.some((value) => b[key].includes(value));

        if (aContains && !bContains) return -1;
        if (!aContains && bContains) return 1;
        return 0;
      });
    };

    let sortingValues = extractSortingValues(param);

    if (!sortingValues.includes("GEN_PLAN")) {
      const sortedItems = sortData(data, sortingValues, "eventCode");
      setRows(sortedItems);
    } else {
      sortingValues = sortingValues.map(
        (value) =>
          REPORT_TYPE.find((report) => report.alias === value)?.type || value
      );
      const sortedItems = sortData(data, sortingValues, "reportAlias");
      setRows(sortedItems);
    }
  };

  const getReportType = (alias: string): string => {
    const report = REPORT_TYPE.find((report) => report.alias === alias);
    return report ? report.type : alias;
  };

  useEffect(() => {
    let tmp = location.pathname.slice(
      location.pathname.lastIndexOf("/"),
      location.pathname.length
    );

    getReports(tmp).then((data) => {
      if (data) {
        data = data.sort((a, b) => {
          return (
            new Date(b.dateReport).getTime() - new Date(a.dateReport).getTime()
          );
        });
        data = data.map((item) => ({
          ...item,
          reportAlias: getReportType(item.reportAlias),
          dateReport: item.dateReport.substring(
            0,
            item.dateReport.indexOf("T")
          ),
        }));

        if (location.search.substring(1)) {
          getSortedData(location.search.substring(1), data);
        } else {
          setRows(data);
        }
      }
    });
  }, [location]);

  const columns = useMemo(
    () => [
      { accessorKey: "reportAlias", header: "Тип" },
      { accessorKey: "dateReport", header: "Дата" },
      { accessorKey: "reportNo", header: "№" },
      { accessorKey: "description", header: "Описание" },
      { accessorKey: "eventCode", header: "Мероприятие" },
    ],
    []
  );

  return (
    <div
      style={{
        maxHeight: "400px",
        width: "95%",
        overflowY: "auto",
      }}
    >
      <MaterialReactTable
        columns={columns}
        data={rows}
        enablePagination={true}
        enableSorting={true}
        enableGlobalFilter={true}
      />
    </div>
  );
};
