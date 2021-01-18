import req from '/@/utils/request'
import URL from '../baseUrlConfig'

const baseURL = URL.mock

//登录
export const login = data => {
  return req({
    baseURL,
    url: '/uc/login/adminLogin',
    method: 'POST',
    data
  })
}

//登出
export const logout = params => {
  return req({
    baseURL,
    url: '/uc/login/logout',
    method: 'GET',
    params
  })
}

//获取用户菜单
export const getUserMenus = params => {
  return req({
    baseURL,
    url: '/uc/ucuser/getCurrentMenuList/5',
    method: 'GET',
    params
  })
}
