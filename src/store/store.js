import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const getIssueByIndex = (state, issue) => state.allIssues.findIndex(item => item.id === issue.id);

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
      state.allIssues[getIssueByIndex(state, issue)] = {...issue, status: 'trashed', previousStatus: issue.status};
    },
    ISSUE_MARK_AS_OPEN: (state, issue) => {
      state.allIssues[getIssueByIndex(state, issue)] = {...issue, status: 'open'};
    },
    ISSUE_MARK_AS_DONE: (state, issue) => {
      state.allIssues[getIssueByIndex(state, issue)] = {...issue, status: 'done'};
    },
    ISSUE_RESTORE: (state, issue) => {
      state.allIssues[getIssueByIndex(state, issue)] = {...issue, status: state.allIssues[getIssueByIndex(state, issue)].previousStatus};
    },
    ISSUE_SAVE_CURRENT: (state, issue) => {
      state.allIssues[getIssueByIndex(state, issue)] = {...issue};
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
