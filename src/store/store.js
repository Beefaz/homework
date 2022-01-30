import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const getTaskIndex = (state, task) => state.allTasks.findIndex(item => item.id === task.id);

export default new Vuex.Store({
  state: {
    allTasks: [],
  },
  mutations: {
    TASK_NEW: (state, task) => {
      task.id = state.allTasks.length;
      task.status = 'open';
      state.allTasks.unshift(task);
    },
    TASK_DELETE: (state, task) => {
      state.allTasks[getTaskIndex(state, task)] = {...task, status: 'trashed', previousStatus: task.status};
    },
    TASK_MARK_AS_OPEN: (state, task) => {
      state.allTasks[getTaskIndex(state, task)] = {...task, status: 'open'};
    },
    TASK_MARK_AS_DONE: (state, task) => {
      state.allTasks[getTaskIndex(state, task)] = {...task, status: 'done'};
    },
    TASK_RESTORE: (state, task) => {
      state.allTasks[getTaskIndex(state, task)] = {
        ...task,
        status: state.allTasks[getTaskIndex(state, task)].previousStatus
      };
    },
    TASK_DESTROY: (state, task) => {
      state.allTasks.splice(getTaskIndex(state, task), 1)
    },
    TASK_SAVE_CURRENT: (state, task) => {
      state.allTasks[getTaskIndex(state, task)] = {...task};
    },
    GET_COOKIE_DATA: (state) => {
      if (localStorage.getItem('tasks-storage')) state.allTasks = JSON.parse(localStorage.getItem('tasks-storage')).allTasks;
    },
    SET_COOKIE_DATA: (state) => {
      if (localStorage.getItem('tasks-storage')) localStorage.removeItem('tasks-storage');
      localStorage.setItem('tasks-storage', JSON.stringify(state));
    }
  },
  getters: {
    filterTasksByStatus: (state) => (status) => state.allTasks.filter(item => item.status === status),
  },
})
