//Function for  Mermaid Data to Graphics Conversion
async function Mermaid() { try { await mermaid.run({ nodes: document.querySelectorAll('.language-mermaid'), }); } catch (err) { } }

//Function for Highlighting Code Segments
function HighlightCode() { document.querySelectorAll('div.code').forEach(el => { hljs.highlightElement(el); }); }


$(document.links).filter(function() {
    return this.hostname != window.location.hostname;
}).attr('target', '_blank');

$(document).ready(function () { setTimeout(()=>{Mermaid();}, 3000); });



