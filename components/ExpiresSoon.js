import { useState } from "react"
import CategoryTable from "./CategoryTable"

const ExpiresSoon = ({ category, totalQuantity, categoryData}) => {
  const [showTable, setShowTable] = useState(false)
  if (showTable) {
    return (
      <CategoryTable categoryData={categoryData} category={category} setShowTable={setShowTable} />
    )
  }
  return (
    <div onClick={() => setShowTable(true)}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg border-black border-2 my-2">
        {/* <div>
          <img className="rounded-t-xl h-32 w-full object-cover" src={image} />
        </div> */}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            Expires Soon
          </div>
          <p className="text-gray-700 text-base">
            Total Items: {totalQuantity}
          </p>
          <div className="flex justify-end">
            <button className="border-2 border-black rounded px-1" onClick={() => setShowTable(true)}>
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpiresSoon