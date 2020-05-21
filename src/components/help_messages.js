import xss from "xss/dist/xss";
import { CustomElement } from './element.js';
import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { _converse } from "@converse/headless/converse-core";


class ChatHelp extends CustomElement {

    static get properties () {
        return {
            chat_type: { type: String },
            messages: { type: Array },
            type: { type: String }
        }
    }

    render () {
        const icon_color = this.chat_type === _converse.CHATROOMS_TYPE ? 'var(--chatroom-head-bg-color)' : 'var(--chat-head-color)';
        const isodate = (new Date()).toISOString();
        return [
            html`<fa-icon class="fas fa-times close-chat-help" @click=${this.close} path-prefix="dist" color="${icon_color}" size="1em"></fa-icon>`,
            ...this.messages.map(m => this.renderHelpMessage({
                isodate,
                'markup': xss.filterXSS(m, {'whiteList': {'strong': []}})
            }))
        ];
    }

    close () {
        this.parentElement.removeChild(this);
    }

    renderHelpMessage (o) {
        return html`<div class="message chat-${this.type}" data-isodate="${o.isodate}">${unsafeHTML(o.markup)}</div>`;
    }
}

customElements.define('converse-chat-help', ChatHelp);
