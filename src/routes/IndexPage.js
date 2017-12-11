import React from 'react'
import { connect } from 'dva'
import styles from './IndexPage.css'
import MainLayout from '../components/MainLayout/MainLayout'
import { routerRedux } from 'dva/router'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
const FormItem = Form.Item

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.dispatch({
          type: 'users/try',
          payload: values
        })

        this.props.dispatch(routerRedux.push({
          pathname: '/users'
        }))
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <MainLayout location={location}>
        <div className={styles.normal}>
          <h1 className={styles.title}>图片识别标注用户管理系统</h1>
        </div>
        <Form onSubmit={this.handleSubmit} className={styles.form}>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={styles.button}>
              Log in
            </Button>
          </FormItem>
        </Form>
      </MainLayout>
    )
  }
}

function mapStateToProps(state) {
  const { list, total, page } = state.users
  return {
    loading: state.loading.models.users,
    list,
    total,
    page,
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

export default connect(mapStateToProps)(WrappedNormalLoginForm)