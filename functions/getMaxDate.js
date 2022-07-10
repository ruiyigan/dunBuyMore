export default function getMaxDate() {

  const converteDate = (input) => {
    const pad = (s) => {
      return (s < 10) ? '0' + s : s;
    }
    const d = new Date(input)
    return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('/')
  }

  const today = new Date();
  const expiry_date = today.setDate(today.getDate() + 5);
  const readable = new Date(expiry_date)
  return converteDate(readable);
}