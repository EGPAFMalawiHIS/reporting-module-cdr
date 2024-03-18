export interface VBoxResult {
  table: VBoxResultTable;
}

export interface VBoxResultTable {
  rule:           VBoxResultRule;
  base_value:     number;
  operands_value: number;
  message:        string;
}

export interface VBoxResultRule {
  id:            number;
  name:          string;
  created_at:    Date;
  updated_at:    Date;
  report_id:     number;
  operator_id:   number;
  description:   null;
  comparator_id: number;
}
