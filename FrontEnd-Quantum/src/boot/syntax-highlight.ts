import { boot } from 'quasar/wrappers';
import 'highlight.js/styles/github-dark-dimmed.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from '@highlightjs/vue-plugin';

hljs.registerLanguage('javascript', javascript);

export default boot(({ app }) => {
  app.use(hljsVuePlugin);
});
