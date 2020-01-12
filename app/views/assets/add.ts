import { Product } from "../../types";

const form = document.querySelector("form");
const nameInput = <HTMLInputElement>document.querySelector("#name");

form.onsubmit = ($event) => {
    $event.preventDefault();
    const newHero: Product = { name: nameInput.value };
    fetch(
        "/api/products",
        {
            body: JSON.stringify(newHero),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST"
        })
        .then(() => window.location.href = "http://localhost:8080")
}