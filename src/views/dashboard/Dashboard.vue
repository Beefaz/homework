<template>
  <b-container
      class="w-auto"
      :key="reload">
    <b-row v-if="$route.meta.statusView === 'new'" class="mt-1">
      <b-card class="custom-issue-card">
        <b-card-text>
          <input
              type="text"
              v-model="newIssue.text"
          >
        </b-card-text>
        <!-- create btn-->
        <b-card-footer>
          <b-button type="button"
                    variant="success"
                    @click="addNewIssue"
          >
            Create new issue
          </b-button>
        </b-card-footer>
      </b-card>
    </b-row>

    <!-- other cards-->
    <b-row class="mt-1"
           v-for="(issue, index) in allIssues.filter(item => item.status === $route.meta.statusView)"
           :key="index"
    >
      <b-card v-if="issue.status === $route.meta.statusView" class="custom-issue-card">
        <b-card-text>

          <input
              v-if="currentIssue.id === issue.id"
              :value="`${issue.text}`"
              :v-model="editableIssue.text"
              v-on:keyup.enter="saveCurrentIssue()"
          />
          <span
              v-else
              @click="setCurrentIssue(issue)"
          >
          {{ issue.text }}
        </span>
        </b-card-text>

        <b-card-footer>

          <!-- mark as done btn-->
          <b-button
              v-if="issue.status === 'open'"
              variant="primary"
              @click="markAsDoneIssue(issue)"
              v-b-tooltip.hover title="Mark as done"
          >
            <b-icon icon="check2"></b-icon>
          </b-button>

          <!-- mark as open btn-->
          <b-button
              v-if="issue.status === 'done'"
              variant="warning"
              @click="markAsOpenIssue(issue)"
              v-b-tooltip.hover title="Mark as open"
          >
            <b-icon icon="check2"></b-icon>
          </b-button>

          <!-- delete btn-->
          <b-button
              v-if="issue.status === 'open' || issue.status === 'done'"
              variant="danger"
              @click="deleteIssue(issue)"
              v-b-tooltip.hover title="Move to trash"
          >
            <b-icon icon="trash"></b-icon>
          </b-button>

          <!-- restore btn-->
          <b-button
              v-if="issue.status === 'trashed'"
              @click="restoreIssue(issue)"
              v-b-tooltip.hover title="Restore"
          >
            <b-icon icon="arrow90deg-left"></b-icon>
          </b-button>
        </b-card-footer>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>

import {mapState, mapMutations} from "vuex";

export default {
  name: 'dashboard',
  data() {
    return {
      newIssue: {
        text: null,
      },
      editableIssue: {
        id: null,
        text: null,
        status: null
      },
      reload: 0,
    }
  },
  computed: {
    ...mapState(['currentIssue', 'allIssues']),
  },
  methods: {
    //local component methods
    setEditableIssue(issue) {
      this.editableIssue = {...this.editableIssue, ...issue}
    },

    //store methond
    ...mapMutations([
      'ISSUE_NEW',
      'ISSUE_DELETE',
      'ISSUE_MARK_AS_OPEN',
      'ISSUE_MARK_AS_DONE',
      'ISSUE_RESTORE',
      'ISSUE_SET_CURRENT',
      'ISSUE_SAVE_CURRENT',
      'GET_COOKIE_DATA'
    ]),
    addNewIssue() {
      this.ISSUE_NEW({...this.newIssue});
    },
    markAsOpenIssue(issue) {
      this.ISSUE_MARK_AS_OPEN(issue);
      this.reload++;
    },
    markAsDoneIssue(issue) {
      this.ISSUE_MARK_AS_DONE(issue);
      this.reload++;
    },
    deleteIssue(issue) {
      this.ISSUE_DELETE(issue);
      this.reload++;
    },
    saveCurrentIssue() {
      this.ISSUE_SAVE_CURRENT(this.editableIssue);
      this.reload++;
    },
    restoreIssue(issue) {
      this.ISSUE_RESTORE(issue);
      this.reload++;
    },
    setCurrentIssue(issue) {
      this.ISSUE_SET_CURRENT(issue);
      this.editableIssue = {...this.currentIssue};
    },
  },
  beforeCreate() {
    this.$store.commit('GET_COOKIE_DATA');
  },
  updated() {
    this.$store.commit('SET_COOKIE_DATA');
  }
}
</script>

<style lang="scss" scoped>
.custom-issue-card {
  width: 100%;

  .card-body {
    display: flex;

    .card-text {
      display: flex;
      align-items: center;
      flex-grow: 1;
      margin-bottom: 0;
      background-color: rgba(0, 0, 0, 0.03);
      border-top: 1px solid rgba(0, 0, 0, 0.125);
      margin-right: 5px;

      input {
        width: 100%;
        height: 100%;
        background: transparent;
        border: unset;
      }
    }
  }

  .card-footer {
    display: flex;
    gap: 5px;
  }
}
</style>
