document.getElementById("frm").addEventListener("submit",(e)=>{
    e.preventDefault()
    const username=document.getElementById("username").value;
    const email=document.getElementById("email").value;
    console.log(e.target);
    const data = new FormData(e.target)
    console.log(data);
    // userData=JSON.stringify({username,email})
    fetch("http://localhost:3000/api/upload",{
        method:"POST",
        body:data
    }).then(async(res)=>{
        console.log(res);
        const data = await res.json()
        console.log(data);
        
        if(res.status==201){
            alert(data.msg)
           window.location.href="../index.html"

        }
        else{
            alert(data.msg)


        }
        
    }).catch((error)=>{
        console.log(error);
        
    })
    
})
