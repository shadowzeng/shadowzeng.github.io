function TreeNode(val,left,right) {
    this.value = val;
    this.left = left || null;
    this.right = right || null;
}

TreeNode.prototype = {
    getValue: function() {
        return this.value;
    },
    getLeft: function() {
        return this.left;
    },
    getRight: function() {
        return this.right;
    },
    setValue: function(val) {
        this.value = val;
    },
    setLeft: function(left) {
        this.left = left;
    },
    setRight: function(right) {
        this.right = right;
    },
    isLeafNode: function() {
        return this.left == null && this.right == null;
    }
}

var TreeUtils = {
    generateTree: function(treeArr) {
        if (Object.prototype.toString.call(treeArr) != '[object Array]') {
            return null;
        }

        if (treeArr.length === 0) {
            return null;
        }

        if (!treeArr[0]) {
            return null;
        }

        function createNode(arr,index) {
            if (arr[index]){
                var node = new TreeNode(arr[index]);
                node.setLeft(createNode(arr,2*index+1));
                node.setRight(createNode(arr,2*index+2));
                return node;
            } else {
                return null;
            }
        }

        return createNode(treeArr,0);
    },
    preSearch: function(tree) {
        if (tree) {
            console.log(tree.getValue());
            arguments.callee.call(null,tree.getLeft());
            arguments.callee.call(null,tree.getRight());
        }
    },
    midSearch: function(tree) {
        if (tree) {
            arguments.callee.call(null,tree.getLeft());
            console.log(tree.getValue());
            arguments.callee.call(null,tree.getRight());
        }
    },
    afterSearch: function (tree) {
        if (tree) {
            arguments.callee.call(null,tree.getLeft());
            arguments.callee.call(null,tree.getRight());
            console.log(tree.getValue());
        }
    },
    levelSearch: function (tree) {
        if (!tree) {
            return;
        }

        var stack = [];
        var cur = tree;
        stack.push(cur);

        while (stack.length != 0) {
            var removeArr = stack.splice(0,stack.length);
            for (var i = 0; i < removeArr.length; i++) {
                console.log(removeArr[i].getValue());
                var left = removeArr[i].getLeft();
                var right = removeArr[i].getRight();
                left && stack.push(left);
                right && stack.push(right);
            }
        }
    },
    printBranch: function(tree) {  // 打印分支
        if (!tree) {
            return;
        }

        var stack = [];

        function search(node) {
            if (node) {
                stack.push(node);
                if (node.isLeafNode()) {
                    for (var i = 0; i < stack.length; i++) {
                        console.log(stack[i].getValue());
                    }
                } else {
                    search(node.getLeft());
                    search(node.getRight());
                }
                stack.pop();
            }
        }
        search(tree);
    }
}

var tree1 = TreeUtils.generateTree([1,2,3,,4,5,,,,,,6,7,]);
var tree2 = TreeUtils.generateTree([1,2,3,4,5,,6,,,7,8]);
TreeUtils.levelSearch(tree2);
debugger;

//      1
//   2     3
//    4   5
//       6 7

//       1
//     2     3
//  4   5     6
//     7  8