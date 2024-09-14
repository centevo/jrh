const c = document.querySelector('canvas')
const ctx = c.getContext('2d')
let cw = c.width = innerWidth
let ch = c.height = innerHeight

const ticks = Array(200)
const dur = 4

for (let i=0; i<ticks.length; i++){
  ticks[i] = {
    x1:0, x2:0, y1:0, y2:0,
    lineWidth: 60,
    angle: i / ticks.length * Math.PI * 2,
    r: 390,
    h: 145+ gsap.utils.wrapYoyo(0, 80, i/ticks.length*160)
  }
}

const tl = gsap.timeline({onUpdate:update})
.fromTo(ticks, {
  x1:(i,t)=> Math.cos(t.angle)*t.r,
  y1:(i,t)=> Math.sin(t.angle)*t.r,
  x2:(i,t)=> Math.cos(t.angle)*t.r*-1.1,
  y2:(i,t)=> 0,//Math.sin(t.angle)*t.r*-1.1,
},{
  x1:(i,t)=> Math.cos(t.angle)*t.r*.7,
  y1:(i,t)=> Math.sin(t.angle)*t.r*.7,
  x2:(i,t)=> Math.cos(t.angle)*t.r*.25,
  y2:(i,t)=> Math.sin(t.angle)*t.r*.25,
  duration:dur,
  ease:'power3.inOut',
  stagger:{amount:dur*10, from:0, repeat:-1, yoyo:true}
}, 0)
.to(ticks, {
  lineWidth: 1,
  duration:dur*.5,
  h:'+=90',
  // ease:'circ.inOut',
  // ease:'power4',
  // yoyoEase:'power2.in',
  stagger:{amount:dur*2, from:'end', repeat:-1, yoyo:true}
}, 0)
.play(999)


function drawPath(t){
  ctx.strokeStyle = 'hsl('+t.h+',100%,50%)'
  ctx.lineCap = "round"
  ctx.lineWidth = t.lineWidth
  ctx.setLineDash([t.lineWidth/2, 40])
  ctx.beginPath()
  ctx.moveTo(t.x1+cw/2, t.y1+ch/2);
  ctx.lineTo(t.x2+cw/2, t.y2+ch/2);
  ctx.stroke();
}

function update(){
  ctx.clearRect(0,0,cw,ch)
  ctx.globalCompositeOperation = "lighter"
  ticks.forEach(drawPath)
}

window.onresize = ()=>{
  cw = c.width = innerWidth
  ch = c.height = innerHeight
  update()
}

window.onpointerup =()=>{ //toggle play/pause on click
   gsap.to(tl, {
     duration:1.2,
     ease:'sine.inOut',
     timeScale:( tl.isActive() ? 0 : 1 )
   })
}