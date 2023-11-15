'use strict'
// 'GLOBAL VARIABLES'
const canvas=document.querySelector('canvas');
const fillcolor=document.getElementById('fill-color'),
sizeSlider=document.getElementById('size-slider'),
colorPicker=document.querySelectorAll('.colors .option'),
colorPickers=document.getElementById('color-picker'),
clearCanvasBtn=document.querySelector('.clear-canvas'),
saveImgBtn=document.querySelector('.save-img')
// setCanvasBacground=()=>{
//     ctx.fillStyle='#fff'
//     ctx.fillRect(0,0,canvas.width,canvas.height)
//     // ctx.fillStyle=selectedColor
// }


let ctx=canvas.getContext("2d");
let isDrawing=false;
let brushWidth=5,
toolBtn=document.querySelectorAll('.tool'),
prevMouseX,
prevMouseY,
selectedTool='brush',
snapshot,
brushColor='#000'
// SET CANVAS WIDTH AND HEIGHT
window.addEventListener('load',()=>{
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
    // setCanvasBacground()
})
//tool btn
toolBtn.forEach(btn=>{
    btn.addEventListener('click',()=>{
        document.querySelector('.options .active').classList.remove('active')
        btn.classList.add('active')
selectedTool=btn.id
        // console.log(selectedTool);
    })
})






/// =--------------SizeSlider

sizeSlider.addEventListener('change',()=>{
    brushWidth=sizeSlider.value
})


///   ClearBtn   SaveBtn


clearCanvasBtn.addEventListener('click',()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
})



///Save btn img

saveImgBtn.addEventListener('click',()=>{
    const link=document.createElement('a')
    link.download=`Nizomjon-paint${Date.now()}.png`
    link.href=canvas.toDataURL()
    link.click()
})



//  =---------ColorPicker

colorPicker.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        document.querySelector('.options .selected').classList.remove('selected')
        btn.classList.add('selected')
        const bgColor=window.getComputedStyle(btn).getPropertyValue('background-color')
        brushColor=bgColor
        console.log(bgColor );
    })
})



//colr pickers


colorPickers.addEventListener('change',()=>{
    console.log(colorPickers.parentElement);
    colorPickers.parentElement.style.background=colorPickers.value
    colorPickers.parentElement.click()
})

//start drawing

const startDraw=(e)=>{
    console.log(e);
    isDrawing=true;
    prevMouseX=e.offsetX
    prevMouseY=e.offsetY
    console.log(prevMouseX);
    ctx.beginPath()
    ctx.lineWidth=brushWidth
    ctx.strokeStyle=brushColor
    ctx.fillStyle=brushColor
    snapshot=ctx.getImageData(0,0,canvas.width,canvas.height)
    console.log(snapshot);
}

//drawrectangle

const drawRectangle=e=>{
    !fillcolor.checked

       ?  ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX-e.offsetX,prevMouseY-e.offsetY)
    
      : ctx.fillRect(e.offsetX, e.offsetY, prevMouseX-e.offsetX,prevMouseY-e.offsetY)
    
}
const drawCircle=e=>{
    ctx.beginPath()
    const radius=Math.sqrt(Math.pow(prevMouseX-e.offsetX,2))+Math.pow(prevMouseY-e.offsetY,2)
    ctx.arc(prevMouseX,prevMouseY,radius,0,2*Math.PI)
    ctx.stroke()
    fillcolor.checked ? ctx.fill() : ctx.stroke()
}
const drawTriangle=e=>{
    ctx.beginPath()
    ctx.moveTo(prevMouseX,prevMouseY)
    ctx.lineTo(e.offsetX,e.offsetY)
    ctx.lineTo(prevMouseX*2-e.offsetX,e.offsetY)
    ctx.closePath()
    fillcolor.checked ? ctx.fill():ctx.stroke()
    // ctx.stroke()

}
const stopDraw=()=>{
    isDrawing=false
    ctx.beginPath()
    ctx.lineWidth=brushWidth
    
}
const drawing=e=>{
    if(!isDrawing)return
    ctx.putImageData(snapshot,0,0)
        switch (selectedTool) {
            case 'brush':
                
                ctx.lineTo(e.offsetX,e.offsetY)
                    
                
                console.log(e.offsetX);
                console.log(e.offsetY);
                ctx.stroke()
                break;
case 'rectangle':
    drawRectangle(e)    
    break;    
    case 'circle':
        drawCircle(e)
        console.log(e);
        break;
        case 'triangle':
            drawTriangle(e)
            break;
            case 'eraser':
                ctx.strokeStyle="#fff"
                ctx.lineTo(e.offsetX,e.offsetY)
                ctx.stroke()
                break;
            default:
                break
        
        // ctx.moveTo(50,50)
}}
canvas.addEventListener('mousedown',startDraw)
canvas.addEventListener('mouseup',stopDraw)
canvas.addEventListener('mousemove',drawing)