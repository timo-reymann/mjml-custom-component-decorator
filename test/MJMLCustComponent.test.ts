import {MJMLCustomComponent} from "../src";
import {BodyComponent, registerComponent} from "mjml-core";
import {registerDependencies} from "mjml-validator";
import mjml2html from "mjml";

function _createValidDecorator() {
    return MJMLCustomComponent({
        tag: "mjml-custom-component",
        endingTag: false,
        allowedParentTags: [
            "mj-column"
        ],
        attributes: {
            foo: {
                type: 'string',
                default: 'bar'
            }
        },
        registerComponent,
        registerDependencies
    })
}

function _createDummyComponent(): any {
    return new class extends BodyComponent {
        constructor() {
            super({});
        }

        render(): string {
            return this.renderMJML(` <mj-text>Test </mj-text>`)
        }
    }
}

describe("Test MJMLCustomCpomponent", () => {
    it("should return a function", () => {
        const result = MJMLCustomComponent({
            tag: "",
            allowedParentTags: [],
            attributes: {},
            registerComponent,
            registerDependencies
        })
        expect(result).not.toBeNull()
        expect(typeof result).toBe('function')
    })

    it("should map allowed attributes", () => {
        const decorator = _createValidDecorator()
        const target = _createDummyComponent()
        decorator(target)

        expect(Object.keys(target.allowedAttributes).length).toBe(1)
        expect(target.allowedAttributes.foo).not.toBeUndefined()
        expect(target.allowedAttributes.foo).toBe("string")
    })

    it("should map default attributes", () => {
        const decorator = _createValidDecorator()
        const target = _createDummyComponent()
        decorator(target)

        expect(Object.keys(target.defaultAttributes).length).toBe(1)
        expect(target.defaultAttributes.foo).not.toBeUndefined()
        expect(target.defaultAttributes.foo).toBe("bar")
    })

    it("should map endingtag", () => {
        const decorator = _createValidDecorator()
        const target = _createDummyComponent()
        decorator(target)

        expect(target.endingTag).toBe(false)
    })
})
