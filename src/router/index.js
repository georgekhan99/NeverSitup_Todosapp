import { createWebHistory, createRouter } from "vue-router";
import LoginForm from '@/components/LoginForm.vue';
import AllTodos from '@/components/AllTodos.vue';

const routes = [
    {
        path: "/",
        name: "loginform",
        component: LoginForm
    },
    {
        path: "/getalltodo",
        name: "getalltodo",
        component:AllTodos,

    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
