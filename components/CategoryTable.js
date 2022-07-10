import { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { consumeFood, deleteFood, disposeFood } from '../firebase-services/food';

const CategoryTable = ({ category, categoryData, setShowTable }) => {
  
  const Item = ({ itemData }) => {
    const [deleted, setDeleted] = useState(false)
    const handleDelete = (id) => {
      deleteFood(id)
    }

    const handleConsume = (id) => {
      const newItemData = {
        "food_name": itemData.food_name,
        "category": itemData.category,
        "weight": itemData.weight,
        "expiry_date": itemData.expiry_date,
        "status": "consumed",
        "user_id": itemData.user_id
      }
      consumeFood(id, newItemData)
    }

    const handleDispose = (id) => {
      const newItemData = {
        "food_name": itemData.food_name,
        "category": itemData.category,
        "weight": itemData.weight,
        "expiry_date": itemData.expiry_date,
        "status": "disposed",
        "user_id": itemData.user_id
      }
      disposeFood(id, newItemData)
    }

    if (deleted) {
      return null
    }
    return (
      <Tr>
        <Td>{itemData.food_name}</Td>
        <Td>
          <button className="pr-1 text-teal-600 dark:text-teal-500 hover:underline" onClick={() => {handleDelete(itemData.id); setDeleted(true)}}>Delete</button>
          <button className=" text-teal-600 dark:text-teal-500 hover:underline" onClick={() => {handleConsume(itemData.id);}}>Consumed</button>
          <button className=" text-teal-600 dark:text-teal-500 hover:underline" onClick={() => {handleDispose(itemData.id);}}>Disposed</button>
        </Td>
      </Tr>
    )
  }

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg my-2'>
      <Table>
        <Thead>
          <Tr>
            <Th>Food Item</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categoryData.map(itemData => <Item itemData={itemData} key={itemData.id}/>)}
        </Tbody>
      </Table>
      <div className="flex justify-end">
        <button className="border-2 border-black rounded px-1" onClick={() => setShowTable(false)}>
          Close
        </button>
      </div>
    </div>
  )
}

export default CategoryTable