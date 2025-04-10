'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { Desktop as DesktopIcon } from '@phosphor-icons/react/dist/ssr/Desktop';
import { DeviceTablet as DeviceTabletIcon } from '@phosphor-icons/react/dist/ssr/DeviceTablet';
import { Phone as PhoneIcon } from '@phosphor-icons/react/dist/ssr/Phone';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

// const iconMapping = { Desktop: DesktopIcon, Tablet: DeviceTabletIcon, Phone: PhoneIcon } as Record<string, Icon>;

export interface TrafficProps {
  chartSeries: number[];
  labels: string[];
  sx?: SxProps;
}

export function Traffic({ chartSeries, labels, sx }: TrafficProps): React.JSX.Element {
  const chartOptions = useChartOptions(labels);

  return (
    <Card style={{display:'none'}} sx={sx}>
      <CardHeader title="Status" />
      <CardContent>
        <Stack spacing={2}>
          <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            {/* {chartSeries.map((item, index) => {
              const label = labels[index]; */}
              {/* // const Icon = iconMapping[label]; */}

             
                <Stack spacing={1} sx={{ alignItems: 'center' }}>
                  {/* {Icon ? <Icon fontSize="var(--icon-fontSize-lg)" /> : null} */}
                  <Typography variant="h6">Succesful Jobs</Typography>
                  <Typography color="text.secondary" variant="subtitle2">
                    0 %
                  </Typography>
                </Stack>
                <Stack spacing={1} sx={{ alignItems: 'center' }}>
                  {/* {Icon ? <Icon fontSize="var(--icon-fontSize-lg)" /> : null} */}
                  <Typography variant="h6">Failed Jobs</Typography>
                  <Typography color="text.secondary" variant="subtitle2">
                    0 %
                  </Typography>
                </Stack>
                <Stack spacing={1} sx={{ alignItems: 'center' }}>
                  {/* {Icon ? <Icon fontSize="var(--icon-fontSize-lg)" /> : null} */}
                  <Typography variant="h6">Pending Jobs</Typography>
                  <Typography color="text.secondary" variant="subtitle2">
                    0 %
                  </Typography>
                </Stack>
             
            {/* })} */}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels: string[]): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent' },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
    dataLabels: { enabled: false },
    labels,
    legend: { show: false },
    plotOptions: { pie: { expandOnClick: false } },
    states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };
}
