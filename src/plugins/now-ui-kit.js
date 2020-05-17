import 'bootstrap/dist/css/bootstrap.css';
import '@/assets/style/scss/now-ui-kit.scss';
import '@/assets/style/website/website.css';
import '@/assets/style/website/main.css';
import globalDirectives from './globalDirectives';
import globalMixins from './globalMixins';
import globalComponents from './globalComponents';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import VueLazyload from 'vue-lazyload';

locale.use(lang);

export default {
  install(Vue) {
    Vue.use(globalDirectives);
    Vue.use(globalMixins);
    Vue.use(globalComponents);
    Vue.use(VueLazyload, {
      observer: true,
      // optional
      observerOptions: {
        rootMargin: '0px',
        threshold: 0.1
      }
    });
  }
};
