const Notification = ({notification}) => {
    if (notification == null) {
        return null
    }

    return (
        <div className="error" style={{color: notification.type === 'alert' ? 'red' : 'green'}}>
            {notification.type}{notification.message}   
        </div>
    )
}

export default Notification