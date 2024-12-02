let pageLoader;


function ScrollToTop() { window.scrollTo(0, 0); }
function enableScroll() { window.onscroll = function () { }; }
function disableScroll() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        window.onscroll = function () { window.scrollTo(scrollLeft, scrollTop); };
}

function hidePageLoading() { Metro.activity.close(pageLoader); }
function showPageLoading() {
    if (pageLoader != undefined) {
        if (pageLoader[0]["DATASET:UID:M4Q"] == undefined) { pageLoader = null; }
        else {
            try { Metro.activity.close(pageLoader); } catch {
                try { pageLoader.close(); } catch { pageLoader = pageLoader[0]["DATASET:UID:M4Q"].dialog; pageLoader.close(); }; pageLoader = null;
            }
        }
    }
    pageLoader = Metro.activity.open({ type: 'atom', style: 'dark', overlayClickClose: true, /*overlayColor: '#fff', overlayAlpha: 1*/ });
}


function ShowSource() {
    var source = "<html>";
    source += document.getElementsByTagName('html')[0].innerHTML;
    source += "</html>";
    source = source.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    source = "<pre>" + source + "</pre>";
    sourceWindow = window.open('', 'Interaktnivní Kód', 'height=800,width=800,scrollbars=1,resizable=1');
    sourceWindow.document.write(source);
    sourceWindow.document.close();
    if (window.focus) sourceWindow.focus();
}

function ShowFrameSource() {
    var source = "<html>";
    source += window.frames['FrameWindow'].contentWindow.document.body.innerHTML;
    source += "</html>";
    source = source.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    source = "<pre>" + source + "</pre>";
    sourceWindow = window.open('', 'Interaktnivní Kód', 'height=800,width=800,scrollbars=1,resizable=1');
    sourceWindow.document.write(source);
    sourceWindow.document.close();
    if (window.focus) sourceWindow.focus();
}



function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

function str2bytes(str) {
    var bytes = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}

function PrintElement(elementId) {
    try {
        $("#" + elementId).printElement({ pageTitle: elementId.split("_")[1] + ".html", printMode: "popup" });
    } catch (t) { }
}

function PrintFrameElement() {
    try {
        window.frames['FrameWindow'].contentWindow.printElement({ pageTitle: "KlikneteZdeCz.html", printMode: "popup" });
    } catch (t) { }
}

function DownloadHtmlElement(elementId) {
    try {
        var t = document.body.appendChild(document.createElement("a")); t.download = elementId + ".html"; t.href = "data:text/html;charset=utf-8," + encodeURIComponent(document.getElementById(elementId).innerHTML); t.click();
    } catch (i) { }
}

function DownloadFrameHtmlElement() {
    try {
        var t = document.body.appendChild(document.createElement("a")); t.download = "KlikneteZde" + ".html"; t.href = "data:text/html;charset=utf-8," + encodeURIComponent(window.frames['FrameWindow'].contentWindow.document.body.innerHTML); t.click();
    } catch (i) { }
}

async function CopyElement(elementId) {
    try {
        let t = document.getElementById(elementId).innerHTML; await navigator.clipboard.writeText(t);
    } catch (t) { }
}


async function CopyFrameElement() {
    try {
        let t = window.frames['FrameWindow'].contentWindow.document.body.innerHTML; await navigator.clipboard.writeText(t);
    } catch (t) { }
}


//Function for  Mermaid Data to Graphics Conversion
async function Mermaid() { try { await mermaid.run({ nodes: document.querySelectorAll('.class-mermaid'), }); } catch (err) { } }

//Function for Highlighting Code Segments
function HighlightCode() { document.querySelectorAll('div.code').forEach(el => { hljs.highlightElement(el); }); }


function ImageFromElement(elementId) {
    try {
        $("document").ready(function () {
            html2canvas($("#" + elementId), {
                onrendered: function (t) {
                    $("#previewImage").append(t);
                    var r = t.toDataURL("image/png"), u = r.replace(/^data:image\/png/, "data:application/octet-stream"), i = document.body.appendChild(document.createElement("a")); i.download = elementId + ".png"; i.href = u; i.click();
                }
            });
        });
    } catch (t) { }
}

function ImageFromFrameElement() {
    try {
        $("document").ready(function () {
            html2canvas(window.frames['FrameWindow'].contentWindow.document.body, {
                onrendered: function (t) {
                    $("#previewImage").append(t);
                    var r = t.toDataURL("image/png"), u = r.replace(/^data:image\/png/, "data:application/octet-stream"), i = document.body.appendChild(document.createElement("a")); i.download = "KlikneteZdeCz.png"; i.href = u; i.click();
                }
            });
        });
    } catch (t) { }
}

function SaveToFavorites(title, url) {
    if (window.sidebar) {
        // Firefox
        window.sidebar.addPanel(title, url, '');
    }
    else if (window.opera && window.print) {
        // Opera
        var elem = document.createElement('a');
        elem.setAttribute('href', url);
        elem.setAttribute('title', title);
        elem.setAttribute('rel', 'sidebar');
        elem.click(); //this.title=document.title;
    }
    else if (document.all) {
        // ie
        window.external.AddFavorite(url, title);
    }
}

async function FileReaderToImageData(n) {
    const t = new FileReader; return await new Promise((t, i) => {
        const r = new FileReader; r.onloadend = () => t(r.result); r.onerror = i;
        console.log("files", JSON.parse(JSON.stringify(files)));
        r.readAsDataURL(n[0]);
    });
}


function ChangeSource(url) {
    $("#FrameWindow").attr("src",url);
    ScrollToTop();
}

//$(document).ready(function () {
//    $("#docLoader").hide();
//    setTimeout(() => {
//        googleTranslateElementInit();
//        Mermaid();
//    }, 3000);
//});


function googleTranslateElementInit() {

    Metro.storage.setItem('DetectedLanguage', (navigator.language || navigator.userLanguage).substring(0, 2));
    $(document).ready(function () {
        new google.translate.TranslateElement({
            pageLanguage: 'cs', //includedLanguages: 'en,cs',
            layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
            autoDisplay: false
        }, 'google_translate_element');

    
        setTimeout(function () {
            let selectElement = document.querySelector('#google_translate_element select');
            selectElement.value = Metro.storage.getItem('DetectedLanguage', null);
            selectElement.dispatchEvent(new Event('change'));
        }, 1000);


        /*
        let userTranslateSetting = Metro.storage.getItem('UserAutomaticTranslate', null) != null && Metro.storage.getItem('UserAutomaticTranslate', null) ? true : false;
        if (userTranslateSetting && document.querySelector('#google_translate_element select') != null) {
            setTimeout(function () {
                let selectElement = document.querySelector('#google_translate_element select');
                selectElement.value = "nemam";
                selectElement.dispatchEvent(new Event('change'));
            }, 1000);
        }*/


    });
}

function CancelTranslation() {
    setTimeout(function () {
        let selectElement = document.querySelector('#google_translate_element select');
        selectElement.selectedIndex = 1;
        selectElement.dispatchEvent(new Event('change'));
        if (selectElement.value != '') {
            setTimeout(function () {
                let selectElement = document.querySelector('#google_translate_element select');
                selectElement.selectedIndex = 0;
                selectElement.dispatchEvent(new Event('change'));
                if (selectElement.value != '') {
                    setTimeout(function () {
                        let selectElement = document.querySelector('#google_translate_element select');
                        selectElement.selectedIndex = 0;
                        selectElement.dispatchEvent(new Event('change'));
                    }, 2000);
                }
            }, 2000);
        }
    }, 1000);
}

function loadPage(url) {
    $.ajax({
        url: url
    }).done(function (data) {
        $('#frameWindow').html(data);
    });
}

//function calcHeight(iframeElement) {
//    var the_height = iframeElement.contentWindow.document.body.scrollHeight;
//    iframeElement.height = the_height;
//}

async function SendMessage() {
    showPageLoading();

    let response = await fetch(Metro.storage.getItem('ApiOriginSuffix', null) + '/WebPages/InsertMessage', {
        method: 'POST', headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ message: $("#NewMessage").val() })
        
    });
    let result = await response.json();
    if (result.status == "error") {
        var notify = Metro.notify; notify.setup({ width: 300, duration: 1000, animation: 'easeOutBounce' });
        notify.create("Sending Messages Failed", "Alert", { cls: "alert" }); notify.reset();
        hidePageLoading();
    } else {
        var notify = Metro.notify; notify.setup({ width: 300, duration: 1000, animation: 'easeOutBounce' });
        notify.create("Děkuji za Zprávu", "Info", { cls: "success" }); notify.reset();
        $("#NewMessage").val(null);
        hidePageLoading();
        GetMessages();
    }
}

//Get Messages
/*
async function GetMessages() {
    showPageLoading();
    let response = await fetch(Metro.storage.getItem('ApiOriginSuffix', null) + '/WebPages/GetMessageList', {
        method: 'GET', headers: {
            'Content-type': 'application/json'
        }
    });
    let result = await response.json();
    if (result.status == "error") {
        var notify = Metro.notify; notify.setup({ width: 300, duration: 1000, animation: 'easeOutBounce' });
        notify.create("Downloading Messages Failed", "Alert", { cls: "alert" }); notify.reset();
        hidePageLoading();
    } else {
        data = JSON.parse(JSON.stringify(result));
    
        let messageData = "";
        data.forEach(message => {
            messageData += "<div class=\"card image-header\"><div class=\"card-content p-2 op-lightBrown-low\"><p class=\"fg-black\">" + message.Name + "</p>" + JSON.stringify(message.Description) + "</div></div>";
        });
        $("#MessageBox").html(messageData);
        hidePageLoading();
    }
}
*/

function ShowMessagePanel(close) {
    OpenCharm(0);
    charms = Metro.getPlugin($("#charmPanel"), 'charms');
    if (close) {
        charms.close();
    } else { charms.toggle(); }
}

let LastMovedCharm = 0;
function OpenCharm(index) {

   
    if (!Metro.charms.isOpen("#Metro" + index + "Charm") && index > 0) {
        Metro.charms.toggle("#Metro" + index + "Charm");
    } else {
        Metro.charms.close("#Metro2Charm");
        Metro.charms.close("#Metro3Charm");
        Metro.charms.close("#Metro4Charm");
        Metro.charms.close("#Metro5Charm");
        Metro.charms.close("#Metro6Charm");
        Metro.charms.close("#Metro7Charm");
        Metro.charms.close("#Metro8Charm");
        Metro.charms.close("#Metro9Charm");
        Metro.charms.close("#Metro10Charm");
        Metro.charms.close("#Metro11Charm");
        Metro.charms.close("#Metro12Charm");
        Metro.charms.close("#Metro13Charm");
        Metro.charms.close("#Metro14Charm");
        Metro.charms.close("#Metro15Charm");
        Metro.charms.close("#Metro16Charm");
        Metro.charms.close("#Metro17Charm");
        Metro.charms.close("#Metro18Charm");
        Metro.charms.close("#Metro19Charm");
        Metro.charms.close("#Metro20Charm");


        if (LastMovedCharm != index) { Metro.charms.toggle("#Metro" + index + "Charm"); }
    } LastMovedCharm = index;
}

//Get NewsList
function GetNewsList() {
    if (Metro.storage.getItem('NewsList', null) == null) {
        showPageLoading();
        $.ajax({
            url: Metro.storage.getItem('ApiOriginSuffix', null) + '/WebPages/GetNewsList', dataType: 'json',
            type: "GET",
            headers: { 'Content-type': 'application/json' },
            success: function (data) {
                data = JSON.parse(JSON.stringify(data));
                Metro.storage.setItem('NewsList', data);
                let messageData = "";
                data.forEach(message => {
                    messageData += "<div class=\"card image-header\"><div class=\"card-content p-2\"><p class=\"fg-black\"><b>" + new Date(message.timeStamp).toLocaleDateString() + "</b> " + message.title + "</p>" + message.description + "</div></div>";
                });
                $("#NewsListBox").html(messageData);
                Metro.infobox.open('#NewsInfoBox');
                hidePageLoading();
            },
            error: function (error) {
                var notify = Metro.notify; notify.setup({ width: 300, duration: 1000, animation: 'easeOutBounce' });
                notify.create("Downloading Messages Failed", "Alert", { cls: "alert" }); notify.reset();
                hidePageLoading();
            }
        });
    } else {
        let data = Metro.storage.getItem('NewsList', null);
        let messageData = "";
        data.forEach(message => {
            messageData += "<div class=\"card image-header\"><div class=\"card-content p-2\"><p class=\"fg-black\"><b>" + new Date(message.timeStamp).toLocaleDateString() + "</b> " + message.title + "</p>" + message.description + "</div></div>";
        });
        $("#NewsListBox").html(messageData);
        Metro.infobox.open('#NewsInfoBox');
    }
}
