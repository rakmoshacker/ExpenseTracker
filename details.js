window.onload=function(){
    initialize();
}

let personJson = JSON.parse(localStorage.getItem("personJson"));
let completeJson = JSON.parse(localStorage.getItem("completeJson"));

function indexPage()
{
    window.location.replace("index.html");
}

function initialize(){
    fillHeader();

    const total = document.getElementById('total');
    total.innerText = getTotalAmount(personJson.transactions);
    fillTransactionList(personJson.transactions);
}

function getTotalAmount(transactions){
    var TotalAmount = 0;
    var i;
    for(i = 0; i< transactions.length; i++){
        TotalAmount = TotalAmount + transactions[i].amount;
    }
    return TotalAmount;
}

function fillHeader(){
    var TotalAmt = getTotalAmount(personJson.transactions);
    console.log(TotalAmt);
    const Class = TotalAmt < 0 ? 'bg-danger' : 'bg-success';
    const heading = document.getElementById('headingContainer');
    const item = document.createElement('div');
    var txt = '<span class="col-2 pull-right mr-3 mt-3" onclick="removePerson('
    txt = txt + '' + personJson.id;
    txt = txt + ');"><i style="font-size:10vh" class="fa fa-trash"></i></span><h3 class="jumbotron text-center ';
    txt = txt + '' + Class;
    txt = txt + '" id="heading" style="padding: 0vh;" onclick="indexPage();">';
    txt = txt + '<&nbsp<img src="';
    txt = txt + '' + personJson.image;
    txt = txt + '" alt="" class="img img-responsive" style="height:15vh; border-radius: 50%;padding :2vh">';
    txt = txt + '' + personJson.name;
    txt = txt + '</h3><h1 class="text-center">Total Amount : <span id="total"></span></h1>';
    item.innerHTML = txt;
    heading.appendChild(item);
}

function fillTransactionList(transactions){
    var i;
    for(i = 0; i<transactions.length; i++){
        const Class = transactions[i].amount < 0 ? 'bg-danger' : 'bg-success';
        const list = document.getElementById('list');
        const item = document.createElement('li');
        item.className = "list-group-item";
        var txt = '<div onclick="rowClick(this);" class="row ';
        txt = txt+ '' + Class;
        txt = txt+'"><div class="col-1 bg-dark text-danger hidden" onclick="removeTransaction(';
        txt = txt + '' + transactions[i].id;
        txt = txt + ');"><h3>X</h3></div><h2 class="col-8 text-inline">';
        txt = txt +''+ transactions[i].title;
        txt = txt + '<h2 class="col-3 text-right">';
        txt = txt + ''+ transactions[i].amount;
        txt = txt + '</h2> </h2></div>';
        console.log(txt);
        item.innerHTML = txt;
        list.appendChild(item);
    }
}

class transaction{
    constructor(id,date,title,amount){
        this.id = id;
        this.date = date;
        this.title = title;
        this.amount = amount;
    }
}

function clearForm(){
    document.getElementById('description').value = "";
    document.getElementById('date').value = "";
    document.getElementById('amount').value = "";
}

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function addTransaction(){
    const id = generateID();
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const amount = parseInt(document.getElementById('amount').value);
    clearForm();
    const myModal = document.getElementById('myModal');
    var t = new transaction(id,date,description,amount);
    personJson.transactions.push(t);
    document.getElementById('list').innerHTML = "";
    fillTransactionList(personJson.transactions);
    document.getElementById('btnClose').click();
    const total = document.getElementById('total');
    total.innerText = getTotalAmount(personJson.transactions);
    updateStorage();
    refresh();
}

function updateStorage(){
    localStorage.setItem("personJson",JSON.stringify(personJson));
}

function refresh(){
    location.reload();
}

function removeTransaction(id){
    var Confirmation = confirm("Are you want to delete this Entry");
    if(Confirmation){
        personJson.transactions = personJson.transactions.filter(transaction => transaction.id !== id);
        console.log(personJson);
        updateStorage();
        refresh();
    }
}

function rowClick(div){
    first = div.firstChild;
    first.classList.toggle("hidden");
    console.log(first);
}

function removePerson(id){
    var Confirmation = confirm("Are you want to delete this Person");
    if(Confirmation){
        completeJson = completeJson.filter(p => p.id !== id);
        localStorage.setItem("completeJson",JSON.stringify(completeJson));
        indexPage();   
    }
}