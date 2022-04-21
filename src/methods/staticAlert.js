export default function staticAlert(type,message){
    let ele = document.querySelector('.alert-dismissible')
    ele.style.display = "block"
    if(type === 'danger'){

        ele.classList.remove('alert-success')
        ele.classList.add('alert-danger')
    }
    else{
        ele.classList.remove('alert-danger')
        ele.classList.add('alert-success')
    }

    ele.innerHTML = `${message} <button
    type="button"
    class="close"
    data-dismiss="alert"
    aria-label="Close"
  >
    <span aria-hidden="true">&times;</span>
  </button>`
}