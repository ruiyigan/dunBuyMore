import { collection, addDoc, getDocs, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './config'

const collection_name = 'users'

export async function addUser(id, email, username, householdSize) {
  try {
    const docRef = await addDoc(collection(db, collection_name), {
      id,
      email,
      username,
      householdSize
    })
  } catch (e) {
    console.error('Error in addTech', e)
  }
}

export async function getAllUsers() {
  const querySnapshot = await getDocs(collection(db, collection_name))

  const documents = []
  querySnapshot.forEach(doc => {
    const docInfo = doc.data()
    documents.push(docInfo)
  })
  return documents
}