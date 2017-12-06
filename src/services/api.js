import request from '../utils/request'
import { PAGE_SIZE } from '../constants'

export function login({userName, password}) {
  return request(`/api/login?userName=${userName}&userPassword=${password}`, {
    method: 'POST',
    credentials: 'include'
  })
}

export function create({userName, password, userRealName}) {
  return request(`/api/add-user?userName=${userName}&userPassword=${password}&userRealName=${userRealName}`, {
    method: 'POST',
    credentials: 'include'
  })
}

export function del(userId) {
  return request(`/api/delete-user?userId=${userId}`, {
    method: 'POST',
    credentials: 'include'
  })
}

export function edit({userId, userName, password, userRealName}) {
  return request(`/api/modify-user?userId=${userId}&userName=${userName}&userPassword=${password}&userRealName=${userRealName}`,
  {
    method: 'POST',
    credentials: 'include'
  })
}

export function fetch({ page }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`)
}

export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE'
  })
}