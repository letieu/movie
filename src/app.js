

let search = document.getElementById('search');
let input = document.getElementById('key');
let result = document.getElementById('movies');
let modal = document.getElementById('bg');
let film = null;

modal.addEventListener('click',function(event){
    if(event.target == this || event.target.id == 'ok'){
        this.style.display = 'none'
    }
})
search.addEventListener('click',()=>{
    find(input.value);
});


function find(key){
    axios.get(`src/search.php?key=${key}`)
        .then(response=>{
            loadMovies(response.data.movies)
        })
        .catch(error=>{console.log(error) })
        
}

function check(event,link){
    showModal('loading');
    event.preventDefault();
    film = link;
    console.log(film)
    axios.get(`src/check.php?film=${link}`)
        .then(response=>{
            showModal(response.data.q,link);
        })
}


function showModal(haveHD,link= null){
    
    let message = modal.querySelector('.card-title');
    let option = modal.querySelector('.option');
    if (haveHD == 'loading'){
        message = 'loading ....';
    }
    else if (haveHD){
        message.textContent = 'Đã có bản đẹp';
        option.innerHTML = `<a href="https://phimmoi.net/${link}" > Xem ngay </a>`;
    }else{
        message.textContent = 'Phim Hiện chưa có bản đẹp';
        option.innerHTML = `
        <p>Điền email để nhận thông báo sớm nhất </p>
        <div class="input-group mb-3">
  <input id='mail' type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
  <div class="input-group-append">
    <button id='ok' class="btn btn-outline-secondary" type="button" onclick="addMail()">Ok</button>
  </div>
</div>` ;
    }
    
    modal.style.display = 'block';
}
function loadMovies(movies){
    result.innerHTML='';
    movies.forEach(movie => {
        let card = `<div class="card col-md-3 position-relative  mb-10" style="width: 12rem;">
        <img class="card-img-top" src="${movie.style}" alt="title" >
        <div class="card-body">
          <h5 class="card-title" style='font-size:16px; height:100px'>${movie.title}</h5>
          <button class="btn btn-primary position-absolute" style="bottom:5px" onclick='check(event,"${movie.link}")'>Subscrise</button>
        </div>
      </div>`;
        result.innerHTML += card; 
        
    });
}


function addMail(){
    let mail = document.getElementById('mail').value;

    axios.post('src/sql.php?mail',{mail,film})
    .then(response=>{
        console.log(response)
    })
}

window.onload = ()=>{
    find('wonder woman')
}
