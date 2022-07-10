import { useState } from "react"
import CategoryTable from "./CategoryTable"
import ExpiresSoon from "./ExpiresSoon"
import FeedCard from "./FeedCard"

const Fridge = ({ organiseFoodData, expiringFood}) => {
  const cards = []
  for (const category in organiseFoodData) {
    cards.push(<FeedCard key={category} category={category} totalQuantity={organiseFoodData[category].length} categoryData={organiseFoodData[category]}/>)
  }

  return (
    <div>
      <ExpiresSoon category={"Expiring Soon"} totalQuantity={expiringFood.length} categoryData={expiringFood}/>
      {cards}
    </div>
  )
}

export default Fridge