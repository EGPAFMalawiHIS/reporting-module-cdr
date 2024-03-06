import { computed, ref } from "vue";
import conf from "../../package.json";
import apiClient from "@/api";

const appVersion = ref("");
const apiVersion = ref("");
const minApiVersion = ref("");
const fullVersion = computed(() => `${appVersion.value || '-'} / ${apiVersion.value || '-'}`);

function loadAppVersions () {
  appVersion.value = `v${conf.version}`;
  minApiVersion.value = conf["mini-api-version"];
}

async function loadApiVersion () {
  const res = await apiClient.getJson<any>('version');
  apiVersion.value = res.data['System version'] || '-';
}

function isValidApiVersion() {
  const [ major, minor, patch ] = minApiVersion.value.split('.');
  const [ apiMajor, apiMinor, apiPatch ] = apiVersion.value.split(".");
  if((parseInt(apiMajor) || 0) < (parseInt(major) || 0)) return false;
  if((parseInt(apiMinor) || 0) < (parseInt(minor) || 0)) return false;
  if((parseInt(apiPatch) || 0) < (parseInt(patch) || 0)) return false;
  return true;
}

export default function useAppInfo() {
  return {
    appVersion,
    apiVersion,
    minApiVersion,
    fullVersion,
    loadAppVersions,
    loadApiVersion,
    isValidApiVersion,
  }
}