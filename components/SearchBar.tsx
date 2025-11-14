import { Search } from "lucide-react"
import React from "react"

const SearchBar = ({isScrolled}: {isScrolled: boolean}) => {
  return (
    <div>
      <Search className={`w-5 h-5 hover:text-shop_light_yellow hoverEffect ${ isScrolled ? "scale-80" : "scale-120"}`} />
    </div>
  )
}

export default SearchBar
