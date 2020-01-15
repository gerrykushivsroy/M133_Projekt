import { Product } from "./products/product";

const div = document.getElementsByClassName("columns")[0];
console.log(document.cookie);
const id = document.cookie.split("=");
fetch("/api/products/" + id[1])
    .then(r => r.json())
    .then((product: Product) => div
            .innerHTML += `
            <div class="column col-6">
            <a href="/detail/${product.id }">
                <div class="card-image">
                <img src=".././assets/pics/${product.imageName}" alt="" width = "400" height = "275">
                </div>
                <div class="card-content">
                
                <div class="content">
                    <p>
                    ${product.productName} 
                    <br> 
                    </a>
                    ${product.specialOffer} CHF 
                    <br>
                    ${product.normalPrice} CHF 
                    </p>
                    </div>
                </div>
            </div>`
        );