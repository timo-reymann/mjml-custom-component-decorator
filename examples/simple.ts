import mjml2html from "mjml";
import {BodyComponent} from "mjml-core";
import {MJMLCustomComponent} from "../src";
import {registerComponent} from "mjml-core";
import {registerDependencies} from "mjml-validator";

@MJMLCustomComponent({
    tag: "custom-text",
    attributes: {
        text: {
            type: 'string',
            default: 'Hello World'
        },
        'text-color': {
            type: "color"
        }
    },
    allowedParentTags: ["mj-column"],
    registerDependencies,
    registerComponent,
})
export class CustomText extends BodyComponent {
    render() {
        return this.renderMJML(`
            <mj-text align="center" color="${this.getAttribute('text-color')}">
                ${this.getAttribute("text")}
            </mj-text>`
        )
    }
}

const result = mjml2html(`
  <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
            <custom-text text-color="blue" text="Foo" />
            <mj-divider />            
            <custom-text text="Bar"></custom-text>
            <mj-divider />
            <custom-text text="Baz" />
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`, {
    validationLevel: 'strict'
})
console.log(result)
