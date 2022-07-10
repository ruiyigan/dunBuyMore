export default function getExpiryFromCategory(category) {
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
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }

  const today = new Date();
  const expiry_date = today.setDate(today.getDate() + expiryDates[category]);
  const readable = new Date(expiry_date)
  return converteDate(readable);
}