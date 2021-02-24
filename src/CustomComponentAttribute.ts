export type CustomComponentAttributeType = string | "color" | "enum" | "integer" | "boolean" | "unit"

/**
 * Attribute representation for mjml custom component
 */
export interface CustomComponentAttribute {
    /**
     * Optional default value
     */
    default?: string | boolean
    /**
     * Type of the attribute
     */
    type: CustomComponentAttributeType
}
