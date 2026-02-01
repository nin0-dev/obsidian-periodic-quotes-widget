import { mulberry32, Quote } from "utils";
import { moment, Plugin } from "obsidian";
import { PeriodicQuoteComponent } from "PeriodicQuoteComponent";
import { VariableWithCallbacks } from "VariableWithCallbacks";
import quotes from "quotes.json";

export default class PeriodicQuotesWidget extends Plugin {
    quote = new VariableWithCallbacks<Quote | undefined>(undefined);
    lastTimeoutID: number;

    reloadQuote() {
        const bidaily = true;

        const now = moment();
        const workingQuotes = [...(quotes as Quote[])];
        const rng = mulberry32(now.year() + 1);
        for (let i = workingQuotes.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            [workingQuotes[i], workingQuotes[j]] = [workingQuotes[j]!, workingQuotes[i]!];
        }
        this.quote.value(workingQuotes[now.dayOfYear() * (bidaily ? (now.hour() >= 12 ? 2 : 1) : 1)]);

        const nextHour = now.clone().add(1, "hour").startOf("hour");
        this.lastTimeoutID = window.setTimeout(() => nextHour.diff(now, "milliseconds"));
    }

    async onload() {
        this.reloadQuote();
        this.registerInterval(window.setInterval(() => this.reloadQuote(), 1000 * 60 * 60 * 6));

        this.registerMarkdownCodeBlockProcessor(
            "periodic-quote",
            (_, el, ctx) => {
                ctx.addChild(new PeriodicQuoteComponent(el, this.quote));
            }
        );
    }

    onunload() {
        window.clearTimeout(this.lastTimeoutID);
    }
}
