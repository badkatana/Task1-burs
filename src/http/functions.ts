import { variantHost } from "./index";
import { ISites, IWells } from "./../pages/lib/VariantInterface";

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
  const { data } = await variantHost.get<IWells[]>(
    `Universal/DmEventT/wellId/${wellId}/`,
    {
      params: {
        fields: "wellId,eventId,eventCode",
      },
    }
  );
  return data;
};
