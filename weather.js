const temp = document.querySelector(".temp");
const loca = document.querySelector(".desc p");
const timefield = document.querySelector(".desc span");
const emoji = document.querySelector("img");
const cond = document.querySelector(".icon span");
const searchfield = document.querySelector("#target");
const form = document.querySelector("form");

let target = "delhi";

const fetchData = async(target)=>{
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=869da10a127a4e7daa2114641222007&q=${target}`;
    const response = await fetch(url);
    const data = await response.json();

    const {
        current:{temp_c,condition:{text,icon}},
        location:{name,localtime},
    } = data;
    searchfield.value="";
    updateDom(temp_c,name,text,icon,localtime);
    } catch (error) {
        alert("Location entered in not correct");
    }
}
fetchData(target);

function updateDom(temp_c,name,text,icon,time)
{
    temp.innerText=`${temp_c}°`;
    loca.innerText=name;
    emoji.src=icon;
    cond.innerText=text;
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay =  new Date(exactDate).getDay();
    timefield.innerText = `${exactTime} - ${fullday(exactDay)} ${exactDate}`;
}

function fullday(n) {
    switch (n) {
        case 0:
        return "Sunday"
        case 1:
        return "Monday"
        case 2:
        return "Tuesday"
        case 3:
        return "Wednesday"
        case 4:
        return "Thursday"
        case 5:
        return "Friday"
        case 6:
        return "Saturday"
        default:
        return "Don't Know"
    }
}

function search(e){
    e.preventDefault();
    target = searchfield.value;
    fetchData(target);
}
form.addEventListener("submit",search);