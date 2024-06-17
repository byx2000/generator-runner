'use strict'

const assert = require('assert')
const { runGenerator } = require('../src/generator-runner')

/**
 * 求1+2+3+...+n
 */
function* sum(n) {
  if (n == 1) {
    return 1
  }
  return n + (yield sum(n - 1))
}

/**
 * 求斐波拉契数列第n项
 */
function* fib(n) {
  if (n == 1 || n == 2) {
    return n
  }
  return (yield fib(n - 1)) + (yield fib(n - 2))
}

/**
 * 二叉树前序遍历
 */
function* preorderTraverse(node, result) {
  if (!node) {
    return
  }

  result.push(node.val)
  yield preorderTraverse(node.left, result)
  yield preorderTraverse(node.right, result)
}

describe('run test', () => {
  it('sum test', () => {
    assert.equal(runGenerator(sum(100)), 5050)
    assert.equal(runGenerator(sum(1000000)), 500000500000)
  })
  
  it('fib test', () => {
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      .map(n => runGenerator(fib(n)))
    assert.deepEqual(nums, [1, 2, 3, 5, 8, 13, 21, 34, 55, 89])
  })

  it('inorder traverse test 1', () => {
    let tree = {
      val: 1,
      left: {
        val: 2,
        left: {
          val: 3
        },
        right: {
          val: 4
        }
      },
      right: {
        val: 5,
        right: {
          val: 6
        }
      }
    }

    let result = []
    runGenerator(preorderTraverse(tree, result))
    assert.deepEqual(result, [1, 2, 3, 4, 5, 6])

    
  })

  it('inorder traverse test 2', () => {
    let tree = {val: 1}
    for (let i = 2; i <= 1000000; i++) {
      tree = {
        val: i,
        left: tree
      }
    }

    let result = []
    runGenerator(preorderTraverse(tree, result))
    for (let i = 0; i < result.length; i++) {
      assert.equal(result[i], 1000000 - i)
    }
  })
})