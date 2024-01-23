import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [amount, setAmount] = useState(100);

  const createOrder = async () => {
    try {
      const response = await axios.post('http://localhost:3001/razorpay/create-order', { amount });
      const order = response.data;
      const options = {
        // razorpay account key
        key: 'rzp_live_cnuR4Ya8EYRJqw',  
        amount: order.amount,
        handler: function (response) {
          console.log('Payment success:', response);
        },
        prefill: {
          name: 'Your Name',
          email: 'your.email@example.com',
          contact: '1234567890',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);
      console.log("rzp1");
      rzp1.open();

    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="App">
      <h1>Razorpay Example</h1>
      <label>
        Amount (INR):
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <button onClick={createOrder}>Pay Now</button>
    </div>
  );
}

export default App;