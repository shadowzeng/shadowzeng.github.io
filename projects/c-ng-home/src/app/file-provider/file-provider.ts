export abstract class FileProvider {
    public abstract get(): Promise<{}>
    public abstract save(file: any): Promise<{}>
    public abstract saveAs(file: any): Promise<{}>
}