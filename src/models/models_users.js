import * as usersService from '../services/api'
import { routerRedux } from 'dva/router'

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    name: null,
    psw: null,
    isLogin: false,
    isTry: false
  },
  reducers: {
    save(state, { payload: { userInfos, name, psw } }) {
      return { ...state, list: userInfos, name, psw, isLogin: true }
    },
    try(state, {payload: {userName, password}}) {
      localStorage.ai_usr = userName
      localStorage.ai_psw = password
      localStorage.ai_time = new Date().getTime()
      return { ...state, name: userName, psw: password, isTry: true}
    },
    logout(state) {
      localStorage.ai_usr = ''
      localStorage.ai_psw = ''
      return { ...state, isLogin: false, isTry: false}
    }
  },
  effects: {
    *jump(payload: {}, { call, put, select }) {
      // const name = yield select(state => state.users.name)
      // const psw = yield select(state => state.users.psw)
      const isTry = yield select(state => state.users.isTry)

      if (!isTry) {
        yield put(routerRedux.push({
          pathname: '/'
        }))
      } else {
        const name = yield select(state => state.users.name)
        const psw = yield select(state => state.users.psw)

        yield put({
          type: 'login',
          payload: {
            userName: name,
            password: psw
          }
        })
      }
    },
    *login({ payload: {userName, password} }, { call, put, select }) {
      const { data } = yield call(usersService.login, {userName, password})
      if (data.status != 0) {
        alert('用户名或密码错误')
        yield put({type: 'logout'})
        yield put({type: 'jump'})
        return
      }
      localStorage.ai_usr = userName
      localStorage.ai_psw = password
      localStorage.ai_time = new Date().getTime()
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
      return history.listen(({ pathname, search }) => {
        const usr = localStorage.ai_usr || ''
        const psw = localStorage.ai_psw || ''
        const time = localStorage.ai_time || 0
        const nowTime = new Date().getTime()
        if (usr && psw && (nowTime - time < 900000) & pathname === '/users') {
          dispatch({
            type: 'login',
            payload: {userName: usr, password: psw}
          })
        } else if (pathname === '/users') {
          dispatch({
            type: 'jump'
          })
        }
      })
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