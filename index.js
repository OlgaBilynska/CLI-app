// import yargs from "yargs";
import { program } from "commander";

import * as contactService from "./contacts.js";
// const argv = require("yargs").argv;

// const { Command } = require("commander");
// const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const argv = program.opts();
console.log(argv);

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactList = await contactService.listContacts();
      return console.log(contactList);

    case "get":
      const oneContact = await contactService.getContactById(id);
      return console.log(oneContact);

    case "add":
      const newContact = await contactService.addContact({
        name,
        email,
        phone,
      });
      return console.log(newContact);

    case "remove":
      const deletedContact = await contactService.removeContact(id);
      return console.log(deletedContact);

    case "update":
      const updateContact = await contactService.updateContactById(id, {
        name,
        email,
        phone,
      });
      return console.log(updateContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);

// const { argv } = yargs(process.argv.slice(2));
// // console.log(response.argv);
// invokeAction(argv);

// invokeAction({
//   action: "remove",
//   id: "75sdoGh2rsOv6XaiCprBh",
// });

// console.log(process.argv);

// const actionIndex = process.argv.indexOf("--action");
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   invokeAction({ action });
// }
