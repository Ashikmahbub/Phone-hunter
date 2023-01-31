const loadPhone = async (searchText, datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, datalimit);
}
const displayPhones = (phones, datalimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    const showAll = document.getElementById('btn-showAll');
    if (datalimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');


    }
    else {
        showAll.classList.add('d-none');
    }




    // display no phone
    const noPhone = document.getElementById('no-phone');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');

    }
    else {
        noPhone.classList.add('d-none');

    }



    // display all phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');

        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top fluid" alt="...">
            <div class="card-body">
                <h2>${phone.brand}</h2>
                <h5 class="card-title">${phone.phone_name}</h5>
                
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
                <button  onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>

            </div>
        </div>
        
        
        
         
        `
        phoneContainer.appendChild(phoneDiv);
        // stop loader 
        toggleSpinner(false);

    })



}
const processSearch = (datalimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    loadPhone(searchText, datalimit);

}
document.getElementById('search-btn').addEventListener('click', function () {


    processSearch(10);



})
// search input field enter key 
document.getElementById('search-field').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        processSearch(10);
    }
})
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

// load showall items 
document.getElementById('btn-showAll').addEventListener('click', function () {

    processSearch();


})
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhonesDetails(data.data);


}
const displayPhonesDetails = phone => {

    const phoneTitle = document.getElementById('phone-title');
    phoneTitle.innerText = phone.name;

    const phoneDetails = document.getElementById('phone-details');
    console.log(phone.releaseDate);
    phoneDetails.innerHTML = `
                <img src="${phone.image}">
                <h6>Release Date:${phone.releaseDate
                }</h6>
                <h6>Sensors: ${phone.mainFeatures.sensors}</h6>
                <h6>Chipset:${phone.mainFeatures.chipSet}</h6>
                <h6>Display:${phone.mainFeatures.displaySize}</h6>
                <h6>Memory:${phone.mainFeatures.memory}</h6>
                

   
   `
   phoneDetails.appendChild

}
loadPhone();

