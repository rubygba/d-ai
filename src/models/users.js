import * as usersService from '../services/users'

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page }
    }
  },
  effects: {
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
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let _query = {}
        if (query) {
          _query = query
        }
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: _query })
          // dispatch({ type: 'fetch', payload: query })
        }
      })
      // return history.listen(({ pathname, search }) => {
      //   if (pathname === '/users') {
      //     dispatch({ type: 'fetch', payload: queryString.parse(query) })
      //   }
      // })
    }
  }
}