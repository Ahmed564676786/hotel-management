import { useEffect, useState } from 'react';
import { getCabins } from '../services/apiCabins';
import { useQuery } from '@tanstack/react-query';

function Cabins() {
//   const [cabins, setCabins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchCabins() {
//       try {
//         console.log('Fetching cabins...');
//         const data = await getCabins();
//         console.log('Cabins fetched:', data); // see it in console
//         setCabins(data);
//       } catch (err) {
//         console.error('Error fetching cabins:', err);
//         setError('Failed to load cabins');
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCabins();
//   }, []);

//   if (loading) return <div>Loading cabins...</div>;
//   if (error) return <div>{error}</div>;
//   if (cabins.length === 0) return <div>No cabins found</div>;


   const object = useQuery({

        queryKey:['cabin'],
        queryFn:getCabins
   });


   console.log(object);

  return (
    // <div>
    //   <h2>Cabins List</h2>
    //   <ul>
    //     {cabins.map((cabin) => (
    //       <li key={cabin.id}>
    //         {cabin.name} - {cabin.capacity} people
    //       </li>
    //     ))}
    //   </ul>
    // </div>


     <div>

        <ul className='flex  gap-5 text-red-200 bg-gray-800 ' >
            
            <li>Cabin Name</li>
            <li>Max Capacity</li>
            <li>Min Capacity</li>
            <li>Price</li>
            <li>discount</li>
            <li><button>Delete</button></li>
            
        </ul>
     </div>
  );
}

export default Cabins;
