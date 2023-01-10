import { IRule, RULE_TYPE } from "@/typings";

/**
 * 表单输入校验规则
 */

const useRules = () => {
  const nameRules = [REQUIRED("用户名")];
  const passwordRules = [REQUIRED("密码")];
  const againPwdRules = [REQUIRED("密码")];
  const tagRules = [REQUIRED("标签"), RANGE(1, 4)];
  const titleRules = [REQUIRED("标题")];
  const contentRules = [REQUIRED("文章内容")];
  const emailRules = [
    REQUIRED("邮箱"),
    { type: RULE_TYPE.EMAIL, message: "请输入合法的邮箱" },
  ];
  const searchRules = [REQUIRED("搜索内容")];

  function REQUIRED(prefix: string): IRule {
    return {
      type: RULE_TYPE.REQUIRED,
      message: `${prefix}不能为空`,
    };
  }

  function RANGE(min = 0, max = Number.MAX_SAFE_INTEGER): IRule {
    return {
      type: RULE_TYPE.RANGE,
      message: `数量/长度只能在${min}-${max}`,
      min,
      max,
    };
  }

  return {
    nameRules,
    passwordRules,
    againPwdRules,
    tagRules,
    titleRules,
    contentRules,
    emailRules,
    searchRules,
  };
};

export default useRules;
