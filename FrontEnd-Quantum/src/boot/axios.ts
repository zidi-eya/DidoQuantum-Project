import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { useErrorDialog } from 'src/composables/error-dialog';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  api.interceptors.response.use(null, function (e) {
    // Optionally, you can check for specific error codes and handle them differently
    if (e.response && e.response.status === 402) {
      const { showErrorDialog } = useErrorDialog();

      if (e.response.data.type == 'subscription-limit-reached') {
        showErrorDialog({
          title: 'Subscription Limits Reached',
          message:
            "Oops! It looks like you've reached your subscription plan limits. Please consider upgrading your subscription plan.",
          okButtonMessage: 'Change Subscription',
          clientReferenceId: e.response.data.client_reference_id,
          paymentRequiredType: e.response.data.type,
        });
      }
      if (e.response.data.type == 'inactive-subscription-logged-user') {
        showErrorDialog({
          title: 'No valid subscription found',
          message:
            'Oops! It looks like you dont have any subscription active. Please subscribe to any of our plans to unlock more features. You will be logged out if you wish to subscribe.',
          okButtonMessage: 'Subscribe',
          clientReferenceId: e.response.data.client_reference_id,
          paymentRequiredType: e.response.data.type,
        });
      }
      if (e.response.data.type == 'subscription-limit-reached-member') {
        showErrorDialog({
          title: 'Owner Subscription Limits Reached',
          message:
          'Oops! It looks like the owner subscription has reached the subscription plan limits. Please contact the organization owner.',
          okButtonMessage: null,
          clientReferenceId: e.response.data.client_reference_id,
          paymentRequiredType: e.response.data.type,
        });
      }
    }

    return Promise.reject(e);
  });
});

export { api };
