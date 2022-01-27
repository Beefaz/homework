<template>
  <div>
    <!-- create card -->
    <BRow
        v-if="$route.meta.statusView === 'new'"
        class="pb-3 no-gutters"
    >
      <BCard class="custom-task-card">
        <BCardText
            ref="new-task-text"
            @input="modelNewInput($event)"
            contenteditable
        />
        <!-- create btn-->
        <BCardFooter>
          <BButton
              type="button"
              variant="success"
              @click="addNewTask()"
              v-b-tooltip.hover title="Create new task"
          >
            <BIcon icon="plus"/>
          </BButton>
        </BCardFooter>
      </BCard>
    </BRow>

    <!-- other cards-->
    <BRow
        class="pb-3 no-gutters"
        v-for="(task, index) in allTasks.filter(item => item.status === $route.meta.statusView)"
        :key="`${task.status}-${task.id}-${index}`"
    >
      <BCard
          v-if="task.status === $route.meta.statusView"
          class="custom-task-card"
      >

        <BCardText
            :ref="`input-text${task.id}`"
            @input="saveCurrentTask(task)"
            contenteditable
        >
          {{ task.text }}
        </BCardText>

        <BCardFooter>
          <!-- mark as done btn-->
          <BButton
              v-if="task.status === 'open'"
              variant="primary"
              @click="markAsDoneTask(task)"
              v-b-tooltip.hover title="Mark as done"
          >
            <b-icon icon="check2"/>
          </BButton>

          <!-- mark as open btn-->
          <BButton
              v-if="task.status === 'done'"
              variant="warning"
              @click="markAsOpenTask(task)"
              v-b-tooltip.hover title="Mark as open"
          >
            <BIcon icon="check2"/>
          </BButton>

          <!-- delete btn-->
          <BButton
              v-if="task.status === 'open' || task.status === 'done'"
              variant="danger"
              @click="deleteTask(task)"
              v-b-tooltip.hover title="Move to trash"
          >
            <BIcon icon="trash"/>
          </BButton>

          <!-- restore btn-->
          <BButton
              v-if="task.status === 'trashed'"
              @click="restoreTask(task)"
              v-b-tooltip.hover title="Restore"
          >
            <BIcon icon="arrow90deg-left"/>
          </BButton>
        </BCardFooter>
      </BCard>
    </BRow>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
  name: 'Dashboard',
  data() {
    return {
      reload: 0,
      newTask: {
        text: '',
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
      this.newTask.text = '';
      this.$refs["new-task-text"].innerText = '';
      this.$forceUpdate();
    },

    markAsOpenTask(task) {
      this.TASK_MARK_AS_OPEN(task);
      this.makeToast('Moved to: ', task.status, 'open');
      this.$forceUpdate();
    },

    markAsDoneTask(task) {
      this.TASK_MARK_AS_DONE(task);
      this.makeToast('Moved to: ', task.status, 'done');
      this.$forceUpdate();
    },

    deleteTask(task) {
      this.TASK_DELETE(task);
      this.makeToast('Deleted to: ', task.status, 'trashed');
      this.$forceUpdate();
    },

    saveCurrentTask(task) {
      task.text = this.$refs[`input-text${task.id}`][0].innerText;
      this.TASK_SAVE_CURRENT(task);
      this.$store.commit('SET_COOKIE_DATA');
    },

    restoreTask(task) {
      this.TASK_RESTORE(task);
      this.makeToast('Restored to: ', task.status, task.previousStatus);
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
            h('span', {class: `d-flex align-items-center badge badge-${this.$sectionClassColors[target]}`}, target)
          ]
      )

      this.$bvToast.toast(text, {
        title: vNodesTitle,
        toaster: 'b-toaster-bottom-right',
        variant: this.$sectionClassColors[currentSection],
        solid: true,
        bodyClass: 'd-none',
        autoHideDelay: 2500,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
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
      border: inset;
      border-color: rgba(255, 255, 255, 0.3);
      box-sizing: border-box;
      box-shadow: -4px 4px 10px 0px #000000, 4px -5px 12px 0px inset #000000;
      border-radius: 25px;
    }
  }
}
</style>
