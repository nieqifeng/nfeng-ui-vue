import NfVModal from './NfVModal/NfVModal.vue'
import NfTitle from './NfTitle/NfTitle.vue'
import NfUpload from './NfUpload/NfUpload.vue'
import NfForm from './NfForm'
import NfList from './NfList'

const components = [
  NfVModal,
  NfTitle,
  NfUpload,
  ...NfForm,
  ...NfList
]

export default components
