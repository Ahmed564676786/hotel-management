import { useEffect, useState } from 'react';
import { getCabins, deleteCabin} from '../services/apiCabins';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function Cabins() {



   const {data:cabins = [],isLoading} = useQuery({

        queryKey:['cabin'],
        queryFn:() => getCabins(),

   });


  const queryClient =  useQueryClient();

   const {isLoading:isDeleting,mutate} =  useMutation({

        mutationFn:deleteCabin,
        onSuccess:()=>{
      
          toast.success("Successfully Deleted")
          
          queryClient.invalidateQueries(

            {

                queryKey:['cabin']
            }
          );

        }
        ,
       
   
       
        onError: (err) =>  toast.error(err.message) 


   });



  return (


     <div>

        <ul className='text-white bg-gray-700 px-2 ' >

          <li className="flex justify-between gap-5 py-4">
            
            <span>Name</span>
            <span>Max Capacity</span>
            <span>Min Capacity</span>
            <span>Price</span>
            <span>Discount</span>
            <span>Action</span>
            
            </li>
       
            
          {

              cabins.map((cabin)=>( 
                <>

           <li className="flex justify-between gap-5 py-4" key={cabin.id}>

            <span>{cabin.name}</span>
            <span>{cabin.maxCapacity}</span>
            <span>{cabin.minCapacity}</span>
            <span>{cabin.price}</span>
            <span>{cabin.discount}</span>
            <button onClick= {()=>mutate(Number(cabin.id))} >Delete</button>
          </li>
       
                </>
              ))

          }
            
        </ul>
     </div>
  );
}

export default Cabins;
