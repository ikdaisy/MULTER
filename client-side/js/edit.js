
const url=window.location.href;
const urlParams= new URLSearchParams(url.split('?')[1])
const id = urlParams.get("id")
let data
async function displayUser(){
    const res = await fetch(`http://localhost:3000/api/getuser/${id}`)
     data= await res.json()
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
          <input type="file" id="profile" name="pic" onchange="changePic()" >
        </div>
        <div class="pro">
                <img src="http://localhost:3000/api/image/${data.profile.filename}" alt="" id="pro">
        </div>
        <button type="submit">UPDATE</button>`
}

displayUser()


// UPDATE 

document.getElementById("frm").addEventListener("submit",(e)=>{
  e.preventDefault()
  // console.log(e.target);
  const frmdata = new FormData(e.target)
  // console.log(frmdata);

 
  fetch(`http://localhost:3000/api/updateuser/${id}`,{
      method:"PUT",
      body:frmdata
  }).then(async(res)=>{
      console.log(res);
      const data = await res.json()
      console.log(data);
      
      if(res.status==200){
          alert(data.msg)
         window.location.href="../index.html"

      }
      else{
          alert(data.error)
      }
      
  }).catch((error)=>{
      console.log(error);
      
  })
  
})

function changePic() {
  const fileInput = document.getElementById("profile");
  const profileImage = document.getElementById("pro");

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
      // console.log(e.target.result);
      profileImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}
