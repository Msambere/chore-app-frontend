import { PieChart } from "@mui/x-charts/PieChart";
import { PieValueType } from "@mui/x-charts/models/seriesType/pie";

export interface ChorePieChartProps {
  data: PieValueType[];
}
export const Charts = ({ data }: ChorePieChartProps) => {
  return (
    <PieChart
      width={400}
      height={200}
      series={[
        {
          data: data,
        },
      ]}
    />
  );
};
