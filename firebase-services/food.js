import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db, auth } from './config'

const collection_name = 'food'

export async function addFood(data) {
  const { food_name, category } = data

  const getExpiryFromCategory = (category) => {
    const expiryDates = {
      "PERISHABLE_DRINK": 14,
      "FISH": 3,
      "MEAT": 3,
      "FRUIT": 12,
      "VEGETABLE": 12,
      "UNCATEGORISED": 21
    }

    const converteDate = (input) => {
      const pad = (s) => {
        return (s < 10) ? '0' + s : s;
      }
      const d = new Date(input)
      return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('/')
    }

    const today = new Date();
    const expiry_date = today.setDate(today.getDate() + expiryDates[category]);
    const readable = new Date(expiry_date)
    return converteDate(readable);
  }

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
  const getMaxDate = () => {
    const converteDate = (input) => {
      const pad = (s) => {
        return (s < 10) ? '0' + s : s;
      }
      const d = new Date(input)
      return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('/')
    }

    const today = new Date();
    const expiry_date = today.setDate(today.getDate() + 5);
    const readable = new Date(expiry_date)
    return converteDate(readable);
  }
  const q = query(foodRef, where('expiry_date', '<', getMaxDate()))
  return getDocs(q)
}