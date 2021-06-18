// accesing the elements 

let listContainer= document.querySelector(".task-list");
let newListForm = document.querySelector(".list-input-form")
let newListInput= document.querySelector(".list-input")
let buttonDelet = document.querySelector(".btn-delete")
let listDisplayContainer = document.querySelector("[data-list-display-container]")
let listTitle = document.querySelector("[data-list-heading]")
let listCounter = document.querySelector("[data-list-counter]")

let  taskLIst =document.querySelector("[data-tasks]")
let taskForm = document.querySelector("[data-task-form]")
let taskInput = document.querySelector("[data-task-input]")
// template
let taskTemplate = document.querySelector("#task-tamplats")

// clear tasks btn
let clearTaskBtn = document.querySelector("[data-clear-compleeted-task-button]")




// adding delet 
buttonDelet.addEventListener("click", e=>{

  lists = lists.filter(list => list.id !== clickedId)
  clickedId = "";
  setLocalRender()

})


// clear compleeted task btn
clearTaskBtn.addEventListener("click", e=>{
  selectedlist = lists.find(list => list.id === clickedId)
  selectedlist.tasks = selectedlist.tasks.filter(task => !task.compleet)
  setLocalRender()
})



let clickedId = localStorage.
getItem("List_clicked_id")


// arry for store data

let lists =JSON.parse(localStorage.getItem("List_Storage_Key")) || []


// add click event to list
listContainer.addEventListener("click", e=>{
 

 if(e.target.classList[0] === "task-name"){
   clickedId = e.target.getAttribute("data-list-id")
  setLocalRender()
 }
})

// input value in form and render it
newListForm.addEventListener("submit",e =>{
  e.preventDefault()
 let inputValue = newListInput.value;
 if(inputValue == null || inputValue === '')return
  
    let objList=creatObj(inputValue)
    lists.push(objList)

    // clear the input feald

    newListInput.value = null;
    
    setLocalRender()

})
taskForm.addEventListener("submit", e =>{
  e.preventDefault()
  let inputvalue = taskInput.value;
  if(inputvalue == null || inputvalue === '')return
  let listTask = creatListObj(inputvalue)
  taskInput.value = "";
  let selectedList = lists.find(list => list.id === clickedId)
  selectedList.tasks.push(listTask);
  setLocalRender()

})
function creatListObj(inputvalue){
  return{id: Date.now().toString(),name:inputvalue, compleet:false}
} 
function setLocalRender(){
      setLocal()
    render()
   
}

function setLocal(){
  localStorage.setItem("List_Storage_Key", JSON.stringify(lists))
  localStorage.setItem("List_clicked_id",clickedId)
}


// inset inputvalue to an object model
function creatObj(value){
  return{id: Date.now().toString(), name:value, tasks:[]}
}

// function for render the list form array
function render(){

  clearElement(listContainer)
  renderTask()

  if(clickedId === "" || clickedId === null)
  {
    listDisplayContainer.style.display = "none";
    
  }else{
    listDisplayContainer.style.display = "";

    clearElement(taskLIst)

    let selectedList = lists.find(list => list.id === clickedId)
    renderTaskCount(selectedList)
    taskRender(selectedList)
}

}

function taskRender(selected){
  selected.tasks.forEach(task =>{
    let taskElement= document.importNode(taskTemplate.content, true)
    let checkbox = taskElement.querySelector('input')
    checkbox.id = task.id
    checkbox.checked =  task.compleet
    let label = taskElement.querySelector("label")
    label.htmlFor = task.id
    label.append(task.name)
   taskLIst.appendChild(taskElement)

  })


} 
// checkbox checked or uncheck 
taskLIst.addEventListener("click", e =>{
 if(e.target.type === "checkbox"){
  let selectedList = lists.find(list => list.id === clickedId)
 
  let selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
  selectedTask.compleet = e.target.checked
  setLocal()
  renderTaskCount(selectedList)

 }
})

function renderTaskCount(selectedlist){

  listTitle.innerText = selectedlist.name
 const remTaskCount = selectedlist.tasks.filter(task => !task.compleet).length;
 const taskString =remTaskCount === 1 ? "task" : "tasks"
 listCounter.innerText = `${remTaskCount} ${taskString} remaining`;
}

function renderTask(){
  lists.forEach(list =>{
    let listElement = document.createElement("li")
    listElement.dataset.listId=list.id
    listElement.classList.add("task-name")
    
    listElement.innerText = list.name
    listContainer.appendChild(listElement)
 
   //  add active class
    
      if(clickedId === list.id){
       listElement.classList.add("active")
      }

  })
 
}


// clear the previous elemnts and clean 
function clearElement(element){
  while(element.firstChild){
    element.removeChild(element.firstChild)
    
  }

}


// call render function all tyme for keep rendering the screeen and show the value
//  if not--- the value will desepear after refresh becouse normal render works only on sumbit in the form and  only  then it agin  render  all saved and entered values
render()