// delete student 


let deleteButtons = document.querySelectorAll('.delete');

deleteButtons.forEach(button =>{
    button.addEventListener('click',e =>{
        
        if (confirm("Are you sure!")) {
            let id = e.target.dataset.id;
            console.log(id);
            
            let xhr = new XMLHttpRequest();
            let url = "/delete"+ id;
            xhr.open("DELETE",url,true);
            xhr.onload = function () {
            window.location.href ="/dashboard/"+id;

        }
        xhr.send();
 }
        
    });
});