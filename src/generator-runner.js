'use strict'

/**
 * 判断变量v是不是生成器
 */
function isGenerator(v) {
  return typeof v === 'object' && v !== null && v[Symbol.iterator] instanceof Function;
}

/**
 * 运行递归函数生成器
 * @param {*} g 生成器
 * @returns 返回值
 */
function runGenerator(g) {
  let stack = [g] // 调用栈
  let ret = null // 保存当前返回值

  while (stack.length > 0) {
    let cur = stack[stack.length - 1] // 获取栈顶元素
    let r = cur.next(ret) // 运行当前生成器

    if (r.done) { // 如果生成器已结束，则记录返回值
      ret = r.value
      stack.pop()
    } else { // 否则查看生成器返回的值类型
      if (isGenerator(r.value)) { // 如果产生的是另一个生成器，则直接入栈
        stack.push(r.value)
      } else { // 如果产生的是一个普通值，则记录返回值
        ret = r.value
      }
    }
  }

  return ret
}

module.exports = {runGenerator}
