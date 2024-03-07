import { RouteRecordRaw, RouterView } from "vue-router";

export const mohReports: RouteRecordRaw = {
  path: "moh", 
  component: RouterView,
  meta: {
    title: "MoH Reports",
    img: 'login-logos/Malawi-Coat_of_arms_of_arms.png',
  },
  children: [
    {
      path: "cohort",
      component: () => import("@/views/reports/moh/cohort/index.vue"),
      meta: {
        title: 'Cohort',
        img: 'reports/cohort.png',
      }      
    },
    {
      path: "regimen",
      component: () => import("@/views/reports/moh/RegimenReport.vue"),
      meta: {
        title: 'Regimen',
        img: 'reports/stats.png',
      }      
    },    
    {
      path: "regimen_distribution_by_weight",
      component: () => import("@/views/reports/moh/RegimenDistribution.vue"),
      meta: {
        title: 'Regimen Distribution By Weight',
        img: 'reports/electronics.png',
      }      
    },
    {
      path: "disaggregated",
      component: () => import("@/views/reports/moh/DisaggregatedReport.vue"),
      meta: {
        title: 'Disaggregated',
        img: 'reports/split.png',
      }      
    },
    {
      path: "survival_analysis",
      component: () => import("@/views/reports/moh/SurvivalAnalysis.vue"),
      meta: {
        title: 'Survival Analysis',
        img: 'reports/refill.png',
      }      
    },
    {
      path: "tpt_cohort",
      component: () => import("@/views/reports/moh/TptCohort.vue"),
      meta: {
        title: 'TPT Cohort',
        img: 'reports/cohort.png',
      }      
    },       
    {
      path: "tpt_initiation",
      component: () => import("@/views/reports/moh/TptNewInitiation.vue"),
      meta: {
        title: 'TPT New Initiation',
        img: 'reports/new_initiation.png',
      }      
    },
    {
      path: "viral_load",
      component: () => import("@/views/reports/moh/ViralLoadReport.vue"),
      meta: {
        title: 'Viral Load',
        img: 'reports/vl.png',
      }      
    },
    {
      path: "tx_curr",
      component: () => import("@/views/reports/moh/TxCurrMMD.vue"),
      meta: {
        title: 'TX CURR MMD',
        img: 'reports/px.png',
      }      
    },
  ]
} 