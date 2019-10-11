package org.craftercms.sites.gatsby

public class GatsbyContentServices {

	def siteItemService
    def getSiteItemService() { return siteItemService }
    def setSiteItemService(value) { siteItemService = value }

	def searchService
    def getSearchService() { return searchService }
    def setSearchService(value) { searchService = value }

	/**
     */
	def getPages() {

      def queryStatement = "content-type:\\/page*" 
      def result = searchService.search([ query: [ query_string: [ query: queryStatement as String ] ] ])
      def items = result.hits.hits*.getSourceAsMap()
      def pages = []
      
      items.each { item ->
          def cmsPage = [:]
          def siteItem = siteItemService.getSiteItem(item.localId)
              
          cmsPage = getContentPage(siteItem.getDom())
          cmsPage.localId = item.localId
          cmsPage.url = item.localId.replace("/site/website","").replace("/index.xml", "")
          if("".equals(cmsPage.url)) cmsPage.url = "/"
          
          pages.add(cmsPage)
      }

		return pages
	}	


    /**
     */
  def getComponents() {
      def queryStatement = "content-type:\\/component*" 
      def result = searchService.search([ query: [ query_string: [ query: queryStatement as String ] ] ])
      def items = result.hits.hits*.getSourceAsMap()
      def components = []
      
      items.each { item ->
          def cmsComponent = [:]
          def siteItem = siteItemService.getSiteItem(item.localId)
              
          cmsComponent = getContentComponent(siteItem.getDom())
          cmsComponent.localId = item.localId
          components.add(cmsComponent)
      }

		return components
  } 

  /* turn a dom object in to a content map */
  def getContentPage(dom) {
      return getElementContent(dom.page)
  }
  
  /* turn a dom object in to a content map */
  def getContentComponent(dom) {
      return getElementContent(dom.component)
  }

  def getElementContent(element) {
  
      def content = [:]
            content.edges = [:]
            content.edges.node = [:]
            def contentF = content
            
      
      element.elements().each { property ->
      
          if(property.isTextOnly()) {
              // element is a property
              contentF[property.getName()] = property.getText()
          }
          else {
             
                  // item is a repeat group (recursive)
                  if("item".equals(property.getName())) {
                      if(!contentF[property.getName()]) {
                          // init the array
                          contentF[property.getName()] = []
                      }
                      
                      def include = property.selectNodes("./include");
                      if(include.size() == 0) {
                        // repeat group
                        contentF[property.getName()].add(getElementContent(property))
                      }
                      else {
                        // component
                        def componentPath = include[0].getText();
                        contentF[property.getName()].add(componentPath)

                        // code that unfurls components
                        //def compomentItem = siteItemService.getSiteItem(componentPath)
                        //content[property.getName()].add(getElementContent(compomentItem.dom.component))

                        
                      }
                  }
                  else {
                      contentF[property.getName()] = getElementContent(property)
                  }

          }
      }
      
      return content
  }
  
}