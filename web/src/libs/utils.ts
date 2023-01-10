import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

dayjs.extend(relativeTime);

/**
 * 格式化api字符串
 * /users/{user_id} -> /users/1
 *
 * @param {string} api
 * @param {object} replaceContent
 * @returns {string}
 */

function formatAPIWithParams(
  api: string,
  replaceContent: { [key: string]: string }
): string {
  const regExp = /{\w+}/g;

  return api.replace(regExp, (match) => {
    const key = match.slice(1, match.length - 1);
    return replaceContent[key];
  });
}

/**
 * 生成随机的十六进制颜色值
 *
 * @returns {string}
 */

const blackList = ["ffffff"];
function randomHexColor(): string {
  let color = randomColor();
  while (blackList.includes(color)) {
    color = randomColor();
  }
  if (color.length < 6) {
    color = color.padStart(6, "0");
  }
  return "#" + color;

  function randomColor() {
    return (~~(Math.random() * 0xffffff)).toString(16);
  }
}

/**
 * obj1 = { "_id": "1", ... }, obj2 = { "_id": "2", ... }
 * { "1": obj1, "2": obj2 } => [obj1, obj2]
 *
 * @param {Object} obj
 * @return {Array}
 */

function objToArr<T>(obj: { [key: string]: T }): T[] {
  return Object.keys(obj).map((k) => obj[k]);
}

/**
 * obj1 = { "_id": "1", ... }, obj2 = { "_id": "2", ... }
 * [obj1, obj2] => {"1": obj1, "2": obj2}
 *
 * @param {Array} arr
 * @return {Object}
 */

function arrToObj<T extends { _id: string }>(arr: T[]): { [key: string]: T } {
  return arr.reduce((res, cur) => {
    res[cur._id] = cur;
    return res;
  }, {} as { [key: string]: T });
}

export { formatAPIWithParams, randomHexColor, objToArr, arrToObj };
