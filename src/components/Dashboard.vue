<template>
  <div>
    <!-- create card -->
    <BRow
        v-if="$route.meta.statusView === 'new'"
        class="my-3 no-gutters"
    >
      <BCard class="custom-task-card">
        <BCardText
            ref="new-task-text"
            key="new-card"
            @input="modelNewInput($event.target.innerText)"
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
            <BIcon
                icon="plus"
                scale="1.5"
            />
          </BButton>
        </BCardFooter>
      </BCard>
    </BRow>
    <!-- other cards-->
    <BRow
        class="my-3 no-gutters"
        v-for="(task, index) in filterTasksByStatus($route.meta.statusView)"
        :key="`${task.status}-${task.id}-${index}`"
    >
      <BCard
          v-if="task.status === $route.meta.statusView"
          class="custom-task-card"
      >
        <BCardText
            :ref="`input-text${task.id}`"
            @input="saveCurrentTask(task, $event.target.innerText)"
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
            <BIcon icon="check2" scale="1.5"/>
          </BButton>

          <!-- mark as open btn-->
          <BButton
              v-if="task.status === 'done'"
              variant="warning"
              @click="markAsOpenTask(task)"
              v-b-tooltip.hover title="Mark as open"
          >
            <BIcon icon="check2" scale="1.5"/>
          </BButton>

          <!-- move to trash btn-->
          <BButton
              v-if="task.status === 'open' || task.status === 'done'"
              variant="danger"
              @click="moveTaskToTrash(task)"
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

          <!-- destroy btn-->
          <BButton
              v-if="task.status === 'trashed'"
              variant="danger"
              @click="destroyTask(task)"
              v-b-tooltip.hover title="Destroy task completely"
          >
            <BIcon
                icon="x"
                scale="1.7"
            />
          </BButton>
        </BCardFooter>
      </BCard>
    </BRow>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from "vuex";

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
    ...mapGetters(['filterTasksByStatus']),
  },

  methods: {
    ...mapMutations([
      'TASK_NEW',
      'TASK_DELETE',
      'TASK_MARK_AS_OPEN',
      'TASK_MARK_AS_DONE',
      'TASK_RESTORE',
      'TASK_DESTROY',
      'TASK_SET_CURRENT',
      'TASK_SAVE_CURRENT',
    ]),

    modelNewInput(text) {
      this.newTask.text = text;
    },

    resetNewTaskCard() {
      this.newTask.text = this.$refs["new-task-text"].innerText = '';
    },

    addNewTask() {
      if (!this.newTask.text || this.newTask.text === '') return;
      this.TASK_NEW({...this.newTask});
      this.makeToast('Created at: ', 'new', 'open');
      this.resetNewTaskCard();
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

    moveTaskToTrash(task) {
      this.TASK_DELETE(task);
      this.makeToast('Deleted to: ', task.status, 'trashed');
      this.$forceUpdate();
    },

    saveCurrentTask(task, text) {
      task = {...task, text: text};
      this.TASK_SAVE_CURRENT(task);
      this.$store.commit('SET_COOKIE_DATA');
    },

    restoreTask(task) {
      this.TASK_RESTORE(task);
      this.makeToast('Restored to: ', task.status, task.previousStatus);
      this.$forceUpdate();
    },

    destroyTask(task) {
      this.TASK_DESTROY(task);
      this.makeToast('Task is gone completely ☹');
      this.$forceUpdate();
    },

    makeToast(text = '', currentSection = 'default', target = null) {
      if (!this.newTask.text && currentSection === 'new') return;

      const h = this.$createElement;
      const vNodesTitle = h(
          'div',
          {class: 'd-flex flex-grow-1 justify-content-center'},
          [
            h('strong', {class: 'mr-2'}, text),
            target !== null
                ? h(
                'span',
                {class: `d-flex align-items-center badge badge-${this.$sectionClassColors[target]}`},
                target
                )
                : null,
          ]
      )

      this.$bvToast.toast(text, {
        title: vNodesTitle,
        toaster: 'b-toaster-bottom-right',
        variant: this.$sectionClassColors[currentSection],
        solid: true,
        bodyClass: 'd-none',
        autoHideDelay: 50000,
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

      &:focus, :focus-visible, :focus-within {
        outline: 2px solid #FFFFFF;
      }
    }
  }
}
</style>
