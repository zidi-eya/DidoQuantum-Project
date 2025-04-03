/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { ref, onMounted } from "vue";
import { fetchAllUsers, addUser } from "../services/userService";
import axios from "axios";
const users = ref([]);
const isToastVisible = ref(false);
const toastMessage = ref("");
const toastType = ref("success"); // "success" or "error"
const user = ref({
    // Added profile_image_file
    name: "",
    email: "",
    role: "",
    profile_image: "", // Keep this as string
    status: "",
    created_at: new Date(), // Initialize with current date and time
    profile_image_file: null, // New field for the uploaded file
});
// Fetch all users when the component is mounted
onMounted(async () => {
    try {
        users.value = await fetchAllUsers();
    }
    catch (error) {
        console.error("Failed to fetch users:", error);
    }
});
const handleFileUpload = (event) => {
    const target = event.target;
    if (target.files && target.files[0]) {
        user.value.profile_image_file = target.files[0]; // Store the selected file correctly
    }
};
const submitForm = async () => {
    try {
        const formData = new FormData();
        formData.append("name", user.value.name);
        formData.append("email", user.value.email);
        formData.append("role", user.value.role);
        formData.append("status", user.value.status);
        formData.append("created_at", new Date().toISOString());
        if (user.value.profile_image_file) {
            formData.append("profile_image", user.value.profile_image_file);
        }
        const newUser = await addUser(formData);
        users.value.push(newUser);
        // Show success notification
        showToast("User added successfully!", "success");
        // Reset form values
        user.value = {
            name: "",
            email: "",
            role: "",
            status: "",
            profile_image: "",
            profile_image_file: null,
        };
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error("Error response data:", error.response.data);
            showToast("Error adding user: " + error.response.data.detail, "error");
        }
        else {
            console.error("Error adding user:", error);
            showToast("An unknown error occurred!", "error");
        }
    }
};
// Function to show toast notification
const showToast = (message, type) => {
    toastMessage.value = message;
    toastType.value = type;
    isToastVisible.value = true;
    setTimeout(() => {
        isToastVisible.value = false;
    }, 3000); // Hide after 3 seconds
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['user-form']} */ ;
/** @type {__VLS_StyleScopedClasses['user-form']} */ ;
/** @type {__VLS_StyleScopedClasses['user-form']} */ ;
/** @type {__VLS_StyleScopedClasses['users-table']} */ ;
/** @type {__VLS_StyleScopedClasses['users-table']} */ ;
/** @type {__VLS_StyleScopedClasses['users-table']} */ ;
/** @type {__VLS_StyleScopedClasses['users-table']} */ ;
/** @type {__VLS_StyleScopedClasses['users-table']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.submitForm) },
    ...{ class: "user-form" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    placeholder: "Name",
    required: true,
});
(__VLS_ctx.user.name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    placeholder: "Email",
    required: true,
});
(__VLS_ctx.user.email);
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    placeholder: "Role",
    required: true,
});
(__VLS_ctx.user.role);
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onChange: (__VLS_ctx.handleFileUpload) },
    type: "file",
    accept: "image/*",
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.user.status),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
    disabled: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Active",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Inactive",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
});
const __VLS_0 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    name: "toast-fade",
}));
const __VLS_2 = __VLS_1({
    name: "toast-fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
if (__VLS_ctx.isToastVisible) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "toast" },
        ...{ class: (__VLS_ctx.toastType) },
    });
    (__VLS_ctx.toastMessage);
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['user-form']} */ ;
/** @type {__VLS_StyleScopedClasses['toast']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            isToastVisible: isToastVisible,
            toastMessage: toastMessage,
            toastType: toastType,
            user: user,
            handleFileUpload: handleFileUpload,
            submitForm: submitForm,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=FormulaireExample.vue.js.map