export default function organisingFoodData(foodData) {
  const organisedFoodData = {
    "PERISHABLE_DRINK": [],
    "FISH": [],
    "MEAT": [],
    "FRUIT": [],
    "VEGETABLE": [],
    "UNCATEGORISED": []
  }
  foodData.map(food => {
    const category = food.category
    organisedFoodData[category].push(food)
  })

  return organisedFoodData
}