import { Dayjs } from "dayjs";

export interface IReportModalForm {
  siteName: string;
  reportType: string;
  reportNumber: number;
  description: string;
  well: string;
  eventCode: string;
  dateReport: Dayjs;
}
