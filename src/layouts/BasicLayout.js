import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './BasicLayout.less';
import { Layout, ConfigProvider, Menu } from 'antd';
import router from 'umi/router';

import Header from './Header'
// import PageLoading from '../components/PageLoading';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const { Content } = Layout
const { SubMenu } = Menu

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  clickHandle({ item, key, keyPath, domEvent }) {

    let path = keyPath.reverse().join('/')
    if (path !== '/') {
      path = '/' + path
    }
    router.push(path);
  }
  render() {
    return (
      <Layout>
        <Header />
        {/* <h1 className={styles.title}>Yay! Welcome to umi!</h1> */}
        <Layout
          style={{
            // ...this.getLayoutStyle(),
            minHeight: 'calc(100vh)'
          }}
        >
          {/* 左侧菜单 */}
          <Sider>
            <p style={{ color: '#999', textAlign: 'center', marginTop: '20px' }} >{'<- Here is sider ->'}</p>
            <Menu
              mode="inline"
              defaultSelectedKeys={['sub0']}
              // defaultOpenKeys={['sub0']}
              style={{ height: 'calc(100vh)', borderRight: '0' }}
              theme={'dark'}
              onClick={this.clickHandle.bind(this)}
            >
              <Menu.Item key="/">home</Menu.Item>
              <SubMenu key="flip" icon={<UserOutlined />} title="flip">
                <Menu.Item key="class1">概念</Menu.Item>
                <Menu.Item key="class2">栗子1</Menu.Item>
                <Menu.Item key="class3">栗子2</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          {/*  */}
          <Content className={styles.content + ' ' + 'aaa'} >
            {this.props.children}

          </Content>
        </Layout>
      </Layout >
    )
  }
}
function mapStateToProps(state) {
  // const { letMenuList } = state.menu;
  return {};
}
export default connect(mapStateToProps)(BasicLayout);
