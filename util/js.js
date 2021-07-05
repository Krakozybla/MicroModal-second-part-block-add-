const container = document.querySelector('.container');
const btn = document.querySelector('.add-block');

btn.addEventListener('click', function(){
    createBlock();
})
function createBlock(){
    container.insertAdjacentHTML('beforeend', 
    `<div class="card">
    <label class="card-image">
        <input class="add-file" type="file">
        <img class="imag" src="" alt="">
        <button class="delite-photo">del</button>
    </label>
    <div class="card-wrapper">
        <label for="name">Описание картинки</label>
        <input name='descriptioCard' data-valid="notEmpty" class="inp"  type="text" id="name" placeholder="Лазурный берег">
    <div class="card-wrapper">
        <label for="name">Название на англиском</label>
        <input name='englishName' data-valid="notEmpty" class="inp" type="text" id="name" placeholder="Summer cafe">
    </div>
    <div class="card-wrapper">
        <label for="name">Заголовок слайда</label>
        <input name='logo' data-valid="notEmpty" class="inp" type="text" id="name" placeholder="Летнее Кафе">
    </div>
    <div class="card-wrapper">
        <label for="name">Текст на слайдере</label>
        <textarea name="text" data-valid="notEmpty" class="inp"  id="" cols="30" rows="10"></textarea>
    </div>
</div>
<div class="card-btns">
    <label class="download-file"> Add File
        <input type="file" class="add-pdf__file">
    </label>
    <button class="del">Delite</button>
</div>
<button class="removeCard">Remove</button>
</div>`) 
} 

container.addEventListener('click', function(e){
    if(e.target.classList.contains('removeCard')){
        let pane = e.target.closest('.card');
        console.log(pane);
        pane.remove();
    }
})
container.addEventListener('change', (e)=>{
    const link = e.target;
    if(link.classList.contains('add-file')){
        link.style.pointerEvents = "none"; 
        const doc = link.files[0];
        const availableSize = 100000;
        const nameDoc = doc.name;
        const idxDot = nameDoc.lastIndexOf(".") + 1;
        const extract = nameDoc.substr(idxDot, nameDoc.length).toLowerCase();
        if(extract !== 'png' && extract !== 'jpg'){
            alert("Only jpg/jpeg and png files are allowed!");
           return ''
        }
        if(doc.size > availableSize){
            alert('Too large size of the picture!');
            return '';
        }
        const image = link.nextElementSibling;
        const delImage = image.nextElementSibling;
        let reader = new FileReader()
        reader.onload = function(){
            image.src = reader.result;
            image.style.display ='block'
            delImage.style.display = 'block';
            //document.querySelector('.add-file').style.pointerEvents = "none"; 
        };
        reader.readAsDataURL(link.files[0]);
        delImage.addEventListener('click', function(){
            image.src = ' ';
            image.style = ' ';
            delImage.style.display = 'none';
        })
    }
})
container.addEventListener('change', (e)=>{
    const dowloadFile = document.querySelector('.download-file');
    const delBtn = document.querySelector('.del');
    const link = e.target;
    if(link.classList.contains('add-pdf__file')){
        const filesPDF = link.files[0];
        const fileName = filesPDF.name;
        const idxDot = fileName.lastIndexOf('.') + 1;
        const extract = fileName.substr(idxDot, fileName.length).toLowerCase();
        if(extract !== 'pdf'){
            alert('Input accepts onlu PDF file!')
            return ''
        }
        dowloadFile.style.display = 'none'
        delBtn.style.display = 'block'
    }
    delBtn.addEventListener('click', function(){
        dowloadFile.style = ' ';
        dowloadFile.style.display = 'block';
        delBtn.style.display = 'none'
    })
})
const sendData = async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
    });  
    if (!response.ok) {
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
    }  
    return await response.json();
}
const saveBlock = document.querySelector('.Save');
saveBlock.addEventListener('click', function(){
    const cards = document.querySelectorAll('.card');
    console.log(cards);
    const allData = []
    let map = false;
    let pattern = {
        notEmpty: /.+/,
    }
    cards.forEach(item=>{
        const dataObj = {}
        item.querySelectorAll('.inp').forEach(elem=>{
            let inp = elem;
            inp.value = inp.value.trim();
            let patterns = pattern[elem.dataset.valid];
            if(!patterns.test(inp.value)){
                inp.classList.add('input-err');
                map = true;
            }else{
                dataObj[inp.name] = inp.value;
            }
            allData.push(dataObj);
        })
    })
    if(map){
        alert('Inputs should not be empty!!');
    }
    const forma = new FormData()
    forma.set('info' , JSON.stringify(allData))
    sendData('http://12312312312' , forma)
})




/* -------------------old------------------------ 
let addFile = document.querySelector('.add-file');
let picture = document.querySelector('.imag');
let btnDel = document.querySelector('.delite-photo');
addFile.addEventListener('change', function(e){

    let reader = new FileReader()
    reader.onload = function(){
        picture.src = reader.result;
        picture.style.display ='block'
        btnDel.style.display = 'block';
    };
    console.log(reader.readAsDataURL(e.target.files[0]));
})

btnDel.addEventListener('click', deliteImage)
let del = document.querySelector('.del');

function deliteImage(){
    picture.src = '';
    picture.style = '';
    btnDel.style = '';
}


let file = document.querySelector('.add-pdf__file');
let downloadFile = document.querySelector('.download-file');
file.addEventListener('change', function(){
    const files = this.files[0];
    console.log(files);
    downloadFile.style.display = 'none'
    del.style.display = 'block'
    
})

del.addEventListener('click', removePDF);
function removePDF(){
    downloadFile.style = '';
    del.style.display = 'none'
}


let removeCard = document.querySelector('.remove-card');
let card = document.querySelector('.card');
removeCard.addEventListener('click', removeCards);

function removeCards(){
    card.remove();
}

*/

/*const sendData = async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
    });
  
    if (!response.ok) {
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
    }
  
    return await response.json();
  } */
