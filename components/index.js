import NfVModal from './NfVModal/index.vue'
import NfTitle from './NfTitle/index.vue'
import NfBox from './NfBox'
import NfUpload from './NfUpload'
import NfForm from './NfForm'
import NfList from './NfList'

const components = [
  NfVModal,
  NfTitle,
  ...NfBox,
  ...NfUpload,
  ...NfForm,
  ...NfList
]

export default components
