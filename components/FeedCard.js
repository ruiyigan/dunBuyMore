const FeedCard = ({ category, totalQuantity, categoryData }) => {
  return (
    <div className="">
      <div className="max-w-sm rounded overflow-hidden shadow-lg border-black border-2 my-2">
        {/* <div>
          <img className="rounded-t-xl h-32 w-full object-cover" src={image} />
        </div> */}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {category}
          </div>
          <p className="text-gray-700 text-base">
            Total Items: {totalQuantity}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FeedCard