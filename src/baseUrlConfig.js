const URL = [
  {
    url: 'localhost:3001',
    nest: 'http://localhost:3009'
  }
]
const getBaseURL = () => {
  let host = window.location.host
  return URL.find(item => {
    return item.url === host
  })
}
export default getBaseURL()
