function ListNode(val) {
    this.val = val;
    this.next = null;
}

ListNode.prototype = {
    toArray: function() {
        var pointer = this;
        var arr = [];

        while (pointer) {
            arr.push(pointer.val);
            pointer = pointer.next;
        }

        return arr;
    }
}

LinkedListUtils = {

    arrToNode: function(arr) {
        var start = null;
        var pre = null;
        
        for (var i=0; i<arr.length; i++) {
            if (0===i) {
                start = pre = new ListNode(arr[i]);
                continue;
            }
            var node = new ListNode(arr[i]);
            pre.next = node;
            pre = node;
        }
        return start;
    },
    addTwoArr: function(arr1, arr2) {
        var rez = [];
        var f = 0;
        
        for (var i=0, j=0; i<arr1.length || j<arr2.length; i++,j++) {
            var sum = (arr1[i]||0)+(arr2[j]||0)+f;
            rez.push(sum>9?sum-10:sum);
            f = (sum>9)?1:0;
        }

        f && rez.push(1);
        
        return rez;
    },
    addTwoNode: function(node1, node2) {

    }
}

var a1 = [2,4,3];
var a2 = [5,6,4];
var node1 = LinkedListUtils.arrToNode(a1);
var node2 = LinkedListUtils.arrToNode(a2);
var sumArr = LinkedListUtils.addTwoArr(node1.toArray(), node2.toArray());
var sumNode = LinkedListUtils.arrToNode(sumArr);
debugger


