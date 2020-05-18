import Vmodal from './layout-comps/vmodal.vue'
import Download from './layout-comps/download.vue'
import Table from './layout-comps/table.vue'

import Input from './control-comps/input.vue'
import Select from './control-comps/select.vue'
import Textarea from './control-comps/textarea.vue'
import CheckBox from './control-comps/checkbox.vue'
import Upload from './control-comps/upload.vue'

const components = {
  'nf-modal': Vmodal,
  'nf-upload': Upload,
  'nf-download': Download,
  'nf-table': Table,

  'nf-input': Input,
  'nf-select': Select,
  'nf-textarea': Textarea,
  'nf-checkbox': CheckBox,
}

export default components
