import SearchIcon from '@material-ui/icons/Search';

const SearchComponent = () => {
  return (
    <div className="people-search">
      <span>People's List</span> 
      <div className="search-wrapper">
        <SearchIcon className="search-icon"/>
        <input type="text" placeholder="Filter by name" />
      </div>
    </div>
  )
}

export default SearchComponent