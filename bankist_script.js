const account1={
  owner:'mohd kaif',
  movements:[3000,-2000,3400,-1500,-1900,4000],
  intrestRate:1.3,
  pin:1111,
  movemnt_dates:["14 may 2022 10:32","30 may 2022 08:34","28 jun 2022 12:58","2 dec 2022 6:23","1 march 2023 9:38","3 march 2023 7:34"],
  local:"hi-IN",
  currency:"INR"
}
const account2={
    owner:'fahad saifi',
    movements:[12000,-3500,-4500,2000,-15000,14000],
    intrestRate:1.5,
    pin:2222,
    movemnt_dates:["10 may 2022 10:23","24 may 2022 4:34","28 may 2022 3:58","4 dec 2022 09:23","12 feb 2023 9:23","16 feb 2023 8:40"],
    local:"en-PT",
    currency:"USD"
  }
const account3={
    owner:'salman saifi',
    movements:[15000,14000,-5600,-3400,3700,-4000],
    intrestRate:0.8,
    pin:3333,
    movemnt_dates:["20 april 2022 12:23","22 april 2022 08:33","08 may 2022 04:32","12 may 2022 09:23","18 may 2022 6:23","2 march 2023 02:23"],
    local:"ar-SY",
    currency:"syp"
  }
const account4={
    owner:'jack smith',
    movements:[12000,-3000,-4000,5000,3100,-3200],
    intrestRate:0.8,
    pin:4444,
    movemnt_dates:["18 april 2022 2:23","20 april 2022 07:32","09 nov 2022 08:32","17 dec 2022 03:23","19 dec 2022 06:23","12 jan 2023 04:23"],
    local:"en-GB",
    currency:"GBP"
    // currency:
}
// console.log(account4.currency)
const accounts=[account1,account2,account3,account4];

// user define selector
let account_detect=0;
let balance=0;
let interest=0;
let logout;

let balance_valueElm=document.querySelector(".balance_value");
let  app_container=document.querySelector(".bankist_app");
// console.log(app_container)
let nav_btn=document.querySelector("#nav_btn");
let user_inputElm=document.querySelector("#user");
let pin_inputElm =document.querySelector("#pin");
let nav_title=document.querySelector("nav p");

//  selector of movement
let movement_wraper=document.querySelector(".movement_wraper");
let summary_in_Elm=document.querySelector(".summary_value_in");
let  summary_out_Elm=document.querySelector(".summary_value_out");
let summary_intrest_Elm=document.querySelector(".summary_value_intrest");
// console.log(summary_intrest_Elm)

// selector features transfer money
let transferMoney_user_filed=document.querySelector(".transfer_to_user");
let transferMoney_amount_filed=document.querySelector(".transfer_to_amount");
let transfer_btn=document.querySelector(".transer_btn");
// console.log(transfer_btn)
 
// selector feature close account
let close_acc_btn=document.querySelector(".close__account_btn");
let close_acc_userFilled=document.querySelector(".close_account_user_filled");
let close_acc_pinFilled=document.querySelector(".close_account_pin_filled");

//selector feature request loan
let loan_btn=document.querySelector(".loan_btn");
let loan_filled=document.querySelector(".loan_filled");

// sort btn selector
let sort_btn=document.querySelector(".sort");

//timer element selector
let logout_Timer_Elm=document.querySelector(".logout_time");

 //formate date
  function formate_date(date,locDate){
    let dates=new Date(date);
    let date_with_local_TIME=new Intl.DateTimeFormat(locDate).format(dates)
    let now=new Date();
    let calcDate=(acDATE,nw)=>Math.floor((nw-acDATE)/(1000*60*60*24));
     if(calcDate(dates,now)<1){
      return "Today"
     }
     else if(calcDate(dates,now)==1){
       return "yesterday";
     }
     else{
      return date_with_local_TIME;
     }
  }

  // FORMATE currency
   function format_Move(loc,items,cur){
    let options={style:"currency",currency:"INR"}
    let format_cur=new Intl.NumberFormat(loc,options).format(items)
    console.log(format_cur)  
    return format_cur;
   }

// display movement 
function display(acc,sort=false){
  movement_wraper.innerHTML="";
  const sortElm=(sort)?acc.movements.slice().sort((a,b)=>a-b):acc.movements;
  sortElm.forEach((items,ind) => {
    // const sortDate=(sort)?acc.movemnt_dates.slice().sort():acc.movemnt_dates;
    let dated=formate_date(acc.movemnt_dates[ind],acc.local);
    let formatMove=format_Move(acc.local,items);
    let type=items>0?"deposit":"widthdraw";
    let html=`<div class="movements__row">
        <div class="movements__type movement__type_${type}">${ind+1} ${type}</div>
        <div class="movements__date">${dated}</div>
        <div class="movements__value">${formatMove}</div>
     </div>`;
     movement_wraper.insertAdjacentHTML("afterbegin",html);
  });  
}

// create balance and show
let calcDisplayBalance=function(acc){
balance=acc.movements.reduce((add,cur)=>add+cur,0);
console.log(balance)
interest=Math.floor((account1.intrestRate*balance)/100);
acc.balanceAmount=balance+interest;
balance_valueElm.textContent=format_Move(acc.local,acc.balanceAmount);
}

// update  summary value 
let creatSummary=function(acc){
  let summary_in=acc.movements.filter(mov=>mov>0).reduce((add,mov)=>add+=mov,0);
  let summary_out=balance-summary_in;
  summary_in_Elm.textContent=format_Move(acc.local,summary_in);
  summary_out_Elm.textContent=format_Move(acc.local,Math.abs(summary_out));
  summary_intrest_Elm.textContent=format_Move(acc.local,interest);
}

// create username from owner
let creatUserName=function(accs){
   accs.forEach(acc => {
   acc.username= acc.owner.toLowerCase().split(" ").map(name=>name[0]).join("");    
   });
}
creatUserName(accounts)

// update ui its mean change balanceAmount after feature use 
let updateUI=function(acc_dec){
  calcDisplayBalance(acc_dec);
  display(acc_dec);
  creatSummary(acc_dec);
}

// logout timer code
  function LogOut_Timer(){
    //  console.log("hello kaif")
    let time=120;
      logout=setInterval(function(){
      let minute=Math.floor(time/60);
      let sec=Math.floor(time%60);
      logout_Timer_Elm.innerHTML=`${minute}`.padStart(2,0)+":"+`${sec}`.padStart(2,0);
      time--;
      if(time==0){
        clearTimeout(logout);
        app_container.style="display:none";
        user_inputElm.value="";
        pin_inputElm.value="";
        nav_title.innerHTML="Login in to get storted"
      }
    },1000)
    return logout;
  }

// login btn code start
nav_btn.addEventListener("click",function(e){
e.preventDefault();
  let user_name=user_inputElm.value;
  let user_pin=pin_inputElm.value; 
  timer=120;
account_detect=accounts.find(acc=>acc.username==user_name);
 
if(account_detect?.pin==user_pin){
  app_container.style.display="block";
  nav_title.textContent=`Welcome back,${account_detect.owner.split(" ")[0]}`;
  updateUI(account_detect)

  if(logout) clearInterval(logout)
  logout=LogOut_Timer()
  // console.log(LogOut_Timer())
}
else{
   alert("something error..")
}
})

// // transfer btn code start
transfer_btn.addEventListener("click",function(e){
  e.preventDefault();
  let amount=Number(transferMoney_amount_filed.value);
  let reciever=accounts.find(acc=>acc.username==transferMoney_user_filed.value);
  const date=`${new Date()}`;

  if((amount > 0) && (amount < account_detect.balanceAmount) && (reciever?.username!==account_detect.username)){
    // console.log("we can send money..")
    setTimeout(function(){account_detect.movements.push(-amount);
    account_detect.movemnt_dates.push(date);
    reciever.movements.push(amount)
    reciever.movemnt_dates.push(date);
    updateUI(account_detect)
    transferMoney_amount_filed.value="";
    transferMoney_user_filed.value="";
    if(logout) clearInterval(logout)
    logout=LogOut_Timer()
  },1000)}

  else{
    // console.log("we can not send money..")
    console.log(account_detect);
  }
  })
 
// close account btn code
close_acc_btn.addEventListener("click",function(x){
  x.preventDefault();

  if((close_acc_userFilled.value==account_detect.username) && (close_acc_pinFilled.value == account_detect.pin)){
    console.log("you can delete acc")
    let index=accounts.findIndex(acc=>acc.username==account_detect.username);
    accounts.splice(index,1);
    // console.log(accounts)
    app_container.style.display="none";
    nav_title.innerHTML="Login in to get storted"
    user_inputElm.value=pin_inputElm.value="";
  }
})


// REQUEST LOAN BTN CODE
// let i=0;
loan_btn.addEventListener("click",function(e){
  e.preventDefault();
   let amount_loan=Number(loan_filled.value);
   if((amount_loan>0)){
      setTimeout(function(){
        account_detect.movements.push(amount_loan);
        account_detect.movemnt_dates.push(date);
        updateUI(account_detect);
        // amount_loan.value="";
        loan_filled.value=""
      },1000)
      clearInterval(logout)
      logout=LogOut_Timer()
    //  console.log("successfulll transfer loan")
   }
});

// sort btn code
let sorted=false;
sort_btn.addEventListener("click",function(e){
  e.preventDefault();
display(account_detect,!sorted);
sorted=!sorted;
})

//set date down to label of current balance
const cur_dateElm=document.querySelector("#cur_date");
const date=new Date();
let options={
   hour:'numeric',
   minute:'numeric',
   day:`numeric`,
   month:'numeric',
   year:'numeric'
};

let now=new Intl.DateTimeFormat("en-GB",options).format(date);
cur_dateElm.innerHTML=now;
  

