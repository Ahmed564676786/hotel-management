import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import Cabins from './pages/cabins'
import { getCabins } from './services/apiCabins';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';



const queryClient = new QueryClient(
  {
      defaultOptions:{
          queries:{
              staleTime:60*1000,
          }
      }
  }
);


function App() {
  const [count, setCount] = useState(0)



  useEffect(function(){


    getCabins().then( data => console.log(data));

  },[]);

  return (
    



      <QueryClientProvider client={queryClient}>


               <Cabins/>
        <ReactQueryDevtools initialIsOpen={false}/>

   

      </QueryClientProvider>
  )
}

export default App
