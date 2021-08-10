import SearchIcon from '@material-ui/icons/Search';

const SearchComponent = ({createUser}) => {

  return (
    <div className="people-search">
      <span>People's List</span> 
      <button onClick={createUser} className="add-person-btn">Create Person</button>
      <div className="search-wrapper">
        <SearchIcon className="search-icon"/>
        <input type="text" placeholder="Filter by name" />
      </div>
    </div>
  )
}

export default SearchComponent