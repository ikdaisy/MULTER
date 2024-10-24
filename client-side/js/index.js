
async function displayUser(){
    const res = await fetch("http://localhost:3000/api/getusers")
    // console.log(res);
    const data= await res.json()
    // console.log(data);
    str=``
    data.map((user)=>{
        // console.log(user.profile.filename);
        
        str+=`<div class="card" >
            <div class="images" >
                <img src="http://localhost:3000/api/image/${user.profile.filename}" alt="Profile" >
                <span>${user.email}</span>
                <h3>${user.username}</h3>
               <a href="./pages/edit.html?id=${user._id}"> <button type="button" class="btn btn-success" >EDIT</button></a>
                <button type="button" class="btn btn-danger" onclick="deleteUser('${user._id}')">DELETE</button>
            </div>
        </div>`
    })
    document.getElementById("cards").innerHTML=str;
    
    
}
displayUser()

async function deleteUser(id){
    try {
       if(confirm("Are you sure you want to delete?")){
        await fetch(`http://localhost:3000/api/deleteuser/${id}`,{
            method:"DELETE"
        }).then(async(res)=>{
            console.log(res);
            const data = await res.json()
            if(res.status==200){
                alert(data.msg)
                displayUser()
            }
            else{
                alert(data.error)
            }
    
            
         })
       }

        
    } catch (error) {
        console.log(error);
        
        
    }


}
