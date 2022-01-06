# Lendica Invoice Button API
Invoice status button web component and example integration in javascript Frameworks

[![npm version](https://img.shields.io/badge/npm-v1.0.1-8c8ca1)](https://www.npmjs.com/package/@lendica/invoicebutton)
 ###### :exclamation: Lendica invoice button is only intended to be used alongside Lendica iTab


## Installation

#### 1. Include the iTab CDN script
Before you can use the button component, you need to install the itab script. To begin, include the IIFE bundle directly into the html page(s) you'd like to install the iTab.

```html
<script src="https://static.golendica.com/itab.js"></script>
```

Or programmatically include the script in your application.

```javascript
let lendicaScript = document.createElement('script');
lendicaScript.setAttribute('src', 'https://static-idev.golendica.com/itab.js');
document.head.appendChild(lendicaScript);
```

#### 2. Install the invoice button component
```sh
npm i @lendica/invoicebutton
```

## Usage
Once you have set up a module bundler to resolve ECMAScript `import`, you can start by importing the component in javascript.
```javascript
import '@lendica/invoicebutton';
```
Then you can use the component as native HTML tags:
```html
<!-- Pass your platform's invoice identifier to the button component -->
<invoice-button invoiceId="123456"></invoice-button>
```

## Full Integration Examples in Frameworks
#### Vue.js (Vue 3)
Code in App.vue:
```javascript
/* App.vue */
<template>
  <div>
    <p>Example loading invoice buttons in a table in Vue</p>
    <table id="invoiceTable">
      <thead>
        <tr>
          <th>Invoice ID</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.invoiceId" :ref="setInvoiceButtonRef">
          <td>{{row.invoiceId}}</td>
          <td><invoice-button v-bind:invoiceid="row.invoiceId"></invoice-button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import '@lendica/invoicebutton';

export default {
    data(){
        return{
            // Pass the invoice identifiers
            rows: [
                {
                    invoiceId: 10001,
                },
                {
                    invoiceId: 10002,
                },
                {
                    invoiceId: 10003,
                },
            ],
            invoiceButtonRefs: []
        }
    },
    methods:{
        setInvoiceButtonRef(el) {
            if (el) {
                this.invoiceButtonRefs.push(el);
            }
        }
    },
    beforeUpdate() {
        this.invoiceButtonRefs = []
    },
    updated() {
        // do something with this.invoiceButtonRefs
    },
    async created(){
        // Programmatically add the iTab script
        let lendicaScript = document.createElement('script');
        lendicaScript.setAttribute('src', 'https://static-idev.golendica.com/itab.js');
        document.head.appendChild(lendicaScript);

        // Using iTab and invoice button
        // Required partner and user credentials, replace with your own
        const lendicaCredentials = {
            partner_name: 'partner', // Technology vendor name
            company_id: '123456', // Unique client id in technology vendor's system
            company_name: 'Test Corp.', // Client's business name
            company_access_token: '**********' // Token/key to retrieve client data from vendor's API
        };
        // Optional configuration
        const lendicaConfig = {
            access_type: 'ADMIN', // User access type, default is 'ADMIN' if not specified, currently supporting 'VIEW_ONLY' or 'ADMIN'
            environment: 'SANDBOX' // Default environment is 'SANDBOX' if not specified, currently supporting 'SANDBOX' or 'PRODUCTION'
        };
        // Initialize iTab and invoice button
        lendicaScript.onload = async ()  => {
            await window.lendica.init(lendicaCredentials, lendicaConfig);
            for (let i = 0; i < this.invoiceButtonRefs.length; i++) {
                this.invoiceButtonRefs[i].querySelector("invoice-button").lendicaready = true;
            }
        };
    },
}
</script>
```
Run example: Change the credentials in App.vue and
```sh
cd Vue
npm install
npm run serve
```
Refer to [Vue and Web Components](https://v3.vuejs.org/guide/web-components.html#using-custom-elements-in-vue) for more information on using custom elements in Vue.js.

#### React
> Coming soon


## More APIs
Please refer to the [API documentation](https://docs.golendica.com/) for more information.

## License
[LGPL-3.0-or-later](https://spdx.org/licenses/LGPL-3.0-or-later.html)