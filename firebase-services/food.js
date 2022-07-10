import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import getExpiryFromCategory from '../functions/getExpiryFromCategory'
import getMaxDate from '../functions/getMaxDate'
import { db, auth } from './config'

const collection_name = 'food'

export async function addFood(data) {
  const { food_name, category } = data

  try {
    const docRef = await addDoc(collection(db, collection_name), {
      food_name,
      category,
      expiry_date: getExpiryFromCategory(category),
      user_id: auth.currentUser.uid
    })
  } catch (e) {
    console.error('Error in addFood', e)
  }
}

export async function addFoodManually(data) {
  const { food_name, category, weight, expiry_date } = data
  try {
    const docRef = await addDoc(collection(db, collection_name), {
      food_name,
      category,
      weight,
      expiry_date,
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

// updates status of food item to consumed
export async function consumeFood(id, data) {
  const docRef = doc(db, collection_name, id)
  await updateDoc(docRef, data);
}

// updates status of food item to disposed
export async function disposeFood(id, data) {
  const docRef = doc(db, collection_name, id)
  await updateDoc(docRef, data);
}

export async function expireSoonFood(id) {
  const foodRef = collection(db, 'food')
  const q = query(foodRef, where('expiry_date', '<', getMaxDate()))
  return getDocs(q)
}