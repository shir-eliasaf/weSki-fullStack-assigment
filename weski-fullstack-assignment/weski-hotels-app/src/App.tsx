import React from 'react'
import NavBar from './components/navbar/nav-bar'
import ResultsList from './components/results/results'

const App: React.FC =() => {
  return (
    <div className='app'>
      <NavBar />
      <ResultsList hotels={[]}/>
    </div>
  )
}

export default App
