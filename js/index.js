// Get contactList from local storage
if (!localStorage.getItem("contactList")) {
  localStorage.setItem("contactList", JSON.stringify([]));
}

const addContactForm = document.querySelector(".contact-add-form");
if (addContactForm) {
  addContactForm.addEventListener("submit", handleAdd);
}
if (window.location.pathname === "/") fillTable();
if (window.location.pathname === "/details.html") {
  displayContactDetails();
  const deleteBtn = document.querySelector(".btn--delete");
  deleteBtn.addEventListener("click", handleDelete);
  console.log("yes");
}

// Validate Fields
//#region
const isValidPostalCode = (pCode) => {
  var regex = new RegExp(/^[A-Z]\d[A-Z][\s]\d[A-Z]\d$/i);
  return regex.test(pCode);
};

const isValidPhone = (phoneNum) => {
  var regex = new RegExp(/^[(]?[0-9]{3}[)]?[-]?[0-9]{3}[-][0-9]{4}$/i);
  return regex.test(phoneNum);
};

const isEmpty = (str) => {
  return !Boolean(str.length);
};

const isValidEmail = (email) => {
  var regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const errorFields = document.querySelectorAll("input + .error-input");
console.log(errorFields);

const isValidForm = () => {
  error = {};
  let errorCount = 0;
  const errorFields = document.querySelectorAll(".error-input");
  const {
    firstName,
    lastName,
    address,
    email,
    province,
    postalCode,
    phoneNumber,
    notes,
  } = addContactForm;

  if (isEmpty(firstName.value)) {
    errorCount++;
    error.firstName = "Firstname is required";
    document.querySelector(".error-input#firstname-error").innerText =
      error.firstName;
  }

  if (isEmpty(lastName.value)) {
    errorCount++;
    error.lastName = "Last name is required";
    document.querySelector(".error-input#lastname-error").innerText =
      error.lastName;
  }

  if (isEmpty(address.value)) {
    errorCount++;
    error.address = "Address is required";
    document.querySelector(".error-input#address-error").innerText =
      error.address;
  }

  if (isEmpty(email.value)) {
    errorCount++;
    error.email = "Email is required";
    document.querySelector(".error-input#email-error").innerText = error.email;
  }

  if (isEmpty(province.value)) {
    errorCount++;
    error.province = "Province is required";
    document.querySelector(".error-input#province-error").innerText =
      error.province;
  }

  if (isEmpty(postalCode.value)) {
    errorCount++;
    error.postalCode = "Postal code is required";
    document.querySelector(".error-input#postalCode-error").innerText =
      error.postalCode;
  }

  if (isEmpty(phoneNumber.value)) {
    errorCount++;
    error.phoneNumber = "PhoneNumber is required";
    document.querySelector(".error-input#phoneNumber-error").innerText =
      error.phoneNumber;
  }

  console.log(isEmpty(notes.value));
  if (isEmpty(notes.value)) {
    errorCount++;
    error.notes = "Notes cannot be empty";
    document.querySelector(".error-input#notes-error").innerText = error.notes;
  }

  if (!isEmpty(email.value) && !isValidEmail(email.value)) {
    errorCount++;
    error.email = "Please enter a valid email";
    document.querySelector(".error-input#email-error").innerText = error.email;
  }

  if (!isEmpty(postalCode.value) && !isValidPostalCode(postalCode.value)) {
    errorCount++;
    error.postalCode = "Invalid postal code, accepted format: NAN ANA";
    document.querySelector(".error-input#postalCode-error").innerText =
      error.postalCode;
  }

  if (!isEmpty(phoneNumber.value) && !isValidPhone(phoneNumber.value)) {
    errorCount++;
    error.phoneNumber =
      "Invalid phone number, accepted format: 123-123-1234 (123)123-1234";
    document.querySelector(".error-input#phoneNumber-error").innerText =
      error.phoneNumber;
  }

  console.log(errorCount);

  if (errorCount === 0) return true;
  else {
    removeError();
    return false;
  }

  function removeError() {
    setTimeout(() => {
      errorFields.forEach((field) => (field.innerText = ""));
    }, 2500);
  }
};

//#endregion

// Validation Fields Tests
//#region
// Email Testing
const email1 = "lennoxgilbert@yahoo.com";
const email2 = "afdfsadfsdfds";
// console.log(email1, isValidEmail(email1));
// console.log(email2, isValidEmail(email2));

// Phone Number Testing
const phone1 = "123-123-1234";
const phone2 = "(123)123-1234";
const phone3 = "(123a)123-123";
// console.log(phone1, isValidPhone(phone1));
// console.log(phone2, isValidPhone(phone2));
// console.log(phone3, isValidPhone(phone3));

// PostalCode Testing
const postCode1 = "N2L 3T8";
const postCode2 = "N2L3T8";
// console.log(postCode1, isValidPostalCode(postCode1));
// console.log(postCode2, isValidPostalCode(postCode2));
//#endregion

//Generate random id
let guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

//Add Contact
function handleAdd(e) {
  e.preventDefault();
  const contactList = JSON.parse(localStorage.getItem("contactList"));

  if (isValidForm()) {
    const newContact = {
      id: guid(),
      firstName: addContactForm.firstName.value || "",
      lastName: addContactForm.lastName.value || "",
      address: addContactForm.address.value || "",
      province: addContactForm.province.value || "",
      postalCode: addContactForm.postalCode.value || "",
      phoneNumber: addContactForm.phoneNumber.value || "",
      email: addContactForm.email.value || "",
      notes: addContactForm.notes.value || "",
    };

    const newList = [newContact, ...contactList];
    localStorage.setItem("contactList", JSON.stringify(newList));
    //  window.location.replace("/");
  }
}

//Delete ContactS
function handleDelete() {
  const contactList = JSON.parse(localStorage.getItem("contactList"));
  const id = new URLSearchParams(window.location.search).get("id");

  updatedList = contactList.filter((contact) => contact.id !== id);
  localStorage.setItem("contactList", JSON.stringify(updatedList));
  window.location.replace("/");
}

// Display fields
function fillTable() {
  const contactTable = document.querySelector(".contact-list");

  const headings = `<tr><td>First Name</td>
  <td>Last Name</td>
  <td>Address</td>
  <td>Province</td>
  <td>Postal Code</td>
  <td>Phone Number</td>
  <td>Email</td>
  <td colspan="2">Actions</td>
  </tr>`;
  const contactList = JSON.parse(localStorage.getItem("contactList"));

  if (contactList.length) {
    contactTable.innerHTML = headings;
    contactList.forEach(
      ({
        id,
        firstName,
        lastName,
        address,
        province,
        postalCode,
        phoneNumber,
        email,
        notes,
      }) => {
        const row = document.createElement("tr");
        const fields = `<td>${firstName}</td>
           <td>${lastName ?? ""}</td>
           <td>${address ?? ""}</td>
           <td>${province ?? ""}</td>
           <td>${postalCode ?? ""}</td>
           <td>${phoneNumber ?? ""}</td>
           <td>${email || ""}</td>
           <td><a href="/details.html?id=${id}">View</a></td>
           <td><a href="/details.html?id=${id}">Delete</a></td>`;

        row.innerHTML = fields;
        contactTable.appendChild(row);
      }
    );
  } else {
    const element = document.createElement("h2");
    element.innerText = "There are no contacts to display";
    element.classList.add("error");
    document.querySelector(".container").appendChild(element);
  }
}

function displayContactDetails() {
  const contactList = JSON.parse(localStorage.getItem("contactList"));
  const id = new URLSearchParams(window.location.search).get("id");

  const currentContact = contactList.filter((contact) => contact.id === id)[0];

  const detailsForm = document.querySelector(".details form");

  const {
    firstName,
    lastName,
    address,
    email,
    province,
    postalCode,
    phoneNumber,
    notes,
  } = currentContact;

  detailsForm.firstName.value = firstName;
  detailsForm.lastName.value = lastName;
  detailsForm.address.value = address;
  detailsForm.email.value = email;
  detailsForm.province.value = province;
  detailsForm.postalCode.value = postalCode;
  detailsForm.phoneNumber.value = phoneNumber;
  detailsForm.notes.value = notes;
}
