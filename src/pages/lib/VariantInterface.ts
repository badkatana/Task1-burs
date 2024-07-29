export interface IVariant {
  projectId: string;
  projectName: string;
  active?: boolean;
}

export interface ISites {
  siteId?: string;
  projectId: string;
  siteName: string;
}

export interface IWells {
  wellId?: string;
  siteId?: string;
  spudDate?: string;
  reason?: string;
  wellCommonName?: string;
  siteName?: string;
  active?: string;
}
