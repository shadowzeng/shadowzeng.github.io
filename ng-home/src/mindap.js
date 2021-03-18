/**
 * @module mindap
 * @version 0.0.1
 * @file JavaScript library to draw mind maps.
 * @license MIT
 * @see {@link https://github.com/shadowzeng/mindap|GitHub}
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("d3")):"function"==typeof define&&define.amd?define(["exports","d3"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).mindap={},e.d3)}(this,(function(e,t){"use strict";var o;class s{static error(e,t){switch(t){case"eval":throw new EvalError(e);case"range":throw new RangeError(e);case"reference":throw new ReferenceError(e);case"syntax":throw new SyntaxError(e);case"type":throw new TypeError(e);case"uri":throw new URIError(e);default:throw new Error(e)}}static info(e){console.log(e)}static debug(e){console.debug(e)}}class i{static cloneObject(e){return null===e?null:"object"==typeof e?JSON.parse(JSON.stringify(e)):void s.error("Impossible to clone a non-object","type")}static clearObject(e){for(const t in e)delete e[t]}static fromObjectToArray(e){const t=[];for(const o in e)t.push(e[o]);return t}static mergeObjects(e,t,o=!1){if(void 0===t&&this.isPureObjectType(e))return this.cloneObject(e);if(void 0===e&&this.isPureObjectType(t))return this.cloneObject(t);this.isPureObjectType(e)&&this.isPureObjectType(t)||s.error("Only two pure objects can be merged","type");const r=this.cloneObject(e);for(const e in t){const n=t[e];o&&void 0===r[e]||(this.isPrimitiveType(n)||null===n?r[e]=n:Array.isArray(n)?r[e]=i.cloneObject(n):this.isPureObjectType(n)?this.isPureObjectType(r[e])?r[e]=i.mergeObjects(r[e],n):r[e]=i.cloneObject(n):s.error(`Type "${typeof n}" not allowed here`,"type"))}return r}static cssRules(e){let t="",o=document.styleSheets;for(let s=0;s<o.length;s++){const i=o[s].cssRules;if(i)for(let o=0;o<i.length;o++){const s=i[o],r=s.cssText.match(/^@font-face/);(e.querySelector(s.selectorText)||r)&&(t+=s.cssText)}}return t}static isPrimitiveType(e){return"string"==typeof e||"number"==typeof e||"boolean"==typeof e||void 0===e}static isPureObjectType(e){return"object"==typeof e&&!Array.isArray(e)&&null!==e}static removeAllRanges(){window.getSelection().removeAllRanges()}static focusWithCaretAtEnd(e){const t=document.createRange(),o=window.getSelection();e.focus(),t.selectNodeContents(e),t.collapse(!1),o.removeAllRanges(),o.addRange(t)}}class r{constructor(){const e=i.fromObjectToArray(o);this.dispatcher=t.dispatch(...e)}call(e,...t){return this.dispatcher.call(e,...t)}on(e,t){"string"!=typeof e&&s.error("The event must be a string","type"),o[e]||s.error("The event does not exist"),this.dispatcher.on(o[e],t)}}!function(e){e.create="mindap-create",e.center="mindap-center",e.undo="mindap-undo",e.redo="mindap-redo",e.exportJSON="mindap-export-json",e.exportImage="mindap-export-image",e.zoomIn="mindap-zoom-in",e.zoomOut="mindap-zoom-out",e.nodeSelect="mindap-node-select",e.nodeDeselect="mindap-node-deselect",e.nodeUpdate="mindap-node-update",e.nodeCreate="mindap-node-create",e.nodeRemove="mindap-node-remove",e.nodePayloadSelect="mindap-node-payload-select"}(o||(o={}));class n{constructor(e){this.zoomIn=e=>{e&&"number"!=typeof e&&s.error("The parameter must be a number","type"),this.move(!0,e),this.map.events.call(o.zoomIn)},this.zoomOut=e=>{e&&"number"!=typeof e&&s.error("The parameter must be a number","type"),this.move(!1,e),this.map.events.call(o.zoomOut)},this.center=(e,i=500)=>{e&&"zoom"!==e&&"position"!==e&&s.error('The type must be a string ("zoom" or "position")',"type"),i&&"number"!=typeof i&&s.error("The duration must be a number","type");const r=this.map.nodes.getRoot(),n=this.map.dom.container.node().clientWidth,a=this.map.dom.container.node().clientHeight,d=n/2-r.coordinates.x,c=a/2-r.coordinates.y,h=this.map.dom.svg.transition().duration(i);switch(e){case"zoom":this.zoomBehavior.scaleTo(h,1);break;case"position":this.zoomBehavior.translateTo(h,n/2-d,a/2-c);break;default:this.zoomBehavior.transform(h,t.zoomIdentity.translate(d,c))}this.map.events.call(o.center)},this.map=e,this.zoomBehavior=t.zoom().scaleExtent([.5,2]).on("zoom",(e=>{this.map.dom.g.attr("transform",e.transform)}))}getZoomBehavior(){return this.zoomBehavior}move(e,t=50){const o=this.map.dom.svg.transition().duration(t);this.zoomBehavior.scaleBy(o,e?4/3:3/4)}}class a{constructor(e){this.map=e}create(){this.map.dom.container=t.select("#"+this.map.id).style("position","relative"),this.map.dom.svg=this.map.dom.container.append("svg").style("position","absolute").style("width","100%").style("height","100%").style("top",0).style("left",0),this.map.dom.svg.append("rect").attr("width","100%").attr("height","100%").attr("fill","white").attr("pointer-events","all").on("click",(()=>{this.map.nodes.deselectNode()})),this.map.dom.g=this.map.dom.svg.append("g")}update(){const e=this.map.nodes.getNodes(),t={nodes:this.map.dom.g.selectAll("."+this.map.id+"_node").data(e),branches:this.map.dom.g.selectAll("."+this.map.id+"_branch").data(e.slice(1))};let o=!1;const s=t.nodes.enter().append("g").style("cursor","pointer").attr("class",this.map.id+"_node").attr("id",(function(e){return e.dom=this,e.id})).attr("transform",(e=>"translate("+e.coordinates.x+","+e.coordinates.y+")")).on("dblclick",((e,t)=>{this.enableNodeNameEditing(t)})).on("touchstart",(e=>{if(!o)return o=!0,setTimeout((function(){o=!1}),300),!1;this.enableNodeNameEditing(e)}));!0===this.map.options.drag?s.call(this.map.drag.getDragBehavior()):s.on("mousedown",(e=>{this.map.nodes.selectNode(e.id)})),s.insert("foreignObject").html((e=>this.createNodeNameDOM(e))).each((e=>{this.updateNodeNameContainer(e)})),s.insert("path","foreignObject").style("fill",(e=>e.colors.background)).style("stroke-width",1).attr("d",(e=>this.drawNodeBackground(e))),s.each((e=>{this.setImage(e),this.setPayloadFlag(e)})),t.branches.enter().insert("path","g").style("fill","none").style("stroke",(e=>e.colors.branch)).attr("class",this.map.id+"_branch").attr("id",(e=>e.id+"_branch")).attr("d",(e=>this.drawBranch(e))),t.nodes.exit().remove(),t.branches.exit().remove()}clear(){t.selectAll("."+this.map.id+"_node, ."+this.map.id+"_branch").remove()}drawNodeBackground(e){const o=e.getNameDOM(),s=t.path();e.dimensions.width=o.clientWidth+45,e.dimensions.height=o.clientHeight+30;const i=e.dimensions.width/2,r=e.dimensions.height/2;return s.moveTo(-i,0),s.arcTo(-i,-r,4-i,-r,4),s.arcTo(i,-r,i,4-r,4),s.arcTo(i,r,i-4,r,4),s.arcTo(-i,r,-i,r-4,4),s.closePath(),s}drawBranch(e){const o=e.parent,s=t.path(),i=e.getLevel(),r=22-3*(i<6?i:6),n=(o.coordinates.x+e.coordinates.x)/2,a=o.coordinates.y<e.coordinates.y+e.dimensions.height/2?-1:1,d=(o.coordinates.x>e.coordinates.x?-1:1)*a;return s.moveTo(o.coordinates.x,o.coordinates.y),s.bezierCurveTo(n-r*d,o.coordinates.y-r/2,o.coordinates.x-r/2*d,e.coordinates.y+e.dimensions.height/2-r/3,e.coordinates.x,e.coordinates.y),s}updateNodeShapes(e){const o=e.getBackgroundDOM();t.select(o).attr("d",(e=>this.drawNodeBackground(e))),t.selectAll("."+this.map.id+"_branch").attr("d",(e=>this.drawBranch(e))),this.updateImagePosition(e),this.updateNodeNameContainer(e)}setImage(e){let t=e.getImageDOM();if(t||(t=document.createElementNS("http://www.w3.org/2000/svg","image"),e.dom.appendChild(t)),""!==e.image.src){const o=new Image;o.src=e.image.src,o.onload=function(){const o=e.image.size,s=this.width*o/this.height,i=-(o+e.dimensions.height/2+5),r=-s/2;t.setAttribute("href",e.image.src),t.setAttribute("height",o.toString()),t.setAttribute("width",s.toString()),t.setAttribute("y",i.toString()),t.setAttribute("x",r.toString())},o.onerror=function(){t.remove(),e.image.src=""}}else t.remove()}setPayloadFlag(e){if(!e.payload)return;const{width:s,height:i}=e.dimensions,r=-s/2+4+4,n=i/2-4-4;t.select(e.dom).append("circle").style("fill","darkseagreen").attr("cx",r).attr("cy",n).attr("r",4).on("click",(()=>{this.map.events.call(o.nodePayloadSelect,null,e.payload)}))}updateImagePosition(e){if(""!==e.image.src){const t=e.getImageDOM(),o=-(t.getBBox().height+e.dimensions.height/2+5);t.setAttribute("y",o.toString())}}enableNodeNameEditing(e){if(this.map.options.readonly)return;const t=e.getNameDOM();i.focusWithCaretAtEnd(t),t.style.setProperty("cursor","auto"),t.ondblclick=t.onmousedown=e=>{e.stopPropagation()},t.oninput=()=>{this.updateNodeShapes(e)},t.onkeydown=e=>{if("Escape"===e.code&&(i.removeAllRanges(),t.blur()),e.ctrlKey||e.metaKey)switch(e.code){case"KeyA":case"KeyC":case"KeyV":case"KeyX":case"KeyZ":case"ArrowLeft":case"ArrowRight":case"ArrowUp":case"ArrowDown":case"Backspace":case"Delete":return!0;default:return!1}switch(e.code){case"Tab":return!1;default:return!0}},t.onpaste=e=>{e.preventDefault();const t=e.clipboardData.getData("text/plain");document.execCommand("insertHTML",!1,t)},t.onblur=()=>{t.innerHTML="<br>"===t.innerHTML?"":t.innerHTML,t.innerHTML!==e.name&&this.map.nodes.updateNode("name",t.innerHTML),t.ondblclick=t.onmousedown=t.onblur=t.onkeydown=t.oninput=t.onpaste=null,t.style.setProperty("cursor","pointer"),t.blur()}}updateNodeNameContainer(e){const t=e.getNameDOM(),o=t.parentNode;0!==t.offsetWidth&&(o.setAttribute("x",(-t.clientWidth/2).toString()),o.setAttribute("y",(-t.clientHeight/2).toString()),o.setAttribute("width",t.clientWidth.toString()),o.setAttribute("height",t.clientHeight.toString()))}createNodeNameDOM(e){const t=document.createElement("div");return t.style.setProperty("font-size",e.font.size.toString()+"px"),t.style.setProperty("color",e.colors.name),t.style.setProperty("font-style",e.font.style),t.style.setProperty("font-weight",e.font.weight),t.style.setProperty("text-decoration",e.font.decoration),t.style.setProperty("display","inline-block"),t.style.setProperty("white-space","pre"),t.style.setProperty("font-family",this.map.options.fontFamily),t.style.setProperty("text-align","center"),this.map.options.readonly||t.setAttribute("contenteditable","true"),t.innerHTML=e.name,t.outerHTML}}class d{constructor(e={},t){var o,s,r;this._readonly=!0,this.drag=!0,this.zoom=!0,this._map=t,this.fontFamily=e.fontFamily||"Arial, Helvetica, sans-serif",this.centerOnResize=void 0===e.centerOnResize||e.centerOnResize,this.drag=null===(o=e.drag)||void 0===o||o,this.zoom=null===(s=e.zoom)||void 0===s||s,this.readonly=null===(r=e.readonly)||void 0===r||r,this.defaultNode=i.mergeObjects({name:"Node",image:{src:"",size:60},colors:{name:"#787878",background:"#f9f9f9",branch:"#577a96"},font:{size:16,style:"normal",weight:"normal"},locked:!0},e.defaultNode,!0),this.rootNode=i.mergeObjects({name:"Root node",image:{src:"",size:70},colors:{name:"#787878",background:"aliceblue",branch:""},font:{size:20,style:"normal",weight:"normal"}},e.rootNode,!0)}set readonly(e){this._readonly=e,this._readonly&&(this.drag=!1)}get readonly(){return this._readonly}update(e,t){switch("string"!=typeof e&&s.error("The property must be a string","type"),e){case"fontFamily":this.updateFontFamily(t);break;case"centerOnResize":this.updateCenterOnResize(t);break;case"drag":this.updateDrag(t);break;case"zoom":this.updateZoom(t);break;case"defaultNode":this.updateDefaultNode(t);break;case"rootNode":this.updateDefaultRootNode(t);break;default:s.error("The property does not exist")}}updateFontFamily(e){"string"!=typeof e&&s.error("The font must be a string","type"),this.fontFamily=e,this._map.draw.update()}updateCenterOnResize(e){"boolean"!=typeof e&&s.error("The value must be a boolean","type"),this.centerOnResize=e,!0===this.centerOnResize?t.select(window).on("resize."+this._map.id,(()=>{this._map.zoom.center()})):t.select(window).on("resize."+this._map.id,null)}updateDrag(e){"boolean"!=typeof e&&s.error("The value must be a boolean","type"),this.drag=e,this._map.draw.clear(),this._map.draw.update()}updateZoom(e){"boolean"!=typeof e&&s.error("The value must be a boolean","type"),this.zoom=e,!0===this.zoom?this._map.dom.svg.call(this._map.zoom.getZoomBehavior()):this._map.dom.svg.on(".zoom",null)}updateDefaultNode(e){this.defaultNode=i.mergeObjects(this.defaultNode,e,!0)}updateDefaultRootNode(e){this.rootNode=i.mergeObjects(this.rootNode,e,!0)}}class c{constructor(e){this.id=e.id,this.parent=e.parent,this.name=e.name,this.coordinates=e.coordinates,this.colors=e.colors,this.image=e.image,this.font=e.font,this.locked=e.locked,this.payload=e.payload,this.dimensions={width:0,height:0},this.k=e.k||t.randomUniform(-20,20)()}isRoot(){const e=this.id.split("_");return"0"===e[e.length-1]}getLevel(){let e=1,t=this.parent;for(;t;)e++,t=t.parent;return e}getNameDOM(){return this.dom.querySelector("foreignObject > div")}getBackgroundDOM(){return this.dom.querySelector("path")}getImageDOM(){return this.dom.querySelector("image")}}class h{constructor(e){this.current=()=>this.snapshots[this.index],this.map=e,this.index=-1,this.snapshots=[]}new(e){if(void 0===e){const e=i.cloneObject(this.map.nodes.getRoot().coordinates);this.map.nodes.setCounter(0),this.map.nodes.clear(),this.map.draw.clear(),this.map.draw.update(),this.map.nodes.addRootNode(e),this.map.zoom.center(null,0),this.save(),this.map.events.call(o.create)}else this.checkSnapshotStructure(e)?(this.redraw(e),this.map.zoom.center("position",0),this.save(),this.map.events.call(o.create),console.log(this.map)):s.error("The snapshot is not correct")}undo(){this.index>0&&(this.redraw(this.snapshots[--this.index]),this.map.events.call(o.undo))}redo(){this.index<this.snapshots.length-1&&(this.redraw(this.snapshots[++this.index]),this.map.events.call(o.redo))}save(){this.index<this.snapshots.length-1&&this.snapshots.splice(this.index+1),this.snapshots.push(this.getSnapshot()),this.index++}getHistory(){return{snapshots:this.snapshots.slice(0),index:this.index}}redraw(e){this.map.nodes.clear(),e.forEach((e=>{const t={id:this.sanitizeNodeId(e.id),parent:this.map.nodes.getNode(this.sanitizeNodeId(e.parent)),k:e.k,name:e.name,coordinates:i.cloneObject(e.coordinates),image:i.cloneObject(e.image),colors:i.cloneObject(e.colors),font:i.cloneObject(e.font),locked:e.locked};e.payload&&(t.payload=i.cloneObject(e.payload));const o=new c(t);this.map.nodes.setNode(o.id,o)})),this.map.draw.clear(),this.map.draw.update(),this.map.nodes.selectRootNode(),this.setCounter()}getSnapshot(){return this.map.nodes.getNodes().map((e=>this.map.nodes.getNodeProperties(e,!1))).slice()}setCounter(){const e=this.map.nodes.getNodes().map((e=>{const t=e.id.split("_");return parseInt(t[t.length-1])}));this.map.nodes.setCounter(Math.max(...e)+1)}sanitizeNodeId(e){if("string"==typeof e){const t=e.split("_");return this.map.id+"_"+t[t.length-2]+"_"+t[t.length-1]}}checkSnapshotStructure(e){if(!Array.isArray(e))return!1;e[0].key&&e[0].value&&this.convertOldMmp(e);for(const t of e)if(!this.checkNodeProperties(t))return!1;return this.translateNodePositions(e),!0}checkNodeProperties(e){return["string"==typeof e.id,"string"==typeof e.parent,"number"==typeof e.k,"string"==typeof e.name,"boolean"==typeof e.locked,e.coordinates&&"number"==typeof e.coordinates.x&&"number"==typeof e.coordinates.y,e.image&&"number"==typeof e.image.size&&"string"==typeof e.image.src,e.colors&&"string"==typeof e.colors.background&&"string"==typeof e.colors.branch&&"string"==typeof e.colors.name,e.font&&"number"==typeof e.font.size&&"string"==typeof e.font.weight&&"string"==typeof e.font.style].every((e=>e))}convertOldMmp(e){for(const t of e){const e=i.cloneObject(t);i.clearObject(t),t.id="map_node_"+e.key.substr(4),t.parent=e.value.parent?"map_node_"+e.value.parent.substr(4):"",t.k=e.value.k,t.name=e.value.name,t.locked=e.value.fixed,t.coordinates={x:e.value.x,y:e.value.y},t.image={size:parseInt(e.value["image-size"]),src:e.value["image-src"]},t.colors={background:e.value["background-color"],branch:e.value["branch-color"]||"",name:e.value["text-color"]},t.font={size:parseInt(e.value["font-size"]),weight:e.value.bold?"bold":"normal",style:e.value.italic?"italic":"normal"}}}translateNodePositions(e){const t=this.map.nodes.getRoot(),o=e.find((e=>{const t=e.id.split("_");return"0"===t[t.length-1]})),s=o.coordinates.x-t.coordinates.x,i=o.coordinates.y-t.coordinates.y;for(const t of e)t.coordinates.x-=s,t.coordinates.y-=i}}class l{constructor(e){this.map=e,e.options.readonly||(this.dragBehavior=t.drag().on("start",((e,t)=>this.started(t,e))).on("drag",((e,t)=>this.dragged(t,e))).on("end",(e=>this.ended(e))))}getDragBehavior(){return this.dragBehavior}started(e,t){t.sourceEvent.preventDefault(),this.orientation=this.map.nodes.getOrientation(e),this.descendants=this.map.nodes.getDescendants(e),this.map.nodes.selectNode(e.id)}dragged(e,o){const s=o.dy,i=o.dx,r=e.coordinates.x+=i,n=e.coordinates.y+=s;if(e.dom.setAttribute("transform","translate("+[r,n]+")"),e.locked){const t=this.map.nodes.getOrientation(e),o=t!==this.orientation,r=e;for(const e of this.descendants){let t=e.coordinates.x+=i,n=e.coordinates.y+=s;o&&(t=e.coordinates.x+=2*(r.coordinates.x-e.coordinates.x)),e.dom.setAttribute("transform","translate("+[t,n]+")")}o&&(this.orientation=t)}t.selectAll("."+this.map.id+"_branch").attr("d",(e=>this.map.draw.drawBranch(e))),this.dragging=!0}ended(e){this.dragging&&(this.dragging=!1,this.map.history.save(),this.map.events.call(o.nodeUpdate,e.dom,this.map.nodes.getNodeProperties(e)))}}class p{constructor(e){this.updateNodeName=(e,t,o=!1)=>{if(t&&"string"!=typeof t&&s.error("The name must be a string","type"),e.name==t&&!o)return!1;e.getNameDOM().innerHTML=t,this.map.draw.updateNodeShapes(e),!1===o&&(e.name=t)},this.updateNodeCoordinates=(e,o)=>{const s=this.fixCoordinates(o);if((o=i.mergeObjects(e.coordinates,s,!0)).x===e.coordinates.x&&o.y===e.coordinates.y)return!1;{const s=this.getOrientation(this.selectedNode),r=e.coordinates.x-o.x,n=e.coordinates.y-o.y;if(e.coordinates=i.cloneObject(o),e.dom.setAttribute("transform","translate("+[o.x,o.y]+")"),this.selectedNode.locked){const e=this.selectedNode,t=this.getDescendants(this.selectedNode),o=this.getOrientation(this.selectedNode);for(const i of t){let t=i.coordinates.x-=r,a=i.coordinates.y-=n;s!==o&&(t=i.coordinates.x+=2*(e.coordinates.x-i.coordinates.x)),i.dom.setAttribute("transform","translate("+[t,a]+")")}}t.selectAll("."+this.map.id+"_branch").attr("d",(e=>this.map.draw.drawBranch(e)))}},this.updateNodeBackgroundColor=(e,o,i=!1)=>{if(o&&"string"!=typeof o&&s.error("The background color must be a string","type"),e.colors.background===o&&!i)return!1;{const s=e.getBackgroundDOM();s.style.fill=o,""!==s.style.stroke&&(s.style.stroke=t.color(o).darker(.5).toString()),!1===i&&(e.colors.background=o)}},this.updateNodeNameColor=(e,t,o=!1)=>{if(t&&"string"!=typeof t&&s.error("The text color must be a string","type"),e.colors.name===t&&!o)return!1;e.getNameDOM().style.color=t,!1===o&&(e.colors.name=t)},this.updateNodeBranchColor=(e,t,o=!1)=>{if(t&&"string"!=typeof t&&s.error("The branch color must be a string","type"),e.isRoot())s.error("The root node has no branches");else{if(e.colors.name===t&&!o)return!1;{const s=document.getElementById(e.id+"_branch");s.style.fill=s.style.stroke=t,!1===o&&(e.colors.branch=t)}}},this.updateNodeFontSize=(e,t,o=!1)=>{if(t&&"number"!=typeof t&&s.error("The font size must be a number","type"),e.font.size==t&&!o)return!1;e.getNameDOM().style["font-size"]=t+"px",this.map.draw.updateNodeShapes(e),!1===o&&(e.font.size=t)},this.updateNodeImageSize=(e,t,o=!1)=>{if(t&&"number"!=typeof t&&s.error("The image size must be a number","type"),""!==e.image.src){if(e.image.size===t&&!o)return!1;{const s=e.getImageDOM(),i=s.getBBox(),r=t,n=i.width*r/i.height,a=-(r+e.dimensions.height/2+5),d=-n/2;s.setAttribute("height",r.toString()),s.setAttribute("width",n.toString()),s.setAttribute("y",a.toString()),s.setAttribute("x",d.toString()),!1===o&&(e.image.size=r)}}else s.error("The node does not have an image")},this.updateNodeImageSrc=(e,t)=>{if(t&&"string"!=typeof t&&s.error("The image path must be a string","type"),e.image.src===t)return!1;e.image.src=t,this.map.draw.setImage(e)},this.updateNodeFontStyle=(e,t,o=!1)=>{if(t&&"string"!=typeof t&&s.error("The font style must be a string","type"),e.font.style===t)return!1;e.getNameDOM().style["font-style"]=t,!1===o&&(e.font.style=t)},this.updateNodeFontWeight=(e,t,o=!1)=>{if(t&&"string"!=typeof t&&s.error("The font weight must be a string","type"),e.font.weight===t)return!1;e.getNameDOM().style["font-weight"]=t,this.map.draw.updateNodeShapes(e),!1===o&&(e.font.weight=t)},this.updateNodeTextDecoration=(e,t,o=!1)=>{if(t&&"string"!=typeof t&&s.error("The text decoration must be a string","type"),e.font.decoration===t)return!1;e.getNameDOM().style["text-decoration"]=t,this.map.draw.updateNodeShapes(e),!1===o&&(e.font.decoration=t)},this.updateNodeLockedStatus=(e,t)=>{t&&"boolean"!=typeof t&&s.error("The node locked status must be a boolean","type"),e.isRoot()?s.error("The root node can not be locked"):e.locked=t||!e.locked},this.map=e,this.counter=0,this.nodes=new Map}addRootNode(e){const t=i.mergeObjects(this.map.options.rootNode,{coordinates:{x:this.map.dom.container.node().clientWidth/2,y:this.map.dom.container.node().clientHeight/2},locked:!1,id:this.map.id+"_node_"+this.counter,parent:null}),o=new c(t);e&&(o.coordinates.x=e.x||o.coordinates.x,o.coordinates.y=e.y||o.coordinates.y),this.nodes.set(t.id,o),this.counter++,this.map.draw.update(),this.selectRootNode()}addNode(e,t){t&&"string"!=typeof t&&s.error("The node id must be a string","type");const r=t?this.getNode(t):this.selectedNode;void 0===r&&s.error('There are no nodes with id "'+t+'"');const n=i.mergeObjects(this.map.options.defaultNode,e,!0);n.id=this.map.id+"_node_"+this.counter,n.parent=r;const a=new c(n);if(this.nodes.set(n.id,a),this.counter++,a.coordinates=this.calculateCoordinates(a),e&&e.coordinates){const t=this.fixCoordinates(e.coordinates);a.coordinates=i.mergeObjects(a.coordinates,t,!0)}this.map.draw.update(),this.map.history.save(),this.map.events.call(o.nodeCreate,a.dom,this.getNodeProperties(a))}selectNode(e){if(void 0!==e&&("string"!=typeof e&&s.error("The node id must be a string","type"),!this.nodeSelectionTo(e)))if(this.nodes.has(e)){const s=this.nodes.get(e),r=s.getBackgroundDOM();if(!r.style.stroke){this.selectedNode&&(this.selectedNode.getBackgroundDOM().style.stroke="");const e=t.color(r.style.fill).darker(.5);r.style.stroke=e.toString(),i.removeAllRanges(),this.selectedNode.getNameDOM().blur(),this.selectedNode=s,this.map.events.call(o.nodeSelect,s.dom,this.getNodeProperties(s))}}else s.error("The node id or the direction is not correct");return this.getNodeProperties(this.selectedNode)}editNode(){this.selectedNode&&this.map.draw.enableNodeNameEditing(this.selectedNode)}deselectNode(){this.selectedNode&&(this.selectedNode.getBackgroundDOM().style.stroke="",i.removeAllRanges()),this.selectRootNode(),this.map.events.call(o.nodeDeselect)}updateNode(e,t,i=!1,r){let n;switch(r&&"string"!=typeof r&&s.error("The node id must be a string","type"),void 0===(r?this.getNode(r):this.selectedNode)&&s.error('There are no nodes with id "'+r+'"'),"string"!=typeof e&&s.error("The property must be a string","type"),e){case"name":n=this.updateNodeName(this.selectedNode,t,i);break;case"locked":n=this.updateNodeLockedStatus(this.selectedNode,t);break;case"coordinates":n=this.updateNodeCoordinates(this.selectedNode,t);break;case"imageSrc":n=this.updateNodeImageSrc(this.selectedNode,t);break;case"imageSize":n=this.updateNodeImageSize(this.selectedNode,t,i);break;case"backgroundColor":n=this.updateNodeBackgroundColor(this.selectedNode,t,i);break;case"branchColor":n=this.updateNodeBranchColor(this.selectedNode,t,i);break;case"fontWeight":n=this.updateNodeFontWeight(this.selectedNode,t,i);break;case"textDecoration":n=this.updateNodeTextDecoration(this.selectedNode,t,i);break;case"fontStyle":n=this.updateNodeFontStyle(this.selectedNode,t,i);break;case"fontSize":n=this.updateNodeFontSize(this.selectedNode,t,i);break;case"nameColor":n=this.updateNodeNameColor(this.selectedNode,t,i);break;default:s.error("The property does not exist")}!1===i&&!1!==n&&(this.map.history.save(),this.map.events.call(o.nodeUpdate,this.selectedNode.dom,this.getNodeProperties(this.selectedNode)))}removeNode(e){e&&"string"!=typeof e&&s.error("The node id must be a string","type");const t=e?this.getNode(e):this.selectedNode;void 0===t&&s.error('There are no nodes with id "'+e+'"'),t.isRoot()?s.error("The root node can not be deleted"):(this.nodes.delete(t.id),this.getDescendants(t).forEach((e=>{this.nodes.delete(e.id)})),this.map.draw.clear(),this.map.draw.update(),this.map.history.save(),this.map.events.call(o.nodeRemove,null,this.getNodeProperties(t)),this.deselectNode())}nodeChildren(e){e&&"string"!=typeof e&&s.error("The node id must be a string","type");const t=e?this.getNode(e):this.selectedNode;return void 0===t&&s.error('There are no nodes with id "'+e+'"'),Array.from(this.nodes.values()).filter((e=>e.parent&&e.parent.id===t.id)).map((e=>this.getNodeProperties(e)))}getNodeProperties(e,t=!0){return{id:e.id,parent:e.parent?e.parent.id:"",name:e.name,coordinates:t?this.fixCoordinates(e.coordinates,!0):i.cloneObject(e.coordinates),image:i.cloneObject(e.image),colors:i.cloneObject(e.colors),font:i.cloneObject(e.font),locked:e.locked,k:e.k}}fixCoordinates(e,o=!1){const s=t.zoomTransform(this.map.dom.svg.node()),i={};return e.x&&(i.x=!1===o?(e.x-s.x)/s.k:e.x*s.k+s.x),e.y&&(i.y=!1===o?(e.y-s.y)/s.k:e.y*s.k+s.y),i}nodeSelectionTo(e){switch(e){case"up":return this.moveSelectionOnLevel(!0),!0;case"down":return this.moveSelectionOnLevel(!1),!0;case"left":return this.moveSelectionOnBranch(!0),!0;case"right":return this.moveSelectionOnBranch(!1),!0;default:return!1}}getChildren(e){return Array.from(this.nodes.values()).filter((t=>t.parent&&t.parent.id===e.id))}getOrientation(e){if(!e.isRoot())return e.coordinates.x<this.getRoot().coordinates.x}getRoot(){return this.nodes.get(this.map.id+"_node_0")}getDescendants(e){let t=[];return this.getChildren(e).forEach((e=>{t.push(e),t=t.concat(this.getDescendants(e))})),t}getNodes(){return Array.from(this.nodes.values())}getNode(e){return this.nodes.get(e)}setNode(e,t){this.nodes.set(e,t)}getCounter(){return this.counter}setCounter(e){this.counter=e}getSelectedNode(){return this.selectedNode}selectRootNode(){this.selectedNode=this.nodes.get(this.map.id+"_node_0")}clear(){this.nodes.clear()}getSiblings(e){if(e.isRoot())return[];{const t=this.getChildren(e.parent);return t.length>1?(t.splice(t.indexOf(e),1),t):[]}}calculateCoordinates(e){let t={x:e.parent.coordinates.x,y:e.parent.coordinates.y},o=this.getSiblings(e);if(e.parent.isRoot()){const e=[],s=[];for(const t of o)this.getOrientation(t)?s.push(t):e.push(t);s.length<=e.length?(t.x-=200,o=s):(t.x+=200,o=e)}else this.getOrientation(e.parent)?t.x-=200:t.x+=200;if(o.length>0){const e=this.getLowerNode(o);t.y=e.coordinates.y+60}else t.y-=120;return t}getLowerNode(e=Array.from(this.nodes.values())){if(e.length>0){let t=e[0].coordinates.y,o=e[0];for(const s of e)s.coordinates.y>t&&(t=s.coordinates.y,o=s);return o}}moveSelectionOnLevel(e){if(!this.selectedNode.isRoot()){let t=this.getSiblings(this.selectedNode).filter((t=>e===t.coordinates.y<this.selectedNode.coordinates.y));if(this.selectedNode.parent.isRoot()&&(t=t.filter((e=>this.getOrientation(e)===this.getOrientation(this.selectedNode)))),t.length>0){let e=t[0],o=Math.abs(t[0].coordinates.y-this.selectedNode.coordinates.y);for(const s of t){const t=Math.abs(s.coordinates.y-this.selectedNode.coordinates.y);t<o&&(o=t,e=s)}this.selectNode(e.id)}}}moveSelectionOnBranch(e){if(!1===this.getOrientation(this.selectedNode)&&e||!0===this.getOrientation(this.selectedNode)&&!e)this.selectNode(this.selectedNode.parent.id);else{let t=this.getChildren(this.selectedNode);void 0===this.getOrientation(this.selectedNode)&&(t=t.filter((t=>this.getOrientation(t)===e)));const o=this.getLowerNode(t);t.length>0&&this.selectNode(o.id)}}}class m{constructor(e){this.map=e}asJSON(){const e=this.map.history.current();return this.map.events.call(o.exportJSON),i.cloneObject(e)}asImage(e,t){"function"!=typeof e&&s.error("The first parameter must be a function","type"),t&&"string"!=typeof t&&s.error("The second optional parameter must be a string","type"),this.map.nodes.deselectNode(),this.dataURI((i=>{const r=new Image;r.src=i,r.onload=()=>{const s=document.createElement("canvas"),i=s.getContext("2d");s.width=r.width,s.height=r.height,i.drawImage(r,0,0),i.globalCompositeOperation="destination-over",i.fillStyle="#ffffff",i.fillRect(0,0,s.width,s.height),"string"==typeof t&&(t="image/"+t),e(s.toDataURL(t)),this.map.events.call(o.exportImage)},r.onerror=()=>{s.error("The image has not been loaded correctly")}}))}dataURI(e){const t=this.map.dom.g.node(),o=t.cloneNode(!0),s=document.createElementNS("http://www.w3.org/2000/svg","svg"),r=t.getBBox(),n=i.cssRules(t),a="http://www.w3.org/2000/xmlns/",d=r.x-15,c=r.y-15,h=r.width+30,l=r.height+30;if(s.setAttributeNS(a,"xmlns","http://www.w3.org/2000/svg"),s.setAttributeNS(a,"xmlns:xlink","http://www.w3.org/1999/xlink"),s.setAttribute("version","1.1"),s.setAttribute("width",h),s.setAttribute("height",l),s.setAttribute("viewBox",[d,c,h,l].join(" ")),""!==n){const e=document.createElement("style"),t=document.createElement("defs");e.setAttribute("type","text/css"),e.innerHTML="<![CDATA[\n"+n+"\n]]>",t.appendChild(e),s.appendChild(t)}o.setAttribute("transform","translate(0,0)"),s.appendChild(o),this.convertImages(o,(()=>{const t=new XMLSerializer,o=new FileReader,i=new Blob([t.serializeToString(s)],{type:"image/svg+xml"});o.readAsDataURL(i),o.onloadend=()=>{e(o.result)}}))}convertImages(e,t){let o=e.querySelectorAll("image"),s=o.length;if(s>0)for(const e of o){const o=document.createElement("canvas"),i=o.getContext("2d"),r=new Image,n=e.getAttribute("href");r.crossOrigin="Anonymous",r.src=n,r.onload=function(){o.width=r.width,o.height=r.height,i.drawImage(r,0,0),e.setAttribute("href",o.toDataURL("image/png")),s--,0===s&&t()},r.onerror=()=>{s--,0===s&&t()}}else t()}}class g{constructor(e){this.copy=e=>{e&&"string"!=typeof e&&s.error("The node id must be a string","type");const t=e?this.map.nodes.getNode(e):this.map.nodes.getSelectedNode();void 0===t&&s.error('There are no nodes with id "'+e+'"'),t.isRoot()?s.error("The root node can not be copied"):(this.copiedNodes=[this.map.nodes.getNodeProperties(t,!1)],this.map.nodes.getDescendants(t).forEach((e=>{this.copiedNodes.push(this.map.nodes.getNodeProperties(e,!1))})))},this.cut=e=>{e&&"string"!=typeof e&&s.error("The node id must be a string","type");const t=e?this.map.nodes.getNode(e):this.map.nodes.getSelectedNode();void 0===t&&s.error('There are no nodes with id "'+e+'"'),t.isRoot()?s.error("The root node can not be cut"):(this.copiedNodes=[this.map.nodes.getNodeProperties(t,!1)],this.map.nodes.getDescendants(t).forEach((e=>{this.copiedNodes.push(this.map.nodes.getNodeProperties(e,!1))})),this.map.nodes.removeNode(t.id))},this.paste=e=>{void 0===this.copiedNodes&&s.error("There are not nodes in the mmp clipboard"),e&&"string"!=typeof e&&s.error("The node id must be a string","type");const t=e?this.map.nodes.getNode(e):this.map.nodes.getSelectedNode();void 0===t&&s.error('There are no nodes with id "'+e+'"');const o=this.map.nodes.getRoot(),r=(e,t)=>{let s;if(e.id!==this.copiedNodes[0].id){s={x:0,y:0};const i=this.copiedNodes.find((t=>t.id===e.parent));let r=i.coordinates.x-e.coordinates.x;const n=i.coordinates.y-e.coordinates.y,a=this.map.nodes.getOrientation(t);i.coordinates.x<o.coordinates.x!==a&&(r=-r),s.x=t.coordinates.x-r,s.y=t.coordinates.y-n,s=this.map.nodes.fixCoordinates(s,!0)}const n=i.cloneObject(e);this.map.nodes.addNode({name:n.name,coordinates:s,image:n.image,colors:n.colors,font:n.font,locked:n.locked},t.id);const a=this.copiedNodes.filter((t=>t.parent===e.id));if(a.length>0){const e=this.map.nodes.getNodes();t=e[e.length-1],a.forEach((e=>{r(e,t)}))}};r(this.copiedNodes[0],t)},this.map=e}}class u{constructor(e,o){return this.id=e,this.dom={},this.events=new r,this.options=new d(o,this),this.zoom=new n(this),this.history=new h(this),this.drag=new l(this),this.draw=new a(this),this.nodes=new p(this),this.export=new m(this),this.copyPaste=new g(this),this.draw.create(),!0===this.options.centerOnResize&&t.select(window).on("resize."+this.id,(()=>{this.zoom.center()})),!0===this.options.zoom&&this.dom.svg.call(this.zoom.getZoomBehavior()).on("dblclick.zoom",null),this.nodes.addRootNode(),this.history.save(),this.createMindapInstance()}remove(){this.dom.svg.remove();const e=Object.keys(this.instance);for(let t=0;t<e.length;t++)delete this.instance[e[t]]}createMindapInstance(){return this.instance={on:this.events.on.bind(this.events),remove:this.remove.bind(this.remove),new:this.history.new.bind(this.history),updateOptions:this.options.update.bind(this.options),exportAsJSON:this.export.asJSON.bind(this.export),exportAsImage:this.export.asImage.bind(this.export),history:this.history.getHistory.bind(this.history),undo:this.history.undo.bind(this.history),redo:this.history.redo.bind(this.history),zoomIn:this.zoom.zoomIn.bind(this.zoom),zoomOut:this.zoom.zoomOut.bind(this.zoom),center:this.zoom.center.bind(this.zoom),addNode:this.nodes.addNode.bind(this.nodes),selectNode:this.nodes.selectNode.bind(this.nodes),editNode:this.nodes.editNode.bind(this.nodes),deselectNode:this.nodes.deselectNode.bind(this.nodes),nodeChildren:this.nodes.nodeChildren.bind(this.nodes),updateNode:this.nodes.updateNode.bind(this.nodes),removeNode:this.nodes.removeNode.bind(this.nodes),copyNode:this.copyPaste.copy.bind(this.copyPaste),cutNode:this.copyPaste.cut.bind(this.copyPaste),pasteNode:this.copyPaste.paste.bind(this.copyPaste)}}}e.create=function(e,t){return new u(e,t)},e.version="0.0.1",Object.defineProperty(e,"__esModule",{value:!0})}));
