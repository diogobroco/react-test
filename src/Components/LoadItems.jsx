const LoadItems = ({moreUsers}) => {
  return (
    <div className="load-div">
      <button onClick={moreUsers} className="load-btn">Load More</button>
    </div>
  )
}

export default LoadItems