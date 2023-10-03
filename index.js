import { program } from "commander";

import * as contactService from "./contacts.js";

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
