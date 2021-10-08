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
    name: 'new-issues',
    meta: {
      label: 'New issues',
      statusView: 'new'
    }
  },
  {
    path: '/issues/open',
    components: {
      navigation: NavBar,
      content: Dashboard,
    },
    name: 'open-issues',
    meta: {
      label: 'Open issues',
      statusView: 'open'
    }
  },
  {
    path: '/issues/done',
    components: {
      navigation: NavBar,
      content: Dashboard,
    },
    name: 'done-issues',
    meta: {
      label: 'Done issues',
      statusView: 'done'
    }
  },
  {
    path: '/issues/trashed',
    components: {
      navigation: NavBar,
      content: Dashboard,
    },
    name: 'trashed-issues',
    meta: {
      label: 'Trashed issues',
      statusView: 'trashed'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
