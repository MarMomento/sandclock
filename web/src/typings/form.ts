/**
 * 关于表单输入以及表单校验
 */

export enum RULE_TYPE {
  REQUIRED = "required",
  RANGE = "range",
  CUSTOM = "custom",
  EMAIL = "email",
}

export interface IRule {
  type: RULE_TYPE;
  message: string;
  max?: number;
  min?: number;
  validate?: IValidation;
}

export interface IInputState {
  val: string | string[];
  error: boolean;
  message: string;
}

export type IValidation = () => boolean;

export interface ISelectItem {
  text: string;
  value: string;
  selected?: boolean;
}

/**
 * 表单组件注册
 */
export interface IRegistrable {
  register(...props: any[]): void;
  unregister(self: any): void;
}
