import React from 'react'
import { connect } from 'dva'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import styles from './IndexPage.css'
import MainLayout from '../components/MainLayout/MainLayout'

function IndexPage({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <h1 className={styles.title}>图片识别标注用户管理系统</h1>
      </div>
    </MainLayout>
  )

  // <div className={styles.welcome} />
  // <ul className={styles.list}>
  //   <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
  //   <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
  // </ul>
}

IndexPage.propTypes = {
}

export default connect()(IndexPage)