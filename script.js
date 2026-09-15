

let filters= {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
}

const imageCanvas= document.querySelector("#image-canvas");
const imageInput=document.querySelector("#image-input");

const resetButton=document.querySelector("#reset-btn");

const downloadButton=document.querySelector("#download-btn")

const filtersContainer=document.querySelector(".filters");

const presetsContainer=document.querySelector(".presets");

let file=null;
let image=null;
const canvasCtx=imageCanvas.getContext("2d");



function createFilterelement(name, unit,value,min,max){
    const div= document.createElement("div");
    div.classList.add("filter");
    const input=document.createElement("input");
    input.type="range",
    input.min=min
    input.max=max
    input.value=value
    input.id=name

    const p= document.createElement("p");
    p.innerText=name;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input",(event)=>{
        filters[name].value=input.value
        
        applyFilter();

    })

    return div;
}


function createFilters(){
Object.keys(filters).forEach(key=>{
    const filterElement= createFilterelement(key,filters[key].unit,filters[key].value,filters[key].min,filters[key].max);

    filtersContainer.appendChild(filterElement);
    
})
}

createFilters();

imageInput.addEventListener("change",(event)=>{
    const file=event.target.files[0];
    const imagePlaceholder=document.querySelector(".placeholder");
    imagePlaceholder.style.display="none"
    imageCanvas.style.display="block"
    
    const img=new Image();
    img.src=URL.createObjectURL(file);
    img.onload=()=>{
        image=img
        imageCanvas.width=img.width
        imageCanvas.height=img.height
        canvasCtx.drawImage(img,0,0)

    }
})

function applyFilter() {
    if (!image) return;

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
        grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
    `;

    canvasCtx.drawImage(image, 0, 0);
}

resetButton.addEventListener("click",()=>{
    filters= {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
}
   applyFilter();
   filtersContainer.innerHTML="" 
   createFilters();
})

downloadButton.addEventListener("click",()=>{
    const link=document.createElement("a")
    link.download="edited-image.png"
    link.href=imageCanvas.toDataURL()
    link.click()
})

const presets = {
    drama: {
        brightness: 105,
        contrast: 145,
        saturation: 115,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 105,
        contrast: 90,
        saturation: 75,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 35,
        opacity: 100,
        invert: 0
    },

    softGlow: {
        brightness: 110,
        contrast: 90,
        saturation: 105,
        hueRotation: 0,
        blur: 1,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0
    },

    noir: {
        brightness: 95,
        contrast: 150,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    warmSunset: {
        brightness: 105,
        contrast: 110,
        saturation: 125,
        hueRotation: 350,
        blur: 0,
        grayscale: 0,
        sepia: 25,
        opacity: 100,
        invert: 0
    },

    coolTone: {
        brightness: 100,
        contrast: 110,
        saturation: 90,
        hueRotation: 190,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    oldSchool: {
        brightness: 105,
        contrast: 85,
        saturation: 65,
        hueRotation: 0,
        blur: 0,
        grayscale: 10,
        sepia: 40,
        opacity: 100,
        invert: 0
    },

    faded: {
        brightness: 115,
        contrast: 75,
        saturation: 60,
        hueRotation: 0,
        blur: 0,
        grayscale: 5,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    retroPop: {
        brightness: 105,
        contrast: 130,
        saturation: 160,
        hueRotation: 5,
        blur: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    }
};

Object.keys(presets).forEach(presetname =>{
    const presetButton= document.createElement("button");
    presetButton.classList.add("btn");
    presetButton.innerText=presetname
    presetsContainer.appendChild(presetButton);

    presetButton.addEventListener("click",()=>{
        const preset=presets[presetname];
        Object.keys(preset).forEach(filterName=>{
            filters[filterName].value=preset[filterName]
        })
        applyFilter();
         filtersContainer.innerHTML="" 
   createFilters();
    })

})