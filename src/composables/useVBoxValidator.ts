import { ref } from "vue";

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

export interface HostConfig {
  host: "localhost",
  port: 3000,
  protocol: "http"
}

const config = ref<HostConfig>();

export default function useVBoxValidator () {
  const errors = ref<Array<string>>([]);
  const isLoading = ref<boolean>(false);

  if(!config.value) loadConfig();
  
  function toErrorStrings (results: Array<VBoxResult>){
    return results.map(result => result.table.message.replace("cum_", "Cumulative").replace("_", " "))
  }
  
  async function validateReport(rawdata: string) {
    try {
      isLoading.value
      const res = await fetch('validate_data', {
        method: "POST",
        body: JSON.stringify({data: rawdata}),
        mode: "cors",
        headers: { "Content-Type": "application/json" }
      });
      if(res.ok) errors.value = toErrorStrings(await res.json());
    } catch (error) {
      console.error(error);
      errors.value.push("Unable to validate report");
    } finally {
      isLoading.value = false;
    }
  }

  async function loadConfig () {
    try {
      const res = await fetch('/vbox.config.json');
      if(!res.ok) throw new Error("Unable to load config");
      config.value = await res.json();
    } catch (error) {
      console.error(error);
      errors.value = ["Unable to load vbox configuration. System now using default config"];
      config.value = {
        host: "localhost",
        port: 3000,
        protocol: "http"
      } 
    }
  }

  return {
    errors,
    validateReport,
    isLoading
  }
}