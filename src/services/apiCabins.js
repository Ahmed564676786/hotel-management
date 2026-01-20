import supabase from './supabase.js'


export async function getCabins() {
    
    // Read all rows
  let { data: cabins, error } = await supabase
  .from('cabins')
  .select('*')

  if(error){

    throw new Error("Could not loaded");
  }

   return cabins

}


export async function deleteCabin(id){

    // Delete matching rows
  const { data ,error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id);

  if(error){
      throw new Error("Could not delete");
  }

  return data;

}