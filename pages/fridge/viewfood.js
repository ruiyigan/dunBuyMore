import { useRouter } from "next/router";
import { useState } from "react";
import AuthStateListener from "../../components/AuthStateListener";
import Fridge from "../../components/Fridge";
import { auth } from "../../firebase-services/config"
import { getAllFoodbyId } from "../../firebase-services/food"
import organisingFoodData from "../../functions/organisingFood";

export default function ViewFood() {
  const [isLoading, setIsLoading] = useState(true)
  const [allFood, setAllFood] = useState([])
  const [allFoodOrganised, setAllFoodOrganised] = useState({})
  const router = useRouter()
  AuthStateListener(isLoading, setIsLoading)
  if (isLoading) {
    return (
      <div>
        <h1>Do you know that Food waste is one of the biggest waste streams in Singapore?</h1>
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
        setAllFoodOrganised(organisingFoodData(foodData))
      })
  }

  return (
    <div>
      <button onClick={() => router.push('/fridge/addfood')}>Add Food to Fridge</button>
      <br/>
      <button onClick={getAllFood}>get Food!</button>
      <Fridge organiseFoodData={allFoodOrganised}/>
    </div>
  )
}