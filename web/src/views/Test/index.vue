<template>
  <div class="wrapper">
    <div class="container">
      <h1>组件封装测试</h1>
      <div class="row">
        <div class="col-12 mb-3">
          <v-card>
            <v-card-body>
              <v-card-title class="fs-4">btn</v-card-title>
              <v-card-text>
                <v-btn color="primary" tile>primary</v-btn>
                <v-btn color="primary" size="lg">lg primary</v-btn>
                <v-btn color="primary" size="sm">sm primary</v-btn>
                <v-btn color="primary">primary</v-btn>
                <v-btn color="secondary">secondary</v-btn>
                <v-btn color="success">success</v-btn>
                <v-btn color="danger">danger</v-btn>
                <v-btn color="warning">warning</v-btn>
                <v-btn color="info">info</v-btn>
                <v-btn color="dark">dark</v-btn>
                <v-btn color="light">light</v-btn>
                <v-btn color="link">link</v-btn>
              </v-card-text>
            </v-card-body>
          </v-card>
        </div>
        <div class="col-12 mb-3">
          <v-card>
            <v-card-body>
              <v-card-title class="fs-4">btn outline</v-card-title>
              <v-card-text>
                <v-btn class="text-nowrap" color="primary" tile outline>
                  primary</v-btn
                >
                <v-btn class="text-nowrap" color="primary" outline>
                  primary</v-btn
                >
                <v-btn class="text-nowrap" color="secondary" outline>
                  secondary</v-btn
                >
                <v-btn class="text-nowrap" color="success" outline>
                  success</v-btn
                >
                <v-btn class="text-nowrap" color="danger" outline>
                  danger</v-btn
                >
                <v-btn class="text-nowrap" color="warning" outline>
                  warning</v-btn
                >
                <v-btn class="text-nowrap" color="info" outline> info</v-btn>
                <v-btn class="text-nowrap" color="dark" outline> dark</v-btn>
                <v-btn class="text-nowrap" color="light" outline> light</v-btn>
                <v-btn class="text-nowrap" color="link" outline> link</v-btn>
              </v-card-text>
            </v-card-body>
          </v-card>
        </div>
        <div class="col-12 mb-3">
          <v-card>
            <v-card-body>
              <v-card-title class="fs-4">btn block</v-card-title>
              <v-card-text>
                <v-btn color="primary" block>block</v-btn>
              </v-card-text>
            </v-card-body>
          </v-card>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <v-card>
            <v-card-body>
              <v-form ref="form1">
                <v-form-item label="name" class="mb-3">
                  <v-input v-model="form1Info.name" :rules="nameRules" />
                </v-form-item>

                <v-form-item label="pwd" class="mb-3">
                  <v-input
                    v-model="form1Info.pwd"
                    type="password"
                    :rules="pwdRules"
                    :show-error="false"
                  />
                </v-form-item>

                <v-btn color="primary" @click="submit">click</v-btn>
              </v-form>
            </v-card-body>
          </v-card>
        </div>

        <div class="col-4">
          <v-card>
            <v-card-body>
              <v-form ref="form2">
                <v-form-item label="name" class="mb-3">
                  <v-input v-model="form2Info.name" :rules="nameRules" />
                </v-form-item>

                <v-form-item label="pwd" class="mb-3">
                  <v-input
                    v-model="form2Info.pwd"
                    type="passwordf"
                    :rules="pwdRules"
                  />
                </v-form-item>

                <v-form-item label="desc" class="mb-3">
                  <v-textarea v-model="form2Info.desc" :rules="pwdRules" />
                  {{ form2Info.desc }}
                </v-form-item>

                <v-form-item label="select" class="mb-3">
                  <v-select
                    :items="items"
                    v-model="form2Info.selected"
                    :rules="selectRules"
                  ></v-select>
                </v-form-item>

                <button
                  class="btn btn-primary mb-3"
                  type="button"
                  @click="register"
                >
                  click
                </button>
              </v-form>
            </v-card-body>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";

export default defineComponent({
  name: "Test",
  setup() {
    const state = reactive({
      form1: ref<null | HTMLFormElement>(null),
      form2: ref<null | HTMLFormElement>(null),
      form1Info: {
        name: "",
        pwd: "",
      },
      form2Info: {
        name: "",
        pwd: "",
        desc: "",
        selected: [],
      },
      items: [
        { text: "a", value: 1 },
        { text: "b", value: 2 },
        { text: "c", value: 3 },
      ],
      nameRules: [{ type: "required", message: "name required!!!" }],
      pwdRules: [{ type: "required", message: "pwd required!!!" }],
      selectRules: [{ type: "required", message: "selected required!!!" }],
    });

    const submit = () => {
      // console.log(state.form1);
      // console.log(state.form1?.validate());
    };
    const register = () => {
      // console.log(state.form2);
      // console.log(state.form2?.validate());
    };
    return {
      ...toRefs(state),
      submit,
      register,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: $gray-200;
}
</style>
