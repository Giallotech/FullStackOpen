const Persons = ({ searchResults, handleDelete }) => {
  return <div>
    {searchResults.map(item =>
      <div key={item.name}> {item.name} {item.number} <button onClick={() => handleDelete(item.id, item.name)}>delete</button>
      </div>
    )}
  </div>
}

export default Persons