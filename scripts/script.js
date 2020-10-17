const addCourseBtn = document.getElementById("add-course-btn");
const inputTable = document.getElementById("input-table");

addCourseBtn.addEventListener("click",function (){
    const tr = document.createElement("tr");
    tr.setAttribute("class","input-row");
    const td1 = document.createElement("td");
    const input = document.createElement('input');
    input.setAttribute("class","form-control course-input user-data");
    input.setAttribute("type","text");
    input.setAttribute("placeholder","Course Code");
    td1.appendChild(input);
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.appendChild(getDropDown("day","Select Day(s)",["ST","MW","RA","S","M","T","W","R","A"]));
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    td3.appendChild(getDropDown("start","Select Start Time",startArray));
    tr.appendChild(td3);

    const td4 = document.createElement("td");
    td4.appendChild(getDropDown("end","Select End Time",endArray));
    tr.appendChild(td4);
    inputTable.appendChild(tr);
    dropDownEventListener();
});


function getDropDown(value,description,list){
        const div1 = document.createElement("div");
        div1.setAttribute("class","dropdown");

        const btn = document.createElement("button");
        btn.setAttribute("class","btn btn-secondary dropdown-toggle user-data");
        btn.setAttribute("type","text");
        btn.setAttribute("id","dropdownMenuButton");
        btn.setAttribute("data-toggle","dropdown");
        btn.setAttribute("aria-haspopup","true");
        btn.setAttribute("aria-expanded","false");
        btn.innerText = description;
        div1.appendChild(btn);

        const div2 = document.createElement("div");
        div2.setAttribute("class","dropdown-menu");
        div2.setAttribute("aria-labelledby","dropdownMenuButton");

        for(let i = 0; i < list.length; i++){
            const options = document.createElement("a");
            const className = "dropdown-item "+ value;
            options.setAttribute("class",className);
            options.setAttribute("href","#");
            options.innerText = list[i];
            div2.appendChild(options);
        }

        div1.appendChild(div2);
        
        return div1;
}

function dropDownEventListener(){
    const dropDownItems = document.getElementsByClassName("dropdown-item");

    for(let i = 0; i < dropDownItems.length; i++){
        dropDownItems[i].addEventListener("click",function(){
            const parent = dropDownItems[i].parentElement.parentElement;
            const btn = parent.querySelector("button");
            btn.innerText = dropDownItems[i].innerText;
        })
    }
}

dropDownEventListener();

const generateBtn = document.getElementById("generate-btn");

const startArray = ["8:00AM","9:40AM","11:20AM","1:00PM","2:40PM","4:20PM"];
const endArray = ["9:30AM","11:10AM","12:50PM","2:30PM","4:10PM"];

const routineContainer = document.getElementsByClassName("routine-container")[0];
const landing = document.getElementsByClassName("landing")[0];

function userDataUpdater(){
    return document.querySelectorAll(".user-data");
}

generateBtn.addEventListener("click", function(){
    routineContainer.style.display = "block"
    landing.style.display = "none";

    const userData = userDataUpdater();
    for (let i = 0; i < userData.length; i+=4){
        const courseCode = userData[i].value;
        const days = userData[i+1].innerText;
        const startTime = userData[i+2].innerText;
        const endTime = userData[i+3].innerText;
        for(let j = 0; j < endArray.length; j++){
            if(startTime == startArray[j]){

                let box;

                for(let k = 0; k < days.length; k++){
                    let keyWord = days[k]+startTime[0];
                    if(startArray[j+1].startsWith("1")){
                        keyWord += "1";
                    }
                    box = document.getElementById(keyWord);
                    box.innerText = courseCode;
                }

                if(endTime != endArray[j]){
                    const removeTime = startArray[j+1];
                    for(let k = 0; k < days.length; k++){
                        const removeKeyWord = days[k]+removeTime[0];
                        let node = document.getElementById(removeKeyWord);
                        if (node.parentNode) {
                        node.parentNode.removeChild(node);
                        }
                        box.setAttribute("colspan","2");
                    }
                }
            }
        }
    }
})

const goBackBtn = document.getElementById("go-back-btn");

goBackBtn.addEventListener("click",function(){
    landing.style.display = "block";
    routineContainer.style.display = "none";
})