import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentIssue: {},
    allIssues: [
      {
        id: 0,
        text: 'turiu paruosti namu darbus dfgdfhf sh dsh sdfh dgh dsh sdfh dfh sdfh sdfh sdfh dsfh dsh dfh dfh sdfhdsf hdfh sh dfhsdf dfh sdfh sdfsh sdh',
        status: 'trashed',  //open,done,trashed
        previousStatus: 'open'
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
    ISSUE_SET_CURRENT: (state, issue) => {
      state.currentIssue = {...issue};
    },
    ISSUE_SAVE_CURRENT: (state, issue) => {
      let item = state.allIssues.findIndex(item => item.id === issue.id);
      state.allIssues[item] = {...state.currentIssue};
      state.currentIssue = {};
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
