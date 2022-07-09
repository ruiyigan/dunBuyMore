import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { db, auth } from './config'

const collection_name = 'food'

export async function addFood(data) {
  const { food_name, category, weight, expiry_date } = data

  try {
    const docRef = await addDoc(collection(db, collection_name), {
      food_name,
      category,
      weight,
      expiry_date,
      status,
      user_id: auth.currentUser.uid
    })
    console.log("Document written with ID: ", docRef.id);
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

// export async function getAllTech() {
//   const querySnapshot = await getDocs(collection(db, collection_name))

//   const documents = []
//   querySnapshot.forEach(doc => {
//     const docInfo = doc.data()
//     docInfo['id'] = doc.id // add an attribute, 'id' into docInfo
//     documents.push(docInfo)
//   })
//   return documents
// }

// export async function getAllTechIds() {
//   const querySnapshot = await getDocs(collection(db, collection_name))

//   const documentIds = []
//   querySnapshot.forEach(doc => {
//     documentIds.push(doc.id)
//   })
//   return documentIds
// }

// export async function getTech(id) {
//   const docRef = doc(db, collection_name, id)
//   const docSnap = await getDoc(docRef)

//   if (!docSnap.exists()) {
//     return
//   }

//   const docInfo = docSnap.data()
//   docInfo['id'] = id
//   return docInfo
// }

// name (string) must be unique. data (object) can be a subset of full data
// export async function updateTech(id, data) {
//   const docRef = doc(db, collection_name, id)
//   // data['timestamp'] = serverTimestamp()
//   await updateDoc(docRef, data)
// }

// export async function deleteTech(id) {
//   console.log('deleting item...')
//   await deleteDoc(doc(db, collection_name, id));
// }