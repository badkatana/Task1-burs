export interface ISites {
  siteId?: string;
  projectId: string;
  siteName: string;
}

export interface IWells {
  wellId: string;
  siteId?: string;
  spudDate?: string;
  reason?: string;
  wellCommonName?: string;
  siteName?: string;
  active?: boolean;
}

export interface IEvent {
  wellId: string;
  eventId: string;
  eventCode: string;
}
