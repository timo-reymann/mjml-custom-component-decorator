import {BodyComponent} from "mjml-core"
import CustomComponentOptions from "./CustomComponentOptions";
// @ts-ignore
import {registerDependencies} from "mjml-validator"
// Helper type for anonymous objects
export type AnonymousObject = { [k: string]: any }

function buildAttributes(options: CustomComponentOptions) {
    let allowedAttributes: AnonymousObject = {}
    let defaultAttributes: AnonymousObject = {}
    const attributes = options.attributes

    for (const property in attributes) {
        const spec = attributes[property]
        allowedAttributes[property] = spec['type']

        if (spec['default']) {
            defaultAttributes[property] = spec['default']
        }
    }

    return {allowedAttributes, defaultAttributes}
}

/**
 * Enhance class with mjml component properties
 * @param options Options for mjml custom component
 */
export function MJMLCustomComponent(options: CustomComponentOptions) {
    return function (target: typeof BodyComponent | any) {
        const componentName = target.getTagName()
        const {allowedAttributes, defaultAttributes} = buildAttributes(options)

        if (options.endingTag != undefined) {
            target.endingTag = options.endingTag
        } else {
            target.endingTag = true
        }

        target.defaultAttributes = defaultAttributes
        target.allowedAttributes = allowedAttributes

        let dependencies: AnonymousObject = {}
        for (let allowedParentTag of options.allowedParentTags) {
            dependencies[allowedParentTag] = [componentName]
        }
        registerDependencies(dependencies)

        return target
    }
}
