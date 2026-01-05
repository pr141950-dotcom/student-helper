// Dark Mode
function toggleDarkMode(){
document.body.classList.toggle("dark");
}

// Pomodoro
let time=25*60;
let interval;
let cycle=0;
const timerText=document.getElementById("timerText");
const progress=document.getElementById("progressCircle");

function updateTimer(){
let m=Math.floor(time/60).toString().padStart(2,'0');
let s=(time%60).toString().padStart(2,'0');
timerText.textContent=`${m}:${s}`;
progress.style.strokeDashoffset=565-(time/(25*60))*565;
}

function startTimer(){
clearInterval(interval);
interval=setInterval(()=>{
if(time>0){time--;updateTimer();}
},1000);
}

function pauseTimer(){clearInterval(interval);}
function resetTimer(){time=25*60;updateTimer();}

// To-Do
const taskInput=document.getElementById("taskInput");
const addTaskBtn=document.getElementById("addTaskBtn");
const taskList=document.getElementById("taskList");

addTaskBtn.onclick=()=>{
if(taskInput.value){
const li=document.createElement("li");
li.textContent=taskInput.value;
li.onclick=()=>li.classList.toggle("done");
taskList.appendChild(li);
taskInput.value="";
}
};

// Gallery
const photoInput=document.getElementById("photoInput");
const uploadBtn=document.getElementById("uploadBtn");
const gallery=document.getElementById("photoGallery");
const modal=document.getElementById("photoModal");
const modalImg=document.getElementById("modalImage");
const deleteBtn=document.getElementById("deletePhotoBtn");

let photos=JSON.parse(localStorage.getItem("photos"))||[];
let selectedIndex=null;

function renderGallery(){
gallery.innerHTML="";
photos.forEach((src,i)=>{
const img=document.createElement("img");
img.src=src;
img.onclick=()=>{
modal.style.display="flex";
modalImg.src=src;
selectedIndex=i;
};
gallery.appendChild(img);
});
}

uploadBtn.onclick=()=>{
const file=photoInput.files[0];
if(file){
const reader=new FileReader();
reader.onload=e=>{
photos.push(e.target.result);
localStorage.setItem("photos",JSON.stringify(photos));
renderGallery();
};
reader.readAsDataURL(file);
}
};

deleteBtn.onclick=()=>{
photos.splice(selectedIndex,1);
localStorage.setItem("photos",JSON.stringify(photos));
modal.style.display="none";
renderGallery();
};

modal.onclick=e=>{
if(e.target===modal) modal.style.display="none";
};

renderGallery();
updateTimer();
