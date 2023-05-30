<template>
  <div class="px-6 py-4">
    <div class="d-flex justify-between">
      <div class="d-flex">
        <v-avatar class="bg-secondary mr-4" id="avatar" size="48">
          <v-icon medium color="white"> mdi-account </v-icon>
        </v-avatar>
        <div>
          <div
            id="author"
            :class="this.$props.isParrent && `font-medium`"
          >
            {{ name }}
          </div>
          <div
            id="date"
            class="text-sm text-textGray"
            :class="this.$props.isParrent && `text-secondary font-medium`"
          >
            {{ announcementDate }}
          </div>
        </div>
      </div>
      <v-menu id="menu" v-if="this.isCurrentUserTheAuthor()" bottom right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item id="editForm" link @click="isEditing = true">
            <v-list-item-title class="w-28 text-sm"> Edit </v-list-item-title>
          </v-list-item>
          <v-list-item
            id="deleteAnnouncement"
            v-if="this.$props.isComment !== true"
            link
            @click="deleteAnnouncement"
          >
            <v-list-item-title class="w-28 text-sm text-error">
              Delete
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            id="deleteComment"
            v-if="this.$props.isComment"
            link
            @click="deleteComment"
          >
            <v-list-item-title class="w-28 text-sm text-error">
              Delete
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div id="content" class="mt-4" v-if="!isEditing">
      {{ content }}
    </div>
    <div id="edit-form" v-if="isEditing">
      <v-form v-model="isFormValid" ref="form" class="mx-6 my-4">
        <div>
          <v-textarea
            outlined
            v-model="announcement"
            :rules="announceRules.concat(lengthRules)"
            :counter="65535"
          ></v-textarea>
        </div>
        <div class="text-right">
          <v-btn
            depressed
            color="light"
            @click="
              isEditing = false;
              announcement = content;
            "
            class="mr-4"
          >
            <div id="cancel-button" class="text-primary">Cancel</div>
          </v-btn>
          <v-btn
            v-if="this.$props.isComment !== true"
            id="post-announcement-button"
            depressed
            color="primary"
            @click="editAnnouncement"
            :disabled="!isFormValid"
          >
            Post
          </v-btn>
          <v-btn
            v-if="this.$props.isComment"
            id="post-comment-button"
            depressed
            color="primary"
            @click="editComment"
            :disabled="!isFormValid"
          >
            Post
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import {
  deleteAnnouncementAPI,
  editAnnouncementAPI,
} from "../../api/announcement";
import { deleteComment, editComment } from "../../api/comment";

export default {
  name: "AnnouncementContent",
  props: [
    "id",
    "name",
    "date",
    "content",
    "authorId",
    "removeCard",
    "isComment",
    "isParrent"
  ],
  data() {
    return {
      announcementDate: this.dateSlicing(),
      announcement: this.$props.content,
      isEditing: false,
      isFormValid: false,
      announceRules: [(v) => !!v || "Form cannot be empty"],
      lengthRules: [(v) => v.length <= 65535 || "Characters are off limit"],
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    isCurrentUserTheAuthor() {
      const userId = (this.$store.state.user.id === this.$props.authorId);
      const author = (this.$store.state.user.name === this.$props.name);
      return (userId || author);
    },
    async editAnnouncement() {
      if (this.isFormValid) {
        const { error, errorMessage } = await editAnnouncementAPI(
          {
            content: this.announcement,
          },
          this.$props.id
        );

        if (error) {
          this.showSnackbar(errorMessage);
        } else {
          this.isEditing = false;
          this.$props.content = this.announcement;
        }
      }
    },

    async editComment() {
      if (this.isFormValid) {
        const { data, error, errorMessage } = await editComment(
          {
            content: this.announcement,
          },
          this.$props.id
        );

        if (error) {
          this.showSnackbar(errorMessage);
        } else {
          this.isEditing = false;
          this.$props.content = this.announcement;
        }
      }
    },

    async deleteAnnouncement() {
      const { error, errorMessage } = await deleteAnnouncementAPI(
        this.$props.id
      );
      if (error) {
        this.showSnackbar(errorMessage);
      } else {
        this.$props.removeCard();
      }
    },

    async deleteComment() {
      const { data, error, errorMessage } = await deleteComment(this.$props.id);
      if (error) {
        this.showSnackbar(errorMessage);
      } else {
        location.reload();
      }
    },

    dateSlicing() {
      let datestring;
      if (this.$props.date){
        datestring = this.$props.date.slice(-1) == "Z"
          ? this.$props.date
          : `${this.$props.date}Z`;
      }
      let date = new Date(datestring);
      date = date.toString().split(" ");
      return (
        date[0] + ", " + date[2] + " " + date[1] + " " + date[3] + " " + date[4]
      );
    },
  },
};
</script>
