let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');
let mood ='create' ;
let afa ;


//get total
function getTotal(){
    if(price.value !=''){
        let result =(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='#040';
    }
    else {
        total.innerHTML='';
        total.style.background='red';
    }
}


//create producat
let datapro;
if(localStorage.product !=null){
    datapro =JSON.parse(localStorage.product)
}else{
    datapro=[];
}


submit.onclick = function(){

    let newpro = {
title:title.value.toLowerCase(),
price:price.value,
taxes:taxes.value,
ads:price.value,
discount:discount.value,
total:total.innerHTML,
count:count.value,
category:category.value.toLowerCase(),

    }
//count
if(mood === 'create'){
    if(newpro.count > 1){
        for(let i =0 ;i<newpro.count ;i++){

        datapro.push(newpro) ;    
        }
    }else{
        datapro.push(newpro) ; 
    }
    
   
   }else {
        datapro[afa]=newpro;
        mood = 'create';
        submit.innerHTML='create';
        count.style.display ='block';
    }
     //save localstorge
    localStorage.setItem('product',   JSON.stringify(datapro))
   
     cleardata()
    showdata()
}


//claer inputs
function cleardata()
{
    title.value= '';
    price.value= '';
    taxes.value= '';
    ads.value= '';
    discount.value= '';
   total.innerHTML= '';
    count.value= '';
    category.value= '';
}



//read 

function showdata() {
    getTotal()
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick ="update(${i})" id="update">Update</button></td>
            <td><button onclick="deletedata(${i})"id="delete">Delete</button></td>
        </tr>`;
    }
    document.getElementById('table').innerHTML = table;



    let btndelete =document.getElementById('deleteall');
    if(datapro.length>0){

btndelete.innerHTML= `
        
            <button onclick="deleteall()">Delete all(${datapro.length})</button>
        `
    
}else{
    btndelete.innerHTML = '';
}

} showdata()





//delete



function deletedata(i){

    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    showdata()
}

function deleteall(){
localStorage.clear()
datapro.splice(0)
showdata()

}
//update

function update(i){

    title.value= datapro[i].title ;
   price.value= datapro[i].price ;
    taxes.value= datapro[i].taxes ;
   ads.value= datapro[i].ads ;
    discount.value= datapro[i].discount ;
    category.value= datapro[i].category ;
    getTotal()
    count.style.display ='none';
    submit.innerHTML = 'update';
mood ='update';
afa =i;
scroll(
    {
        top:0,
        behavior:'smooth'
    }
)
}



//search

let searchmood ='title';

function getsearch(){

    let search = document.getElementById('search');
    if(id == 'searchtitle'){
        searchmood= 'title';
        search.placeholder='search by title';

    }else {
        searchmood= 'category' ;
        search.placeholder='search by category';
    }
    search.focus();
}

function searchdata(value){
    let table ;
if(searchmood == 'title'){

    for(let i =0;i<datapro.length;i++){
if(datapro[i].title.includes(value.toLowercase())){
    table += `
    <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick ="update(${i})" id="update">Update</button></td>
        <td><button onclick="deletedata(${i})"id="delete">Delete</button></td>
    </tr>`;
}
    }
}else{
    for(let i =0;i<datapro.length;i++){
        if(datapro[i].title.includes(value.toLowercase())){
            table += `
            <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick ="update(${i})" id="update">Update</button></td>
                <td><button onclick="deletedata(${i})"id="delete">Delete</button></td>
            </tr>`;

}
document.getElementById('table').innerHTML = table;
}
//clean date