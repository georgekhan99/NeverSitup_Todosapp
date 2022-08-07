import { createWebHistory, createRouter } from "vue-router";
import LoginForm from '@/components/LoginForm.vue';
import AllTodos from '@/components/AllTodos.vue';
/* 1 check token
   2.if(!token) return login 
   3.if(token) next
 */

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