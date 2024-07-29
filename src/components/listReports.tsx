import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { IReport } from "../pages/lib/VariantInterface";
import { getReports } from "../http/functions";
import { useLocation } from "react-router-dom";

export const ListReports = () => {
  const [rows, setRows] = useState<IReport[]>([]);
  const location = useLocation();

  useEffect(() => {
    let tmp = location.pathname.slice(
      location.pathname.lastIndexOf("/"),
      location.pathname.length
    );
    console.log(tmp);
    if (tmp != "/") {
      getReports(tmp).then((data) => setRows(data));
    }
  }, [location]);

  const columns = useMemo(
    () => [
      { accessorKey: "entityType", header: "Тип" }, // 1
      { accessorKey: "dateReport", header: "Дата" }, // 2
      { accessorKey: "description", header: "Описание" }, //3
      { accessorKey: "eventCode", header: "Мероприятие" }, //4
    ],
    []
  );

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
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
