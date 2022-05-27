/**
 * 数组转对象 {key,value}
 * @param {*} arr
 * @param {*} key 对象键属性
 * @param {*} val 对象值属性
 * @returns
 */
export function arrToMap(arr, key = 'key', val = 'value') {
  return arr.reduce((acc, item) => ((acc[item[key]] = item[val]), acc), {});
}
/**
 * 对象转数组
 * @param {*} obj
 * @returns
 */
export function mapToArr(obj) {
  return Object.entries(obj).map(([key, val]) => ({
    key: +key,
    value: val,
  }));
}
