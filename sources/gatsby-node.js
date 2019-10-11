const fetch = require('node-fetch');
const path = require('path');
const pagesURL = 'http://localhost:8080/api/pages.json?crafterSite=gatsby2';
const componentsURL = 'http://localhost:8080/api/components.json?crafterSite=gatsby2';
const navURL = 'http://localhost:8080/api/1/site/navigation/tree.json?url=/site/website&depth=1&crafterSite=gatsby2';

exports.createPages = require('./gatsby/pagination/create-categories-pages');
//exports.onCreateNode = require('./gatsby/on-create-node');



exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
{
  CrafterCMS {
    pages {
      items {
        id: localId
        url: localId(transform: "storeUrlToRenderUrl")
        content__type
        localId
        navLabel
        orderDefault_f
        placeInNav
      }
    }
    categories: component_taxonomy {
      items {
        items {
          item {
            key
            value
          }
        }
        file__name(filter: {regex: "categories.*"})
      }
    }
  }
}

  `)


  data.CrafterCMS.pages.items.forEach(page => {
    var templateName = page.content__type.replace("/page/", "");
    var templatePath = `./src/templates/`+templateName+`-template.js`
    var url = page.url //localId.replace("/site/website", "").replace("/index.xml", "");
    console.log(">>> Generating Page: (" + url + ")  with template ("+templateName+")");    

    actions.createPage({
      path: url,
      component: path.resolve(templatePath),
      context: {
        url: page.localId,
      },

    })
  })

  data.CrafterCMS.categories.items[0].items.item.forEach(category => {
    //var templateName = page.content__type.replace("/page/", "");
    
    
    var url = "/category/"+category.key
    var templatePath = "./src/templates/category-template.js"
    console.log(">>> Generating Page: (/category/" + category.key + ") with template (category)");    

    actions.createPage({
      path: url,
      component: path.resolve(templatePath),
      context: {
       url: url,
       category: category.key
      },
   })
  })

}







