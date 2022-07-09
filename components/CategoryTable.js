import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const CategoryTable = ({ category, categoryData, setShowTable }) => {
  console.log(categoryData)

  const Item = ({ itemData }) => {
    return (
      <Tr>
        <Td>{itemData.food_name}</Td>
        <Td>Delete</Td>
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
          {categoryData.map(itemData => <Item itemData={itemData} />)}
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