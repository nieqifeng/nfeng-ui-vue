import { noop } from '../utils/utils'
// import objectAssign from '../utils/merge'
let GLOB_STRATEGY = {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  isCardNo: function (card) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    return reg.test(card)
  },

  // 是否为手机号码
  isMobile: function (mobile) {
    return /^1\d{10}$/.test(mobile)
  },

  // 是否为空
  isNonEmpty: function (value) {
    return value.length !== 0
  }
}

// 单个字段验证
/**
 * @param {*} field 字段对象 { name 字段名: value 字段值 }
 * @param {*} rules 验证策略 数组
 * @param {*} callback  回调函数
 */
function verify (field, rules, callback) {
  let errors
  let invalidFields = {}

  for (let i in rules) {
    let rule = rules[i]
    if (typeof rule.validator === 'function' ? !rule.validator(field.value) : !GLOB_STRATEGY[rule.validator](field.value)) {
      errors = [new Error(rule.message)]
      invalidFields[field.name] = [new Error(rule.message)]
      break
    }
  }

  callback(errors, invalidFields)
}

// 循环字段验证
/**
 * @param {*} formData 字段对象
 * @param {*} rules 验证策略
 * @param {*} callback 回调函数
 */
function batch (callback, formData, rules) {
  let valid = true
  let error = ''
  for (let i in formData) {
    let field = {
      name: i,
      value: formData[i]
    }
    let form = {
      rules: rules[i],
      field: field
    }
    validate('', (message) => {
      if (message && valid) {
        valid = false
        error = message
      }
    }, form)
  }
  if (typeof callback === 'function') {
    callback(valid, error)
  }
}

// 逐个字段验证
/**
 * @param {*} trigger
 * @param {*} callback
 * @param {*} form
 */
function validate (trigger, callback = noop, form) {
  const rules = form.rules
  let field = form.field
  let validateMessage = ''
  verify(field, rules, (errors, invalidFields) => {
    validateMessage = errors ? errors[0].message : ''

    callback(validateMessage, invalidFields)
  })
}

export {
  verify,
  batch
}
