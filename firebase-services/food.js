import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore'
import { db, auth } from './config'

const collection_name = 'food'

export async function addFood(data) {
  // const { food_name, category, weight, expiry_date } = data
  const { food_name, category } = data

  try {
    const docRef = await addDoc(collection(db, collection_name), {
      food_name,
      category,
      // weight,
      // expiry_date,
      // status,
      user_id: auth.currentUser.uid
    })
  } catch (e) {
    console.error('Error in addFood', e)
  }
}

export async function getAllFoodbyId(id) {
  // return an array of food owned by the current signed in user
  const foodRef = collection(db, 'food')
  const q = query(foodRef, where('user_id', '==', id))
  return getDocs(q)
}

export async function deleteFood(id) {
  await deleteDoc(doc(db, collection_name, id));
}