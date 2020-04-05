import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, Legend, Tooltip } from 'recharts';

import { Container, CustomTip } from './styles';
import jsonData from '../../data.json';

export default function PizzaChartReport() {
  const [paid, setPaid] = useState(0);
  const [unpaid, setUnpaid] = useState(0);
  const json = jsonData;

  useEffect(() => {
    json.map((companyData) => {
      setPaid(paid + companyData.pago);
      setUnpaid(unpaid + (companyData.valor - companyData.pago));
    });
  }, []);

  const data = [
    { name: 'Pago', value: parseInt(paid) },
    { name: 'Não pago', value: parseInt(unpaid) },
  ];
  const COLORS = ['#00C49F', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <CustomTip>
          <p className="label">{`Valor : ${Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(payload[0].value)}`}</p>
        </CustomTip>
      );
    }

    return null;
  };

  return (
    <Container>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="bottom" height={5} iconSize={20} />
      </PieChart>
    </Container>
  );
}
