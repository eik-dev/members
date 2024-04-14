import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {  Pie } from 'react-chartjs-2';
import Top from './Top';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },
    title: {
      display: false,
      text: '% Performance',
    },
  },
};

  
export default function Py() {

  let data = {
    labels: ['one', 'two'],
    datasets: [
      {
        data: [76,24],
        backgroundColor: ['#1083AC','rgba(198, 65, 48, 0.2)'],
        borderColor: ['#1083AC','rgba(198, 65, 48, 0.2)'],
      },
    ],
  };

  return (
      <div className='h-80'>
        <Top title='Print Certificate Requests' />
        <Pie data={data} options={options} />
      </div>
  );
}