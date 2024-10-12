// creat loadPaddyCategories


const loadPaddyCategories = () => {

    fetch(' https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayPaddyCategories(data.categories))
        .catch((error => console.log(error)));
}

// creat loadAllPaddyCategories

const loadAllPaddyCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => displayAllPaddyCategories(data.pets))
        .catch((error => console.log(error)));
}

const loadSinglePaddyCategories=(id)=>{
    console.log(id)
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then(res => res.json())
    .then(data => displayAllPaddyCategories (data.data))
    .catch((error => console.log(error)));

}

// creat displayPaddyCategories

const displayPaddyCategories = (categories) => {

    const categoryContainer = document.getElementById("categories")
   
    categories.forEach((item) => {

        const btnContainer = document.createElement('div');
        btnContainer.innerHTML =
            `
               <button onClick= "loadSinglePaddyCategories('${item.category}')"          class="flex  gap-2  justify-center  items-center  py-4    border-4 px-10  mb-5   hover:bg-sky-100 rounded-xl ">
                    
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
    petsContainer.innerHTML="";

    if(pets.length=0){
        petsContainer.innerHTML= `
        <div></div>
        `
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
   
    
     <span>Breed:${pet.breed||"Not found"}</span>
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

    
    
  </div>
       `;
        petsContainer.append(card)
    });

};


loadPaddyCategories()
loadAllPaddyCategories()