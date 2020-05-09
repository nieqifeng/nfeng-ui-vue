import url from './url'
import pattern from './pattern'
import {get, post} from './request'

/**
 * 返回一个lower - upper之间的随机数
 * @param {Number} lower
 * @param {Number} upper
 * @return  {Number} 返回值
 */
function random(lower, upper) {
  lower = +lower || 0
  upper = +upper || 0
  return Math.random() * (upper - lower) + lower
}

function trim(str) {
  return str.replace(/\s+/g, '')
}

function download(link) {
  let aLink = document.createElement('a');
  aLink.href = link
  let event;
  if(window.MouseEvent){
    event = new MouseEvent('click')
  }else{
    event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  }
  aLink.dispatchEvent(event)
}

export default {
  ...url,
  ...pattern,
  random,
  trim,
  download,
  get,
  post,
}
