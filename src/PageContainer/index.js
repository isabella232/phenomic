// deprecated
import colors from "chalk"

import PageContainer from "../components/PageContainer"

console.log("⚠️ " + colors.yellow(
  "'phenomic-serverless/lib/PageContainer' reference is deprecated.\n" +
  "Please use `import { PageContainer } from \"phenomic\" instead`."
))

export default PageContainer
