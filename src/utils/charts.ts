export const LineChartOptions = {
  chart: {
    id: "line-chart",
    type: 'line',
  },
  xaxis: {
    type: 'datetime',
    tickAmount: 2,
    labels: {
      show: true,
      rotate: -75,
    }
  },
  markers: {
    size: 8,
    hover: {
      sizeOffset: 3
    }
  },
  tooltip: {
    x: {
      format: 'dd/MMM/yyyy'
    }
  },
  title: {
    text: 'Line Chart',
    align: 'left'
  },
}

export function getPlaceholderChart(text = "No Data") {
  return {
    text,
    align: "center",
    verticalAlign: "middle",
    offsetX: 0,
    offsetY: 0,
    style: {
      color: "#a7a7a7",
      fontSize: "25px",
      fontFamily: "Helvetica",
    },
  }
}

/**
 * Merges custom options into a set of default options.
 * @param defaults The default options to be merged with.
 * @param customOptions The custom options to merge into the defaults.
 * @returns The merged options.
 */
export function mergeOptions(defaults: Record<string, any>, customOptions: Record<string, any>) {
  for (const key in customOptions) {
    if (key in defaults) {
      defaults[key] = { ...defaults[key], ...customOptions[key] };
    } else {
      defaults[key] = customOptions[key];
    }
  }
  return defaults;
}
