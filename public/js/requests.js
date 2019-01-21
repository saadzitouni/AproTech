
// delete courses

let deleteButtons = document.querySelectorAll('.delete');

deleteButtons.forEach(button =>{
    button.addEventListener('click',e =>{
        
        if (confirm("Are you sure!")) {
            let id = e.target.dataset.id;
            let xhr = new XMLHttpRequest();
            let url = "/delete-"+ id;
            xhr.open("DELETE",url,true);
            xhr.onload = function () {
            window.location.href ="/dashboard";

        }
        xhr.send();
 }
        
    });
});
// edite courses

let modal3 = document.getElementById('myModal3');

let cours_edite = document.querySelectorAll('.cours_edite');

let span3 = document.getElementsByClassName("close")[2];

let coursid = document.getElementById('id');

let name = document.getElementById('name');

let code = document.getElementById('code');

let teacher = document.getElementById('teacher');

let url = document.getElementById('url');

let duree = document.getElementById('duree');

let describtion =  document.getElementById('comment');

cours_edite.forEach(button =>{
    button.addEventListener('click', (e) => {
        
        modal3.style.display = "block";
        coursid.value = e.target.dataset.id;
        name.value =  e.target.dataset.name;
        code.value = e.target.dataset.code;
        teacher.value =  e.target.dataset.teacher;
        url.value = e.target.dataset.url;
        duree.value = e.target.dataset.duree;
        describtion.value =  e.target.dataset.describtion;
      });
     
    span3.onclick = function() {
        modal3.style.display = "none";
        
    }
    
    
});
