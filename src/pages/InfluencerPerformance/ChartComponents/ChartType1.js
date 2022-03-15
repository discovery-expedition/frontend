import React from 'react';
import { useRecoilValue } from 'recoil';
import { chartData1, chartData2, chartData3 } from '../../../Atoms/chartData';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import DataBox from '../../../components/DataBox';
import styled from 'styled-components';
import theme from '../../../styles/theme';

Chart.register(ChartDataLabels, ...registerables);

const ChartType1 = () => {
  const discoveryData = useRecoilValue(chartData1);
  const anotherData = useRecoilValue(chartData2);
  const theOtherData = useRecoilValue(chartData3);
  const likesData = [
    discoveryData.value && discoveryData.value[0],
    anotherData.value && anotherData.value[0],
    theOtherData.value && theOtherData.value[0],
  ];
  const commentData = [
    discoveryData.value && discoveryData.value[1],
    anotherData.value && anotherData.value[1],
    theOtherData.value && theOtherData.value[1],
  ];

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.yLabel;
          },
        },
      },
      datalabels: {
        display: true,
        align: 'center',
        font: {
          weight: 'normal',
        },
      },
    },
    indexAxis: 'y',
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: c => {
              if (c.index === 0) {
                return theme.fontsize.fontSize1;
              } else {
                return theme.fontsize.fontSize1;
              }
            },
            weight: c => {
              if (c.index === 0) {
                return 'bold';
              } else {
                return 'normal';
              }
            },
          },
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    layout: { padding: 10 },
  };

  const dataHorBar = {
    labels: [discoveryData.hashtag, anotherData.hashtag, theOtherData.hashtag],
    datasets: [
      {
        data: likesData,
        label: '좋아요 수',
        border: '0',
        backgroundColor: c => {
          if (c.index === 0) {
            return theme.palette.chartRed;
          } else {
            return theme.palette.chartRed;
          }
        },
        barThickness: 18,
        datalabels: {
          color: theme.palette.white,
        },
      },
      {
        data: commentData,
        label: '댓글 수',
        border: '0',
        backgroundColor: c => {
          if (c.index === 0) {
            return theme.palette.chartYellow;
          } else {
            return theme.palette.chartYellow;
          }
        },
        barThickness: 18,
        datalabels: {
          color: theme.palette.white,
        },
      },
    ],
  };

  return (
    <StyledDataBox size="large" color="borderColor" outline>
      <Header>
        <LegendDataBox size="medium" color="black">
          <h2>인플루언서 해시태그별 퍼포먼스 비교</h2>
        </LegendDataBox>
        <LegendDataBox size="medium" color="black">
          <span>좋아요 수</span>
          <span>|</span>
          <span>댓글 수</span>
          <span>|</span>
          <span>참여도</span>
          <span>|</span>
          <span>참여율</span>
        </LegendDataBox>
      </Header>
      <Bar data={dataHorBar} options={options} width={300} height={200} />
    </StyledDataBox>
  );
};

export default ChartType1;
const StyledDataBox = styled(DataBox)`
  background: white;
  width: 32%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
`;

const LegendDataBox = styled(DataBox)`
  background: white;
  height: 40px;
  padding: 0;
  margin-right: 10px;
  border-radius: ${({ theme }) => theme.btnRadius.borderRadius2};
  font-size: ${({ theme }) => theme.fontsize.fontSize1};
  color: ${({ theme }) => theme.palette.black};
  span {
    padding: 1px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.grey};
  }
  span:nth-child(1) {
    color: ${({ theme }) => theme.palette.chartRed};
  }
  span:nth-child(3) {
    color: ${({ theme }) => theme.palette.chartYellow};
  }
  span:nth-child(5) {
    color: ${({ theme }) => theme.palette.chartGreen};
  }
  span:nth-child(7) {
    color: ${({ theme }) => theme.palette.chartBlue};
  }
  h2 {
    margin-left: 10px;
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontsize.fontSize2};
  }
`;