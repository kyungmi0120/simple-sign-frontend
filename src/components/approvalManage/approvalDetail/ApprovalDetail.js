import React, { useEffect, useState } from 'react';
import InnerBox from '../../../components/common/InnerBox';
import Button from '../../../components/common/Button';
import DetailForm from './DetailForm';
import { useLocation, useNavigate } from 'react-router-dom';
import PopUp from '../../common/PopUp';
import PopUpFoot from '../../common/PopUpFoot';
import insertApproval from '../../../apis/approvalManageAPI/insertApproval';
import insertReturn from '../../../apis/approvalManageAPI/insertReturn';
import insertCancel from '../../../apis/approvalManageAPI/insertCancel';
import deleteApprovalDoc from '../../../apis/approvalManageAPI/deleteApprovalDoc';
import { useLoading } from '../../../contexts/LoadingContext';
import ReplyForm from './ReplyForm';
import { usePage } from '../../../contexts/PageContext';
import { useApp } from '../../../contexts/AppContext';
import { South } from '@mui/icons-material';
import getHasApproval from '../../../apis/approvalManageAPI/getHasApproval';
import getPermissionList from '../../../apis/approvalManageAPI/getPermissionList';

export default function ApprovalDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState('');
  const { showLoading, hideLoading } = useLoading();
  const { state: pageState, setState: setPageState } = usePage();
  const { state, setState } = useApp();
  const [hasPermission, setHasPermission] = useState(false);
  const [hasApproval, setHasApproval] = useState(false);

  const openModal = (mode) => {
    setIsModalOpen(true);
    if (mode === 'approve') {
      setMode('승인');
    } else if (mode === 'return') {
      setMode('반려');
    } else if (mode === 'cancel') {
      setMode('취소');
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getHasPermission();
  }, []);

  ////권한목록 가져와서 해당 사용자가 있으면 승인 버튼
  const getHasPermission = () => {
    //console.log(sessionStorage.getItem('user')); //해당 사용자 권한 가져오기
    //승인/반려 권한 가져오기
    getPermissionList(location.search.split('=')[1]).then((res) => {
      console.log(res);
      setHasPermission(res);
    });

    //결재취소권한 가져오기
    getHasApproval(location.search.split('=')[1]).then((res) => {
      setHasApproval(res);
    });
  };

  const approveHandler = () => {
    setPageState({ ...pageState, curPage: '결재상세' });
    showLoading();
    //결재승인
    insertApproval(location.search.split('=')[1])
      .then((res) => {
        if (res.status === 200) {
          alert('결재가 승인되었습니다.');
        } else {
          alert('결재가 실패했습니다.');
          hideLoading();
        }
      })
      .catch((e) => {
        alert('결재가 실패했습니다.');
        hideLoading();
      })
      .finally(() => {
        hideLoading();
      });
  };

  const returnHandler = () => {
    showLoading();
    //결재반려
    insertReturn(location.search.split('=')[1])
      .then((res) => {
        if (res.status === 200) {
          alert('결재가 반려되었습니다.');
        } else {
          alert('결재반려를 실패했습니다.');
        }
      })
      .catch((e) => {
        alert('결재반려를 실패했습니다.');
      })
      .finally(() => {
        hideLoading();
      });
  };

  const cancelHandler = () => {
    showLoading();
    //결재취소
    console.log('결재취소오오오오');
    insertCancel(location.search.split('=')[1])
      .then((res) => {
        if (res.status === 200) {
          alert('결재가 취소되었습니다.');
        } else {
          alert('결재취소 실패.');
        }
      })
      .catch((e) => {
        alert('결재취소 실패.');
      })
      .finally(() => {
        hideLoading();
      });
  };

  const returnTitleComponent = () => {
    return hasPermission ? (
      <>
        <Button
          label={'승인'}
          btnStyle={'red_btn'}
          onClick={() => openModal('approve')}
        />
        <Button
          label={'반려'}
          btnStyle={'green_btn'}
          onClick={() => openModal('return')}
        />
      </>
    ) : hasApproval ? (
      <Button
        label={'결재취소'}
        btnStyle={'dark_btn'}
        onClick={() => openModal('cancel')}
      />
    ) : null; // 빈 상태에서 null을 반환합니다.
  };

  const updateHandler = () => {
    navigate(`/ADD?page=${location.search.split('=')[1]}`);
  };

  const deleteHandler = () => {
    deleteApprovalDoc(location.search.split('=')[1])
      .then((res) => {
        if (res.status === 200) {
          alert('문서가 삭제되었습니다.');
        } else {
          alert('삭제를 실패했습니다.');
        }
      })
      .catch((e) => {
        alert('삭제를 실패했습니다.');
      });
  };

  const BlueAndGrayBtn = [
    {
      label: '반영',
      onClick: () => {
        if (mode === '승인') {
          approveHandler();
        } else if (mode === '반려') {
          returnHandler();
        } else if (mode === '취소') {
          cancelHandler();
        }
        closeModal();
      },
      btnStyle: 'red_btn',
    },
    {
      label: '취소',
      onClick: () => {
        closeModal();
      },
      btnStyle: 'dark_btn',
    },
  ];

  return (
    <div>
      <div>
        <InnerBox
          text={'결재문서상세페이지'}
          width={'100%'}
          height={'100%'}
          titleChildren={returnTitleComponent()}
          children={
            <>
              <DetailForm approval_doc_id={location.search.split('=')[1]} />
              <Button
                label={'문서수정'}
                btnStyle={'red_btn'}
                onClick={updateHandler}
              />
              <Button
                label={'문서삭제'}
                btnStyle={'green_btn'}
                onClick={deleteHandler}
              />
              <ReplyForm approval_doc_id={location.search.split('=')[1]} />
            </>
          }
        ></InnerBox>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <PopUp
          btnStyle={'popup_non_btn'}
          width="600px"
          height="600px"
          title={mode}
          isModalOpen={isModalOpen}
          openModal={openModal}
          closeModal={closeModal}
          children={
            <>
              <div>
                <div>{mode}하시겠습니까?</div>
              </div>
              <PopUpFoot buttons={BlueAndGrayBtn} />
            </>
          }
        ></PopUp>
      )}
    </div>
  );
}
