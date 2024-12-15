import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import EntryList from './EntryList'
import EditEntry from './EditEntry'
import AddEntry from './AddEntry'




const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <h1>My Travel Journal</h1>
        <EntryList />
        <EditEntry />
        <AddEntry />
       
  
  
      </div>
    </QueryClientProvider>
  )
}

export default App