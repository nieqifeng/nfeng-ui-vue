import req from '/@/utils/request'
import URL from '../baseUrlConfig'

const baseURL = URL.nest

// 分页
export const page = params => {
  return req({
    baseURL,
    url: '/episodes/page',
    method: 'GET',
    params
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
