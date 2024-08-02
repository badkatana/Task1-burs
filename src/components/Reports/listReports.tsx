import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { getReports } from "../../http/functions";
import { useLocation } from "react-router-dom";
import { REPORT_TYPE } from "../../constants/strings";
import { IReport } from "../../interfaces/IReport";
import { Button, Modal } from "@mui/material";
import { ReportModal } from "./modals/reportModal";
import { QueryCache, useQuery } from "@tanstack/react-query";
import { IVariant } from "../../interfaces/IVariant";

export const ListReports = (props: IVariant) => {
  const [rows, setRows] = useState<IReport[]>([]);
  const location = useLocation();
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const tmp: string = location.pathname.slice(
    location.pathname.lastIndexOf("/")
  );

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

  const { isLoading, data, error } = useQuery<IReport[]>({
    queryKey: ["reports", tmp],
    queryFn: () => getReports(tmp),
  });

  const processedData = useMemo(() => {
    if (!data) return [];
    const sortedData = data.sort((a, b) => {
      return (
        new Date(b.dateReport).getTime() - new Date(a.dateReport).getTime()
      );
    });

    return sortedData.map((item) => ({
      ...item,
      reportAlias: getReportType(item.reportAlias),
      dateReport: item.dateReport.substring(0, item.dateReport.indexOf("T")),
    }));
  }, [data]);

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

  useEffect(() => {
    if (location.search.substring(1)) {
      getSortedData(location.search.substring(1), processedData);
    } else {
      setRows(processedData);
    }
  }, [location.search, processedData]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Произошла ошибка: {error.message}</div>;
  }

  const saveNewReport = (value: IReport) => {
    console.log(value);
  };

  return (
    <div
      style={{
        maxHeight: "400px",
        width: "95%",
        overflowY: "auto",
      }}
    >
      <Button onClick={() => setReportModalOpen(!isReportModalOpen)}>
        Create Report
      </Button>
      <ReportModal
        open={isReportModalOpen}
        project={props}
        closeModal={setReportModalOpen}
        saveToReports={saveNewReport}
      ></ReportModal>
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
