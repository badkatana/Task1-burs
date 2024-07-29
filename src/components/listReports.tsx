import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { IReport } from "../pages/lib/VariantInterface";
import { getReports } from "../http/functions";
import { useLocation } from "react-router-dom";
import { reports } from "../constants/strings";

export const ListReports = () => {
  const [rows, setRows] = useState<IReport[]>([]);
  const location = useLocation();

  const getSortedData = (param: string, data: IReport[]) => {
    let sortingValues = decodeURIComponent(param)
      .split("=")[1]
      .split(",")
      .map((item) => item.trim());
    const dat1 = data.filter((item) => sortingValues.includes(item.eventCode));
    setRows(dat1);
  };

  const getReportType = (alias: string): string => {
    const report = reports.find((report) => report.alias === alias);
    return report ? report.type : alias;
  };

  useEffect(() => {
    let tmp = location.pathname.slice(
      location.pathname.lastIndexOf("/"),
      location.pathname.length
    );

    getReports(tmp).then((data) => {
      data = [...data].sort((a, b) => {
        return (
          new Date(b.dateReport).getTime() - new Date(a.dateReport).getTime()
        );
      });
      data = data?.map((item) => ({
        ...item,
        reportAlias: getReportType(item.reportAlias),
      }));
      if (location.search.substring(1)) {
        getSortedData(location.search.substring(1), data);
      } else {
        setRows(data);
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
