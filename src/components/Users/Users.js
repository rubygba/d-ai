import React from 'react'
import { connect } from 'dva'
import { Table, Pagination, Popconfirm, Button } from 'antd'
import { routerRedux } from 'dva/router'
import styles from './Users.css'
import { PAGE_SIZE } from '../../constants'
import UserModal from './UserModal'
import UserModalEdit from './UserModalEdit'

function Users({ loading, list: dataSource, total, page: current, isErr , dispatch }) {
  // if (isErr) {
  //   dispatch(routerRedux.push({
  //     pathname: '/'
  //   }))
  // }

  function deleteHandler(userId) {
    dispatch({
      type: 'users/del',
      payload: userId
    })
  }

  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    })
  }

  function editHandler(userId, values) {
    console.log('values:', values)
    dispatch({
      type: 'users/edit',
      payload: { userId, ...values },
    })
  }

  function pageChangeHandler(page) {
    console.log('routerRedux page: ', page)
    dispatch(routerRedux.push({
      pathname: '/users',
      search: `?page=${page}`
    }))
  }

  const columns = [
    {
      title: '序号',
      // dataIndex: 'no',
      key: 'no',
    },
    {
      title: '用户名称（备注名）',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record) => <a>{text} ({record.userRealName})</a>,
    },
    {
      title: '昨日数量',
      dataIndex: 'userLblSum_pp',
      key: 'userLblSum_pp',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.userLblSum_p - a.userLblSum_pp - b.userLblSum_p + b.userLblSum_pp,
      render: (text, record) => (
        <span>{record.userLblSum_p - text}</span>
      )
    },
    {
      title: '今日数量',
      dataIndex: 'userLblSum_p',
      key: 'userLblSum_p',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.userLblSum - a.userLblSum_p - b.userLblSum + b.userLblSum_p,
      render: (text, record) => (
        <span>{record.userLblSum - text}</span>
      )
    },
    {
      title: '总数',
      dataIndex: 'userLblSum',
      key: 'userLblSum',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.userLblSum - b.userLblSum,
    },
    {
      title: '抽样评估',
      dataIndex: 'userChkedSum',
      key: 'userChkedSum',
      render: (text, record) => (
        <span>{record.userChkedPass} / {text}</span>
      )
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModalEdit record={record} onOk={editHandler.bind(null, record.userId)}>
            <a>编辑</a>
          </UserModalEdit>
          <Popconfirm title="确认删除用户?" onConfirm={deleteHandler.bind(null, record.userId)}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      )
    }
  ]

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal record={{}} onOk={createHandler}>
            <Button type="primary">添加用户</Button>
          </UserModal>
        </div>
        <Table
          columns={columns}
          loading={loading}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
      </div>
    </div>
  )

//   <Pagination
//   className="ant-table-pagination"
//   total={total}
//   current={current}
//   pageSize={PAGE_SIZE}
//   onChange={pageChangeHandler}
// />
}

function mapStateToProps(state) {
  const { list, total, page, isErr } = state.users
  return {
    loading: state.loading.models.users,
    isErr,
    list,
    total,
    page,
  }
}

export default connect(mapStateToProps)(Users)
