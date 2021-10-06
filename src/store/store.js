import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allIssues: []
  },
  mutations: {
    ISSUE_NEW: (state, issue) => {
      issue.id = state.allIssues.length;
      issue.status = 'open';
      state.allIssues.unshift(issue);
    },
    ISSUE_DELETE: (state, issue) => {
      let item = state.allIssues.findIndex(item => item.id === issue.id);
      state.allIssues[item] = {...issue, status: 'trashed', previousStatus: issue.status};
    },
    ISSUE_MARK_AS_OPEN: (state, issue) => {
      let item = state.allIssues.findIndex(item => item.id === issue.id);
      state.allIssues[item] = {...issue, status: 'open'};
    },
    ISSUE_MARK_AS_DONE: (state, issue) => {
      let item = state.allIssues.findIndex(item => item.id === issue.id);
      state.allIssues[item] = {...issue, status: 'done'};
    },
    ISSUE_RESTORE: (state, issue) => {
      let item = state.allIssues.findIndex(item => item.id === issue.id);
      state.allIssues[item] = {...issue, status: state.allIssues[item].previousStatus};
    },
    ISSUE_SAVE_CURRENT: (state, issue) => {
      let item = state.allIssues.findIndex(item => item.id === issue.id);
      state.allIssues[item] = {...issue};
    },

    // eslint-disable-next-line no-unused-vars
    GET_COOKIE_DATA:(state) => {
      if (localStorage.getItem('issues-storage')) state.allIssues = JSON.parse(localStorage.getItem('issues-storage')).allIssues;
    },
    SET_COOKIE_DATA:(state) => {
      if (localStorage.getItem('issues-storage')) localStorage.removeItem('issues-storage');
      localStorage.setItem('issues-storage', JSON.stringify(state));
    }
  },
  actions: {},
  modules: {},
  getters: {
    getAllIssues: state => state.allIssues,
    getCurrentIssue: state => state.currentIssue,
  },
})
