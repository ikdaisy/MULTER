
const url=window.location.href;
console.log(url);

const urlParams= new URLSearchParams(url.split('?')[1])
console.log(urlParams);
const id = urlParams.get("id")
console.log(id);



async function displayUser(){
    const res = await fetch(`http://localhost:3000/api/getuser/${id}`)
    console.log(res);
    const data= await res.json()
    console.log(data);
   
   
        // console.log(user.profile.filename);
        
        document.getElementById("frm").innerHTML=`
         <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" value="${data.username}" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" value="${data.email}" required>
        </div>
        <div class="form-group">
          <label for="profilePhoto">Profile Photo:</label>
          <input type="file"  name="pic" >
        </div>
        <button type="submit">Submit</button>`
   
    
    
    
}
displayUser()
