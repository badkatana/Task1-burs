import { cathost } from "./index";
import { variantHost } from "./index";

export const getCatFact = async () => {
  const { data } = await cathost.get("/");
  return data;
};

export const getVariants = async () => {
  const { data } = await variantHost.get("Universal/CdProjectSource", {
    params: {
      fields: "projectId, projectName",
    },
  });
  return data;
};

export const getWells = async () => {
  const { data } = await variantHost.get("Universal/CdWellSource");
  return data;
};
