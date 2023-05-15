let g_file = {}; 
let g_fileList = [];

const clickSubmit = function(){
    alert("등록되었습니다.")
   
}
const button = document.getElementById("submit");
button.addEventListener("click", clickSubmit);

let fileSelected = file => {

    file = file[0];
    let width =0 , height =0;
    let permitExts = ["png","jpg","jpeg","gif"];
    let ext = getExtension(file.name);

    if(permitExts.includes(ext.toLowerCase()) == false) {
        alert("지원 하지않는 파일 확장자입니다.");
        return;
    }

    let iChars = "~`!#$%^&*+=-[]()\\\';,/{}|\":<>?·";
    for (let i = 0; i < file.name.length; i++) {
        if (iChars.indexOf(file.name.charAt(i)) != -1) {
            alert ("파일명에 특수문자는 입력하실 수 없습니다.");
            return false;
        }
    }

    let size = 1 * 1024 * 1024; // 1mb
    if(file.size > size) {
        alert("2MB이하의 파일만 등록할 수 있습니다.");
        return;
    }
    g_file = file;
    
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function(e){
        let img = new Image();
        img.src = e.target.result;
        img.onload = function(){
            width = this.width;
            height =this.height; 
            add(width, height, img.src);
            let imgPreView = document.getElementById("imgPreView");     
            imgPreView.setAttribute("src" , img.src);
        }
    }
    document.getElementById("fileName").innerHTML = file.name;
}

let add = (width, height, src) =>{

    document.querySelector(".preview").style.display = 'none';
    document.querySelector(".imgView").style.display = 'block';

    let file = document.getElementById("file");
    let length =  document.getElementById("list").rows.length + 1;
    let html= document.getElementById("list").innerHTML;

    html += "<tr id='row_"+length+"'>";
    html += "<td class='tdNum'>" + length + "</td>";
    html += "<td class='tdFileName'>" + g_file.name + "</td>";
    html += "<td>" + getExtension(g_file.name) + "</td>";
    html += "<td>" + getByteSize(g_file.size) + "</td>";
    html += "<td>"+ width + " X " + height +"</td>";
    html += "<td class='tdFileRoot'>"+ file.value +"</td>";
    html += "<td><button class='btnView' id='view_"+length+"' onclick='imgView(\"" + src + "\")'>미리보기</button></td>";
    html += "<td><button class='btnDelete' id='delete_"+length+"' onclick='remove("+length+")'></button></td>";
    html += "</tr>"

    document.getElementById("list").innerHTML = html;

    g_file = null;
    //document.getElementById("fileName").innerHTML = "파일첨부";
}

let remove = key => {
    let length =  document.getElementById("list").rows.length;

    document.getElementById("row_" + key).remove();
    if(document.querySelector("#row_" + (key+1)) != null){
        for(let i = key ; i < length ; i++){
            document.querySelector("#row_" + (i+1) + " .tdNum").innerText = i;
            document.querySelector("#row_" + (i+1) + " .btnView").setAttribute("id", "view_" + i);
            document.querySelector("#row_" + (i+1) + " .btnDelete").setAttribute("id", "delete_" + i);
            document.querySelector("#row_" + (i+1) + " .btnDelete").setAttribute("onclick", "remove("+i+")");
            document.querySelector("#row_" + (i+1)).setAttribute("id", "row_" + i);
        }
    }
    g_file = null;
    //document.getElementById("fileName").innerHTML = "파일첨부";

}
let getExtension = filename =>{

   let ext =  filename.split('.').pop().toLowerCase();
	return ext;
}

let imgView = src => {
    document.querySelector(".preview").style.display = 'none';
    document.querySelector(".imgView").style.display = 'block';

    let imgPreView = document.getElementById("imgPreView");     
    imgPreView.setAttribute("src" , src);
}

let getByteSize = size => {
    let byteUnits = ["KB", "MB", "GB", "TB"];
    for(let i =0; i < byteUnits.length; i++){
        size = Math.floor(size / 1024);

        if(size < 1024) return size.toFixed(1) + byteUnits[i];
    }
};