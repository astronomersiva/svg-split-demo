# svg-split-demo

This is a demo app for how we split SVGs using our fork of [ember-svg-jar](https://github.com/astronomersiva/ember-svg-jar).

## Steps

* Add the following to your `ember-cli-build.js`
  ```
  splitSvgs: [],
  svgJar: {
    isBundledWithVendor: false,
    sourceDirs: ['public/svgs/'],
  },
  ```
* Create an in-repo addon using `ember g in-repo-addon split-svgs`.
* The code for this can be seen [here](lib/split-svgs/index.js).
