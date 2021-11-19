import { ImportOutlined } from '@ant-design/icons';
import { Menu, Space } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

const WalletManagementDropdown: FC = () => {
  const isWalletConnected = false;

  return (
    <WrapperStyled selectable={false}>
      {!isWalletConnected && (
        <Menu.Item key="connect_extension">
          <OptionStyled>
            <Space>
              <IconContainerStyled>
                <svg x="0px" y="0px" viewBox="0 0 80 80" xmlSpace="preserve" className="icon">
                  <path
                    fill="#0E3CA5"
                    d="M34.4,62.1c-4.2-15.5,29.7-23.3,32.8-23.5c8.7,0.2,10.8,10.5,4.4,21.1c-8.2,13.7-23.1,16.4-23.2,16.4 C44.5,76.4,36.6,70.2,34.4,62.1 M66.4,10C66.4,10,66.4,10,66.4,10L66.4,10C59.8,4.4,51.2,1,41.8,1c-5.5,0-10.7,1.2-15.4,3.3 C25.6,4.6,24.8,5,24,5.4c-0.5,0.3-1.1,0.6-1.6,0.9l0.1,0c-1.6,1.1-2.9,2.3-4,3.8C7.7,24.5,44.2,35,63.7,35 C72.7,41.5,75.2,16.9,66.4,10z"
                  ></path>
                  <path
                    fill="#5493F7"
                    d="M28.6,10.3c-5,7.5-21.7,12.9-24.5,12c0,0,0,0,0,0c0.1-0.2,0.2-0.5,0.3-0.7c0.9-1.8,2-3.6,3.2-5.2s2.6-3.2,4-4.7 s3-2.8,4.7-4c1-0.8,2.1-1.5,3.2-2.1c2.3-1.3,4.7-1.4,5.5-1.5C32.5,4.3,28.6,10.2,28.6,10.3 M24.5,63.6c-0.4-2.4-1.1-7.3-5.8-15.3 c-0.8-1.3-4.5-7.3-7.2-11C8.7,33.5,5.3,30,2.5,26.2l0,0C2.3,26.6,2.2,27,2,27.4c-0.7,2-1.2,4-1.5,6.2S0,37.8,0,40s0.2,4.4,0.5,6.5 s0.9,4.2,1.5,6.2s1.5,3.9,2.4,5.7s2,3.6,3.2,5.2c1.2,1.6,2.6,3.2,4,4.7c1.4,1.4,3,2.8,4.7,4c1.2,0.9,2.5,1.7,3.8,2.5 c2.5,1.4,3.4,1.4,3.8,1.3C24.5,75.3,24.9,66,24.5,63.6 M80,40c0-12-5.3-22.8-13.7-30.1c-2.5-2-6.7-2.1-8.1-2.1 C46.5,8.2,20,17.3,21.7,30.4c1.2,9.1,14.4,14.9,18.8,16.8c0.3,0.1,32.1,12.6,36.8,7.5C79,50.2,80,45.2,80,40 M58.5,75.5 c6.8-3.6,12.5-9.1,16.3-15.8c0.2-0.3,0-0.7-0.4-0.6c-3.7,0.4-20.3,7-22.2,13.5C51.2,75.9,55,77.1,58.5,75.5"
                  ></path>
                </svg>
              </IconContainerStyled>
              <div>Terra Station (extension)</div>
            </Space>
          </OptionStyled>
        </Menu.Item>
      )}
      {!isWalletConnected && (
        <Menu.Item key="connect_mobile">
          <OptionStyled>
            <Space>
              <IconContainerStyled>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" className="icon">
                  <g fill="none" fillRule="evenodd">
                    <path
                      fill="#3B99FC"
                      d="M9.31 9.31v2.64H2.05V9.97h5.28V7.33h2.64V2.05h1.98v7.26H9.31z"
                      transform="translate(-1013.000000, -170.000000) translate(997.000000, 109.000000) translate(0.000000, 52.000000) translate(16.000000, 9.000000) translate(7.000000, 7.000000) rotate(-315.000000) translate(-7.000000, -7.000000)"
                    />
                    <path
                      stroke="#3B99FC"
                      strokeWidth="1.96"
                      d="M11.2 5.59c-2.32-2.32-6.08-2.32-8.4 0"
                      transform="translate(-1013.000000, -170.000000) translate(997.000000, 109.000000) translate(0.000000, 52.000000) translate(16.000000, 9.000000)"
                    />
                  </g>
                </svg>
              </IconContainerStyled>
              <div>Terra Station (mobile)</div>
            </Space>
          </OptionStyled>
        </Menu.Item>
      )}
      {isWalletConnected && (
        <Menu.Item key="disconnect">
          <OptionStyled className="text-color-danger">
            <Space>
              <IconContainerStyled>
                <ImportOutlined className="icon" />
              </IconContainerStyled>
              <div>Disconnect</div>
            </Space>
          </OptionStyled>
        </Menu.Item>
      )}
    </WrapperStyled>
  );
};

const WrapperStyled = styled(Menu)`
  width: 100%;
  min-width: 200px;

  .ant-menu-item:not(:last-child) {
    margin-bottom: 4px;
  }
`;

const OptionStyled = styled.div`
  user-select: none;
`;

const IconContainerStyled = styled.div`
  display: flex;
  align-items: center;

  .icon {
    width: 16px;
    font-size: 16px;
  }
`;

export default WalletManagementDropdown;
