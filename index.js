window.onload=function(){
    //localStorage.setItem("notFirst",'Yes');    
   var notFirst =  localStorage.getItem("notFirst");
   console.log(notFirst);
   console.log(completeJson);
   if(!notFirst){
    const DemoData = [];
    fillPersonList(DemoData);
    localStorage.setItem("completeJson",JSON.stringify(DemoData));
    let completeJson = JSON.parse(localStorage.getItem("completeJson"));
    completeJson1 = completeJson.filter(p => p.id == 100);
    localStorage.setItem("completeJson",JSON.stringify(completeJson1));
    completeJson = JSON.parse(localStorage.getItem("completeJson"));
    console.log(completeJson);
    localStorage.setItem("notFirst",'Yes');    
    refresh();
   }
this.fillPersonList(completeJson);
}

let completeJson = JSON.parse(localStorage.getItem("completeJson"));


function LoadData(person){
    const TotalAmount = getTotalAmount(person.transactions);
    console.log(TotalAmount);
    const Class = TotalAmount < 0 ? 'bg-danger' : 'bg-success';
    const list = document.getElementById('list');
    const item = document.createElement('li');
    item.className = "card bg-sucess col-6";
    item.onclick = function(){personClick(person)};
    var txt = '<h4 class="card-title text-center">';
    txt = txt +''+ person.name;
    txt = txt + '</h4> <img src="';
    txt = txt + ''+ person.image;
    txt = txt + '" alt="O" style="height: 30vh;" class="card-img">';
    txt = txt + '<h5 class="card-details mt-2 '
    txt = txt + '' + Class;
    txt = txt + '">Balance : <span class="text-center">'
    txt = txt + '' + TotalAmount;
    txt = txt + '</span></h5>    </div>';
    item.innerHTML = txt;
    list.appendChild(item);
}

function getTotalAmount(transactions){
    var TotalAmount = 0;
    var i;
    for(i = 0; i< transactions.length; i++){
        TotalAmount = TotalAmount + transactions[i].amount;
    }
    return TotalAmount;
}

function personClick(person){
    let personJson = JSON.stringify(person);
    localStorage.setItem("personJson",personJson);
    window.location.replace("details.html");
}

function previewFile(){  
    var preview = document.querySelector('#preview');  
    var file    = document.querySelector('input[type=file]').files[0];  
    var reader  = new FileReader();  

    reader.onloadend = function () {  
        preview.src = reader.result;
        console.log(preview.src);
        resizeimg();
    }  
    console.log(file);
    if (file) {  
        reader.readAsDataURL(file);  
    } else {  
        preview.src = "";  
    }  
}

function resizeimg(){
    console.log("resize");
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    var image = new Image();
    image.src = document.querySelector('#preview').src;
    //document.getElementById("original").appendChild(image);

    image.onload = function(e) {
        canvas.width = 100;
        const sf = canvas.width/image.width;
        canvas.height = image.height*sf;
        ctx.drawImage(image, 
            0, 0, image.width, image.height, 
            0, 0, canvas.width, canvas.height
        );
    // create a new base64 encoding
    document.getElementById("preview").src = canvas.toDataURL();
    console.log(canvas.toDataURL());
    };
}

function updateStorage(){
    localStorage.setItem("completeJson",JSON.stringify(completeJson));
}

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function clearForm(){
    document.getElementById('name').value = "";
    document.getElementById('mobileno').value = "";
    document.getElementById('preview').src = "";
    document.getElementById('img').value = "";
}

class Person{
    constructor(id,name,mobileno,image){
        this.id = id;
        this.name = name;
        this.mobileno = mobileno;
        this.image = image;
        this.transactions = [];
    }
}

function addPerson(){
    const id = generateID();
    const name = document.getElementById('name').value;
    const mobileno = document.getElementById('mobileno').value;
    const image = document.getElementById('preview').src;
    clearForm();
    const myModal = document.getElementById('myModal');
    var t = new Person(id,name,mobileno,image);
    console.log(completeJson);
    console.log(t);
    completeJson.push(t);
    console.log(completeJson);
    document.getElementById('list').innerHTML = "";
    fillPersonList(completeJson);
    document.getElementById('btnClose').click();
    updateStorage();
    refresh();
}

function refresh(){
    location.reload();
    localStorage.setItem("notFirst",'Yes');
}

function fillPersonList(DemoData){
    DemoData.forEach(LoadData);   
}
