import { useState } from "react";
import AuthStateListener from "../../components/AuthStateListener";
import { auth } from "../../firebase-services/config"
import { getAllFoodbyId } from "../../firebase-services/food"

export default function ViewFood() {
  const [isLoading, setIsLoading] = useState(true)
  const [allFood, setAllFood] = useState([])
  AuthStateListener(isLoading, setIsLoading)
  if (isLoading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    )
  }
  const getAllFood = async (event) => {
    event.preventDefault()
    const foodData = []
    getAllFoodbyId(auth.currentUser.uid)
      .then(data => {
        data.forEach(doc => {
          const docInfo = doc.data()
          docInfo['id'] = doc.id
          foodData.push(docInfo)
        })
        setAllFood(foodData)
      })
  }

  return (
    <div>
      <button onClick={getAllFood}>get Food!</button>
      {allFood.map(food => <p key={food.id}>{food.food_name}</p>)}
    </div>
  )
}