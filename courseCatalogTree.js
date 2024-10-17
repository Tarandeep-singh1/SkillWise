class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
        } else {
            let current = this.root;
            while (true) {
                if (value < current.value) {
                    if (!current.left) {
                        current.left = newNode;
                        break;
                    }
                    current = current.left;
                } else {
                    if (!current.right) {
                        current.right = newNode;
                        break;
                    }
                    current = current.right;
                }
            }
        }
    }

    traversePreOrder(node, array) {
        if (node !== null) {
            array.push(node.value);
            this.traversePreOrder(node.left, array);
            this.traversePreOrder(node.right, array);
        }
        return array;
    }

    traverseInOrder(node, array) {
        if (node !== null) {
            this.traverseInOrder(node.left, array);
            array.push(node.value);
            this.traverseInOrder(node.right, array);
        }
        return array;
    }

    traversePostOrder(node, array) {
        if (node !== null) {
            this.traversePostOrder(node.left, array);
            this.traversePostOrder(node.right, array);
            array.push(node.value);
        }
        return array;
    }

    findMinValue(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }

    findMaxValue(node) {
        let current = node;
        while (current.right !== null) {
            current = current.right;
        }
        return current.value;
    }

    height(node) {
        if (node === null) {
            return -1;
        }
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    search(node, value) {
        if (node === null) {
            return false;
        }
        if (node.value === value) {
            return true;
        }
        if (value < node.value) {
            return this.search(node.left, value);
        } else {
            return this.search(node.right, value);
        }
    }

    delete(node, value) {
        if (node === null) {
            return null;
        }
        if (value < node.value) {
            node.left = this.delete(node.left, value);
        } else if (value > node.value) {
            node.right = this.delete(node.right, value);
        } else {
            if (node.left === null && node.right === null) {
                return null;
            } else if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            } else {
                let minValue = this.findMinValue(node.right);
                node.value = minValue;
                node.right = this.delete(node.right, minValue);
            }
        }
        return node;
    }
}

const tree = new BinaryTree();
const values = [15, 10, 20, 8, 12, 16, 25, 5, 9, 11, 13, 17, 22, 30];

values.forEach(value => tree.insert(value));

console.log('Pre-order Traversal:', tree.traversePreOrder(tree.root, []));
console.log('In-order Traversal:', tree.traverseInOrder(tree.root, []));
console.log('Post-order Traversal:', tree.traversePostOrder(tree.root, []));
console.log('Minimum Value:', tree.findMinValue(tree.root));
console.log('Maximum Value:', tree.findMaxValue(tree.root));
console.log('Tree Height:', tree.height(tree.root));
console.log('Is 22 in the tree?', tree.search(tree.root, 22));
console.log('Is 100 in the tree?', tree.search(tree.root, 100));
tree.delete(tree.root, 10);
console.log('After deletion of 10:', tree.traverseInOrder(tree.root, []));
