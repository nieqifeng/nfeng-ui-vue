import { VueConstructor } from "vue";

import Upload from "./Upload";
import Select from "./Select";
import Table from "./Table";
import TableImg from "./TableImg";
import Form from "./Form";
import FormCreate from "./FormCreate";
import FormSearch from "./FormSearch";
import FormModal from "./FormModal";
import FormTable from "./FormTable";
import Preview from "./Preview";
import Description from "./Description";

const components: Map<string, VueConstructor> = new Map();
components.set("nf-upload", Upload);
components.set("nf-select", Select);
components.set("nf-table", Table);
components.set("nf-table-img", TableImg);
components.set("nf-form", Form);
components.set("nf-form-create", FormCreate);
components.set("nf-form-search", FormSearch);
components.set("nf-form-modal", FormModal);
components.set("nf-form-table", FormTable);
components.set("nf-preview", Preview);
components.set("nf-description", Description);

export default components;
