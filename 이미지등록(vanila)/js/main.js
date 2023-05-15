var g_file = {};
var g_fileList = [];

$(document).ready(function(){
    $(".btnSubmit").click(function(){
        alert("등록되었습니다.")
    })
})

function fileSelected(file) {
    var width, height;
    var permitExts = ["png","jpg","jpeg","gif"];
 
    $(file).each(function(){
        var ext = getExtension(this.name);

        if(permitExts.includes(ext.toLowerCase()) == false) {
            alert("지원 하지않는 파일 확장자입니다.");
            return;
        }

        var iChars = "~`!#$%^&*+=-[]()\\\';,/{}|\":<>?·";
        for (var i = 0; i < this.name.length; i++) {
            if (iChars.indexOf(this.name.charAt(i)) != -1) {
                alert ("파일명에 특수문자는 입력하실 수 없습니다.");
                return false;
            }
        }

        var size = 1 * 1024 * 1024; // 1mb
        if(this.size > size) {
            alert("2MB이하의 파일만 등록할 수 있습니다.");
            return;
        }
        g_file = this;
       
        var fileReader = new FileReader();
	    fileReader.readAsDataURL(this);
	    fileReader.onload = function(e){
		    var img = new Image();
            img.src = e.target.result;
            img.onload = function(){
                width = this.width;
                height =this.height; 
                add(width, height, img.src);
                $(".imgView").attr("src" , img.src);
            }
        }
        $("#fileName").html(this.name);
    });
    
}

function add(width, height, src){
    console.log(getByteSize(g_file.size));
    $(".preview").hide();
    $(".imgView").show();

    var length = $("#list tr").length + 1;
    var html="";

    html += "<tr id='row_"+length+"'>";
    html += "<td class='tdNum'>" + length + "</td>";
    html += "<td class='tdFileName'>" + g_file.name + "</td>";
    html += "<td>" + getExtension(g_file.name) + "</td>";
    html += "<td>" + getByteSize(g_file.size) + "</td>";
    html += "<td>"+ width + " X " + height +"</td>";
    html += "<td class='tdFileRoot'>"+ $("#file").val() +"</td>";
    html += "<td><button class='btnView' id='view_"+length+"' onclick='imgView(\"" + src + "\")'>미리보기</button></td>";
    html += "<td><button class='btnDelete' id='delete_"+length+"' onclick='remove("+length+")'></button></td>";
    html += "</tr>"

    $("#list").append(html);
    //초기화
    g_file = null;
    $("#fileName").html('파일첨부');
}

function remove(key){
    var length = $("#list tr").length;
    $("#row_" + key).remove();
    for(var i = key ; i < length+1 ; i++){
        $("#row_" + (i+1) + " .tdNum").html(i);
        $("#row_" + (i+1) + " .btnView").attr("id", "view_" + i);
        $("#row_" + (i+1) + " .btnDelete").attr("id", "delete_" + i);
        $("#row_" + (i+1) + " .btnDelete").attr("onclick", "remove("+i+")");
        $("#row_" + (i+1)).attr("id", "row_" + i);
    }
            
    //초기화
    g_file = null;
    $("#fileName").html('파일첨부');

}
function getExtension(filename) {

   /// var ext =  str.split('.').pop().toLowerCase();

	var parts = filename == null || filename == "" ? "" : filename.split(".");
//	var parts = filename.split(".");
	return parts[parts.length - 1];
}
function imgView(src){
    $(".preview").hide();
    $(".imgView").show();
    $(".imgView").attr("src" , src);
}
function getByteSize(size){
    var byteUnits = ["KB", "MB", "GB", "TB"];
    for(var i =0; i < byteUnits.length; i++){
        size = Math.floor(size / 1024);

        if(size < 1024) return size.toFixed(1) + byteUnits[i];
    }
};