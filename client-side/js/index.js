
async function displayUser(){
    const res = await fetch("http://localhost:3000/api/getusers")
    console.log(res);
    const data= await res.json()
    console.log(data);
    str=``
    data.map((user)=>{
        // console.log(user.profile.filename);
        
        str+=`<div class="card" >
            <div class="images" >
                <img src="http://localhost:3000/api/image/${user.profile.filename}" alt="Profile" >
                <span>${user.email}</span>
                <h3>${user.username}</h3>
                <button type="button" class="btn btn-success">EDIT</button>
                <button type="button" class="btn btn-danger">DELETE</button>
            </div>
        </div>`
    })
    document.getElementById("cards").innerHTML=str;
    
    
}
displayUser()