import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown';
import { HiArrowRight, HiArrowsRightLeft } from 'react-icons/hi2';
// https://api.frankfurter.dev/v1/currencies
// https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR&amount=10

const CurrencyConvertor = () => {
    const [currencies, setcurrencies] = useState([]);
    const [amount, setamount] = useState(1);
    const [fromCurrencies, setfromCurrencies] = useState("USD");
    const [toCurrencies, settoCurrencies] = useState("INR");
    const [ConvertedAmount, setConvertedAmount] = useState(null);
    const [Converting, setConverting] = useState(false);
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || ["INR", "EUR"]
      );

    const fetchCurrencies = async () => {
        try{
            const res = await fetch("https://api.frankfurter.dev/v1/currencies");
            const data = await res.json();

            setcurrencies(Object.keys(data));
        } catch(error){
            console.log("Error in Fetching an api")
        }
    };

    useEffect(() => {
        fetchCurrencies();
    }, [])

    //console.log(currencies);

    const currencyConvert = async () => {
        if (!amount) return;
        setConverting(true);
        try{
            const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${fromCurrencies}&symbols=${toCurrencies}&amount=${amount}`);
            const data = await res.json();
            setConvertedAmount(data.rates[toCurrencies] + " " + toCurrencies);

        }catch(error){
            console.log("Error to fetch a data");
            
        }finally{
            setConverting(false)
        }
    }

    const handlefavorites = (currency) => {
        let updatedFavorites = [...favorites];
        if (favorites.includes(currency)){
            updatedFavorites = updatedFavorites.filter(fav=>fav!==currency);
        }else{
            updatedFavorites.push(currency);
        }
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
    
    const SwapCurrenies = () => {
        setfromCurrencies(toCurrencies)
        settoCurrencies(fromCurrencies)
    }

  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
        <h2 className='mb-5 text-2xl font-semibold text-gray-700'>
        Currency Convertor
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
            <Dropdown
             currencies={currencies} 
             title="From:" 
             handlefavorites={handlefavorites}
             currency={fromCurrencies}
            setCurrencies={setfromCurrencies}
            favorites={favorites}
             />
            <div className='flex justify-center mb-1'>
                <button 
                    onClick={SwapCurrenies}
                    className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
                    <HiArrowsRightLeft className='text-xl text-gray-700' />
                </button>
            </div>
            <Dropdown
             currencies={currencies} 
             title="To:" 
             handlefavorites={handlefavorites} 
             currency={toCurrencies} 
             setCurrencies={settoCurrencies}
             favorites={favorites}
            />
        </div>
        <div className='mt-4'>
            <label htmlFor='amount' className='block text-sm font-medium text-gray-700'>Amount</label>
            <input type='number'
                value={amount}
                onChange={(e) => setamount(e.target)}
             className='p-2 w-full border border-gray-400 rounde-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 mt-4' />
        </div>
        <div className='flex justify-end mt-6'>
            <button 
            onClick={currencyConvert}
            className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500  ${Converting? " animate-ping ": ""} `}>
                Convert
            </button>
        </div>
        { ConvertedAmount && (
            <div className='mt-4 text-lg font-medium text-right text-green-600'>
                Converted Amount : { ConvertedAmount }
            </div> 
        ) }
        
    </div>
  )
}

export default CurrencyConvertor
