import { useState } from "react"
import CategoryTable from "./CategoryTable"
import FeedCard from "./FeedCard"

const Fridge = ({ organiseFoodData }) => {
  const cards = []
  for (const category in organiseFoodData) {
    cards.push(<FeedCard key={category} category={category} totalQuantity={organiseFoodData[category].length} categoryData={organiseFoodData[category]}/>)
  }

  return (
    <div>
      {cards}
    </div>
  )
}

export default Fridge