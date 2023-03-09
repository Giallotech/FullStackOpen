const Filter = ({ newSearch, handleSearch }) =>
  <div>
    find countries{" "}
    <input
      type="text"
      placeholder="Search"
      value={newSearch}
      onChange={handleSearch}
    ></input>
  </div>

export default Filter