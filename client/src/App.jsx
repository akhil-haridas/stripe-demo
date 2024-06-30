import axios from 'axios';

function App() {

  const handleBuyNow = async (e) => {
    e.preventDefault();

    const response = await axios.post('http://localhost:3000/payment')
    if (response && response.status === 200) {
      console.log(response.data);
    }
  }
  return (
    <>
      <button type="button" onClick={handleBuyNow}>
        Buy Now
      </button>
    </>
  )
}

export default App
