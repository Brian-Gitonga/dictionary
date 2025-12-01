function AppSimple() {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      minHeight: '100vh', 
      padding: '2rem',
      color: 'black'
    }}>
      <h1 style={{ fontSize: '2rem', color: 'blue', marginBottom: '1rem' }}>
        Dictionary App - Test
      </h1>
      <p style={{ color: 'black' }}>
        If you can see this, React is working!
      </p>
      <input 
        type="text" 
        placeholder="Test input"
        style={{
          padding: '0.5rem',
          border: '1px solid black',
          marginTop: '1rem',
          display: 'block'
        }}
      />
    </div>
  )
}

export default AppSimple

