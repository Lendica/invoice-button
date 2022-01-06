<template>
  <div>
    <p>Example of usage invoice button web component in Vue</p>
    <table id="invoice-table">
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
      rows: [
        {
          invoiceId: 22445,
        },
        {
          invoiceId: 22440,
        },
        {
          invoiceId: 22439,
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
    console.log(this.invoiceButtonRefs)
  },
  async created(){
      let lendicaScript = document.createElement('script');
      lendicaScript.setAttribute('src', 'https://static-idev.golendica.com/itab.js');
      document.head.appendChild(lendicaScript);

      const lendicaCredentials = {
        partner_name: 'apexdemo',
        company_id: '382758',
        company_name: 'Test Corp.',
        company_access_token: '20|OR72aFdNa9rz4s144o4yIppdjgxyVvumFxAEzHaW'
      };
      const lendicaConfig = {
        access_type: 'ADMIN',
        environment: 'sandbox'
      };
      lendicaScript.onload = async ()  => {
        await window.lendica.init(lendicaCredentials, lendicaConfig);
        for (let i = 0; i < this.invoiceButtonRefs.length; i++) {
          this.invoiceButtonRefs[i].querySelector("invoice-button").lendicaready = true;
        }
      };
  },
}
</script>

<style>
.App {
  margin-top: 30px;
  text-align: center;
}
.greeting {
  margin-top: 20px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#invoice-table {
  margin-left: auto;
  margin-right: auto;
}
</style>
