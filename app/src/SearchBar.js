import React, {useState} from "react";

const SearchBar = () => {
  const [cityOrZip, setCityOrZip] = useState('');

  return (
    <div className = "Search">
      <form>
        <label> Search by city of zip </label>
        <input
          type = "text"
          required
          value = {cityOrZip}
          onChange={(e) => setCityOrZip(e.target.value)}
        />
      </form>
    </div>
  )
}

export default SearchBar;