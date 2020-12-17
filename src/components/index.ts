import { VueConstructor } from "vue";

import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import Upload from "./UploadImg";
import Select from "./Select";
import Table from "./Table";
import TableImg from "./TableImg";
import Form from "./Form";
import FormItem from "./FormItem";
import FormCreate from "./FormCreate";
import FormDesign from "./FormDesign";
import FormSearch from "./FormSearch";
import FormModal from "./FormModal";
import FormTable from "./FormTable";
import Preview from "./Preview";
import Description from "./Description";

const components: Map<string, VueConstructor> = new Map();
components.set("NfDatePicker", DatePicker);
components.set("NfTimePicker", TimePicker);
components.set("NfUploadImg", Upload);
components.set("nf-select", Select);
components.set("nf-table", Table);
components.set("nf-table-img", TableImg);
components.set("nf-form", Form);
components.set("NfFormItem", FormItem);
components.set("nf-form-create", FormCreate);
components.set("nf-form-design", FormDesign);
components.set("nf-form-search", FormSearch);
components.set("nf-form-modal", FormModal);
components.set("nf-form-table", FormTable);
components.set("NfPreview", Preview);
components.set("nf-description", Description);

export default components;
