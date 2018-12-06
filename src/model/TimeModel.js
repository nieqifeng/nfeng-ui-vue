import BaseModel from './BaseModel'
/*
 * 时间选择 model
 */

class TimeModel extends BaseModel {
  constructor () {
    super()
    this.listHour = Array.from({length: 12}, (value, index) => 1 + index)
    this.listMinute = Array.from({length: 60}, (value, index) => this.addZero(index.toString(), 2))
    this.listA = ['AM', 'PM']
    this.hour = ''
    this.minute = ''
    this.a = ''
  }
  addZero (str, length) {
    return new Array(length - str.length + 1).join('0') + str
  }
}

export { TimeModel }
