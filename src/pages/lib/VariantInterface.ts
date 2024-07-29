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
  active?: boolean;
}

export interface IEvent {
  wellId: string;
  eventId: string;
  eventCode: string;
}

export interface IReport {
  reportJournalId: string;
  wellId: string;
  wellboreId: string;
  eventId: string;
  dateReport: string;
  reportNo: string;
  description: string;
  entityType: string;
  eventCode: string;
  reportAlias: string;
}
