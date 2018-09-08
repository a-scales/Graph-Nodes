class Node {
  constructor(uid) {
    this.uid = uid;
    this.children = [];
    this.parent = null;
    this.isValid = this.checkForCycles()
  }

  checkForCycles() {
    for(let i = 0; i < this.children.length; i++) {
      if(this.children[i] === this.uid) {
        return false;
      }
    }
    return true;
  }

  addNode(node) {
    if(this.uid == node.uid) {
      throw(new Error("Cycle"));
    }
    node.parent = this;
    this.children.push(node);
    return node;
  }

  checkUpForCycles(c) {
    if(this.parent) {
      if(this.parent.uid == c) {
        throw(new Error("Cycle"));
      } else {
        this.parent.checkUpForCycles(c)
      }
    } else {
      return
    }
  }

  printChildren() {
    let c = this.children.map( (a) => a.uid );
    if( this.children.length > 0 ) {
      console.log(this.uid+" -> "+c.join(','))
    } else {
      console.log(this.uid+" -> No Children")
    }
    this.children.forEach((child) => {
      child.checkUpForCycles(child.uid);
      child.printChildren();
    })
  }
}

let root = new Node(1);
let n1 = new Node(20);
let n2 = new Node(21);
let n3 = new Node(100);
let n4 = new Node(12);
let n5 = new Node(12315)
let errorNode = new Node(20);
root.addNode(n1);
root.addNode(n2);
n2.addNode(n3);
n2.addNode(n4);
n4.addNode(n5);
/* Adding this will throw Cycle error */
// n1.addNode(errorNode);
root.printChildren()
