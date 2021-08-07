const SearchComponent = () => {
  return (
    <div className="people-search">
      <span>People's List</span> 
      <div className="search-wrapper">
      {/* NEED TO PUT THE LUPA */}
        <input type="text" placeholder="Filter by name" />
      </div>
    </div>
  )
}

export default SearchComponent