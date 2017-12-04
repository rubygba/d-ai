import React from 'react'
import { connect } from 'dva'
import { Table, Pagination, Popconfirm, Button } from 'antd'
import { routerRedux } from 'dva/router'
import styles from './Users.css'
import { PAGE_SIZE } from '../../constants'
import UserModal from './UserModal'

function Users({ loading, list: dataSource, total, page: current, dispatch }) {
  function deleteHandler(id) {
    dispatch({
      type: 'users/remove',
      payload: id
    })
  }

  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    })
  }

  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
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
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: '用户名称（备注名）',
      dataIndex: 'userRealName',
      key: 'userRealName',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '昨日数量',
      dataIndex: 'userLblYesterdoday',
      key: 'userLblYesterdoday',
    },
    {
      title: '今日数量',
      dataIndex: 'userLblToday',
      key: 'userLblToday',
    },
    {
      title: '总数',
      dataIndex: 'userLblSum',
      key: 'userLblSum',
    },
    {
      title: '抽样评估',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
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
            <Button type="primary">Create User</Button>
          </UserModal>
        </div>
        <Table
          columns={columns}
          loading={loading}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  )
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

export default connect(mapStateToProps)(Users)
