import type { ApplyData } from '@v3/lib/apply';

/** What every adapter receives: validated data plus human-readable labels for coded values. */
export interface ApplicationRecord {
  type: 'partner_application';
  version: 1;
  submittedAt: string;
  data: ApplyData;
  labels: {
    companyType: string;
    volume: string;
    licenceStatus: string;
    verticals: string[];
    geographies: string[];
    needs: string[];
  };
}

export type DeliveryResult = { ok: true } | { ok: false; reason: string };

export interface FormAdapter {
  name: string;
  deliver(record: ApplicationRecord): Promise<DeliveryResult>;
}
