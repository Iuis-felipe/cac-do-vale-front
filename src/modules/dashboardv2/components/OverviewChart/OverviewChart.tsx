import { useTheme } from '@mui/material';
import {
  OverviewChartRoot,
  OverviewChartHeader,
  OverviewChartTitle,
  OverviewChartSubtitle,
  OverviewChartLegend,
  LegendItem,
  LegendDot,
  LegendText,
  ChartContainer,
  BarGroup,
  BarsContainer,
  Bar,
  BarLabel,
} from './OverviewChart.styled';
import { Box } from '@mui/material';

interface WeekData {
  day: string;
  waiting: number;
  confirmed: number;
}

interface OverviewChartProps {
  data: WeekData[];
  month?: string;
  year?: string;
}

export function OverviewChart({ data, month = 'Fevereiro', year = '2025' }: OverviewChartProps) {
  const theme = useTheme();
  
  const maxValue = Math.max(
    ...data.flatMap((d) => [d.waiting, d.confirmed])
  );

  const getBarHeight = (value: number) => {
    if (maxValue === 0) return 0;
    return (value / maxValue) * 100;
  };

  return (
    <OverviewChartRoot>
      <OverviewChartHeader>
        <Box>
          <OverviewChartTitle>Visão Geral</OverviewChartTitle>
          <OverviewChartSubtitle>{month}/{year}</OverviewChartSubtitle>
        </Box>
        <OverviewChartLegend>
          <LegendItem>
            <LegendDot color={theme.palette.custom.blue.normalHover} />
            <LegendText>Aguardando</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendDot color={theme.palette.custom.green.normalHover} />
            <LegendText>Confirmado</LegendText>
          </LegendItem>
        </OverviewChartLegend>
      </OverviewChartHeader>

      <ChartContainer>
        {data.map((item, index) => (
          <BarGroup key={index}>
            <BarsContainer>
              <Bar
                height={getBarHeight(item.waiting)}
                color={theme.palette.custom.blue.normalHover}
              />
              <Bar
                height={getBarHeight(item.confirmed)}
                color={theme.palette.custom.green.normalHover}
              />
            </BarsContainer>
            <BarLabel>{item.day}</BarLabel>
          </BarGroup>
        ))}
      </ChartContainer>
    </OverviewChartRoot>
  );
}
