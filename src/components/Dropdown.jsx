import React from 'react'
import { HiOutlineStar, HiStar } from "react-icons/hi2";

const Dropdown = ( {currencies, currency, favorites, setCurrencies, handlefavorites, title} ) => {

    const isFavorite = curr => favorites.includes(curr)
  return (
    <div>
        <label htmlFor="{title}" className="block text-sm font-medium text-gray-500 my-2">{title}</label>
        <div className="relative w-full">
            <select
                value={currency}
                onChange={(e) => setCurrencies(e.target.value)}
                className="w-full p-2 pr-10 border border-gray-700 rounded-md shadow-sm"
            >
                {favorites.map( (currency) => {
                    <option value={currency} key={currency} className='bg-indigo-400'>
                        {currency}
                    </option>
                })}
                <hr/>
                {currencies
                .filter(c => !favorites.includes(c))
                .map((currency) => (
                    <option value={currency} key={currency}>
                        {currency}
                    </option>
                ))}
            </select>

            <button onClick={() => handlefavorites(currency)}
             className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600">
                {isFavorite(currency)? <HiStar /> :  <HiOutlineStar />}
                
               
            </button>
            </div>

    </div>
  )
}

export default Dropdown
