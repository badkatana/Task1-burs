import { ISites } from "./IWell";
import { REPORT_TYPE } from "../constants/strings";

export interface IReportModalForm {
  siteName: string;
  reportType: string;
  reportNumber: number;
  description: string;
  well: string;
}

export type ReportTypeEnum = {};
