import React from "react"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Category } from "@/sanity.types"

interface Props {
    categories: Category[];
    selectedCategory?: string | null;
}


const CatergoryList = ({ categories, selectedCategory }: Props) => {
  return (
    <div>
      <h1 className="text-base text-darkColor/80 font-bold">Product Categories</h1>
      <RadioGroup value={selectedCategory || ""} className="mt-2 space-y-1">
       {categories?.map((category)=> (
        <div onClick={()=> {setSelectedCategory(category?.slug?.current) as string}} className="flex items-center space-x-2 cursor-pointer" key={category?._id}>
            <RadioGroupItem value={category?.slug?.current as string} id={category?.slug?.current} className="rounded-sm hover:scale-105" />
            <label htmlFor={category?.slug?.current} className={`${selectedCategory === category?.slug?.current ? "font-semibold text-shop_dark_yellow" : "font-normal"}`} >{category?.title}</label>
        </div>
       ))}
      </RadioGroup>
    </div>
  )
}

export default CatergoryList
