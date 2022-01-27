import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Dashboard from "@/views/dashboard/Dashboard";
import NavBar from "@/components/NavBar";

const routes = [
  {
    path: '/',
    components: {
      navigation: NavBar,
      content: Dashboard,
    },
    name: 'new-tasks',
    meta: {
      label: 'New tasks',
      statusView: 'new'
    }
  },
  {
    path: '/tasks/open',
    components: {
      navigation: NavBar,
      content: Dashboard,
    },
    name: 'open-tasks',
    meta: {
      label: 'Open tasks',
      statusView: 'open'
    }
  },
  {
    path: '/tasks/done',
    components: {
      navigation: NavBar,
      content: Dashboard,
    },
    name: 'done-tasks',
    meta: {
      label: 'Done tasks',
      statusView: 'done'
    }
  },
  {
    path: '/tasks/trashed',
    components: {
      navigation: NavBar,
      content: Dashboard,
    },
    name: 'trashed-tasks',
    meta: {
      label: 'Trashed tasks',
      statusView: 'trashed'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
