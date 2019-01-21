
var modal = document.getElementById('myModal');
var popup_btn = document.querySelectorAll('.popup_btn');
var nav = document.getElementsByTagName("nav");
var id = document.getElementById('cours_id');
var span = document.getElementsByClassName("close")[0];

popup_btn.forEach(button =>{
    button.addEventListener('click', (e) => {
        modal.style.display = "block";
        if(window.location.pathname !=  "/dashboard"){
            id.value = e.toElement.id;
        }
      });
    span.onclick = function() {
        modal.style.display = "none";    
    }    
});
/////

var popup_students = document.querySelectorAll('.tr');

popup_students.forEach(button =>{
    button.addEventListener('click', e => {
        if(e.toElement.className != "fas fa-trash-alt delete" && e.toElement.className!="fas fa-edit edite cours_edite"){
            window.location.href = window.location.href + "/"+ e.toElement.parentNode.id;
            
         }

       
    });
});
////
var modal2 = document.getElementById('myModal2');
var cours_popup = document.querySelectorAll('.cours_popup');
var span2 = document.getElementsByClassName("close")[1];
cours_popup.forEach(button =>{
    button.addEventListener('click', (e) => {
        
        
        modal2.style.display = "block";
        
      });
     
    span2.onclick = function() {
        modal2.style.display = "none";
        
    }
   
    
});
let logout = document.querySelector('.logout');

logout.addEventListener('click',e =>{
    
    if(confirm("are you sure")){
        window.location.href  ='/logout'
    }
} )


