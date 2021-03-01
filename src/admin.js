window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import { createApp } from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

const app = createApp({});
const requireComponent = require.context(
    './components',
    true,
    /[a-z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);
    const componentName = upperFirst(
        camelCase(fileName
            .split('/')
            .pop()
            .replace(/\.\w+$/, '')
        )
    );

    // console.log(fileName, componentName);
    app.component(componentName, componentConfig.default || componentConfig);
});

app.mount('#app');
