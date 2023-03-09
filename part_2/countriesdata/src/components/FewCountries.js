const FewCountries = ({ countries, handleClick }) => {
  return <div>
    {countries.map(item =>
      <div key={item.name.common}> {item.name.common} <button onClick={() => handleClick(item.name.common)}>show</button></div>
    )}
  </div>
}

export default FewCountries