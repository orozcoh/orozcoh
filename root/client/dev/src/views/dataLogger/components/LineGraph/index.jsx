import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment";

export const LineGraph = ({ data }) => {
  var windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const TICK_WIDTH = windowWidth > 600 ? 40 : 80;

  const getTickValues = () => {
    let innerWidth = 600;

    var xValues = data
      .map((d) => d.data.map((x) => x.x))
      .reduce((acc, data) => acc.concat(data), []);

    var gridWidth = Math.ceil(innerWidth / xValues?.length);
    var tickDistance = Math.floor(TICK_WIDTH / gridWidth);

    const values = xValues.filter((_, i) => i % tickDistance === 0);
    const realV = values.slice(0, values.length / 2);

    return {
      tickValues: tickDistance === 0 ? xValues : realV,
    };
  };

  const ticksNumber = getTickValues().tickValues;

  return (
    data && (
      <div style={{ width: "100%", height: "400px" }}>
        <ResponsiveLine
          data={data}
          enableGridX={true}
          enableGridY={true}
          curve="monotoneX"
          margin={{ top: 20, right: 60, bottom: 100, left: 60 }}
          initialDimensions={{ width: 800, height: 400 }}
          //xFormat={(value) => value}
          xScale={{ type: "time" }} // Use 'point' type for discrete values
          yScale={{
            type: "linear",
            min: 0,
            max: 500,
            stacked: true,
            reverse: false,
          }}
          yScale2={{ type: "linear", min: 0, max: 50 }} // Y-axis 2 scale
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={{
            min: 0,
            max: 50,
            tickSize: 5,
            legend: "Temperature (ºC)",
            legendOffset: 40,
            legendPosition: "middle",

            stacked: false,
          }}
          axisBottom={{
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 35,
            //tickDistance: 5,
            legend: null,
            legendOffset: 80,
            legendPosition: "middle",

            format: (date) => {
              return moment(date, "MMM DD, YY - HH:mm").format("DD/M - HH:mm");
            },
            tickValues: ticksNumber,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Light (?)",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          axisLeft2={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Temperature",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          enablePoints={false}
          pointSize={1}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "top-left",
              direction: "column",
              justify: false,
              translateX: 0,
              translateY: -20,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          theme={{
            axis: {
              ticks: {
                line: {
                  stroke: "transparent", // Remove vertical grid lines
                },
              },
            },
          }}
        />
      </div>
    )
  );
};

LineGraph.propTypes = {
  data: PropTypes.array,
};
