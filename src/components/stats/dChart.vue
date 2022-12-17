<template>
  <div>
    <div class="fit" style="position: relative">
      <canvas ref="canv">
        <q-resize-observer @resize="onResize" />
      </canvas>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, reactive, onMounted, computed, watch, watchEffect } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  props: {
    type: {
      type: String,
      default: "line",
    },
    data: {
      type: Object,
      required: true,
    },
    opts: {
      type: Object,
      default: () => {
        return {};
      },
    },

    testData: {
      type: Array,
    },
  },
  setup(props) {
    //  canvas element
    const canv = ref(null);
    const opts = reactive({
      scale: {
        x: {
          beginAtZero: true,
        },
      },

      responsive: true,
      maintainAspectRatio: false,
    });

    // eslint-disable-next-line no-unused-vars
    const canvSize = reactive({
      height: null,
      width: null,
    });

    const updateSize = (height, width) => {
      canvSize.height = height;
      canvSize.width = width;
    };

    // gradConfig configures the linear gradients in the datasets
    const gradConfig = (chartData) => {
      // create the gradient for each dataset if so
      const datasets = chartData.datasets.map((ds) => {
        const { grad = {}, backgroundColor = null } = ds;

        const { use = false, orient = "vertical", reverse = false } = grad;

        // if not using gradient
        if (!use) {
          return ds;
        }

        // add the colors to the linear gradient
        if (!backgroundColor || !Array.isArray(backgroundColor)) {
          throw new Error("No background colors to create  a linear gradient");
        }

        // if gradient is to be used

        let pts = [0, 0, 0, 0];

        // check the orientation and update the gradient pts
        const { height, width } = canvSize;

        if (orient === "vertical") {
          pts[3] = height;
        } else {
          pts[2] = width;
        }

        // if in a reverse direction
        if (reverse) {
          pts = pts.reverse();
        }

        // configure linear gradient
        const linearGradient = canv.value
          .getContext("2d")
          .createLinearGradient(...pts);

        // ["rgba() 0", "rgba() .5"]
        backgroundColor.forEach((bcolor) => {
          const colorDef = bcolor.trim();
          const boundary = colorDef.lastIndexOf(" ");

          // extract color and offset from colorDef
          const color = colorDef.substring(0, boundary);

          const offset = colorDef.substring(boundary + 1);

          // throw error on the poor color formart
          if (color === "" || offset === "") {
            throw new Error(
              "Invalid color format. PLEASE use 'color offset' syntaxy to define your colors for linear gradient"
            );
          }

          // add the color stop
          linearGradient.addColorStop(parseFloat(offset), color);
        });

        // add the color to the dataset as background
        const dataset = { ...ds };
        dataset.backgroundColor = linearGradient;
        return dataset;
      });

      return datasets;
    };

    // chartConfig updates charts configurations
    const chartConfig = () => {
      //   add configuration to the chat
      Object.entries(props.opts).forEach((el) => {
        const key = el[0];
        const val = el[1];

        opts[key] = val;
      });
    };

    // CONFIGURING, CREATING AND UPDATING CHART DATA
    const data = ref({ ...props.data });

    const updateGrad = (chartData) => {
      const datasets = gradConfig(chartData);
      // update the datase
      data.value = { ...chartData };
      data.value.datasets = datasets;
    };

    // ONRESIZE

    const onResize = ({ width, height }) => {
      updateSize(height, width);
    };

    // MOUNTED HOOK
    onMounted(() => {
      // update canvas size
      const width = canv.value.parentNode.offsetWidth;
      const height = canv.value.parentNode.offsetHeight;
      updateSize(height, width);

      //   set chart configuration and read user linear gradient if any
      chartConfig();
      updateGrad(props.data);

      //start a chart
      const chart = new Chart(canv.value.getContext("2d"), {
        options: opts,
        type: props.type,
        data: data.value,
      });

      //   watch for update changes
      watch(canvSize, () => {
        updateGrad(props.data);

        chart.update();
      });

      watchEffect(() => {
        updateGrad(props.data);
        chart.update();
      });
    });

    return { canv, onResize };
  },
};
</script>

<style></style>
