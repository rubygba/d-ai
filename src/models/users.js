import * as usersService from '../services/users'

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
  },
  reducers: {
    // save(state, { payload: { data: list, total, page } }) {
    //   return { ...state, list, total, page }
    // }
    save(state, { payload: { userInfos: list } }) {
      return { ...state, list }
    }
  },
  effects: {
    *login({ payload: {userName = 'lucy', password = '123456'} }, { call, put }) {
      const { data } = yield call(usersService.login, {userName, password})
      yield put({
        type: 'save',
        payload: {
          userInfos: data.userInfos,
          userId: data.userId,
          userName: data.userName,
          userRealName: data.userRealName
        }
      })
    },
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, { page })
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10)
        }
      })
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(usersService.remove, id)
      const page = yield select(state => state.users.page)
      yield put({ type: 'fetch', payload: { page } })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // return history.listen(({ pathname, search }) => {
      //   // 根据query生成参数对象（自制）
      //   console.log('listen router search: ', search)
      //   let _search = ''
      //   let arr = []
      //   let query = {}
      //   if (search) {
      //     _search = search.charAt(0) === '?' ? search.substring(1) : search
      //     arr = _search.split('&')
      //     let i = arr.length
      //     let temp = []
      //     while (i--) {
      //       temp = arr[i].split('=')
      //       query[temp[0]] = temp[1]
      //     }
      //   }
      //   console.log('listen router query: ', query)
      //   if (pathname === '/users') {
      //     dispatch({ type: 'fetch', payload: query })
      //   }
      // })

      // return history.listen(({ pathname, search }) => {
      //   if (pathname === '/users') {
      //     dispatch({ type: 'fetch', payload: queryString.parse(query) })
      //   }
      // })
    }
  }
}