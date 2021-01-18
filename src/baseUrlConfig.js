const getBaseURL = () => {
  let host = window.location.host
  let URL = {
    localhost: {
      mock: '',
      java: 'http://dev-gateway.yigongpin.net/api',
      // java: 'http://dev-gateway.yigongpin.net/api',
      python: 'http://dev.back.yigongpin.net/api'
    },
    dev: {
      java: 'http://dev-gateway.yigongpin.net/api',
      python: 'http://dev.back.yigongpin.net/api'
    },
    test: {
      java: 'http://testrefactor2-gateway.yigongpin.net/api',
      python: 'http://172.31.101.31:30030/api' //test 多个，需要确定
    },
    com: {
      java: 'https://api.yigongpin.com/api',
      python: 'https://mall-reuse.yigongpin.com/api'
    }
  }
  for (let key in URL) {
    if (host.includes(key)) {
      return URL[key]
    }
  }
}
export default getBaseURL()
