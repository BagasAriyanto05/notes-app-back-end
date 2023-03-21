/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
// const date = new Date('');
// const createAt = date.toString();
// console.log(createAt);

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();

const createAt = `${dd}/${mm}/${yyyy}`;
