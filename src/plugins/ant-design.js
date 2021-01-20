// import 'ant-design-vue/dist/antd.css'
import {
  Button,
  Layout,
  Menu,
  Divider,
  Checkbox,
  message,
  Form,
  Select,
  Input,
  DatePicker,
  Table,
  ConfigProvider,
  Breadcrumb,
  Alert,
  Dropdown,
  Pagination,
  Radio,
  Modal,
  Spin,
  Upload,
  Tabs,
  Descriptions,
  Popconfirm,
  Drawer,
  InputNumber,
  Icon,
  Switch,
  Steps,
  Empty,
  Row,
  Col,
  Cascader,
  TimePicker,
  Result
} from 'ant-design-vue'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  DownOutlined,
  UpOutlined,
  PlusOutlined,
  ExclamationCircleFilled,
  ExclamationCircleOutlined,
  DownloadOutlined,
  ApartmentOutlined,
  UserOutlined,
  LockOutlined,
  SisternodeOutlined,
  createFromIconfontCN,
  ProjectOutlined,
  UploadOutlined,
  ShopOutlined,
  RedoOutlined
} from '@ant-design/icons-vue'
export default app => {
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2017752_48g5pjyed63.js'
  })
  app.use(Checkbox)
  app.use(Form)
  app.use(Input)
  app.use(DatePicker)
  app.use(Button)
  app.use(Layout)
  app.use(Menu)
  app.use(Divider)
  app.use(Table)
  app.use(ConfigProvider)
  app.use(Breadcrumb)
  app.use(Select)
  app.use(Alert)
  app.use(Dropdown)
  app.use(Pagination)
  app.use(Radio)
  app.use(Modal)
  app.use(Radio)
  app.use(Upload)
  app.use(Spin)
  app.use(Tabs)
  app.use(Descriptions)
  app.use(Popconfirm)
  app.use(Drawer)
  app.use(InputNumber)
  app.use(Icon)
  app.use(Switch)
  app.use(Row)
  app.use(Col)
  app.use(Cascader)
  app.use(TimePicker)
  app.use(Steps)
  app.use(Empty)
  app.use(Result)
  app.component('IconFont', IconFont)
  app.component('MenuUnfoldOutlined', MenuUnfoldOutlined)
  app.component('MenuFoldOutlined', MenuFoldOutlined)
  app.component('LogoutOutlined', LogoutOutlined)
  app.component('AppstoreOutlined', AppstoreOutlined)
  app.component('MailOutlined', MailOutlined)
  app.component('SettingOutlined', SettingOutlined)
  app.component('DownOutlined', DownOutlined)
  app.component('UpOutlined', UpOutlined)
  app.component('PlusOutlined', PlusOutlined)
  app.component('DownloadOutlined', DownloadOutlined)
  app.component('ExclamationCircleFilled', ExclamationCircleFilled)
  app.component('ApartmentOutlined', ApartmentOutlined)
  app.component('UserOutlined', UserOutlined)
  app.component('LockOutlined', LockOutlined)
  app.component('ExclamationCircleOutlined', ExclamationCircleOutlined)
  app.component('ProjectOutlined', ProjectOutlined)
  app.component('SisternodeOutlined', SisternodeOutlined)
  app.component('UploadOutlined', UploadOutlined)
  app.component('ShopOutlined', ShopOutlined)
  app.component('RedoOutlined', RedoOutlined)
  app.config.globalProperties.$message = message
  app.config.globalProperties.$confirm = Modal.confirm
}
