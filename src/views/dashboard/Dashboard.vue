<template>
  <div
      class="custom-scroll overflow-auto my-1 px-1 px-sm-5"
  >
    <!-- create card -->
    <b-row
        v-if="$route.meta.statusView === 'new'"
        class="pb-3 no-gutters"
    >
      <b-card class="custom-task-card">
        <b-card-text
            @input="modelNewInput($event)"
            contenteditable
        >
        </b-card-text>
        <!-- create btn-->
        <b-card-footer>
          <b-button
              type="button"
              variant="success"
              @click="addNewTask()"
              v-b-tooltip.hover title="Create new task"
          >
            <b-icon icon="plus"/>
          </b-button>
        </b-card-footer>
      </b-card>
    </b-row>

    <!-- other cards-->
    <b-row class="pb-3 no-gutters"
           v-for="(task, index) in allTasks.filter(item => item.status === $route.meta.statusView)"
           :key="`${task.id}-${index}`"
    >
      <b-card v-if="task.status === $route.meta.statusView" class="custom-task-card">

        <b-card-text
            :ref="`input-text${task.id}`"
            @input="saveCurrentTask(task)"
            contenteditable
        >
          {{ task.text }}
        </b-card-text>

        <b-card-footer>
          <!-- mark as done btn-->
          <b-button
              v-if="task.status === 'open'"
              variant="primary"
              @click="markAsDoneTask(task); makeToast('Moved to: ', task.status, 'done')"
              v-b-tooltip.hover title="Mark as done"
          >
            <b-icon icon="check2"/>
          </b-button>

          <!-- mark as open btn-->
          <b-button
              v-if="task.status === 'done'"
              variant="warning"
              @click="markAsOpenTask(task); makeToast('Moved to: ', task.status, 'open')"
              v-b-tooltip.hover title="Mark as open"
          >
            <b-icon icon="check2"/>
          </b-button>

          <!-- delete btn-->
          <b-button
              v-if="task.status === 'open' || task.status === 'done'"
              variant="danger"
              @click="deleteTask(task); makeToast('Deleted to: ', task.status, 'trashed')"
              v-b-tooltip.hover title="Move to trash"
          >
            <b-icon icon="trash"/>
          </b-button>

          <!-- restore btn-->
          <b-button
              v-if="task.status === 'trashed'"
              @click="restoreTask(task); makeToast('Restored to: ', task.status, task.previousStatus)"
              v-b-tooltip.hover title="Restore"
          >
            <b-icon icon="arrow90deg-left"/>
          </b-button>
        </b-card-footer>
      </b-card>
    </b-row>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
  name: 'dashboard',
  data() {
    return {
      reload: 0,
      newTask: {
        text: null,
      },
    }
  },

  beforeCreate() {
    this.$store.commit('GET_COOKIE_DATA');
  },

  updated() {
    this.$store.commit('SET_COOKIE_DATA');
  },

  computed: {
    ...mapState(['allTasks']),
  },

  methods: {
    //store methods
    ...mapMutations([
      'TASK_NEW',
      'TASK_DELETE',
      'TASK_MARK_AS_OPEN',
      'TASK_MARK_AS_DONE',
      'TASK_RESTORE',
      'TASK_SET_CURRENT',
      'TASK_SAVE_CURRENT',
    ]),

    modelNewInput(event) {
      this.newTask.text = event.target.innerText;
    },

    addNewTask() {
      if (!this.newTask.text || this.newTask.text === '') return;
      this.TASK_NEW({...this.newTask});
      this.makeToast('Created at: ', 'new', 'open');
      this.newTask.text = null;
    },

    markAsOpenTask(task) {
      this.TASK_MARK_AS_OPEN(task);
      this.$forceUpdate();
    },

    markAsDoneTask(task) {
      this.TASK_MARK_AS_DONE(task);
      this.$forceUpdate();
    },

    deleteTask(task) {
      this.TASK_DELETE(task);
      this.$forceUpdate();
    },

    saveCurrentTask(task) {
      task.text = this.$refs[`input-text${task.id}`][0].innerText;
      this.TASK_SAVE_CURRENT(task);
      this.$store.commit('SET_COOKIE_DATA');
    },

    restoreTask(task) {
      this.TASK_RESTORE(task);
      this.$forceUpdate();
    },

    makeToast(text = '', currentSection = 'default', target = 'default') {
      if (!this.newTask.text && currentSection === 'new') return;

      const h = this.$createElement;
      const vNodesTitle = h(
          'div',
          {class: 'd-flex flex-grow-1 justify-content-center'},
          [
            h('strong', {class: 'mr-2'}, text),
            h('span', {class: `d-flex align-items-center badge badge-${this.$sectionColors[target]}`}, target)
          ]
      )

      this.$bvToast.toast(text, {
        title: vNodesTitle,
        toaster: 'b-toaster-bottom-right',
        variant: this.$sectionColors[currentSection],
        solid: true,
        bodyClass: 'd-none',
        autoHideDelay: 2500,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.custom-scroll {
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 10%);
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 50%);
    border-radius: 5px;
  }
}

.custom-task-card {
  width: 100%;
  box-shadow: -3px 8px 15px -10px #000000;

  .card-body {
    display: flex;

    .card-text {
      display: flex;
      align-items: center;
      flex-grow: 1;
      margin-bottom: 0;
      background-color: rgba(0, 0, 0, 0.03);
      margin-right: 5px;
      padding: 10px;
      cursor: pointer;
      overflow-wrap: anywhere;
      box-shadow: -3px 8px 15px -10px inset #000000;

      &:focus {
        cursor: inherit;
      }
    }
  }

  .card-footer {
    display: flex;
    gap: 5px;
    padding: 10px;
    align-items: center;
    box-shadow: -3px 8px 15px -10px inset #000000;

    button {
      width: 50px;
      height: 50px;
      border: outset;
      border-color: rgba(255, 255, 255, 0.5);
      box-sizing: border-box;
      box-shadow: 0 0 20px 0 #FFFFFF;
      border-radius: 25px;
    }
  }
}
</style>
