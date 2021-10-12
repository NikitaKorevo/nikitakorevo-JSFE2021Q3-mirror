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

const bookingPaymentType = document.querySelector('.payment__type');
const bookingPaymentCountBasic = document.querySelector('.payment__number--basic');
const bookingPaymentPriceBasic = document.querySelector('.payment__price--basic');
const bookingPaymentSumBasic = document.querySelector('.payment__summ--basic');
const bookingPaymentCountSenior = document.querySelector('.payment__number--senior');
const bookingPaymentPriceSenior = document.querySelector('.payment__price--senior');
const bookingPaymentSumSenior = document.querySelector('.payment__summ--senior');
const bookingPaymentTotal = document.querySelector('.payment__total-number');
let priceSelectedTicket = undefined;
const bookingDate = document.querySelector('.booking__date');

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
  
  bookingPaymentType.textContent = dataTickets.ticketType;
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

let date = new Date;
const dateForInput = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
bookingDate.setAttribute('min', dateForInput);

/* Validation */

const bookingName = document.querySelector('.booking__name');
const bookingNameValidation = document.querySelector('.booking__name-validation');

const checkValidationForName = (e) => {
  let value = e.target.value;
  if (value.length < 3 || value.length > 15) {
    bookingNameValidation.style.display = 'inline-block';
    bookingName.classList.add('booking--border');
  } else {
    bookingNameValidation.style.display = 'none';
    bookingName.classList.remove('booking--border');
  }
};
bookingName.addEventListener('input', (e) => checkValidationForName(e));

const bookingEmail = document.querySelector('.booking__email');
const bookingEmailValidation = document.querySelector('.booking__email-validation');

const checkValidationEmail = (e) => {
  let value = e.target.value;

  let name = value.slice(0, value.indexOf('@'));
  if (name.length < 3 || name.length > 15) {
    name = false;
  } else {
    name = true;
  }

  let hasDog = value.includes('@');
  let hastSpace = !value.includes(' ');

  let service;
  if (value.indexOf('.') === -1) {
    service = false;
  } else {
    service = value.slice(value.indexOf('@') + 1, value.indexOf('.'));
    service.length >= 4 ? service = true : service = false;
  }

  let country = value.slice(value.indexOf('.') + 1);
  if (country.length >= 2) {
    country = true;
  } else {
    country = false;
  }

  if (name && hasDog && hastSpace && service && country) {
    bookingEmailValidation.style.display = 'none';
    bookingEmail.classList.remove('booking--border');
  } else {
    bookingEmailValidation.style.display = 'inline-block';
    bookingEmail.classList.add('booking--border');
  }
}
bookingEmail.addEventListener('input', (e) => checkValidationEmail(e));

const bookingTel = document.querySelector('.booking__tel');
const bookingTelValidation = document.querySelector('.booking__tel-validation');

const checkValidationTel = (e) => {
  let value = e.target.value;
  if (isNaN(+value) || value.length > 10) {
    bookingTelValidation.style.display = 'inline-block';
    bookingTel.classList.add('booking--border');
  } else {
    bookingTelValidation.style.display = 'none';
    bookingTel.classList.remove('booking--border');
  }
};
bookingTel.addEventListener('input', (e) => checkValidationTel(e));