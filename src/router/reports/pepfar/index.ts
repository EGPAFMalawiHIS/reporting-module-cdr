import { RouteRecordRaw, RouterView } from "vue-router";

export const pepfarReports: RouteRecordRaw = {
  path: "pepfar", 
  component: RouterView,
  meta: {
    title: "PEPFAR Reports",
    img: 'login-logos/PEPFAR.png',
  },
  children: [
    {
      path: "disagreggated",
      component: () => import("@/views/reports/pepfar/DisagreggatedReport.vue"),
      meta: {
        title: 'Disagreggated',
        img: 'reports/split.png',
      }      
    },
    {
      path: "tx_curr_mmd",
      component: () => import("@/views/reports/pepfar/TxCurrMMD.vue"),
      meta: {
        title: 'Tx CURR MMD',
        img: 'reports/px.png',
      }      
    },
    {
      path: "tx_ml",
      component: () => import("@/views/reports/pepfar/TxML.vue"),
      meta: {
        title: 'Tx ML',
        img: 'reports/tx-ml.png',
      }      
    },
    {
      path: "tx_rtt",
      component: () => import("@/views/reports/pepfar/TxRTT.vue"),
      meta: {
        title: 'Tx RTT',
        img: 'reports/restart.png',
      }      
    },
    {
      path: "tb_prev",
      component: () => import("@/views/reports/pepfar/TbPrev.vue"),
      meta: {
        title: 'TB Prev',
        img: 'reports/previous.png',
      }      
    },
    {
      path: "vl_coverage",
      component: () => import("@/views/reports/pepfar/VlCoverage.vue"),
      meta: {
        title: 'VL Coverage',
        img: 'reports/viral_load.png',
      }      
    },
    {
      path: "sc_arvdisp",
      component: () => import("@/views/reports/pepfar/SCARVDISP.vue"),
      meta: {
        title: 'SC ARVDISP',
        img: 'reports/previous.png',
      }      
    },
    {
      path: "tx_tb",
      component: () => import("@/views/reports/pepfar/TxTB.vue"),
      meta: {
        title: 'Tx TB',
        img: 'reports/tb.png',
      }      
    },
    {
      path: "tx_new",
      component: () => import("@/views/reports/pepfar/TxNew.vue"),
      meta: {
        title: 'Tx New',
        img: 'reports/px.png',
      }      
    },
  ]
} 