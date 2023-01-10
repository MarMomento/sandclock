import dayjs from "dayjs";
import colors from "vuetify/lib/util/colors";

/**
 * 格式化created_at,updated_at字段
 */

function formatDate(data, format = "YYYY-MM-DD") {
  if (data) {
    const res = JSON.parse(JSON.stringify(data));
    if (Array.isArray(res)) {
      res.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (key === "created_at" || key === "updated_at") {
            item[key] = dayjs(item[key]).format(format);
          }
        });
      });
    } else if (typeof res === "object") {
      Object.keys(res).forEach((key) => {
        if (key === "created_at" || key === "updated_at") {
          res[key] = dayjs(res[key]).format(format);
        }
      });
    }
    return res;
  }
  return data;
}

/**
 * 重置为初始值
 * @param {*} reactiveObj
 * @returns
 */

function resetReactiveProps(reactiveObj) {
  const obj = {};
  const toString = Object.prototype.toString;

  for (const [key, value] of Object.entries(reactiveObj)) {
    const type = toString.call(value).slice(8, -1);
    switch (type) {
      case "Array":
        obj[key] = [];
        break;
      case "String":
        obj[key] = "";
        break;
      default:
        break;
    }
  }
  return obj;
}

function generateRandomColor() {
  const colorArr = [];
  flattenColors(colors);
  const randomIndex = ~~(Math.random() * colorArr.length);
  return colorArr[randomIndex];

  function flattenColors(colors) {
    for (const value of Object.values(colors)) {
      if (typeof value !== "string") {
        flattenColors(value);
      } else if (typeof value === "string" && value !== "transparent") {
        colorArr.push(value);
      }
    }
  }
}

export { formatDate, resetReactiveProps, generateRandomColor };
