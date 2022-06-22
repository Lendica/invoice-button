/** @license Lendica Invoice Button Web Component v1.0.0
 * Copyright © 2022 Lendica Corp. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Lendica Corp. <info@golendica.com>, January 2022
 */
const template = document.createElement("template");
template.innerHTML = `
    <style>
      div {
        margin-top: 20px;
      }
      button {
          border-radius: 4px;
          border: none;
          outline: 0;
          padding: 4px 8px;
      }
      button:hover {
         cursor: pointer;
         opacity: 0.8;
      }
      .status-default {
          background: #58A10E;
          color: #FCFCFD;
      }
      .status-processing {
          background: #F98F34;
          color: #FCFCFD;
      }
      .status-paid {
          background: #9292A4;
          color: #FCFCFD;
      }
    </style>
    <button type="button"
    >
    </button>
  `;

class InvoiceButton extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector("button").disabled = true;
        this.shadowRoot.querySelector("button").innerText = "Loading...";
    }

    static get observedAttributes() {
        return ["invoiceid", "invoice", "callback", "lendicaready"];
    }

    connectedCallback() {
        this.shadowRoot.querySelector("button").onclick = () => {
            window.lendica.open(
                !this.invoice ||
                    (this.invoice && this.invoice.activated === false)
                    ? null
                    : this.getAttribute("invoiceid")
            );
        };
    }

    async attributeChangedCallback(name, oldValue, newValue) {
        if (name == "invoice") {
            if (newValue != "undefined") {
                let invoice = JSON.parse(newValue);

                this.shadowRoot.querySelector("button").disabled = false;

                if (!invoice || (invoice && invoice.activated === false)) {
                    this.setContent("Get Paid Now", "status-default");
                } else {
                    this.display(invoice.status);
                }
            } else {
                this.shadowRoot.querySelector("button").disabled = true;
                this.shadowRoot.querySelector("button").innerText =
                    "Unavailable";
                this.shadowRoot.querySelector("button").style.cursor = "auto";
            }
        }

        if (!this.hasInvoice) {
            this.shadowRoot.querySelector("button").disabled = true;
            this.shadowRoot.querySelector("button").innerText = "Unavailable";
            this.shadowRoot.querySelector("button").style.cursor = "auto";
        }

        if (name == "invoiceid") {
            let invoiceId = newValue;

            if (window.lendica) {
                (async () => {
                    const cacheEntry = await window.lendica?.invoices.getById(
                        invoiceId
                    );
                    this.setAttribute("invoice", JSON.stringify(cacheEntry));

                    return window.lendica.invoices.onChange(() => {
                        this.setAttribute(
                            "invoice",
                            JSON.stringify(
                                window.lendica.invoices.getById(
                                    this.getAttribute("invoiceid")
                                )
                            )
                        );
                    });
                })();
            }
        }

        if (name == "callback") {
            this.shadowRoot.querySelector("button").onclick = this._callback;
        }
    }

    get hasInvoice() {
        return this.hasAttribute("invoice");
    }

    get invoice() {
        return JSON.parse(this.getAttribute("invoice"));
    }

    set invoice(newVal) {
        this.setAttribute("invoice", JSON.stringify(newVal));
    }

    get callback() {
        return this.getAttribute("callback");
    }

    set callback(newVal) {
        this._callback = newVal;
        this.setAttribute("callback", "callback_present");
    }

    set invoiceid(newVal) {
        this.setAttribute("invoiceid", newVal);
    }

    get invoiceid() {
        return this.getAttribute("invoiceid");
    }

    set lendicaready(newVal) {
        this.setAttribute("invoiceid", this.getAttribute("invoiceid"));
        return this.setAttribute("lendicaready", newVal);
    }

    get lendicaready() {
        return this.getAttribute("lendicaready");
    }

    setContent(innerText, className) {
        this.shadowRoot.querySelector("button").innerText = innerText;
        this.shadowRoot.querySelector("button").classList.add(className);
        this.shadowRoot.querySelector("button").style.cursor = "pointer";
    }

    display(status) {
        switch (status) {
            case 0:
                this.setContent("Get Paid Now", "status-default");
                break;
            case 1:
                this.setContent("Send Reminder", "status-processing");
                break;
            case 2:
                this.setContent("Confirm Delivery", "status-processing");
                break;
            case 3:
                this.setContent("Track Payment", "status-paid");
                break;
            case 4:
                this.setContent("Paid", "status-paid");
                break;
            default:
                this.setContent("Get Paid Now", "status-default");
                break;
        }
    }
}

window.customElements.define("invoice-button", InvoiceButton);
