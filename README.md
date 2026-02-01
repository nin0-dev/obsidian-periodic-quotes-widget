# Periodic Quotes Widget

![Screenshot](https://github.com/user-attachments/assets/a8dd1266-365b-4ba4-9340-6c8300955ed3)

> [!NOTE]
> Quote data comes from the [Quotable API](https://github.com/lukePeavey/quotable), but that API is never contacted at runtime. The plugin doesn't use
> the network.

Obsidian plugin to show quotes in `periodic-quote` codeblocks. They are refreshed daily or bidaily, depending on your settings.

They are never written to the file itself, and instead are dynamically rendered in the codeblock. This also makes the plugin 
a great fit for home notes and similar.

## Usage

Make a code block with the `periodic-quote` language.

## Configuration

You can configure the plugin per-codeblock by writing yaml inside of it:

```yaml
background: false # Show a background in the quote block, or hide it to match actual blockquote styling
```
