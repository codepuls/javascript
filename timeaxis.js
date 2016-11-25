



///<reference path="jquery-1.10.2.intellisense.js" /> 
///<reference path="jquery-1.10.2.js" /> 
///<reference path="jquery-1.10.2.min.js" />

//use this js please create a html  like this
///////////////////////////////////////////////////////////////////////////////////////////////////
//  
//<link rel="stylesheet" type="text/css" href="/timeaxis.css" />
//<script src="/timeaxis.js"></script>
//<title>Timeaxis</title>
//<body id="body" onload="Running()">                                                              /
//<div class="timeaxis" id="tadiv" onmousemove="PauseTimer(11)" onmouseout="ContinueTimer(11)">    /
//</div>                                                                                           /
//</body>                                                                                          /
////////////////////////////////////////////////////////////////////////////////////////////////////

//timer for divnods
timer = new Array();
//timer for datediv
timercb=new Array();
//div handle arryay 
handdiv = new Array();
//img handle
pichandle = 0;
//data from 1900
date = 1900;
//create a node for load data
function CreateNode(id)
{
        var timepoint = document.createElement("div");
        timepoint.setAttribute("id",id);
        timepoint.setAttribute("class", "timepoint");
        
        return document.getElementById("tadiv").appendChild(timepoint);
    
}

//runing method is  main method plz makesure your html like the template html element's id   
function Running() {
    for (var i = 0; i < 3; i++) {
        CreateTimeAxis("tadiv",i*500-500, ("canbox" + i));
        timercb[i] = setInterval(MoveRightA, 100, (document.getElementById("canbox" + i)), "canbox" + i);
    }
    for (var i = 0; i < 11; i++) {
        handdiv[i] = CreateNode(("nod" + i));
        handdiv[i].style.left = i * 100;
        timer[i] = setInterval(MoveRight, 100, handdiv[i], ("nod" + i));
        handdiv[i].onclick = function () { if (CreateScaleDiv(this)) { nodLoadPic("ToonPlane.png", "picdiv"); }}
        handdiv[i].onmouseout = function () { if (pichandle != null) { document.getElementById("body").removeChild(pichandle) }}
    }

    
    

}

//move the data to right speed is 10px/1ms
function MoveRight(object,id)
{
    object.style.left = window.parseInt(object.style.left) + 10;
    
    if (parseInt(document.getElementById(id).style.left)>1000) {

        
        nodLoadData(date, id);  
            
          
        document.getElementById(id).style.right = 0;
        document.getElementById(id).style.left = -100;
        date++;
        if (date > 2016)
        {
            date=1900
        }
        
    }
    
}

//loding picture
function nodLoadPic(src, divid) {

    var img = document.createElement("img");
    img.setAttribute("src", src);
   
    document.getElementById(divid).appendChild(img);

}

//inner html to div nods
function nodLoadData(data,divid)
{
    document.getElementById(divid).innerHTML=data;
}
//pause timeaxis
function PauseTimer(num) {
    for (var i = 0; i < num; i++) {
        clearInterval(timer[i]);
    }
    for (var i = 0; i < 3; i++)
        {
        clearTimeout(timercb[i]);
    }
}
//continue timeaxis
function ContinueTimer(num)
{
   
    for (var i = 0; i < num; i++) {
        timer[i] = setInterval(MoveRight, 100, handdiv[i], ("nod" + i));
    }
    for (var i = 0; i < 3; i++) {
        timercb[i] = setInterval(MoveRightA, 100, (document.getElementById("canbox" + i)), "canbox" + i);
    }
}
//scale for picture or data
function CreateScaleDiv(parentDiv)
{
     
    if (!document.getElementById("picdiv")) {
        pichandle = document.createElement("div");

        pichandle.setAttribute("class", "picscale");
        pichandle.setAttribute("id", "picdiv");

        pichandle.style.left = parseInt(parentDiv.style.left) + 150;
        pichandle.style.top = parseInt(parentDiv.style.top);
        pichandle.style.cssFloat = "left";

        document.getElementById("body").appendChild(pichandle);
        return true;
    }
    else
        return false;
   
   
}
//draw timeaxis  
function CreateTimeAxis(parentid,left,id,color)
{
    var canbox = document.createElement("canvas");
    canbox.setAttribute("class", "canbox");
    canbox.setAttribute("id", id);
    canbox.style.width = 500;
    canbox.style.height = 100;
    canbox.style.left = left;
    canbox.style.backgroundColor = color;
    pen = canbox.getContext("2d");
    pen.lineWidth = 1;
    pen.translate(0.5, 0.5);
    pen.fillStyle = '#000000';
    pen.moveTo(0, 80);
    pen.lineTo(500, 80);
    for (var i = 0; i <=500; i+=5)
    {
        if(i%25==0)
        {
            pen.moveTo(i, 0);
            pen.lineTo(i, 80);
        }
        else
        {
            pen.moveTo(i, 40);
            pen.lineTo(i, 80);
        }
    }
    pen.stroke();
    document.getElementById(parentid).appendChild(canbox);


}

//move timeaxis to right speed is 10/0.1ms
function MoveRightA(object, id) {
    object.style.left = window.parseInt(object.style.left) + 10;
    
    if (parseInt(document.getElementById(id).style.left) > 1000) {

       
        document.getElementById(id).style.left = -490;
    }
 
    
}