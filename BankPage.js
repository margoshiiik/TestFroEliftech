/* 

    todo: 

    1. save banks
    3. readMe

    additional: 
    1. you sure you want to delete? //DONE
    2. sorting 
    3. alert //DONE

    
    done:
    1. validation function
    2. delete button 
    3. add button
    4. change button 
    5. add loanTerm
    2. field for count 
    



*/

let bankArray = []; 


//constructor for bank
function Bank(name, interestRate, maxLoan, minPayment, loanTerm){ 
    this.name = name;
    this.interestRate = interestRate; 
    this.maxLoan = maxLoan; 
    this.minPayment = minPayment; 
    this.loanTerm = loanTerm;

    this.addBank = function() {
        return bankArray.unshift(this); 
    }

}


//default bank
let first = new Bank('Financial Partner Bank', 6.5, 900000, 1, 30);  
first.addBank();
let second = new Bank('Rainy Days Banks', 7, 1000, 7, 10);  
second.addBank();
let third = new Bank('Edge Of The River', 4, 60000, 10, 20);  
third.addBank();


//showing banks on the page
let drawBanks = () => {
    let mainContainer = document.getElementById('main');
    mainContainer.innerHTML = ''; 

    const dropdown = document.getElementById('chooseBank');
    dropdown.innerHTML = `<option selected>Choose the Bank</option>`;

    bankArray.forEach((bank, index) =>{
        const content = document.createElement('div'); 
        content.innerHTML = `
        <div class="grid-item" id='element${index}'>
          <h3>${bank.name}</h3>
          <p>Interest Rate = ${bank.interestRate}%</p>
          <p>Maximum Loan = ${bank.maxLoan}$</p>
          <p>Minimum Payment = ${bank.minPayment}%</p>
          <p>Loan Term = ${bank.loanTerm} years</p>
          <div class="text-center">
          
          <button type="button" class="btn btn-light" id="change${index}">Change</button>
          <button type="button" class="btn btn-secondary" id="delete${index}">Delete</button>
        </div>
        </div>`;

        mainContainer.appendChild(content);

        const drop = document.createElement('option'); 
        drop.innerHTML = `<option value="${index}">${bank.name}</option>`; 

        dropdown.appendChild(drop);

        addAction(index); 

    }

    
)};

drawBanks();

//add action on the banl cards
function addAction(index) { 
    let id = 'delete' + index; 
    document.getElementById(id).addEventListener('click', () => {
        if (confirm("Are you sure you want to delete it?") == true) {
            bankArray.splice(index, 1); 
            drawBanks();
            console.log(bankArray);
        } else {
        
        }
    }); 

    let id2 = 'change' + index; 
        
        var modal = document.getElementById("myModal2");

        document.getElementById(id2).addEventListener('click', () => {
            modal.style.display = "block";
            let span = document.getElementsByClassName("close2")[0];
            console.log(span);

            span.onclick = function() {
                modal.style.display = "none";
            }

            window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
            }


            let bankName = document.getElementById('bankName');
            let bankInterestRate = document.getElementById('bankInterestRate'); 
            let bankMaxLoan = document.getElementById('bankMaxLoan'); 
            let bankMinPayment = document.getElementById('bankMinPayment'); 
            let bankLoanTerm = document.getElementById('bankLoanTerm'); 

            bankName.value = bankArray[index].name;
            bankInterestRate.value = bankArray[index].interestRate;
            bankMaxLoan.value = bankArray[index].maxLoan;
            bankMinPayment.value = bankArray[index].minPayment;
            bankLoanTerm.value = bankArray[index].loanTerm;

            document.getElementById('changeButton').addEventListener('click', () => {

                if(validation(bankName.value, bankInterestRate.value, bankMaxLoan.value, bankMinPayment.value, bankLoanTerm.value)) {

                    console.log('hi');

                    let thisContent = document.getElementById('element' + index); 
                    
                    bankArray[index].name = bankName.value; 
                    bankArray[index].interestRate = bankInterestRate.value; 
                    bankArray[index].maxLoan = bankMaxLoan.value; 
                    bankArray[index].minPayment = bankMinPayment.value; 
                    bankArray[index].loanTerm = bankLoanTerm.value; 

                    console.log(bankArray[index]);
                    console.log(bankArray);
                    

                    thisContent.innerHTML = ''; 
                    thisContent.innerHTML = `
                    <h3>${bankArray[index].name}</h3>
          <p>Interest Rate = ${bankArray[index].interestRate}%</p>
          <p>Maximum Loan = ${bankArray[index].maxLoan}$</p>
          <p>Minimum Payment = ${bankArray[index].minPayment}%</p>
          <p>Loan Term = ${bankArray[index].loanTerm} months</p>
          <div class="text-center">
          
          <button type="button" class="btn btn-light" id="change${index}">Change</button>
          <button type="button" class="btn btn-secondary" id="delete${index}">Delete</button>
                    `

                    addAction(index); 

                    modal.style.display = "none";
                }


                else{
                    bankName.value = bankArray[index].name;
                    bankInterestRate.value = bankArray[index].interestRate;
                    bankMaxLoan.value = bankArray[index].maxLoan;
                    bankMinPayment.value = bankArray[index].minPayment;
                    bankLoanTerm.value = bankArray[index].loanTerm;
                };
            })


        });



}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//validation for add form
function validation(name, interestRate, maxLoan, minPayment, loanTerm){
    if(name.replace(/ /g, ' ') == '' || name == ''){
        swal("Oh!", "Name of bank should contain symbols", 'error');
        return false;
    }

    else if(interestRate<0 || interestRate > 100 || interestRate == '') {
        swal("Oh!", "Interest Rate should be in the range between 0 and 100", 'error');
        return false; 
    }

    else if(maxLoan < 0 || maxLoan == ''){
        swal("Oh!", "Maximum Loan should be more than 0", 'error');
        return false;
    }

    else if(minPayment < 0 || minPayment > 100 || minPayment == ''){
        swal("Oh!", "Minimum Payment should be in the range between 0 and 100", 'error');
        return false; 
    }

    else if(loanTerm <= 0 || loanTerm == ''){
        swal("Oh!", "Loan Term should be more than 0", 'error');
        return false;
    }

    else return true;
}

//adding new bank
function addNewBank(){
    let name = document.getElementById('newName').value;
    let interestRate = document.getElementById('newInterestRate').value;
    let maxLoan = document.getElementById('newMaxLoan').value; 
    let minPayment = document.getElementById('newMinPayment').value;
    let loanTerm = document.getElementById('newLoanTerm').value; 

    if(validation(name, interestRate, maxLoan, minPayment, loanTerm)) {
         let newBank = new Bank(name, interestRate, maxLoan, minPayment, loanTerm);
         newBank.addBank(); 
         drawBanks();
         let modal = document.getElementById("myModal");
         modal.style.display = "none";
    };

        document.getElementById('newName').value = '';
        document.getElementById('newInterestRate').value = '';
        document.getElementById('newMaxLoan').value = '';
        document.getElementById('newMinPayment').value = '';
        document.getElementById('newLoanTerm').value = '';
        
}

//counting monthly morgage
function countMorgage(){

    let initialLoan = document.getElementById('countInitial').value; 
    let downPayment = document.getElementById('countDown').value; 
    let countBank = document.getElementById('chooseBank').value; 
    let monthlyPayments = 0; 


    const bank = bankArray.find(element => element.name == countBank);
    let percent = 0; 

    if(downPayment > 0) percent = (downPayment * 100) / initialLoan; 
    console.log(percent);

    if(bank == undefined) 
        swal("Oh!", "You should choose a bank", 'warning')
    

    else if (initialLoan < 0 || initialLoan == ''){
        swal("Oh!", "The initial loan should be more than 0", 'error')
        document.getElementById('countInitial').value = ''
    }
    

    else if(initialLoan > bank.maxLoan){
        swal("Oh!", "This bank maximum loan is smaller than your requaired initial loan", 'error')
        document.getElementById('countInitial').value = ''
    }

    else if(downPayment < 0 || downPayment == ''){
        swal("Oh!", "The down payment should be bigger than 0", 'error')
        document.getElementById('countDown').value = ''
    }

    else if(percent < bank.minPayment) {
        swal("Oh!", "Your down payment is smaller than your bank require", 'error'); 
        document.getElementById('countDown').value = ''
    }

    else { 
        let n = bank.loanTerm * 12; 
        let r = bank.interestRate / 100 / 12; 
        let money = initialLoan - downPayment; 
        monthlyPayments = (r * money * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1);

        swal(monthlyPayments.toFixed(2) + '$', 'This is your monthly payment!', 'success')
    }

    console.log(monthlyPayments); 

    
}; 


