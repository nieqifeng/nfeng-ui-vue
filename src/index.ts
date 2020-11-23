import OurVue, { PluginObject } from "vue";
import components from "./components";

class NfengUI implements PluginObject<object> {
  install(Vue: typeof OurVue) {
    if (OurVue !== Vue) {
      throw new Error("Multiple instances of Vue detected");
    }
    components.forEach((value, key) => {
      Vue.component(key, value);
    });
  }
}

const nfengUi = new NfengUI();

export default nfengUi;
