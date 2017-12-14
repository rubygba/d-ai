import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'
import styles from './UserModal.css'

const FormItem = Form.Item

class UserEditModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  showModalHandler = (e) => {
    if (e) e.preventDefault()
    this.setState({
      visible: true,
    })
  }

  hideModelHandler = () => {
    this.setState({
      visible: false,
    })
  }

  // onOk={createHandler}
  okHandler = () => {
    const { onOk } = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values)
        this.hideModelHandler()
      }
    })
  }

  render() {
    const { children } = this.props
    const { getFieldDecorator } = this.props.form
    const { userName, userRealName, password } = this.props.record
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }

    return (
      <span>
        <span onClick={this.showModalHandler}>
          { children }
        </span>
        <Modal
          title="用户信息"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="用户名"
            >
              {
                getFieldDecorator('userName', {
                  rules: [
                    { pattern:  /^[0-9a-zA-Z_]*$/g, message: '只支持数字、字母和下划线'}
                  ],
                  initialValue: userName ? userName : ''
                })(<Input placeholder="Username"/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="备注名"
            >
              {
                getFieldDecorator('userRealName', {
                  initialValue: userRealName ? userRealName : ''
                })(<Input placeholder="Real Name"/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
            >
              {
                getFieldDecorator('password', {
                  initialValue: password ? password : '',
                })(<Input type="password" placeholder="Password" />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    )
  }
}

export default Form.create()(UserEditModal)