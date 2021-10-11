let dataTickets = undefined;
const formTicketType = document.forms.ticketType;
const minusBasic = document.querySelector('.amount__minus-basic');
const inputBasic = document.querySelector('.amount__input-basic');
const plusBasic = document.querySelector('.amount__plus-basic');
const minusSenior = document.querySelector('.amount__minus-senior');
const inputSenior = document.querySelector('.amount__input-senior');
const plusSenior = document.querySelector('.amount__plus-senior');
const total = document.querySelector('.amount__subtitle');
let priceSelectedTicket = undefined;

const loadingDataFromLocalStorage = (() => {
  if (localStorage.getItem('dataTickets') === null) {
    let dataTickets = 
      {
      'ticketType': 'Permanent exhibition',
      'countBasicTickets': 1,
      'countSeniorTickets': 0,
      'pricePermanentExhibition': 20,
      'priceTemporaryExhibition': 25,
      'priceCombinedAdmission': 40
    };
    localStorage.setItem('dataTickets', JSON.stringify(dataTickets));
  }
  dataTickets = JSON.parse(localStorage.getItem('dataTickets'));
  
})();



const updateLocalStorage = () => {
  localStorage.setItem('dataTickets', JSON.stringify(dataTickets));
  injectDataToDOM();
}

const injectDataToDOM = () => {
  for (radioInput of formTicketType) {
    if (radioInput.value === dataTickets.ticketType) {
      radioInput.checked = true;
      if (dataTickets.ticketType === 'Permanent exhibition') priceSelectedTicket = dataTickets.pricePermanentExhibition;
      if (dataTickets.ticketType === 'Temporary exhibition') priceSelectedTicket = dataTickets.priceTemporaryExhibition;
      if (dataTickets.ticketType === 'Combined Admission') priceSelectedTicket = dataTickets.priceCombinedAdmission;
      break;
    }
  }

  inputBasic.value = dataTickets.countBasicTickets;
  inputSenior.value = dataTickets.countSeniorTickets;
  total.textContent = `Total €${dataTickets.countBasicTickets * priceSelectedTicket +
  dataTickets.countSeniorTickets * (priceSelectedTicket / 2)}`;
}

injectDataToDOM();

const changeTicketType = () => {
  for (radioInput of formTicketType) {
    if (!radioInput.checked) continue;
    if (radioInput.value !== dataTickets.ticketType) {
      dataTickets.ticketType = radioInput.value;
      updateLocalStorage();
    }
  }
};

formTicketType.addEventListener('click', () => changeTicketType())

const minusTicketForBasic = () => {
  if (dataTickets.countBasicTickets <= 0) return;
  dataTickets.countBasicTickets -= 1;
  updateLocalStorage();
};
minusBasic.addEventListener('click', () => minusTicketForBasic());

const plusTicketForBasic = () => {
  if (dataTickets.countBasicTickets >= 20) return;
  dataTickets.countBasicTickets += 1;
  updateLocalStorage();
};
plusBasic.addEventListener('click', () => plusTicketForBasic());

const minusTicketForSenior = () => {
  if (dataTickets.countSeniorTickets <= 0) return;
  dataTickets.countSeniorTickets -= 1;
  updateLocalStorage();
};
minusSenior.addEventListener('click', () => minusTicketForSenior());

const plusTicketForSenior = () => {
  if (dataTickets.countSeniorTickets >= 20) return;
  dataTickets.countSeniorTickets += 1;
  updateLocalStorage();
};
plusSenior.addEventListener('click', () => plusTicketForSenior());