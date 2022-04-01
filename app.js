const invested_amount = document.querySelector('#invested')
const current_price = document.querySelector('#current_price')
const input_button = document.querySelector('.input_button')
const show_difference = document.querySelector('.show_difference')
const show_percentage = document.querySelector('.show_percentage')
const main_table = document.querySelector('.main_table')
const clear_button = document.querySelector('.clear_btn')
const show_details = document.querySelector('.show_details')

if(show_difference.innerText == "" || show_percentage.innerText == ""){
    show_difference.classList.add('hide')
    show_percentage.classList.add('hide')
}

// Retrieve data from local storage
const invested_local = JSON.parse(localStorage.getItem("combine")) ;

if(Array.isArray(invested_local)){
    clear_button.classList.add('show')
} else {
    clear_button.classList.remove('show')
}

let investedAmount;
let currentPrice;
let difference;
let differenceDecimal;
let percentage;

//creating arrays

let invested_array = []
let current_array = []
let difference_array = []
let percentage_array = []
let combined_array = []
let new_combine = [];

if(Array.isArray(invested_local)){
    invested_local.forEach(each => {
       combined_array.push(each)
       
    })
}
//adding data from local to dom

const tr1 = document.createElement('tr')
const td11 = document.createElement('td')
const td22 = document.createElement('td')
const td33 = document.createElement('td')
const td44 = document.createElement('td')

if(Array.isArray(invested_local)){
    invested_local.forEach(each => {
        const tr1 = document.createElement('tr')
        
        for(let i = 0; i < each.length; i++){
            const td = document.createElement('td')
            td.innerText = each[i];

            if(i === each.length - 1){
                td.innerText = `${each[i]} %`
            }
            console.log(each[1])

            if(each[i] > 0){
                td.classList.add('green')
            } else {
                td.classList.add('red')
            }
 

            td.classList.add('list_td_edit')
            tr1.appendChild(td)

        }
        
        main_table.appendChild(tr1)
    })
}





input_button.addEventListener('click', () => {

    
    
    if(invested_amount.value == "" || current_price.value == ""){
        alert("All Fields Are Required")
        return;
    }
    clear_button.classList.add('show')

    investedAmount = invested_amount.value;
    currentPrice = current_price.value;

    invested_array.push(investedAmount)
    current_array.push(currentPrice)
    difference_array.push(difference)
    percentage_array.push(percentage)
    console.log(invested_array)

    
    
    calculateTheGrowth()
    createListings()
})


    




function calculateTheGrowth(){

    difference = currentPrice - investedAmount;
    differenceDecimal = difference / investedAmount;
    percentage = (differenceDecimal * 100).toFixed(2);
    show_details.classList.add('show2')
    show_difference.classList.remove('hide')
    show_percentage.classList.remove('hide')
    show_difference.innerText = `Difference : ${difference}`;
    show_percentage.innerText = `Percentage : ${percentage}%`;

    if(difference > 0){
        show_difference.classList.add('green')
        show_difference.classList.remove('red')
    } else {
        show_difference.classList.add('red')
        show_difference.classList.remove('green')
    }

    if(percentage > 0){
        show_percentage.classList.add('green')
        show_percentage.classList.remove('red')
    } else {
        show_percentage.classList.add('red')
        show_percentage.classList.remove('green')
    }

    invested_amount.value = "";
    current_price.value = "";
    
    

}

function createListings(){
    const tr = document.createElement('tr')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')
    const td4 = document.createElement('td')
    
    
    td1.innerText = investedAmount
    td2.innerText = currentPrice
    td3.innerText = difference
    td4.innerText = `${percentage} %`

    if(difference > 0){
        td3.classList.add('green')
        td4.classList.add('green')
    } else {
        td3.classList.add('red')
        td4.classList.add('red')
    }

    const td_array = [td1, td2, td3, td4];
    new_combine = [investedAmount, currentPrice, difference, percentage]
    combined_array.push(new_combine)
    console.log(combined_array)
    window.localStorage.setItem("combine", JSON.stringify(combined_array))

    td_array.forEach(single_td => single_td.classList.add('list_td_edit'))

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    main_table.appendChild(tr)

    
    
    
}

clear_button.addEventListener('click', () => {
    window.localStorage.removeItem('combine')
    location.reload();
})






