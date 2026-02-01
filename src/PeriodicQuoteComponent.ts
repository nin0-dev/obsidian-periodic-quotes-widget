import { type Quote } from "utils";
import { MarkdownRenderChild } from "obsidian";
import { type VariableWithCallbacks } from "VariableWithCallbacks";

export class PeriodicQuoteComponent extends MarkdownRenderChild {
    el: HTMLElement;
    quote: VariableWithCallbacks<Quote | undefined>;
    id: number;

    constructor(el: HTMLElement, quote: VariableWithCallbacks<Quote | undefined>) {
        super(el);
        this.el = el;
        this.quote = quote;
    }

    onload() {
        const div = this.el.createDiv({
            cls: "periodic-quote"
        });
        const quoteSpan = this.el.createSpan({
            cls: "periodic-quote-quote"
        });
        const authorSpan = this.el.createSpan({
            cls: "periodic-quote-author"
        });
        div.appendChild(quoteSpan);
        div.appendChild(authorSpan);

        quoteSpan.innerText = this.quote.value()?.quote || "Loading quote...";
        authorSpan.innerText = this.quote.value()?.author || "Loading author...";
        this.id = this.quote.registerCallback(value => {
            quoteSpan.innerText = this.quote.value()!.quote;
            authorSpan.innerText = this.quote.value()!.author;
        });

        this.el.appendChild(div);
    }

    onunload() {
        this.quote.deregisterCallback(this.id);
    }
}
