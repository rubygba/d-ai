import * as usersService from '../services/api'

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    name: null,
    psw: null,
    isLogin: false
  },
  reducers: {
    // save(state, { payload: { data: list, total, page } }) {
    //   return { ...state, list, total, page }
    // }
    save(state, { payload: { userInfos, name, psw } }) {
      return { ...state, list: userInfos, name, psw, isLogin: true }
    },
    logout(state) {
      return { ...state, isLogin: false}
    }
  },
  effects: {
    *login({ payload: {userName = 'lucy', password = '123456'} }, { call, put }) {
      const { data } = yield call(usersService.login, {userName, password})
      if (data.status != 0) {
        alert('用户名或密码错误')
        yield put({type: 'logout'})
        return
      }
      localStorage.ai_usr = userName
      localStorage.ai_psw = password
      yield put({
        type: 'save',
        payload: {
          userInfos: data.userInfos,
          name: userName,
          psw: password,
          userId: data.userId,
          userRealName: data.userRealName
        }
      })
    },
    *create({ payload: {userName, password, userRealName} }, { call, put, select }) {
      const { data } = yield call(usersService.create, {userName, password, userRealName})
      // const name = yield select(state => state.users.name)
      // const psw = yield select(state => state.users.psw)
      // yield put({ type: 'login', payload: { userName: name, password: psw } })
      yield put({
        type: 'save',
        payload: {
          userInfos: data.userInfos
        }
      })
    },
    *del({ payload: userId }, { call, put, select }) {
      yield call(usersService.del, userId)
      const name = yield select(state => state.users.name)
      const psw = yield select(state => state.users.psw)
      yield put({ type: 'login', payload: { userName: name, password: psw } })
    },
    *edit({ payload: {userId, userName, password, userRealName} }, { call, put, select }) {
      const { data } = yield call(usersService.edit, {userId, userName, password, userRealName})
      const name = yield select(state => state.users.name)
      const psw = yield select(state => state.users.psw)
      yield put({ type: 'login', payload: { userName: name, password: psw } })
      // yield put({
      //   type: 'save',
      //   payload: {
      //     userInfos: data.userInfos
      //   }
      // })
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
      const usr = localStorage.ai_usr || ''
      const psw = localStorage.ai_psw || ''
      if (ai_usr && ai_psw) {
        dispatch({
          type: 'login',
          payload: {userName: ai_usr, password: ai_psw}
        })
      }
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