import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import Cabins from './pages/cabins'
import { getCabins } from './services/apiCabins';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
      refetchInterval: 10 * 1000,
    },
  },
});



function App() {



  return (
    



      <QueryClientProvider client={queryClient}>


               <Cabins/>
        <ReactQueryDevtools initialIsOpen={false}/>

   
      

        <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          // Default options for all toasts
          success: {
            style: {
              background: "green",
              color: "white",
              padding: "12px",
              borderRadius: "6px",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
      </QueryClientProvider> 

    
  )
}

export default App
