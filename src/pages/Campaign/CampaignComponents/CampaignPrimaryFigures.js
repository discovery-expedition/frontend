import React from 'react';
import styled from 'styled-components';
import FigureBox from './FigureBox';
import { PRIMARY_FIGURES } from './FIGURES';

function CampaignPrimaryFigures({
  List,
  campaignStatus,
  completedCampaignList,
  dailyList,
}) {
  const proceedingFigures = PRIMARY_FIGURES.slice(
    0,
    PRIMARY_FIGURES.length - 1
  );
  const today = new Date();
  const yesterday = new Date(today.setDate(today.getDate() - 1));
  const dateFormat = date => {
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    return [
      date.getFullYear(),
      '년 ',
      (mm > 9 ? '' : '0') + mm,
      '월 ',
      (dd > 9 ? '' : '0') + dd,
      '일',
    ].join('');
  };
  const yesterdayDateFormat = dateFormat(yesterday);

  proceedingFigures[0].figureValue = List?.sum_hashtag?.toLocaleString();
  proceedingFigures[1].figureValue = List?.count_post?.toLocaleString();
  proceedingFigures[2].figureValue = campaignStatus
    ? List?.daily_official_visit?.toLocaleString()
    : List?.total_official_visit?.toLocaleString();
  proceedingFigures[3].figureValue = campaignStatus
    ? List?.daily_official_follower?.toLocaleString()
    : List?.total_official_follower?.toLocaleString();
  proceedingFigures[4].figureValue = campaignStatus
    ? List?.daily_official_referrer?.toLocaleString()
    : List?.total_official_referrer?.toLocaleString();
  const testIndex = completedCampaignList?.campaign_name?.indexOf(
    List?.Campaign?.name
  );
  const test = () => {
    if (testIndex == 0) {
      return completedCampaignList?.sales_graph[0];
    }
    if (testIndex == 1) {
      return completedCampaignList?.sales_graph[1];
    }
  };

  proceedingFigures[5].figureValue = campaignStatus
    ? dailyList?.sales_graph?.[
        dailyList?.sales_graph?.length - 1
      ]?.toLocaleString() + '원'
    : test()?.toLocaleString() + '원';

  return (
    <BigFiguresBox>
      {List ? (
        <>
          <FigureStandard>
            *
            {campaignStatus
              ? yesterdayDateFormat + ' 기준, 전 일 대비 증가량'
              : '캠페인 기간동안 총 증가량'}
          </FigureStandard>
          <FigureBoxes>
            {proceedingFigures.map(f => {
              return (
                <FigureBox
                  key={f.primaryFigureId}
                  width="216px"
                  height="85px"
                  FigureName={f.figureTitle}
                  Figure={f.figureValue}
                />
              );
            })}
          </FigureBoxes>
        </>
      ) : null}
    </BigFiguresBox>
  );
}

const BigFiguresBox = styled.div`
  margin-top: 1vh;
`;

const FigureStandard = styled.span`
  font-size: ${({ theme }) => theme.fontsize.fontSize1};
  color: ${({ theme }) => theme.palette.darkGrey};
`;

const FigureBoxes = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default CampaignPrimaryFigures;
