let dataTickets = undefined;
const formTicketType = document.forms.ticketType;
const minusBasic = document.querySelector('.amount__minus-basic');
const inputBasic = document.querySelector('.amount__input-basic');
const plusBasic = document.querySelector('.amount__plus-basic');
const minusSenior = document.querySelector('.amount__minus-senior');
const inputSenior = document.querySelector('.amount__input-senior');
const plusSenior = document.querySelector('.amount__plus-senior');
const total = document.querySelector('.amount__subtitle');
const formBookingPersonalData = document.forms.bookingPersonalData;
const bookingEntryMinusBasic = document.querySelector('.entry-ticket__minus--basic');
const bookingEntryPlusBasic = document.querySelector('.entry-ticket__plus--basic');
const bookingEntryMinusSenior = document.querySelector('.entry-ticket__minus--senior');
const bookingEntryPlusSenior = document.querySelector('.entry-ticket__plus--senior');
const bookingEntryPriceBasic = document.querySelector('.entry-ticket__subheading--basic');
const bookingEntryPriceSenior = document.querySelector('.entry-ticket__subheading--senior');
const bookingEntryCountBasic = document.querySelector('.entry-ticket__input--basic');
const bookingEntryCountSenior = document.querySelector('.entry-ticket__input--senior');

const bookingPaymentCountBasic = document.querySelector('.payment__number--basic');
const bookingPaymentPriceBasic = document.querySelector('.payment__price--basic');
const bookingPaymentSumBasic = document.querySelector('.payment__summ--basic');
const bookingPaymentCountSenior = document.querySelector('.payment__number--senior');
const bookingPaymentPriceSenior = document.querySelector('.payment__price--senior');
const bookingPaymentSumSenior = document.querySelector('.payment__summ--senior');
const bookingPaymentTotal = document.querySelector('.payment__total-number');
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

  for (const option of formBookingPersonalData.select) {
    if (option.textContent === dataTickets.ticketType) {
      option.selected = true;
      break;
    }
  }

  inputBasic.value = dataTickets.countBasicTickets;
  inputSenior.value = dataTickets.countSeniorTickets;
  total.textContent = `Total €${dataTickets.countBasicTickets * priceSelectedTicket +
    dataTickets.countSeniorTickets * (priceSelectedTicket / 2)}`;
  
  bookingEntryPriceBasic.textContent = `Basic 18+ (${priceSelectedTicket} €)`;
  bookingEntryPriceSenior.textContent = `Senior 65+ (${priceSelectedTicket / 2} €)`;
  bookingEntryCountBasic.value = dataTickets.countBasicTickets;
  bookingEntryCountSenior.value = dataTickets.countSeniorTickets;
  
  bookingPaymentCountBasic.textContent = dataTickets.countBasicTickets;
  bookingPaymentPriceBasic.textContent = `Basic (${priceSelectedTicket} €)`;
  bookingPaymentSumBasic.textContent = `${priceSelectedTicket * dataTickets.countBasicTickets} €`;
  bookingPaymentCountSenior.textContent = dataTickets.countSeniorTickets;
  bookingPaymentPriceSenior.textContent = `Senior (${priceSelectedTicket / 2} €)`;
  bookingPaymentSumSenior.textContent = `${priceSelectedTicket / 2 * dataTickets.countSeniorTickets} €`;
  bookingPaymentTotal.textContent = `${dataTickets.countBasicTickets * priceSelectedTicket +
    dataTickets.countSeniorTickets * (priceSelectedTicket / 2)} €`;
}

injectDataToDOM();

const changeTicketType = () => {
  for (radioInput of formTicketType) {
    if (!radioInput.checked) continue;
    if (radioInput.value !== dataTickets.ticketType) {
      dataTickets.ticketType = radioInput.value;
      updateLocalStorage();
      break;
    }
  }
};
formTicketType.addEventListener('click', () => changeTicketType());

const changeTicketTypeInBooking = () => {
  for (const option of formBookingPersonalData.select) {
    if (!option.selected) continue;
    if (option.textContent !== dataTickets.ticketType) {
      console.log('пошло в local')
      dataTickets.ticketType = option.textContent;
      updateLocalStorage();
      break;
    }
  }
}
formBookingPersonalData.select.addEventListener('change', () => changeTicketTypeInBooking());

const minusTicketForBasic = () => {
  if (dataTickets.countBasicTickets <= 0) return;
  dataTickets.countBasicTickets -= 1;
  updateLocalStorage();
};
minusBasic.addEventListener('click', () => minusTicketForBasic());
bookingEntryMinusBasic.addEventListener('click', () => minusTicketForBasic());

const plusTicketForBasic = () => {
  if (dataTickets.countBasicTickets >= 20) return;
  dataTickets.countBasicTickets += 1;
  updateLocalStorage();
};
plusBasic.addEventListener('click', () => plusTicketForBasic());
bookingEntryPlusBasic.addEventListener('click', () => plusTicketForBasic());

const minusTicketForSenior = () => {
  if (dataTickets.countSeniorTickets <= 0) return;
  dataTickets.countSeniorTickets -= 1;
  updateLocalStorage();
};
minusSenior.addEventListener('click', () => minusTicketForSenior());
bookingEntryMinusSenior.addEventListener('click', () => minusTicketForSenior());

const plusTicketForSenior = () => {
  if (dataTickets.countSeniorTickets >= 20) return;
  dataTickets.countSeniorTickets += 1;
  updateLocalStorage();
};
plusSenior.addEventListener('click', () => plusTicketForSenior());
bookingEntryPlusSenior.addEventListener('click', () => plusTicketForSenior());