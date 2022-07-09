import { useRouter } from "next/router"

const BackButton = () => {
  const router = useRouter()
  return (
      <div className="flex justify-center">
          <button
              className="dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 absolute text-sm top-8 left-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded-full shadow-sm"
              onClick={() => router.back()}
          >
              Back
          </button>
      </div>
  )
}

export default BackButton