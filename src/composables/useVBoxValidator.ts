import { toCsvString } from "@/utils/exports";
import { TableColumnInterface } from "@uniquedj95/vtable";
import ApiClient from "@/api";
import { ref } from "vue";
import { toastWarning } from "@/utils/toasts";
import { loader } from "@/utils/loader";

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

const VBOX_BASE_URL = "http://localhost:4001"

export default function useVBoxValidator () {
  const errors = ref<Array<string>>([])
  
  function toErrorStrings (result: VBoxResult){
    return result.table.message.replace("cum_", "Cumulative").replace("_", " ");
  }
  
  async function validateReport(columns: Array<TableColumnInterface>, rows: Array<any>) {
    const data = toCsvString({ columns, rows, filename: "", appendFooter: false });
    try {
      await loader.show();
      const results = await ApiClient.postJson<Array<VBoxResult>>('validate_data', { data }, {}, VBOX_BASE_URL);
      errors.value = results.map(toErrorStrings);
    } catch (error) {
      console.error(error);
      toastWarning("Unable to validate report");
    } finally {
      loader.hide();
    }
  }

  return {
    errors,
    validateReport
  }
}
