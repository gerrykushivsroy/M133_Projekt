import { Product } from "./products/product";

const table = document.getElementsByName("table")[0];

fetch("/api/products")
    .then(r => r.json())
    .then((products: Product[]) => {products
        .forEach(product => table
            .innerHTML += `
            <tr>
            <td width="25%">
                &nbsp;
            </td>
            <td>
                <h1>Warenkorb</h1>
                <table width="100%">
                    <tr>
                        <td colspan="3">
                        </td>
                        <td>
                            <button>CHF 0.00</button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <table width="100%">
                                <tr>
                                    <th>
                                        Produkt
                                    </th>
                                    <th>
                                        Einzelpreis
                                    </th>
                                    <th>
                                        Anzahl
                                    </th>
                                    <th>
                                        Total
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        Testproduct
                                    </td>
                                    <td>
                                        CHF 1.30
                                    </td>
                                    <td>
                                        <button type="button">
                                            -
                                        </button>
                                        123
                                        <button type="button">
                                            +
                                        </button>
                                    </td>
                                    <td>
                                        CHF 159.9‬0
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit">Checkout</button>
                        </td>
                    </tr>
                </table>
            </td>
            <td width="25%">
                &nbsp;
            </td>
        </tr>
    </table>`
        )});