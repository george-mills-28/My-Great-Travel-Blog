import EntryList from './EntryList'
import AddEntry from './AddEntry'


function App() {
  return (
    <div className="app">
      <header role="banner">
        <h1>Where to Next...</h1>
      </header>
      
      <main role="main">
        <section aria-label="travel entries">
          <EntryList />
        </section>
        
        <section aria-label="add entry form">
          <AddEntry />
        </section>
      </main>
      
      <footer role="contentinfo">
        <p>&copy; {new Date().getFullYear()} Travel Journal</p>
      </footer>
    </div>
  )
}

export default App