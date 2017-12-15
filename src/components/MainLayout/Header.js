import React from 'react'
import { connect } from 'dva'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'

function Header({ location, isLogin }) {
  function loginTab() {
    let flag = isLogin
    if (flag) {
      return (
        <Menu.Item key="/users">
          <Link to="/users"><Icon type="bars" />Users</Link>
        </Menu.Item>
      )
    } else {
      return
    }
  }

  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item>
        罗塞塔实验室
      </Menu.Item>
      <Menu.Item key="/">
        <Link to="/"><Icon type="home" />Home</Link>
      </Menu.Item>
      {loginTab()}
    </Menu>
  )

//   <Menu.Item key="/404">
//   <Link to="/page-you-dont-know"><Icon type="frown-circle" />404</Link>
// </Menu.Item>
}

function mapStateToProps(state) {
  const { isLogin } = state.users
  return {
    isLogin
  }
}

export default connect(mapStateToProps)(Header)
