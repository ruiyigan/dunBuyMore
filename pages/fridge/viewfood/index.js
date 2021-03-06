import { useRouter } from "next/router";
import { useState } from "react";
import AuthStateListener from "../../../components/AuthStateListener";
import BackButton from "../../../components/BackButton";
import Fridge from "../../../components/Fridge";
import LogoutButton from "../../../components/LogoutButton";
import { auth } from "../../../firebase-services/config";
import { expireSoonFood, getAllFoodbyId } from "../../../firebase-services/food";

export default function ViewFood() {
  const [isLoading, setIsLoading] = useState(true)
  const [allFood, setAllFood] = useState([])
  const [expiringFood, setAllExpiringFood] = useState([])
  const [dataPulled, setDataPulled] = useState(false)
  const [allFoodOrganised, setAllFoodOrganised] = useState({})
  const router = useRouter()
  const organisingFoodData = (foodData) => {
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
    const expiryFoodData = []
    expireSoonFood(auth.currentUser.uid)
      .then(data => {
        data.forEach(doc => {
          const docInfo = doc.data()
          docInfo['id'] = doc.id
          expiryFoodData.push(docInfo)
        })
        setAllExpiringFood(expiryFoodData)
        setDataPulled(true)
      })
  }
  return (
    <div>
      <div className="pt-20">
        <div className="flex items-stretch pt-4">
          <button className="border-2 border-black rounded px-1" onClick={() => router.push('/fridge/addfood')}>Add Food to Fridge</button>
          <button className="border-2 border-black rounded px-1" onClick={getAllFood}>Get Food!</button>
        </div>
        <Fridge organiseFoodData={allFoodOrganised} expiringFood={expiringFood} dataPulled={dataPulled} setDataPulled={setDataPulled}/>
      </div>
      <div>
        <LogoutButton />
        <BackButton />
      </div>
    </div>
  )
}