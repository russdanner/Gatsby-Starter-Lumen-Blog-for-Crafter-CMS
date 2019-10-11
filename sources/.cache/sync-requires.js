const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-page-template-js": hot(preferDefault(require("/Users/rdanner/crafter-installs/training/craftercms/crafter-authoring/data/repos/sites/gatsby2/sandbox/sources/src/templates/page-template.js"))),
  "component---src-templates-post-template-js": hot(preferDefault(require("/Users/rdanner/crafter-installs/training/craftercms/crafter-authoring/data/repos/sites/gatsby2/sandbox/sources/src/templates/post-template.js"))),
  "component---src-templates-entry-template-js": hot(preferDefault(require("/Users/rdanner/crafter-installs/training/craftercms/crafter-authoring/data/repos/sites/gatsby2/sandbox/sources/src/templates/entry-template.js"))),
  "component---src-templates-category-template-js": hot(preferDefault(require("/Users/rdanner/crafter-installs/training/craftercms/crafter-authoring/data/repos/sites/gatsby2/sandbox/sources/src/templates/category-template.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/rdanner/crafter-installs/training/craftercms/crafter-authoring/data/repos/sites/gatsby2/sandbox/sources/.cache/dev-404-page.js")))
}

