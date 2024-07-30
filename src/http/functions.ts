import { IReport } from "../interfaces/IReport";
import { ISites, IWells, IEvent } from "../interfaces/IWell";
import { variantHost } from "./index";

export const getVariants = async () => {
  const { data } = await variantHost.get("Universal/CdProjectSource", {
    params: {
      fields: "projectId, projectName",
    },
  });
  return data;
};

export const getSites = async (projectId: string) => {
  const { data } = await variantHost.get<ISites[]>(
    `Universal/CdSiteSource/projectId/${projectId}/`,
    {
      params: {
        fields: "projectId, siteId, siteName",
      },
    }
  );
  return data;
};

export const getWells = async (sitesId: string) => {
  const { data } = await variantHost.get<IWells[]>(
    `Universal/CdWellSource/siteId/${sitesId}/`,
    {
      params: {
        fields: "siteId,wellCommonName,wellId,spudDate,reason",
      },
    }
  );
  return data;
};

export const getEvents = async (wellId: string) => {
  const { data } = await variantHost.get<IEvent[]>(
    `Universal/DmEventT/wellId/${wellId}/`,
    {
      params: {
        fields: "wellId, eventId, eventCode",
      },
    }
  );
  return data;
};

export const getReports = async (wellId: string) => {
  const { data } = await variantHost.get<IReport[]>(
    `Universal/DmReportJournal/wellId/${wellId}/`,
    {
      params: {
        fields:
          "eventCode,reportJournalId,wellId,wellboreId,dateReport,eventId,reportAlias,description,entityType,reportNo",
      },
    }
  );
  return data;
};
