"use client"


function Delete({id}) {
    const handleDelete = async () => {
        const confirmed = confirm("Are you sure to delete?");

        if (confirmed){
            const res = await fetch(`/api/posts?id=${id}`,{
                method:"DELETE"
            })

            if (res.ok){
                window.location.reload();
            }
        }
    }
  return (
    <a onClick={handleDelete}  className=" bg-red-500 text-white rounded-md text-lg py-2 px-3 cursor-pointer">
        Delete
    </a>
  )
}
export default Delete