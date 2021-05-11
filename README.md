mjml-custom-component-decorator
===
[![npm version](https://badge.fury.io/js/mjml-custom-component-decorator.svg)](https://badge.fury.io/js/mjml-custom-component-decorator)
[![Build Status](https://www.travis-ci.com/timo-reymann/mjml-custom-component-decorator.svg?branch=main)](https://www.travis-ci.com/timo-reymann/mjml-custom-component-decorator)
[![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/)

TypeScript decorator for MJML custom components.

## Why?

When you are developing custom components in mjml you will find yourself writing the same boilerplate code over and over
again. It gets even worse, because you need to define some static properties without any kind of autocomplete.

This is where typescript and its decorator features come handy. You write the decorator, and the project simply
intercepts the class and adds the required fields. To make it even easier, TypeScript enables you to use the
autocomplete of your favourite IDE, isn't that awesome?!

## How can I use it?

### TypeScript

First of all, you will need to enable experimental decorators in your tsconfig:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

Then you can use it as simple as this:

```typescript
import {registerComponent} from "mjml-core";
import {BodyComponent} from "mjml-core";
import {MJMLCustomComponent} from "mjml-custom-component-decorator/lib/MJMLCustomComponent";

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

registerComponent(MyCustomComponent)
```

### JavaScript

Currently not supported because there is not really a usecase for this.

If you are crazy about having this feature just create an issue and I will work on it.

## Just for completeness without the decorator ...

... it looks like this:

```typescript
import {registerDependencies} from "mjml-validator"
import {registerComponent} from "mjml-core";

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

registerComponent(MyCustomComponent)
registerDependencies({
    'mj-column': ['my-custom-component'],
    'my-custom-component': []
})
```

You duplicate your attribute name twice and can't have some kind of defaults (excerpt using inheritance)
