import React from 'react';
import {
  DetailBox,
  TitleBox,
  InputBox,
  AreaBox,
} from '../../../formManage/formDetail/components/DetailTableItem';
import { useSeqManage } from '../../../../contexts/SeqManageContext';
import PopUp from '../../../common/PopUp';
import styled from '../../../../styles/components/seqManage/seqDetail/SeqDetailTable.module.css';
import { FiEdit } from 'react-icons/fi';
import PopUpFoot from '../../../common/PopUpFoot';

export default function SeqDetailTable() {
  const { detailData, setDetailData } = useSeqManage();

  const dataUpdateHandler = (id, data) => {
    setDetailData({ ...detailData, [id]: data });
  };

  const scopefilterHandler = (id, category, name, useId) => {
    let filetedData = detailData.scope.filter((ele) => {
      if (
        ele.category === category &&
        ele.name === name &&
        ele.useId === useId
      ) {
        return false;
      }
      return true;
    });
    setDetailData({ ...detailData, [id]: filetedData });
  };

  const buttons = [
    {
      name: '사용',
      value: true,
    },
    { name: '미사용', value: false },
  ];

  const grayAndBlueBtn = [
    {
      label: '반영',
      onClick: () => {},
      btnStyle: 'popup_blue_btn',
    },
  ];

  // compName: '',
  // code: '',
  // seqName: '',
  // deptScope: [],
  // formScope: [],
  // description: '',
  // sortOrder: '',
  // seqList: [],

  return (
    <>
      <DetailBox
        children={
          <>
            <TitleBox title={'회사명'} />
            <InputBox
              id={'compName'}
              data={detailData.compName}
              dataHandler={dataUpdateHandler}
            />
          </>
        }
      ></DetailBox>
      <DetailBox
        children={
          <>
            <TitleBox title={'코드'} />
            <InputBox
              id={'code'}
              data={detailData.code}
              dataHandler={dataUpdateHandler}
            />
          </>
        }
      ></DetailBox>
      <DetailBox
        children={
          <>
            <TitleBox title={'채번명'} />
            <InputBox
              id={'seqName'}
              data={detailData.seqName}
              dataHandler={dataUpdateHandler}
            />
          </>
        }
      ></DetailBox>
      <DetailBox
        children={
          <>
            <TitleBox title={'대상부서'} />
            <AreaBox
              id={'deptScope'}
              data={detailData.deptScope}
              dataHandler={scopefilterHandler}
            />
          </>
        }
      ></DetailBox>
      <DetailBox
        children={
          <>
            <TitleBox title={'대상양식'} />
            <AreaBox
              id={'formScope'}
              data={detailData.formScope}
              dataHandler={scopefilterHandler}
            />
          </>
        }
      ></DetailBox>
      <DetailBox
        children={
          <>
            <TitleBox title={'설명'} />
            <InputBox
              id={'description'}
              data={detailData.description}
              dataHandler={dataUpdateHandler}
            />
          </>
        }
      ></DetailBox>
      <DetailBox
        children={
          <>
            <TitleBox title={'정렬순서'} />
            <InputBox
              id={'sortOrder'}
              data={detailData.sortOrder}
              dataHandler={dataUpdateHandler}
            />
          </>
        }
      ></DetailBox>
      <DetailBox
        children={
          <>
            <TitleBox title={'채번값 설정'} />
            <InputBox
              id={'seqList'}
              data={detailData.seqList}
              dataHandler={dataUpdateHandler}
              width="80%"
              children={
                <div className={styled.popupBox}>
                  <PopUp
                    label={<FiEdit />}
                    width={'900px'}
                    height={'600px'}
                    title={'채번값 설정'}
                    children={
                      <>
                        {/* <div className={styled.contentContainer}>
                  <div>
                    <FormEdit data={data} dataHandler={setFormData} />
                  </div>
                </div> */}
                        <PopUpFoot buttons={grayAndBlueBtn} />
                      </>
                    }
                  />
                </div>
              }
            />
          </>
        }
      ></DetailBox>
    </>
  );
}
