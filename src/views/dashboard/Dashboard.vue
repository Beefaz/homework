<template>
  <b-container
      class="w-auto"
      :key="reload">

    <!-- create card -->
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
                    @click="addNewIssue(); makeToast('Created at: ', 'new', 'open')"
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
          <!-- span overlay -->
          <input
              :ref="`input-text${issue.id}`"
              type="text"
              :value="`${issue.text}`"
              :v-model="issueCurrentlyEdited.text"
              @input="saveCurrentIssue(issue)"
          />
        </b-card-text>

        <b-card-footer>
          <!-- mark as done btn-->
          <b-button
              v-if="issue.status === 'open'"
              variant="primary"
              @click="markAsDoneIssue(issue); makeToast('Moved to: ', issue.status,'done')"
              v-b-tooltip.hover title="Mark as done"
          >
            <b-icon icon="check2"></b-icon>
          </b-button>

          <!-- mark as open btn-->
          <b-button
              v-if="issue.status === 'done'"
              variant="warning"
              @click="markAsOpenIssue(issue); makeToast('Moved to: ', issue.status, 'open')"
              v-b-tooltip.hover title="Mark as open"
          >
            <b-icon icon="check2"></b-icon>
          </b-button>

          <!-- delete btn-->
          <b-button
              v-if="issue.status === 'open' || issue.status === 'done'"
              variant="danger"
              @click="deleteIssue(issue); makeToast('Deleted to: ', issue.status, 'trashed')"
              v-b-tooltip.hover title="Move to trash"
          >
            <b-icon icon="trash"></b-icon>
          </b-button>

          <!-- restore btn-->
          <b-button
              v-if="issue.status === 'trashed'"
              @click="restoreIssue(issue); makeToast('Restored to: ', issue.status, issue.previousStatus)"
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
      issueCurrentlyEdited: {
        text: null
      },
      reload: 0,
    }
  },
  computed: {
    ...mapState(['allIssues']),
  },
  methods: {
    //local component methods
    makeToast(text = '', currentSection = 'default', target = 'default') {
      if (!this.newIssue.text && currentSection === 'new') return;

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

    //store methods
    ...mapMutations([
      'ISSUE_NEW',
      'ISSUE_DELETE',
      'ISSUE_MARK_AS_OPEN',
      'ISSUE_MARK_AS_DONE',
      'ISSUE_RESTORE',
      'ISSUE_SET_CURRENT',
      'ISSUE_SAVE_CURRENT',
    ]),
    addNewIssue() {
      if(!this.newIssue.text) return;
      this.ISSUE_NEW({...this.newIssue});
      this.reload++;
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
    saveCurrentIssue(issue) {
      issue.text = this.$refs[`input-text${issue.id}`][0].value;
      this.ISSUE_SAVE_CURRENT(issue);
      this.$store.commit('SET_COOKIE_DATA');
    },
    restoreIssue(issue) {
      this.ISSUE_RESTORE(issue);
      this.reload++;
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
  box-shadow: 0px 0px 3px 0px black;

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
    button {
      border: inset;
      border-color: rgba(255,255,255,0.5);
      box-sizing: border-box;
      box-shadow: 0px 0px 20px 0px white;
      border-radius: 25px;
    }
  }
}
</style>
