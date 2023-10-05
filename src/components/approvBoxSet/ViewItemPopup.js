import React, { useState } from 'react';
import styled from '../../styles/pages/ApprovalBoxSetPage.module.css';
import PopUp from '../common/PopUp';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import Button from '../common/Button';

function ViewItemPopup() {
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달을 닫기 위한 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 각 체크박스의 상태를 관리하는 상태 배열
  const [checkboxStates, setCheckboxStates] = useState({
    상신내역: false,
    미결내역: false,
    '기결내역-종결': false,
    '기결내역-진행': false,
    반려내역: false,
    수신참조내역: false,
  });
  // "조회항목" 체크박스 클릭 시 모든 하위 체크박스 상태 변경
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const newCheckboxStates = { ...checkboxStates };
    for (const key in newCheckboxStates) {
      newCheckboxStates[key] = !selectAll;
    }
    setCheckboxStates(newCheckboxStates);
  };

  // 하위 체크박스 클릭 시 해당 체크박스 상태 변경
  const handleCheckboxChange = (itemName) => {
    const newCheckboxStates = { ...checkboxStates };
    newCheckboxStates[itemName] = !newCheckboxStates[itemName];
    setCheckboxStates(newCheckboxStates);
  };

  return (
    <PopUp
      label={<GridViewRoundedIcon style={{ color: 'grey' }} />}
      title="조회항목 선택"
      width="400px"
      height="440px"
      isModalOpen={isModalOpen} // 여기에 상태 전달
      openModal={openModal} // 여기에 함수 전달
      closeModal={closeModal} // 여기에 함수 전달
      children={
        <div>
          <div className={styled.viewItemContainer}>
            <div className={styled.viewItemList}>
              <div className={styled.viewitem}>
                <div className={styled.topCheckbox}>
                  <input
                    type="checkbox"
                    value="selectAll"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </div>
                <div className={styled.topViewItem}>조회항목</div>
              </div>
              {/* 다른 하위 체크박스들 */}
              {Object.keys(checkboxStates).map((itemName, index) => (
                <div className={styled.viewitem} key={index}>
                  <div className={styled.checkbox}>
                    <input
                      type="checkbox"
                      value={itemName}
                      checked={checkboxStates[itemName]}
                      onChange={() => handleCheckboxChange(itemName)}
                    />
                  </div>
                  <div className={styled.itemName}>{itemName}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styled.submitBtn}>
            <Button label="확인" btnStyle="blue_btn" />
          </div>
        </div>
      }
    />
  );
}

export default ViewItemPopup;
