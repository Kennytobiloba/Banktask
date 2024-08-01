import React, { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from 'firebase/auth';

const Products = () => {
  const [transactionname, setTransactionname] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [val, setVal] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      const userCollection = collection(db, `users/${user.uid}/transactions`);
      try {
        console.log('Fetching data...');
        const dbVal = await getDocs(userCollection);
        const data = dbVal.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        console.log('Data fetched:', data);
        setVal(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(fetchData);
    return () => unsubscribe();
  }, [auth]);

  const handleClick = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    const userCollection = collection(db, `users/${user.uid}/transactions`);
    try {
      console.log('Attempting to add document:', { Name: transactionname, Amount: transactionAmount });
      await addDoc(userCollection, { Name: transactionname, Amount: transactionAmount });
      console.log('Document successfully written!');
      toast.success("Transaction submitted successfully!");
      setTransactionname('');
      setTransactionAmount('');
      // Fetch data again to include the new transaction
      const dbVal = await getDocs(userCollection);
      const data = dbVal.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setVal(data);
    } catch (error) {
      console.error('Error adding document:', error);
      toast.error("Transaction submission failed!");
    }
  };

  const handleDelete = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    const userCollection = collection(db, `users/${user.uid}/transactions`);
    try {
      console.log('Attempting to delete document with ID:', id);
      await deleteDoc(doc(userCollection, id));
      console.log('Document successfully deleted!');
      toast.success("Transaction deleted successfully!");
      setVal(val.filter(transaction => transaction.id !== id));
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error("Transaction deletion failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Add a Transaction</h1>
        <form onSubmit={handleClick}>
          <div className="mb-4">
            <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">Transaction Name</label>
            <input
              type="text"
              id="transactionName"
              name="transactionname"
              placeholder="Enter transaction name"
              value={transactionname}
              onChange={(e) => setTransactionname(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="transactionAmount" className="block text-sm font-medium text-gray-700">Transaction Amount</label>
            <input
              type="text"
              id="transactionAmount"
              name="transactionAmount"
              placeholder="Enter transaction amount"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit
          </button>
        </form>
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Transactions</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-1">
              {val.map((transaction) => (
                <div key={transaction.id} className="p-4 bg-white rounded-lg shadow-md relative">
                  <h3 className="text-lg font-semibold">{transaction.Name}</h3>
                  <p className="text-gray-600">{transaction.Amount}</p>
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Products;
