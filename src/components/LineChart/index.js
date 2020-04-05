import React, { useEffect, useState } from 'react';
import { parseISO, isBefore, isAfter, format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { Container, CustomTip } from './styles';
import jsonData from '../../data.json';

export default function LineChartReport() {
  const json = jsonData;
  const [data, setData] = useState([]);

  function compare(a, b) {
    if (isAfter(parseISO(b.data_lanc), parseISO(a.data_lanc))) {
      return -1;
    }
    if (isAfter(parseISO(a.data_lanc), parseISO(b.data_lanc))) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    // const tempData = [];
    // json.map((data) => {
    //   // setPaid(paid + data.pago);
    //   // setTotalValue(totalValue + data.valor);
    //   tempData.push({});
    // });

    json.sort(compare);

    console.log(json);

    setData(
      json.map((companyData) => {
        return {
          ...companyData,
          dateFormatted: format(parseISO(companyData.data_lanc), 'dd/MM'),
        };
      })
    );
  }, [json]);

  // const data = [
  //   {
  //     name: 'Page A',
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: 'Page B',
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: 'Page C',
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: 'Page D',
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: 'Page E',
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: 'Page F',
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: 'Page G',
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <CustomTip>
          <p className="label">{`${label} : ${Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(payload[0].value)}`}</p>
          <p className="desc">{payload[0].payload.fornecedor}</p>
        </CustomTip>
      );
    }

    return null;
  };

  return (
    <Container>
      <ResponsiveContainer width="100%" aspect={16.0 / 9.0}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateFormatted" />
          <YAxis domain={[0, 300000]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" height={5} iconSize={20} />
          <Line
            type="monotone"
            dataKey="valor"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}
