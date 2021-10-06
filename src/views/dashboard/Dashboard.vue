<template>
  <b-container>
    <b-row
        :key="reload"
    >
      <!-- create new -->
      <template
          v-if="$route.meta.statusView === 'new'"
      >
        <b-col cols="4">
          <base-card>
            <template v-slot:text>
              <input
                  type="text"
                  v-model="newIssue.text"
              >
            </template>
            <template v-slot:buttons>
              <!-- create btn-->
              <b-button type="button"
                        v-if="$route.meta.statusView === 'new'"
                        variant="success"
                        @click="addNewIssue"
              >
                Create new issue
              </b-button>
            </template>
          </base-card>
        </b-col>
      </template>

      <!-- other cards-->
      <b-col cols="4"
             v-for="(issue, index) in allIssues"
             :key="index"
      >
        <base-card v-if="issue.status === $route.meta.statusView">
          <template v-slot:text>
            <input
                v-if="currentIssue.id === issue.id"
                :value="`${issue.text}`"
                :v-model="editableIssue.text"
            />
            <span
                v-else
                @click="setCurrentIssue(issue)"
            >
                    {{ issue.text }}
                  </span>
          </template>

          <template v-slot:buttons>
            <!-- save btn-->
            <b-button
                v-if="editableIssue.text"
                variant="success"
                @click="editIssue(issue)"
            >
              Save
            </b-button>

            <!-- mark as done btn-->
            <b-button
                v-else-if="issue.status === 'open'"
                variant="primary"
                @click="markAsDoneIssue(issue)"
            >
              Mark as done
            </b-button>

            <!-- mark as open btn-->
            <b-button
                v-if="issue.status === 'done'"
                variant="warning"
                @click="markAsOpenIssue(issue)"
            >
              Mark as open
            </b-button>

            <!-- delete btn-->
            <b-button
                v-if="issue.status === 'open' || issue.status === 'done'"
                variant="danger"
                @click="deleteIssue(issue)"
            >
              Delete issue
            </b-button>

            <!-- restore btn-->
            <b-button
                v-if="issue.status === 'trashed'"
                @click="restoreIssue(issue)"
            >
              Restore issue
            </b-button>
          </template>
        </base-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import BaseCard from "@/components/BaseCard";
import {mapState, mapMutations} from "vuex";

export default {
  name: 'dashboard',
  components: {BaseCard},
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
    ...mapState(['currentIssue', 'allIssues', 'trashedIssues']),
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
      'ISSUE_EDIT',
      'ISSUE_MARK_AS_OPEN',
      'ISSUE_MARK_AS_DONE',
      'ISSUE_RESTORE',
      'ISSUE_SET_CURRENT'
    ]),
    addNewIssue() {
      this.ISSUE_NEW(this.newIssue);
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
    editIssue() {
      this.ISSUE_EDIT(this.editableIssue);
    },
    restoreIssue(issue) {
      this.ISSUE_RESTORE(issue);
      this.reload++;
    },
    setCurrentIssue(issue) {
      this.ISSUE_SET_CURRENT(issue);
    },
  },
}
</script>

<style>
</style>
