import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const getTaskByIndex = (state, task) => state.allTasks.findIndex(item => item.id === task.id);

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
      state.allTasks[getTaskByIndex(state, task)] = {...task, status: 'trashed', previousStatus: task.status};
    },
    TASK_MARK_AS_OPEN: (state, task) => {
      state.allTasks[getTaskByIndex(state, task)] = {...task, status: 'open'};
    },
    TASK_MARK_AS_DONE: (state, task) => {
      state.allTasks[getTaskByIndex(state, task)] = {...task, status: 'done'};
    },
    TASK_RESTORE: (state, task) => {
      state.allTasks[getTaskByIndex(state, task)] = {
        ...task,
        status: state.allTasks[getTaskByIndex(state, task)].previousStatus
      };
    },
    TASK_SAVE_CURRENT: (state, task) => {
      state.allTasks[getTaskByIndex(state, task)] = {...task};
    },

    GET_COOKIE_DATA: (state) => {
      if (localStorage.getItem('tasks-storage')) state.allTasks = JSON.parse(localStorage.getItem('tasks-storage')).allTasks;
    },
    SET_COOKIE_DATA: (state) => {
      if (localStorage.getItem('tasks-storage')) localStorage.removeItem('tasks-storage');
      localStorage.setItem('tasks-storage', JSON.stringify(state));
    }
  },
  actions: {},
  modules: {},
  getters: {
    getAllTasks: state => state.allTasks,
    getCurrentTask: state => state.currentTask,
  },
})
