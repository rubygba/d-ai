import request from '../utils/request'
import { PAGE_SIZE } from '../constants'

export function login({userName, password}) {
  return request(`/api/login?userName=${userName}&userPassword=${password}`)
}

export function fetch({ page }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`)
}

export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE'
  })
}