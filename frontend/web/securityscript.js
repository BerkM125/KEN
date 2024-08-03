let xmlhttp = new XMLHttpRequest();
let xmlhttp2 = new XMLHttpRequest();
let xmlhttp3 = new XMLHttpRequest();
let xmlhttp4 = new XMLHttpRequest();
let capturereq  = new XMLHttpRequest();
let ipAddress = 203;

//Intro animation
setTimeout(function() {
    document.body.style.opacity = 1;
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundColor = "#ffffff";
}, 1500);

function introAnimation() {
    document.body.style.opacity = 0;
    document.body.style.backgroundImage = "url('images/securityicon1.png')";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "80px";
}
//introAnimation();

//Constantly looping scaling function, repositions many elements according to viewport size
setInterval(function() {
    let sidebar = document.getElementsByClassName('s-sidebar__nav')[0];
    let block1 = document.getElementById("block1");
    let block2 = document.getElementById("block2");
    let logo = document.getElementById('logoid');
    let popularmodal = document.getElementById('popularmodalcontent');
    if(sidebar.getBoundingClientRect().width >= 56) {
        popularmodal.style.marginLeft = '267px';
        block1.style.marginLeft = '260px';

        block2.style.height = '100%';
        block1.style.height = '100%';
        block2.style.width = '37%';
        block1.style.width = '37%';
        block2.style.marginLeft = `${block1.getBoundingClientRect().width + block1.offsetLeft+30}px`;
        block2.style.marginTop = `100px`;
        block1.style.marginTop = `100px`;
        logo.src = "images/homealarm.png";
        logo.style.height = '55px';
    }
    if (sidebar.getBoundingClientRect().width <= 56) {
        popularmodal.style.marginLeft = '90px';
        block1.style.marginLeft = '90px';
        block2.style.height = '55%';
        block1.style.height = '100%';
        block2.style.width = '87%';
        block1.style.width = '90%';
        block2.style.marginLeft = `${block1.offsetLeft}px`;
        block2.style.marginTop = `${block1.offsetHeight+20}px`;
        logo.src = "images/homealarm.png";
        logo.style.height = '45px';
    }
    
}, 0);

function showstats () {
    let block1 = document.getElementById('block1');
    let block2 = document.getElementById('block2');
    let popularmodal = document.getElementById('popularmodal');
    let sidebar = document.getElementsByClassName('s-layout__sidebar')[0];
    block1.style.display = 'block';
    block2.style.display = 'block';
    popularmodal.style.display = 'none';
    sidebar.style.zIndex = 0;
}
function showfootage () {
    let block1 = document.getElementById('block1');
    let block2 = document.getElementById('block2');
    let popularmodal = document.getElementById('popularmodal');
    let sidebar = document.getElementsByClassName('s-layout__sidebar')[0];
    block1.style.display = 'none';
    block2.style.display = 'none';
    popularmodal.style.display = 'block';
    sidebar.style.zIndex = 99999;
}

function contentloading () {
    let location = document.getElementById("locationdata");
    location.innerHTML = `Latest Active Location: ${xmlhttp.responseText}`;
}

function contentloading2 () {
    let detection = document.getElementById("detectioncount");
    detection.innerHTML = `Capture Count: ${xmlhttp2.responseText}`;
}

function contentloading3 () {
    let suspicion = document.getElementById("suspicioncount");
    suspicion.innerHTML = `Suspicion Count: ${xmlhttp3.responseText}`;
}

function contentloading4 () {
    let latest = document.getElementById("latestactivity");
    latest.innerHTML = `Latest Active Timestamp: ${xmlhttp4.responseText}`;
}

function gatherdata () {
    let addr = window.location.href.toString().split("security")[0];
    xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.open("GET", `${addr}directget/detectioncount`);
    xmlhttp2.overrideMimeType("text/html");
    xmlhttp2.send();
    xmlhttp2.addEventListener("load", contentloading2);

    xmlhttp3 = new XMLHttpRequest();
    xmlhttp3.open("GET", `${addr}directget/suspicioncount`);
    xmlhttp3.overrideMimeType("text/html");
    xmlhttp3.send();
    xmlhttp3.addEventListener("load", contentloading3);

    xmlhttp4 = new XMLHttpRequest();
    xmlhttp4.open("GET", `${addr}directget/latestactivity`);
    xmlhttp4.overrideMimeType("text/html");
    xmlhttp4.send();
    xmlhttp4.addEventListener("load", contentloading4);
    
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `${addr}directget/latestlocation`);
    xmlhttp.overrideMimeType("text/html");
    xmlhttp.send();
    xmlhttp.addEventListener("load", contentloading);

}
gatherdata();

function bindOptionCallbacks () {
    let cameraOptions = document.getElementsByTagName("INPUT");
    let optionArr = [].slice.call(cameraOptions);
    optionArr.forEach(bindCallback);
}
bindOptionCallbacks();

function bindCallback (option) {
    option.addEventListener("click", () => {

        
        ipAddress = option.value;
    });
}


function takepic () {
    let addr = window.location.href.toString().split("security")[0];
    capturereq = new XMLHttpRequest();
    capturereq.open("GET", `${addr}bypassmixed/${ipAddress}/capture`);
    capturereq.overrideMimeType("text/html");
    capturereq.send();
}

/*function refreshimage () {
    if(window.self !== window.top) return;
    var $img = $("#recentimg");
    var src = $img.attr("src");
    var iframe = document.createElement("iframe");
    iframe.style.display = "none";
    window.parent.document.body.appendChild(iframe);
    iframe.src = window.location.href;
    setTimeout(function () {
        iframe.contentWindow.location.reload(true);
        setTimeout(function () {
            $img.removeAttr("src").attr("src", src);
        }, 2000);
    }, 2000);
}*/

//Sidebar functions
function leavefunc (textid, iconid, iconurl) {
    document.getElementById(textid).style.color = '#333333';
    document.getElementById(iconid).src = iconurl;
}
function hoverfunc (textid, iconid, iconurl) {
    document.getElementById(textid).style.color = 'white';
    document.getElementById(iconid).src = iconurl;
}
