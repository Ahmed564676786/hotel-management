import { useEffect, useState } from 'react';
import { getCabins, deleteCabin,insertCabin} from '../services/apiCabins';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Form, useForm } from 'react-hook-form';

function Cabins() {


   const {register,handleSubmit}  = useForm();


   const {isLoading:creatingCabin,mutate:mutate2} = useMutation({


          mutationFn:insertCabin,
          onSuccess:() => {

              toast.success('Cabin Inserted');
          },

          onError: (err) => toast.error(err.message)

   });



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

            <div className=" bg-gray-700 p-6 text-white">
            <div className="grid grid-cols-[150px_1fr] gap-y-4 items-center border border-black">
              


              <form onSubmit={handleSubmit(mutate2)} className="space-y-2">

      <label>Name</label>
      <input
        name="name"
        {...register("name")}
        type="text"
        placeholder="Name"
        className="w-1/2 rounded border px-2 py-1 text-black"
      />

      <label>Max Capacity</label>
      <input
        name="maxCapacity"
        {...register("maxCapacity")}
        type="number"
        placeholder="Max Capacity"
        className="w-1/2 rounded border px-2 py-1 text-black"
      />

      <label>Min Capacity</label>
      <input
        name="minCapacity"
        {...register("minCapacity")}
        type="number"
        placeholder="Min Capacity"
        className="w-1/2 rounded border px-2 py-1 text-black"
      />

      <label>Price</label>
      <input
        name="price"
        {...register("price")}
        type="number"
        placeholder="Price"
        className="w-1/2 rounded border px-2 py-1 text-black"
      />

      <label>Discount</label>
      <input
        name="discount"
        {...register("discount")}
        type="number"
        placeholder="Discount"
        className="w-1/2 rounded border px-2 py-1 text-black"
      />

   

      <button type="submit" className="mt-2 rounded bg-blue-500 px-4 py-1 text-white">
        Submit
      </button>
    </form>
            </div>
          </div>

              </div>
  );
}

export default Cabins;
