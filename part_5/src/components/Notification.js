const Notification = ({ info }) => {
  if (!info.message) {
    return
  }

  const style = {
    color: info.type === 'error' ? 'red' : 'darkGreen',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div className="infoType" style={style}>
      {info.message}
    </div>
  )
}

export default Notification