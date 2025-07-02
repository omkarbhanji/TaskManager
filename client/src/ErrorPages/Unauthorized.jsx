import React from 'react'

const Unauthorized = () => {
  return (
   <div
  style={{
    marginTop: '100px',
    textAlign: 'center',
    color: '#d9534f', // Bootstrap danger red
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8d7da',
    padding: '40px',
    borderRadius: '10px',
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  }}
>
  <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>Unauthorized</h1>
  <p style={{ fontSize: '18px' }}>
    You do not have permission to access this page.
  </p>
</div>

  )
}

export default Unauthorized
