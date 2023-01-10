import { reactive, WritableComputedRef } from "vue";
import { IInputState, IRule, IValidation, RULE_TYPE } from "@/typings";

const emailReg = /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

/**
 * 表单校验
 *
 * @param state 输入
 * @param rules 规则
 */

type IUseValidation = (
  modelValue: WritableComputedRef<string | string[]>,
  rules: IRule[]
) => {
  state: IInputState;
  validation: IValidation;
};

const useValidation: IUseValidation = (modelValue, rules) => {
  const state = reactive({
    val: modelValue,
    error: false,
    message: "",
  });

  const validation: IValidation = () => {
    if (rules.length) {
      const allPassed = rules.every((rule) => {
        let passed = true;
        let len = 0;
        switch (rule.type) {
          case RULE_TYPE.REQUIRED:
            if (typeof state.val === "string") {
              passed = state.val.trim() !== "";
            } else {
              passed = state.val.length !== 0;
            }
            break;
          case RULE_TYPE.RANGE:
            if (typeof state.val === "string") {
              len = state.val.trim().length;
            } else if (Array.isArray(state.val)) {
              len = state.val.length;
            }
            passed =
              len >= (rule.min || 0) &&
              len <= (rule.max || Number.MAX_SAFE_INTEGER);
            break;
          case RULE_TYPE.CUSTOM:
            passed = rule.validate?.() || false;
            break;
          case RULE_TYPE.EMAIL:
            passed = emailReg.test(state.val as string);
            break;
          default:
            break;
        }
        state.message = rule.message;
        return passed;
      });
      state.error = !allPassed;
      return allPassed;
    }
    return true;
  };

  return {
    state,
    validation,
  };
};

export default useValidation;
