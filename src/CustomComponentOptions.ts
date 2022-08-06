import {CustomComponentAttribute} from "./CustomComponentAttribute";
import {BodyComponent} from "mjml-core";

/**
 * Options for a custom component
 */
export interface CustomComponentOptions {
    /**
     * Attribute specification
     */
    attributes: { [k: string]: CustomComponentAttribute }

    /**
     * Does the component has an ending tag or not, is set to true if not specified
     */
    endingTag?: boolean

    /**
     * Allowed tags for parent
     */
    allowedParentTags: string[]

    /**
     * Tag for element
     */
    tag: string;

    /**
     * registerDependencies function from mjml-validator
     *
     * Since bundling would use the wrong validator context and therefore validation won't work you need to specify it
     */
    registerDependencies : (payload: { [k: string]: string[] }) => void

    /**
     * registerComponent function from mjml-core
     *
     * Since bundling would use the wrong validator core context and therefore validation won't work you need to specify it
     * @param ComponentClass
     */
    registerComponent : (ComponentClass: typeof BodyComponent) => void
}
