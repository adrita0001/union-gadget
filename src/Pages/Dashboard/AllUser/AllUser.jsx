import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { FaTrashAlt, FaUserShield, } from "react-icons/fa";
import { FcVoicePresentation ,FcDeleteDatabase} from "react-icons/fc";
import Swal from "sweetalert2";
const AllUser = () => {


    const[axiosSecure]=useAxiosSecure()

    const { data: users = [], refetch } = useQuery(["users"], async () => {
        const res = await axiosSecure.get("/users");
        return res.data;
      });

console.log(users);


//=========================================================
// Handle Make Admin Start Function
//==================================================================


const handleMakeAdmin = (user) => {
    fetch(`https://fanal-project-server-muntasirmamuon.vercel.app/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          toast.success(`${user.name} is an Admin Successfully`);
        }
      });
  };
 

//=========================================================
// Handle Make Admin End Function
//==================================================================
//=========================================================
// Handle Make seller Start Function
//==================================================================


const handleMakeSeller = (user) => {
    fetch(`https://fanal-project-server-muntasirmamuon.vercel.app/users/seller/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        toast.success(`${user.name} is an seller Successfully`);
        if (data.modifiedCount) {
         
        }
      });
  };
 

//=========================================================
// Handle Make seller End Function
//==================================================================






const handleDelete=(id)=>{


   
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
}).then((result)=>{
  if (result.isConfirmed){

    fetch(`https://fanal-project-server-muntasirmamuon.vercel.app/addProduct/${id}`,{
      method:'DELETE'
     })
     .then(res=>res.json())
     .then(data=>{
      if (data.deletedCount > 0) {
        refetch()
        Swal.fire(
            'Deleted!',
            'Your User has been deleted.',
            'success'
        )
    }
     })
  }
})
 




}









console.log(users);



  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Picture</th>
              <th>Name & Email</th>
              <th>Admin Role Change</th>
              <th>Seller Role Change</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn  text-white bg-[#fa538d] btn-ghost "
                    >
                      {" "}
                      <FaUserShield />
                    </button>
                  )}
                </td>
                <td>
                   {
                    user.role === 'seller' ?('seller') :(<button
                        onClick={() => handleMakeSeller(user)}
                        className="btn  text-white bg-[#4db5ff] btn-ghost "
                      >
                        {" "}
                        < FcVoicePresentation/>
                      </button>)
                   }
             

                </td>
                <td>
                   <button onClick={()=>handleDelete(user._id)} className="btn  text-white bg-[#4db5ff] btn-ghost"> < FcDeleteDatabase/></button>

                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
