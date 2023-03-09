const Filter = ({ newSearch, handleSearch }) =>
  <div>
    filter shown with{" "}
    <input
      type="text"
      placeholder="Search"
      value={newSearch}
      onChange={handleSearch}
    ></input>
  </div>

export default Filter