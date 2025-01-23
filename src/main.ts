import { createApp, reactive } from "vue";
import App from "./App.vue";
import RippleButton from './components/RippleButton.vue';
import Tag from './components/Tag.vue';
import Toast from './components/Toast.vue';
import Loading from "./components/Loading.vue";
import SnackBar from './components/SnackBar.vue';
import UIContainer from './components/UIContainer.vue';
import Drawer from "./components/Drawer.vue";
const app = createApp(App);
const IsDrawerOpen = reactive({ state: false });
app.config.globalProperties.$IsDrawerOpen = IsDrawerOpen;
// 全局注册组件
app.component('RippleButton', RippleButton);
app.component('Tag', Tag);
app.component('Toast', Toast);
app.component('Loading', Loading);
app.component('SnackBar', SnackBar);
app.component('UIContainer', UIContainer);
app.component('Drawer', Drawer);
app.mount("#app");