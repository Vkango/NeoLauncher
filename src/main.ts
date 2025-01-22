import { createApp } from "vue";
import App from "./App.vue";
import RippleButton from './components/RippleButton.vue';
import Tag from './components/Tag.vue';
import Toast from './components/Toast.vue';
import Loading from "./components/Loading.vue";
const app = createApp(App);

// 全局注册组件
app.component('RippleButton', RippleButton);
app.component('Tag', Tag);
app.component('Toast', Toast);
app.component('Loading', Loading);

app.mount("#app");