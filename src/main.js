import { DOMController } from "./scripts/DOMController.js";

const domController = new DOMController();
domController.cartButtonClick();
domController.addToCartButtonClick();

const body = document.querySelector("body");
domController.addOnClickToNumberButtons(body);

domController.addOnClickToRemoveButton();
