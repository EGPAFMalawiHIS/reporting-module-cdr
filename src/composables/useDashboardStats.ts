import { DashboardService } from "@/services/dashboard_service";
import { EncounterReportService, EncounterStat } from "@/services/encounters_report_service";
import HisDate from "@/utils/his_date";
import { toastWarning } from "@/utils/toasts";
import { ref, watch } from "vue";


const defaultVisits = {
  complete: [] as Array<number>,
  incomplete: [] as Array<number>,
  dates: [] as Array<string>
};

type PatientVisits = typeof defaultVisits;
interface DashboardStats {
  visits: PatientVisits
  missedAppointments: Array<number>;
  appointmentsDue: Array<number>;
  dueForVL: Array<number>;
  defaulters: Array<number>;
  patientsOnDTG: Array<number>;
  txCurrent30: Array<number>;
  txCurrent60: Array<number>;
  encounters: Array<EncounterStat>;
}

const DASHBOARD_STATS_CACHE_KEY = "__emc_dashboard_statistics__";
const encounterService = new EncounterReportService();

function getDefaultStats(): DashboardStats | undefined {
  try {
    const stats = localStorage.getItem(DASHBOARD_STATS_CACHE_KEY);
    return stats ? JSON.parse(stats) : undefined;
  } catch (error) {
    toastWarning("Error parsing cached stats. Please, refresh to load fresh stats");
    return undefined;
  }
}


export default function useDashboardStats() {
  const cachedStats = getDefaultStats();
  const isLoading = ref(false);
  const visits = ref<typeof defaultVisits | undefined>(cachedStats?.visits ?? defaultVisits);
  const missedAppointments = ref<Array<number> | undefined>(cachedStats?.missedAppointments ?? []);
  const appointmentsDue = ref<Array<number> | undefined>(cachedStats?.appointmentsDue ?? []);
  const dueForVL = ref<Array<number> | undefined>(cachedStats?.dueForVL ?? []);
  const defaulters = ref<Array<number> | undefined>(cachedStats?.defaulters ?? []);
  const patientsOnDTG = ref<Array<number> | undefined>(cachedStats?.patientsOnDTG ?? []);
  const txCurrent30 = ref<Array<number> | undefined>(cachedStats?.txCurrent30 ?? []);
  const txCurrent60 = ref<Array<number> | undefined>(cachedStats?.txCurrent60 ?? []);
  const encounters = ref<Array<EncounterStat> | undefined>(cachedStats?.encounters ?? encounterService.buildEncounters());

  function resetStats() {
    encounters.value = undefined
    visits.value = undefined;
    missedAppointments.value = undefined;
    appointmentsDue.value = undefined;
    defaulters.value = undefined;
    patientsOnDTG.value = undefined;
    dueForVL.value = undefined;
    txCurrent30.value = undefined;
    txCurrent60.value = undefined;
  }

  async function refresh() {
    const today = HisDate.today();
    const { start, end } = HisDate.getQuarterDates(today);
    const tomorrow = HisDate.tomorrow();
    const service = new DashboardService();
    service.setStartDate(start);
    service.setEndDate(end);
    resetStats();
    isLoading.value = true;
    try {
      encounters.value = await encounterService.getStats();
      visits.value = await service.getVisits();
      appointmentsDue.value = await service.getAppointmentsDue(tomorrow);
      patientsOnDTG.value = await service.getPatientsOnDTG();
      txCurrent30.value = await service.getTXCurrent(30);
      missedAppointments.value = await service.getMissedAppointments();
      dueForVL.value = await service.getPatientsDueForVL();
      txCurrent60.value = await service.getTXCurrent(60);
      defaulters.value = await service.getDefaulters();
    } catch (error) {
      toastWarning("Unable to update dashboard starts");
    }
    isLoading.value = false;
  }

  watch([
    visits,
    missedAppointments,
    appointmentsDue,
    dueForVL,
    defaulters,
    patientsOnDTG,
    txCurrent30,
    txCurrent60,
    encounters,
  ], 
  ([
    visits,
    missedAppointments,
    appointmentsDue,
    dueForVL,
    defaulters,
    patientsOnDTG,
    txCurrent30,
    txCurrent60,
    encounters,
  ]) => localStorage.setItem(DASHBOARD_STATS_CACHE_KEY, JSON.stringify({
    visits,
    missedAppointments,
    appointmentsDue,
    dueForVL,
    defaulters,
    patientsOnDTG,
    txCurrent30,
    txCurrent60,
    encounters,
  })));

  return {
    visits,
    missedAppointments,
    appointmentsDue,
    dueForVL,
    defaulters,
    patientsOnDTG,
    txCurrent30,
    txCurrent60,
    encounters,
    isLoading,
    refresh,
  }
}
