import React from 'react';
import DataBox from '../../components/DataBox';
import RankerBox from '../../components/RankerBox';
import styled from 'styled-components';
import { MAIN_CAMPAIGN_LIST } from './MAIN_CAMPAIGN_LIST';

const RoasRanking = () => {
  const roasRank = MAIN_CAMPAIGN_LIST.sort(function (a, b) {
    if (a.ROAS > b.ROAS) {
      return -1;
    }
    if (a.ROAS < b.ROAS) {
      return 1;
    }
  });

  return (
    <StyledDataBox size="large" color="borderColor" outline>
      <Header>
        <LegendDataBox size="medium" color="black">
          <h2>캠페인 ROAS 순위</h2>
        </LegendDataBox>
        <TableDataBox size="medium" color="black">
          <h4>순위</h4>
          <h4>캠페인 명</h4>
          <h4>수치</h4>
        </TableDataBox>
        <TableContent>
          {roasRank.map((campaign, idx) => {
            return (
              <DataWrraper
                key={campaign.Campaign.id}
                value={campaign.Campaign.id}
              >
                <CustomCampaignBox
                  fullWidth
                  color="borderColor"
                  outline
                  className="hello"
                >
                  <div>
                    <span>{idx + 1}.</span>
                  </div>
                  <div>
                    <span>{campaign.Campaign.name}</span>
                  </div>
                  <div>
                    <span>{Math.floor(campaign.ROAS).toLocaleString()}%</span>
                  </div>
                </CustomCampaignBox>
              </DataWrraper>
            );
          })}
        </TableContent>
      </Header>
    </StyledDataBox>
  );
};

export default RoasRanking;

const TableContent = styled.div`
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledDataBox = styled(DataBox)`
  background: white;
  width: 430px;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const Header = styled.div`
  width: 100%;
`;

const TableDataBox = styled(DataBox)`
  background: white;
  height: 20px;
  border-radius: ${({ theme }) => theme.btnRadius.borderRadius2};
  font-size: ${({ theme }) => theme.fontsize.fontSize1};
  color: ${({ theme }) => theme.palette.black};
  justify-content: space-between;
  padding: 0 30px 0 18px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
  h4 {
    font-size: ${({ theme }) => theme.fontsize.fontSize1};
  }
`;

const LegendDataBox = styled(DataBox)`
  height: 40px;
  border-radius: ${({ theme }) => theme.btnRadius.borderRadius2};
  font-size: ${({ theme }) => theme.fontsize.fontSize1};
  background: ${({ theme }) => theme.palette.chartBlue2};
  color: ${({ theme }) => theme.palette.white};
  justify-content: center;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};

  h2 {
    margin-left: 10px;
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontsize.fontSize2};
  }
`;

const DataWrraper = styled.div`
  display: flex;
  align-items: center;
  color: black;
  padding: 10px;
  padding-right: 0;
  height: 30%;
`;

const CustomCampaignBox = styled(RankerBox)`
  justify-content: space-between;
  border: 0;
  border-radius: 0;
  padding: 0 10px;
  height: 30px;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.black};
  div:nth-child(1) {
    width: 15%;
    font-weight: 400;
  }
  div:nth-child(2) {
    width: 70%;
    font-weight: 400;
  }
  div:nth-child(3) {
    width: 15%;
    font-weight: 400;
    text-align: center;
  }
`;
