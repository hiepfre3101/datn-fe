/* eslint-disable @typescript-eslint/no-explicit-any */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';

const ChartArea = (props: any) => {
   console.log(props.options);
   const areaOptions = useMemo(() => {
      return {
         chart: {
            zoomType: 'x'
         },
         title: {
            text: props.options.title,
            align: 'left'
         },
         xAxis: {
            type: 'datetime'
         },
         yAxis: {
            title: {
               text: 'VND'
            }
         },
         legend: {
            enabled: false
         },
         plotOptions: {
            area: {
               fillColor: {
                  linearGradient: {
                     x1: 0,
                     y1: 0,
                     x2: 0,
                     y2: 1
                  }
               },
               marker: {
                  radius: 2
               },
               lineWidth: 1,
               states: {
                  hover: {
                     lineWidth: 1
                  }
               },
               threshold: null
            }
         },
         series: [{
            type:'area',
            name:"Doanh thu",
            data:props.options?.series 
         }]
      };
   }, [props]);
   return <HighchartsReact highcharts={Highcharts} options={areaOptions} />;
};

export default ChartArea;
