import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from '@/shared/types/supabase';

export type Equipment = Tables<'equipments'>;
export type InsertEquipment = TablesInsert<'equipments'>;
export type UpdateEquipment = TablesUpdate<'equipments'>;

export type EquipmentAttachment = Tables<'equipment_attachments'>;

export type Access = Tables<'accesses'>;

export type Intervention = Tables<'interventions'>;
export type InsertIntervention = TablesInsert<'interventions'>;
export type UpdateIntervention = TablesUpdate<'interventions'>;
