import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedInfluencer, selectedWeeks } from '../../Atoms/selectedState';
import { influencerTop3 } from '../../Atoms/influencerTop3';
import DataBox from '../../components/DataBox';
import RankerBox from '../../components/RankerBox';
import styled from 'styled-components';
import { rightSelectedInfluencer } from '../../Atoms/analysisState';
import { useNavigate } from 'react-router-dom';

const AsideRanker = () => {
  const data = useRecoilValue(influencerTop3);
  const week = useRecoilValue(selectedWeeks);
  const branchProcessingData = useRecoilValue(selectedInfluencer);
  const renderData = [...data]
    .sort(
      (a, b) =>
        b.insight_1[week].engagement_rate - a.insight_1[week].engagement_rate
    )
    .slice(0, 3);

  const updateInfluencer = useSetRecoilState(rightSelectedInfluencer);
  const navigate = useNavigate();
  const conversionPage = e => {
    const { id } = e.currentTarget;
    branchProcessingData === id ? updateInfluencer('') : updateInfluencer(id);
    branchProcessingData === id
      ? alert('비교대상이 동일합니다. 다른 인플루언서를 선택해주세요')
      : navigate('/analysis');
  };

  return (
    <StyledDataBox size="large" color="borderColor" outline>
      <Header>
        <LegendDataBox size="medium" color="black">
          <h2>
            캠페인 인플루언서 퍼포먼스 상위 3인 <span>(참여율기준)</span>
          </h2>
        </LegendDataBox>
        {renderData.map((influencer, idx) => {
          return (
            <DataWrraper
              key={influencer.id}
              onClick={conversionPage}
              id={influencer.name}
            >
              <Number>{idx + 1}.</Number>
              <CustomRankerBox
                fullWidth
                color="borderColor"
                outline
                name={influencer.name}
              >
                <img src={influencer.img} alt="프로필 사진" />
                <span>{influencer.kor_name}</span>
                <span>{influencer.insight_1[week].engagement_rate}%</span>
              </CustomRankerBox>
            </DataWrraper>
          );
        })}
      </Header>
    </StyledDataBox>
  );
};

export default AsideRanker;

const StyledDataBox = styled(DataBox)`
  background: white;
  width: 25%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
`;

const LegendDataBox = styled(DataBox)`
  background: white;
  height: 40px;
  border-radius: ${({ theme }) => theme.btnRadius.borderRadius2};
  font-size: ${({ theme }) => theme.fontsize.fontSize1};
  color: ${({ theme }) => theme.palette.black};
  justify-content: center;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};

  h2 {
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontsize.fontSize2};
    span {
      font-weight: 400;
      font-size: ${({ theme }) => theme.fontsize.fontSize1};
    }
  }
`;

const DataWrraper = styled.div`
  display: flex;
  align-items: center;
  color: black;
  padding: 10px;
  height: 97px;
  cursor: pointer;
`;

const Number = styled.span`
  font-size: 24px;
  width: 30px;
`;

const CustomRankerBox = styled(RankerBox)`
  background: white;
  justify-content: space-between;
  padding: 0 10px;
  height: 100%;
  font-size: 13px;
  color: ${({ theme }) => theme.palette.black};

  span {
    :nth-child(2) {
      padding-right: 60px;
    }
    :nth-child(3) {
      font-size: 24px;
      font-weight: 600;
    }
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;
