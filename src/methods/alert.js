export default function alert(type,message){
    let ele = document.querySelector(`.alert-${type}`)
    ele.textContent = message
    ele.style.display = "block"
    setTimeout(() => {
        ele.style.display = "none"
    }, 1500);
}