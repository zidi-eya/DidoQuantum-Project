import { ref, onMounted } from "vue";
import { fetchAllUsers, deleteUser, updateUser } from "../services/userService";
const users = ref([]);
const isEditModalOpen = ref(false);
const editableUser = ref({});
const isDeleteModalOpen = ref(false);
const userIdToDelete = ref(null);
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
const openEditModal = (user) => {
    editableUser.value = { ...user }; // Clone user data to avoid modifying original list
    isEditModalOpen.value = true;
};
const closeEditModal = () => {
    isEditModalOpen.value = false;
    editableUser.value = {};
};
const saveUserEdits = async () => {
    if (!editableUser.value.id)
        return;
    try {
        const updatedUser = await updateUser(editableUser.value.id, editableUser.value);
        users.value = users.value.map((user) => user.id === updatedUser.id ? updatedUser : user);
        closeEditModal();
    }
    catch (error) {
        console.error("Error updating user:", error);
    }
};
const confirmDeleteUser = (id) => {
    userIdToDelete.value = id;
    isDeleteModalOpen.value = true;
};
const closeDeleteModal = () => {
    isDeleteModalOpen.value = false;
    userIdToDelete.value = null;
};
const deleteUserConfirmed = async () => {
    if (userIdToDelete.value === null)
        return;
    try {
        await deleteUser(userIdToDelete.value);
        users.value = users.value.filter((u) => u.id !== userIdToDelete.value);
        closeDeleteModal();
    }
    catch (error) {
        console.error("Error deleting user:", error);
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
    ...{ class: "users-table" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
for (const [user] of __VLS_getVForSourceType((__VLS_ctx.users))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (user.id),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    if (user.profile_image) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            src: (user.profile_image),
            alt: "Profile",
            width: "50",
            height: "50",
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (user.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (user.email);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (user.role);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (user.status);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (user.created_at);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: {} },
    });
    if (user.id !== undefined) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(user.id !== undefined))
                        return;
                    __VLS_ctx.openEditModal(user);
                } },
            ...{ style: {} },
        });
    }
    if (user.id !== undefined) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(user.id !== undefined))
                        return;
                    __VLS_ctx.confirmDeleteUser(user.id);
                } },
            ...{ style: {} },
        });
    }
}
const __VLS_0 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    name: "modal-fade",
}));
const __VLS_2 = __VLS_1({
    name: "modal-fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
if (__VLS_ctx.isEditModalOpen) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-overlay" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-popup" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        value: (__VLS_ctx.editableUser.name),
        type: "text",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "email",
    });
    (__VLS_ctx.editableUser.email);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        value: (__VLS_ctx.editableUser.role),
        type: "text",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        value: (__VLS_ctx.editableUser.status),
        type: "text",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-buttons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.saveUserEdits) },
        ...{ class: "save-btn" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.closeEditModal) },
        ...{ class: "cancel-btn" },
    });
}
var __VLS_3;
const __VLS_4 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    name: "modal-fade",
}));
const __VLS_6 = __VLS_5({
    name: "modal-fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
if (__VLS_ctx.isDeleteModalOpen) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-overlay" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-popup" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-buttons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.deleteUserConfirmed) },
        ...{ class: "delete-confirm-btn" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.closeDeleteModal) },
        ...{ class: "cancel-btn" },
    });
}
var __VLS_7;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['users-table']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-popup']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['save-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['cancel-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-popup']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['delete-confirm-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['cancel-btn']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            users: users,
            isEditModalOpen: isEditModalOpen,
            editableUser: editableUser,
            isDeleteModalOpen: isDeleteModalOpen,
            openEditModal: openEditModal,
            closeEditModal: closeEditModal,
            saveUserEdits: saveUserEdits,
            confirmDeleteUser: confirmDeleteUser,
            closeDeleteModal: closeDeleteModal,
            deleteUserConfirmed: deleteUserConfirmed,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ListUser.vue.js.map