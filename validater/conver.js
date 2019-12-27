// 全局去空格
export function ToNoSpace(str) {
  return str.replace(/\s+/g, '')
}

// 全角转半角
export function ToCDB(str) {
  let tmp = ''
  for (let i = 0; i < str.length; i += 1) {
    if (str.charCodeAt(i) === 12288) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 12256)
    } else if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 65248)
    } else {
      tmp += String.fromCharCode(str.charCodeAt(i))
    }
  }
  return tmp
}

export function cvForm(form) {
  const obj = {}
  Object.keys(form).map((item) => {
    if (typeof form[item] === 'string') {
      obj[item] = ToCDB(ToNoSpace(form[item]))
    } else {
      obj[item] = form[item]
    }
    return item
  })
  return obj
}

export function cvStr(value) {
  return ToCDB(ToNoSpace(value))
}

export default {
  ToNoSpace,
  ToCDB,
  cvForm,
  cvStr
}
