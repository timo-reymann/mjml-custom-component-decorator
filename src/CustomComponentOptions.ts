import {CustomComponentAttribute} from "./CustomComponentAttribute";

/**
 * Options for a custom component
 */
export default interface CustomComponentOptions {
    /**
     * Attribute specification
     */
    attributes: { [k: string]: CustomComponentAttribute }

    /**
     * Does the component has an ending tag or not, is set to true if not specified
     */
    endingTag ?: boolean

    /**
     * Allowed tags for parent
     */
    allowedParentTags : string[]
}
