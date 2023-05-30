<template>
  <div
    v-if="!isDeleted"
  >
    <v-card
      class="mx-10 my-3"
      width="auto"
      outlined
    >
      <div id="announcement" class="bg-light">
        <AnnouncementContent
          :name="this.$props.author"
          :date="this.$props.date"
          :content="this.$props.content"
          :id="this.$props.id"
          :authorId="this.$props.authorId"
          :removeCard="this.removeCard"
          :isParrent="true"
        />
      </div>

      <!--announcement comments-->
      <div
        id="comments"
        v-if="dataComments !== 0"
        v-for="comment in dataComments"
        v-bind:key="comment.id"
      >
        <v-divider></v-divider>
        <AnnouncementContent
          :name="comment.createdBy.name"
          :date="comment.createdAt"
          :content="comment.content"
          :id="comment.id"
          :isComment= "true"
        />
      </div>
      <div>
        <v-divider></v-divider>
        <!--comments form-->
        <div>
          <v-row no-gutters>
            <v-col
              cols="19"
            >
              <v-form
                v-model="isFormValid"
                ref="form"
                class="mx-6 my-4"
              >
                <div>
                  <v-textarea
                    rows="1"
                    outlined
                    v-model="fieldContent"
                    :rules="commentRules.concat(lengthRules)"
                    :counter="65535"
                    placeholder="Comment here..."
                  ></v-textarea>
                </div>
              </v-form>
            </v-col>
            <v-col
              cols="1"
            >
              <div class="my-6">
                <v-btn
                  icon
                  id="post-button"
                  depressed
                  color=primary
                  @click="postComment"
                  :disabled="!isFormValid"
                >
                  <v-icon>
                    mdi-send
                  </v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import AnnouncementContent from "./AnnouncementContent";
import {createComment} from "../../api/comment";

export default {
  name: "AnnouncementCard",
  props: [
    "id",
    "author",
    "authorId",
    "content",
    "date",
    "comments",
  ],
  components: {AnnouncementContent},
  data() {
    return {
      isDeleted: false,
      isFormValid: false,
      fieldContent: '',
      dataComments: this.$props.comments,
      commentRules: [(v) => (!!v || "Comment cannot be empty")],
      lengthRules: [(v) => (v.length <= 65535 || "Characters are off limit")],
      snackbar: {
        isVisible: false,
        text: "",
      },
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    removeCard() {
      this.isDeleted = true
    },
    async postComment() {
      this.validate();
      if (this.isFormValid) {
        const {error, errorMessage} = await createComment({
          announcementId: parseInt(this.$props.id),
          content: this.fieldContent,
        });

        if (error) {
          this.showSnackbar(errorMessage);
        } else {
          this.$refs.form.reset();
          location.reload();
        }
      }
    },
    showSnackbar(text) {
      this.snackbar.text = text;
      this.snackbar.isVisible = true;
    },
  }
}
</script>
