import { type SchemaTypeDefinition } from "sanity"
import { categoryType } from "./categoryType"
import { productType } from "./productType"
import { addressType } from "./addressType"
import { blogType } from "./blogType"
import { authorType } from "./authorType"
import { brandType } from "./brandType"
import { orderType } from "./orderType"
import { blockContentType } from "./blockContentType"
import { blogCategoryType } from "./blogCategoryType"




export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, productType, addressType, blogType, authorType, brandType, orderType, blockContentType, blogCategoryType],
}
