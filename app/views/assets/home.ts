import { Product } from "./products/product";

const table = document.querySelector("table");
fetch("/api/products")
    .then(r => r.json())
    .then((products: Product[]) => {products
        .forEach(product => table
            .innerHTML += `
            <tr> 
                <td align="center" valign="center"><img src="./assets/pics/${product.imageName}" alt="" width = "400" height = "275"> <br /> ${product.productName} </td>
            </tr>`
        )});
        document.write("</table>") 