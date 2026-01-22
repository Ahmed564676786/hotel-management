import { useEffect, useState } from 'react';
import { getCabins, deleteCabin,insertCabin} from '../services/apiCabins';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {useForm } from 'react-hook-form';

function Cabins() {



   const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm();

   const queryClient =  useQueryClient();

   const {isLoading:creatingCabin,mutate:mutate2} = useMutation({


          mutationFn:insertCabin,
          onSuccess:() => {

              toast.success('Cabin Inserted');

              queryClient.invalidateQueries({}
                
              );
          },

          onError: (err) => toast.error(err.message)

   });



   const {data:cabins = [],isLoading} = useQuery({

        queryKey:['cabin'],
        queryFn:() => getCabins(),

   });


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


     <div className='flex flex-col  lg:flex-col'>


      <div >

         <div className=" bg-gray-700   p-6 text-white">
            <div className="  gap-y-4  bg-blue-900 border border-black py-4 px-4">
              


              <form onSubmit={handleSubmit(mutate2)} className="space-y-2">
              
                  
                  <div className="flex  mb-2 gap-2">
                    <label className="w-24 text-right">Name:</label>
  
                    <div className='flex flex-col w-full'>
                                        <input
                      name="name"
                      {...register("name",{

                         required:"This field is required"
                      })}
                      type="text"
                      placeholder="Name"
                      className="flex-1 rounded border px-2 py-1 text-black"
                    />

                       {errors.name && <span>{errors.name.message}</span>}
                    </div>
                   
                  </div>


                    <div className="flex items-center mb-2 gap-2">
                      <label className=" text-right">Max Capacity</label>
                      <div className='flex flex-col '>
                        <input
                          name="maxCapacity"
                          {...register("maxCapacity",{
                              required:"this is required",

                              min:
                              {
                                value:1, 
                                message:"Capacity should be atleast 1"
                              }
                              ,
                              max:{

                                value:4, 
                                message:"At most 4"
                              }
                          })}
                          type="number"
                          placeholder="Max Capacity"
                          className=" flex-1 text-black rounded border px-2 py-1 "
                        />

                          {errors.maxCapacity && <span>{errors.maxCapacity.message}</span>}
                      </div>
                    </div>

                   <div className="flex items-center mb-2 gap-2">
  <label className="w-24 text-right">Min Capacity:</label>
  <input
    name="minCapacity"
    {...register("minCapacity")}
    type="number"
    placeholder="Min Capacity"
    className="flex-1 rounded border px-2 py-1 text-black"
  />
</div>

<div className="flex items-center mb-2 gap-2">
  <label className="w-24 text-right">Price:</label>
  <input
    name="price"
    {...register("price")}
    type="number"
    placeholder="Price"
    className="flex-1 rounded border px-2 py-1 text-black"
  />
</div>

<div className="flex items-center mb-2 gap-2">
  <label className="w-24 text-right">Discount:</label>
  <div>
    <input  defaultValue={0}
      id='discount'
      name="discount"
      {...register("discount",{
          required:"this is required",
          validate:(value) => ( value <getValues  || "Discount should less than 5")
      })}
      type="number"
      placeholder="Discount"
      className="flex-1 rounded border px-2 py-1 text-black"
    />
     {errors.discount && <span>{errors.discount.message}</span>}
  </div>
</div>

    <div className='flex gap-2 '>

         <button type='reset' className=' rounded-lg bg-blue-500 px-4 py-1 text-white'>Reset</button>
         <button type="submit" className=" rounded-lg bg-blue-500 px-4 py-1 text-white">Submit</button>
    </div>

    </form>
            </div>
          </div>
      </div>
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

           

              </div>
  );
}

export default Cabins;
