"use strict";

exports.processObject = (type, item, createContentDigest, generateID) => {
  const id = item._id || item.id;
  delete item._id;
  console.log('--------------ITEM----------------');
  console.log(item);
  console.log('-------------NITEM----------------');
  const nItem = formatNodeHelper(item, generateID);
  console.log(nItem);
  console.log('----------------------------------');
  const nodeMetadata = {
    id,
    parent: null,
    children: [],
    internal: {
      type: `Cosmicjs${type}`,
      content: JSON.stringify(nItem),
      contentDigest: createContentDigest(nItem)
    }
  };
  return Object.assign({}, item, nodeMetadata);
};
const formatNodeHelper = (node, generateID) => {
  const object = Object.getOwnPropertyNames(node.metadata);
  const metafield = {
    id: null,
    children: null,
    type: null,
    title: null,
    key: null,
    value: null,
    required: null
  };
  let nNode = {
    id: node.id,
    slug: node.slug,
    title: node.title,
    metafields: []
  };
  object.map(el => {
    if (['string', 'number', 'boolean'].includes(typeof node.metadata[el])) {
      let nMetafield = {
        ...metafield,
        id: generateID(),
        key: el,
        value: node.metadata[el]
      };
      nNode.metafields.push(nMetafield);
    }
  });
  return nNode;
};
//# sourceMappingURL=normalize.js.map