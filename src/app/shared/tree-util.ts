import * as _ from 'underscore';
import * as $ from 'jquery';

export default class TreeUtil {
  /**
   * Returns an array of all leaf nodes from a tree
   */
  static getLeafNodes(tree) {
    if (tree === null) {
      return null;
    }
    const leafNodes = [];
    function addLeaf(node) {
      if (!node.children && !node._children) {
        leafNodes.push(node);
      }
    }
    TreeUtil.visitDfs(tree, addLeaf, undefined);
    return leafNodes;
  }

  /**
   * Performs a depth first search of a tree
   * performing a function before processing a
   * node's children and/or after
   */
  static visitDfs(node, before, after) {
    if (node === null) {
      return;
    }

    if (before) {
      before(node);
    }

    const children = node.children === undefined ? node._children : node.children;

    _.each(children, function(child) {
      TreeUtil.visitDfs(child, before, after);
    });

    if (after) {
      after(node);
    }
  }

  static expandNode(node) {
    if (node && node._children) {
      node.children = node._children;
      delete node._children;
    }
  }

  static collapseNode(node) {
    if (node && node.children) {
      node._children = node.children;
      delete node.children;
    }
  }

  static getChildrenProp(node) {
    if (node.children) {
      return 'children';
    } else if (node._children) {
      return '_children';
    } else {
      return undefined;
    }
  }

  static getChildren(node) {
    if (node) {
      return node.children || node._children || undefined;
    }
    return undefined;
  }

  static indexOfChild(parent, node) {
    const children = TreeUtil.getChildren(parent);
    if (children) {
      return children.indexOf(node);
    } else {
      return undefined;
    }
  }

  static getChild(node, index) {
    const children = TreeUtil.getChildren(node);
    if (children && index >= 0 && index < children.length) {
      return children[index];
    }
    return undefined;
  }

  static cloneNode(node, omitList) {
    // create clone
    let clone = _.omit(node, ['data', 'children', '_children']);
    clone = _.omit(clone, omitList);

    // deep clone data
    if (node.data) {
      clone.data = $.extend(true, {}, node.data);
    }

    const childrenProp = TreeUtil.getChildrenProp(node);
    if (childrenProp) {
      clone[childrenProp] = [];
      _.each(node[childrenProp], function(child) {
        const clonedChild = TreeUtil.cloneNode(child, omitList);
        clonedChild.parent = clone;
        clone[childrenProp].push(clonedChild);
      });
    }

    return clone;
  }

  static pathToNode(node) {
    const list = [];
    let curr = node;
    while (curr) {
      list.push(curr);
      curr = curr.parent;
    }
    list.reverse();
    return list;
  }

  static addParentsToChildren(root) {
    const stack = [];
    let node, i;
    stack.push(root);

    while (stack.length > 0) {
      node = stack.pop();
      if (node.children && node.children.length) {
        for (i = 0; i < node.children.length; i += 1) {
          node.children[i].parent = node;
          stack.push(node.children[i]);
        }
      }
    }
    return root;
  }
}
