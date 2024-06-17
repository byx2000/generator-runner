# generator-runner

使用JavaScript的生成器将递归函数转换为非递归，防止栈溢出。

转换规则：

1. 将递归函数声明为`function*`
2. 使用`yield`表达式替换所有递归调用的地方
3. 使用`runGenerator`函数运行递归函数

## 示例1：求和

```javascript
/**
 * 求1+2+3+...+n
 */
function* sum(n) {
  if (n == 1) {
    return 1
  }
  return n + (yield sum(n - 1))
}

console.log(runGenerator(sum(100)))
console.log(runGenerator(sum(1000000)))
```

输出结果：

```
5050
500000500000
```

## 示例2：斐波拉契数列

```javascript
/**
 * 求斐波拉契数列第n项
 */
function* fib(n) {
  if (n == 1 || n == 2) {
    return n
  }
  return (yield fib(n - 1)) + (yield fib(n - 2))
}

for (let i = 1; i <= 10; i++) {
  console.log(runGenerator(fib(i)))
}
```

输出结果：

```
1
2
3
5
8
13
21
34
55
89
```

## 示例3：二叉树前序遍历

```javascript
/**
 * 二叉树前序遍历
 */
function* preorderTraverse(node) {
  if (!node) {
    return
  }

  console.log(node.val)
  yield preorderTraverse(node.left)
  yield preorderTraverse(node.right)
}

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

runGenerator(preorderTraverse(tree))
```

输出结果：

```
1
2
3
4
5
6
```
