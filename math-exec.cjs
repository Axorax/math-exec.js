const operators={"**":{p:2,a:"right",fn:(e,t)=>Math.pow(e,t)},"+":{p:1,a:"left",fn:(e,t)=>e+t},"-":{p:1,a:"left",fn:(e,t)=>e-t},"*":{p:2,a:"left",fn:(e,t)=>e*t},"/":{p:2,a:"left",fn:(e,t)=>e/t},"%":{p:2,a:"left",fn:(e,t)=>e%t},"^":{p:2,a:"right",fn:(e,t)=>Math.pow(e,t)},"//":{p:2,a:"left",fn:(e,t)=>Math.floor(e/t)},log:{p:4,a:"left",fn:(e,t)=>Math.log(t)/Math.log(e||Math.E)},log10:{p:4,a:"left",fn:e=>Math.log10(e)},min:{p:1,a:"left",fn:(...e)=>e.length?Math.min(...e):NaN},max:{p:1,a:"left",fn:(...e)=>e.length?Math.max(...e):NaN},random:{p:4,a:"left",fn:(e,t)=>Math.floor(Math.random()*(t-e))+e},sqrt:{p:4,a:"left",fn:e=>Math.sqrt(e)},abs:{p:4,a:"left",fn:e=>Math.abs(e)},round:{p:4,a:"left",fn:e=>Math.round(e)},ceil:{p:4,a:"left",fn:e=>Math.ceil(e)},floor:{p:4,a:"left",fn:e=>Math.floor(e)},sin:{p:4,a:"left",fn:e=>Math.sin(e)},cos:{p:4,a:"left",fn:e=>Math.cos(e)},tan:{p:4,a:"left",fn:e=>Math.tan(e)},asin:{p:4,a:"left",fn:e=>Math.asin(e)},acos:{p:4,a:"left",fn:e=>Math.acos(e)},atan:{p:4,a:"left",fn:e=>Math.atan(e)},exp:{p:4,a:"left",fn:e=>Math.exp(e)},floorDiv:{p:2,a:"left",fn:(e,t)=>Math.floor(e/t)},mod:{p:2,a:"left",fn:(e,t)=>(e%t+t)%t},roundTo:{p:2,a:"left",fn:(e,t)=>Math.round(e*Math.pow(10,t))/Math.pow(10,t)},cbrt:{p:4,a:"left",fn:e=>Math.cbrt(e)},expm1:{p:4,a:"left",fn:e=>Math.expm1(e)},hypot:{p:1,a:"left",fn:(...e)=>Math.hypot(...e)},sign:{p:4,a:"left",fn:e=>Math.sign(e)},trunc:{p:4,a:"left",fn:e=>Math.trunc(e)}};function mathExec(e){var t;let f=e=>/^-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?$/i.test(e);return(e=>{let t=[];for(let p of e)if(f(p))t.push(parseFloat(p));else if(p in operators){let n=operators[p],l=n.fn.length;if(l===1/0){let o=t.splice(-t.length);t.push(n.fn(...o))}else{let a=t.slice(-l);t.splice(-l),t.push(n.fn(...a))}}return t.pop()})((e=>{let t=[],p=[];for(let n of e)if(f(n))t.push(n);else if(n in operators){for(;p.length&&(p[p.length-1]in operators)&&("left"===operators[n].a&&operators[n].p<=operators[p[p.length-1]].p||"right"===operators[n].a&&operators[n].p<operators[p[p.length-1]].p);)t.push(p.pop());p.push(n)}else if("("===n)p.push(n);else if(")"===n){for(;p.length&&"("!==p[p.length-1];)t.push(p.pop());p.pop()}return t.concat(p.reverse())})(e.match(/-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?|[a-zA-Z]+|[+\-*/%^()]+|\*\*/g).filter(e=>!/^\s+$/.test(e))))}module.exports=mathExec