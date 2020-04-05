import React from 'react';
import GlobalStyle from './styles/global';
import LineChartReport from './components/LineChart';
import PizzaChartReport from './components/PizzaChart';
import { Container } from './AppStyle';

function App() {
  return (
    <Container>
      <GlobalStyle />
      <LineChartReport />
      <PizzaChartReport />
    </Container>
  );
}

export default App;
