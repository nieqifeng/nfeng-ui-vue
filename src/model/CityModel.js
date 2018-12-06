import BaseModel from './BaseModel'
import { city3 } from '../utils/city'
/*
 * 城市选择 model
 */
class CityModel extends BaseModel {
  constructor () {
    super()
    this.listProvince = []
    this.listCity = []
    this.listCounty = []
    this.province = '广东省'
    this.city = '肇庆市'
    this.county = '封开县'
    this.init()
  }
  init () {
    city3.forEach(item =>
      this.listProvince.push(item.name)
    )
    if (!this.province) {
      this.province = this.listProvince[0]
      this.updateList(city3[0], 'listCity')
    } else {
      this.setCityJson(this.province)
    }
    if (this.city) {
      this.setCountyJson(this.city)
    }
  }
  /**
   *  传入json,判断返回json,child
   *  兼容不存在child报错的情况
   */
  getChildJson (data) {
    if (!data) {
      return []
    }
    var result = ({}).hasOwnProperty.call(data, 'child') ? data['child'] : []
    return result
  }
  setCityJson (value) {
    var found = city3.find(element => {
      return element.name === value
    })
    this.updateList(found, 'listCity')
  }
  setCountyJson (value) {
    var found = city3.find(element => {
      return element.name === this.province
    })
    var child = found.child.find(element => {
      return element.name === value
    })
    this.updateList(child, 'listCounty')
  }
  updateList (json, arrName) {
    this[arrName] = []
    this.getChildJson(json).forEach(item => {
      this[arrName].push(item.name)
    })
  }
}

export { CityModel }
