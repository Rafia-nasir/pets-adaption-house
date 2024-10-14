// creat removeActiveClass
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('single-btn')
    console.log(buttons)

    for (let btn of buttons) {
        btn.classList.remove('active')
    }
}
// creat loadPaddyCategories
const loadPaddyCategories = () => {

    fetch(' https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayPaddyCategories(data.categories))
        .catch((error => console.log(error)));
}

//   Creat  loadAllPaddyCategories
const loadAllPaddyCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => displayAllPaddyCategories(data.pets))
        .catch((error => console.log(error)));
}
// 
//  creat loadSinglePaddyCategories
const loadSinglePaddyCategories = (id) => {
    console.log(id)
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const activeButton = document.getElementById(`btn-${id}`)
            activeButton.classList.add('active')
            displayAllPaddyCategories(data.data)
        })
        .catch((error => console.log(error)));

}




// creat loadLikeButtons
  const loadLikeButton = async (petId) => {
    console.log(petId)

   

    const likeContainer=document.getElementById('sideBarPic')
    const singleImage=document.createElement('img')
    singleImage.src=petId;
    likeContainer.append(singleImage)
};

// creat loadDeatails button

const loadDeatailsButton = async (petId) => {
    console.log(petId)

    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetailsButton(data.petData)

    // console.log(data)
};

// creat display like button
   const displayLikeButton = (petData) => {
    console.log(petData)
    const likeContainer = document.getElementById('sideBarPic')
   likeContainer.innerHTML = `
  <img  src=${petData.image}/>`
  document.getElementById('sideBarPic').click();
   }



// creat display detail button
   const displayDetailsButton = (petData) => {
    console.log(petData)
    const detailsContainer = document.getElementById('modal-content')
    detailsContainer.innerHTML = `
   <img  src=${petData.image}/>

 <div class="px-0 py-3 ">
     <h2 class='font-bold'>${petData.pet_name || "Not found"}</h2>
    <div>
     <div class='flex gap-2 items-center justify-center'>
   
    
     <span>Breed:${petData.breed || "Not found"}</span>
     </div>
   
     <div>
     <i class="fa-sharp fa-solid fa-cake-candles"></i>
      <span>Birth:${petData.date_of_birth || "Not found"}<span>
     
     </div>
     <div class='flex justify-center items-center'>
     <i class="fa-solid fa-person-half-dress"></i>
      <h2>gender:${petData.gender || " Not found"}</h2>
      </div>
      <div>
     <i class="fa-solid fa-dollar-sign"></i>

      <span>price:${petData.price || "Not found"}<span>
      </div>
      <p>${petData.pet_details}</p>
      </div>
     
    </div>

`
    document.getElementById('showModalData').click();
}



const displayPaddyCategories = (categories) => {

    const categoryContainer = document.getElementById("categories")
  

    categories.forEach((item) => {

        const btnContainer = document.createElement('div');
        btnContainer.innerHTML =
            `
               <button    id="btn-${item.category}" onClick= "loadSinglePaddyCategories('${item.category}')"       class="flex  gap-2  justify-center  items-center  py-4
                border-4 px-10  mb-5   rounded-xl  single-btn">
                    
                   <img  src=${item.category_icon}  class="h-9"  />
                   <h3 class="font-bold text-xl">${item.category}</h3>
                    

               </button>
                  
                  `


        // add  button category container
        categoryContainer.appendChild(btnContainer)
    })

}










//  creat displayAllPaddyCategories

const displayAllPaddyCategories = (pets) => {
    console.log(pets)

    const petsContainer = document.getElementById('all-paddy-data');
    petsContainer.innerHTML = "";

    if (pets.length == 0) {
        petsContainer.classList.remove('grid');

        petsContainer.innerHTML = `
        <div class="text-center flex-col gap-4   flex justify-center items-center  ">
        <img src='./images/error.webp'>
        <h1 class='font-bold'>No information Available</h1>
        <p class='text-black'>Pet adoption is the process of transferring responsibility for a pet that was previously owned by another party.</br> Common sources for adoptable pets are animal shelters, rescue groups, or other pet owners. </p>
        </div>
        `;
        return
    } else {
        petsContainer.classList.add('grid');

    }

    pets.forEach(pet => {
        console.log(pet)

        const card = document.createElement('div');

        card.classList = "card card-compact "
        card.innerHTML = `
        <figure class='h-[200px]'>
    <img
      class='h-full w-full  object-cover'
      src=${pet.image}
      alt="Shoes" />
  </figure>
  <div class="px-0 py-3 ">
     <h2 class='font-bold'>${pet.pet_name || "Not found"}</h2>
    <div>
     <div class='flex gap-2 items-center justify-center'>
   
    
     <span>Breed:${pet.breed || "Not found"}</span>
     </div>
   
     <div>
     <i class="fa-sharp fa-solid fa-cake-candles"></i>
      <span>Birth:${pet.date_of_birth || "Not found"}<span>
     
     </div>
     <div class='flex justify-center items-center'>
     <i class="fa-solid fa-person-half-dress"></i>
      <h2>gender:${pet.gender || " Not found"}</h2>
      </div>
      <div>
     <i class="fa-solid fa-dollar-sign"></i>

      <span>price:${pet.price || "Not found"}<span>
      </div>
      </div>
     
    </div>

    <div>
     <button  onClick="loadLikeButton('${pet.image}')"   class='btn px-8 py-2 bg-slate-300'><i class="fa-solid fa-thumbs-up"></i></button>
     <button class='btn px-8 py-2 bg-red-100'>Adopt</button>
      
      <button onclick="loadDeatailsButton('${pet.petId}')" class='btn px-8 py-2 bg-red-100'>details</button>

    </div>
    
  </div>
       `;
        petsContainer.append(card)
    });

};


loadPaddyCategories()
loadAllPaddyCategories()