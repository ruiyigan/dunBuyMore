import { useRouter } from 'next/router'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { addFood } from '../../firebase-services/food';
import BackButton from '../../components/BackButton';
import LogoutButton from '../../components/LogoutButton';

export default function AddFoodForm() {
  const router = useRouter()

  const onSubmit = (event) => {
    event.preventDefault()
    const newFood = {
      food_name: event.target.food_name.value,
      category: event.target.category.value,
      weight: event.target.weight.value,
      expiry_date: event.target.expiry_date.value
    }
    addFood(newFood)
    // router.push('/')
  };

  return (
    <div className="flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 dark:bg-gray-600 h-screen">
      <BackButton/>
      <LogoutButton/>
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">Add Food to Fridge</h1>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type='text'
                name='food_name'
                placeholder='Name of Food'
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
            <div>
              <select
                type='text'
                name='category'
                placeholder='Category of Food'
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                required
              >
                <option value="PERISHABLE_DRINK">Perishable Drink</option>
                <option value="FISH">Fish</option>
                <option value="MEAT">Meat</option>
                <option value="FRUIT">Fruit</option>
                <option value="VEGETABLE">Vegetable</option>
                <option value="UNCATEGORISED">Uncategorised</option>
              </select>
            </div>
            <div>
              <input
                type='text'
                name='weight'
                placeholder='Weight of Food (Kilograms)'
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                required
              />
            <div>
              <input
                type='text'
                name='expiry_date'
                placeholder='Expiry Date of Food'
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
            </div>
          </div>
          <div>
            <button
              type='submit'
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <PlusCircleIcon className="h-5 w-5 text-teal-400 group-hover:text-teal-300" aria-hidden="true" />
              </span>
              Add Food to Fridge
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}