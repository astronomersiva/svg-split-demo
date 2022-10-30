'use strict';

const broccoliMerge = require('broccoli-merge-trees');
const funnel = require('broccoli-funnel');
const Concat = require('broccoli-concat');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  treeForPublic(tree) {
    let mergedTrees = broccoliMerge(this.app.options.splitSvgs, {
      overwrite: true,
    });

    // my broccoli-fu is weak, so I'm not sure how to do this with a single
    // funnel. I'm sure there's a way, but this works for now.

    // also need to figure out how to remove the SVGs from public
    let splitSvgs = [];
    let splitPaths = ['one', 'two'];

    splitPaths.forEach((splitPath) => {
      let svgTree = funnel(mergedTrees, {
        include: [`**/*`],
      });

      splitSvgs.push(
        new Concat(svgTree, {
          outputFile: `assets/svgs/${splitPath}.js`,
          inputFiles: [`**/${splitPath}/*.js`],
        })
      );
    });

    return broccoliMerge(
      [tree, ...splitSvgs].filter((row) => !!row),
      {
        overwrite: true,
      }
    );
  },
};
