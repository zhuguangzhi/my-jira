import React from "react";
import styled from "@emotion/styled";
import {Spin} from "antd";

const FullPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`
export const FullPageLoading = ({message = '加载中'}: { message?: string }) => <FullPage>
    <Spin size={'large'} tip={message}></Spin>
</FullPage>