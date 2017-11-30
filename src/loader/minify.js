// @flow
export default (
  collection: PhenomicCollection
): PhenomicCollection => {
  if (!Array.isArray(collection)) {
    throw new Error(
      `minify expect a valid collection instead of ${ typeof collection }`
    )
  }
  /* Controls static build object */
  return collection.map((item) => {
    const dataFile = item.__dataUrl.replace(/\/(.*)index.html/g, '')
    const headItems = item.head || {}

    // remove description
    // delete headItems.description

    return {
      ...headItems,
      __filename: item.__filename,
      __url: item.__url,
      // __resourceUrl: item.__resourceUrl,
      __dataUrl: dataFile,
    }
  })
}
