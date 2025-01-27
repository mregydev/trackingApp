import { useSelector } from "react-redux";
import { WidgetKeys } from "../../constants"
import Widget from "../Widget"
import styles from './style.module.scss';
import { AppState } from "../../store";
import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { useIntl } from "react-intl";
import { ApexOptions } from "apexcharts";

const Statistics=()=>{
    const vechiles=useSelector((state:AppState)=>state.vechiles)

    const numWorkingVechiles=useMemo(()=>vechiles.filter(v=>!v.hasIssue).length,[vechiles])
    const numNotWorkingVechiles=useMemo(()=>vechiles.filter(v=>v.hasIssue).length,[vechiles])

    const chartOptions:ApexOptions=  {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Working fine', 'Has Issues'],
      colors: ['#28a745', '#D32F2F'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    }

    const chartSeries=[numWorkingVechiles, numNotWorkingVechiles]
   
    const {$t} =useIntl();
    return (
      <div className={styles.container}>
        <Widget
          key={WidgetKeys['statistics']}
          id={WidgetKeys['statistics']}
          width={400}
          title={$t({id:'statisticsWidget.title'})}
        >
          <div className={styles.title}>
            {$t({id:"statisticsWidget.VehicleNum"})}: {vechiles.length}
          </div>
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type='pie'
            width={380}
          />
        </Widget>
      </div>
    );
}

export default Statistics;