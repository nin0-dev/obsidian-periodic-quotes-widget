import { Config, type Quote } from "utils";
import { MarkdownRenderChild, moment } from "obsidian";
import { type VariableWithCallbacks } from "VariableWithCallbacks";

export class PeriodicQuoteComponent extends MarkdownRenderChild {
    el: HTMLElement;
    quote: VariableWithCallbacks<{
        am: Quote,
        pm: Quote
    } | undefined>;
    config: Config;
    id: number;

    constructor(el: HTMLElement, quote: VariableWithCallbacks<{
        am: Quote,
        pm: Quote
    } | undefined>, config: Config | null) {
        super(el);
        this.el = el;
        this.quote = quote;
        this.config = {
            background: config?.background ?? false,
            period: ["daily", "bidaily"].includes(config?.period ?? "")
                ? config!.period
                : "bidaily"
        };
    }

    onload() {
        const div = this.el.createDiv({
            cls: `periodic-quote${this.config.background ? " periodic-quote-bg" : ""}`
        });
        const quoteSpan = this.el.createSpan({
            cls: "periodic-quote-quote"
        });
        const authorSpan = this.el.createSpan({
            cls: "periodic-quote-author"
        });
        div.appendChild(quoteSpan);
        div.appendChild(authorSpan);

        const now = moment();

        quoteSpan.innerText = this.quote.value()?.[this.config.period === "daily" ? "am" : now.hour() < 12 ? "am" : "pm"].quote || "Loading quote...";
        authorSpan.innerText = this.quote.value()?.[this.config.period === "daily" ? "am" : now.hour() < 12 ? "am" : "pm"].author || "Loading author...";
        this.id = this.quote.registerCallback(value => {
            const now = moment();
            quoteSpan.innerText = value![this.config.period === "daily" ? "am" : now.hour() < 12 ? "am" : "pm"].quote;
            authorSpan.innerText = value![this.config.period === "daily" ? "am" : now.hour() < 12 ? "am" : "pm"].author;
        });

        this.el.appendChild(div);
    }

    onunload() {
        this.quote.deregisterCallback(this.id);
    }
}
