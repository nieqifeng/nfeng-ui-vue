const mockServer = () => {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'development') {
    return require('./mock/mockServer.js')
  } else {
    return ''
  }
}

module.exports = {
  devServer: {
    after: mockServer(),
  },
  css: { extract: false }
}