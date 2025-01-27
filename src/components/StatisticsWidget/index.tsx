import { useSelector } from "react-redux";
import { WidgetKeys } from "../../constants"
import Widget from "../Widget"
import styles from './style.module.scss';
import { AppState } from "../../store";
import { useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useIntl } from "react-intl";

const Statistics=()=>{
    const vechiles=useSelector((state:AppState)=>state.vechiles)

    const numWorkingVechiles=useMemo(()=>vechiles.filter(v=>!v.hasIssue).length,[vechiles])
    const numNotWorkingVechiles=useMemo(()=>vechiles.filter(v=>v.hasIssue).length,[vechiles])

    
    const chartData = useMemo(
      () => ({
        series: [numWorkingVechiles, numNotWorkingVechiles],
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Working fine', 'Has Issues'],
          colors: ['#28a745', '#dc3545'],
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
        },
      }),
      [numNotWorkingVechiles, numWorkingVechiles]
    );

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
            options={chartData.options}
            series={chartData.series}
            type='pie'
            width={380}
          />
        </Widget>
      </div>
    );
}

export default Statistics;