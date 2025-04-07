import { Dialog } from 'quasar';
//import stripeService from 'src/modules/stripe/services/StripeService';
import { useAuthStore } from '@/modules/auth/stores/auth-store';
export function useErrorDialog() {
    const authStore = useAuthStore();
    const showErrorDialog = ({ message, title, okButtonMessage, clientReferenceId, paymentRequiredType, }) => {
        Dialog.create({
            title,
            message,
            ok: okButtonMessage,
            cancel: 'Close',
        }).onOk(async () => {
            // if (paymentRequiredType == 'subscription-limit-reached')
            //  stripeService.createCheckoutSession({
            //  clientReferenceId: clientReferenceId,
            //});
            if (paymentRequiredType == 'inactive-subscription-logged-user') {
                await authStore.signOut();
                window.location.href = `${window.location.origin}/auth/finish-payment?clientReferenceId=${clientReferenceId}`;
            }
        });
    };
    return { showErrorDialog };
}
//# sourceMappingURL=error-dialog.js.map