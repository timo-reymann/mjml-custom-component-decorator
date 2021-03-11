declare module "mjml-validator" {
    /**
     * Register dependencies for mjml tags
     * @param payload
     */
    export function registerDependencies(payload: { [k: string]: string[] })
}