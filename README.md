mjml-custom-component-decorator
===
[![npm version](https://badge.fury.io/js/mjml-custom-component-decorator.svg)](https://badge.fury.io/js/mjml-custom-component-decorator)

TypeScript decorator for MJML custom components.

## Why?

When you are developing custom components in mjml you will find yourself writing the same boilerplate code over and over
again. It gets even worse, because you need to define some static properties without any kind of autocomplete.

This is where typescript and its decorator features come handy. You write the decorator, and the project simply
intercepts the class and adds the required fields. To make it even easier, TypeScript enables you to use the
autocomplete of your favourite IDE, isn't that awesome?!

## How can I use it?

First of all you will need to enable experimental decorators in your tsconfig:

Then you can use it as simple as this:

```typescript
@MJMLCustomComponent({
    attributes: {
        text: {
            type: 'string',
            default: 'Hello World'
        }
    },
    allowedParentTags: ["mj-column"]
})
export class MyCustomComponent extends BodyComponent {
    render() {
        return this.renderMJML(`
            <mj-text>
                Hello there, this is what you gave as text attribute: ${this.getAttribute("text")}
            </mj-text>`
        )
    }
}

// Somwhere before mjml2hmtl
import {registerComponent} from "mjml-core";

registerComponent(MyCustomComponent)
```

### without the decorator ...

... it looks like this:
```typescript
import {registerDependencies} from "mjml-validator"

export class MyCustomComponent extends BodyComponent {
    static allowedAttributes = {
        text: 'string'
    }

    static defaultAttributes = {
        'text': 'Hello World'
    }
    
    static endingTag = false

    render() {
        return this.renderMJML(`
            <mj-text>
                Hello there, this is what you gave as text attribute: ${this.getAttribute("text")}
            </mj-text>`
        )
    }
}

registerDependencies({
    'mj-column': ['my-custom-component'],
    'my-custom-component': []
})
```

You duplicate your attribute name twice and can't have some kind of defaults (excerpt using
inheritance)
