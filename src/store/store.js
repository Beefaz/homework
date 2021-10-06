import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentIssue: {},
    allIssues: [
      {
        id: 0,
        text: 'turiu paruosti namu darbus',
        status: 'trashed',  //open,done,trashed
        previousStatus: null
      },
      {
        id: 1,
        text: 'turiu paruosti namu darbus2',
        status: 'done',  //open,done,trashed
        previousStatus: null
      },
      {
        id: 2,
        text: 'turiu paruosti namu darbus3',
        status: 'open',  //open,done,trashed
        previousStatus: null
      },
      {
        id: 3,
        text: 'turiu paruosti namu darbus4',
        status: 'open',  //open,done,trashed
        previousStatus: null
      },
    ]
  },
  mutations: {
    ISSUE_NEW: (state, issue) => {
      issue.id = state.allIssues.length;
      issue.status = 'open';
      state.allIssues.push(issue);
    },
    ISSUE_DELETE: (state, issue) => {
      let item = state.allIssues.findIndex(item => item.id === issue.id);
      state.allIssues[item] = {...issue, status: 'trashed', previousStatus: issue.status};
    },
    ISSUE_EDIT: (state, issue) => {
      let item = state.allIssues.findIndex(item => item.id === issue.id);
      state.allIssues[item] = {...issue};
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
    ISSUE_SET_CURRENT: (state, issue) => {
      state.currentIssue = issue;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getAllIssues: state => state.allIssues,
    getCurrentIssue: state => state.currentIssue,
  },
})
