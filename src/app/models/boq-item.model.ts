export interface BoqItem {
  id: string;
  name: string;
  description: string;
  unit: string;
  quantity: number;
  responsibleParty: string;
}

export type PanelMode = 'escalate' | 'add-item' | 'edit-item' | 'application-details';
