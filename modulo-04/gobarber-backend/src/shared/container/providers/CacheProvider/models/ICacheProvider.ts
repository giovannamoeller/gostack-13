export default interface ICacheProvider {
    save(key: string, value: any): Promise<void>;
    recover<T>(key: string): Promise<T | null> // recuperar dados do cache
    invalidate(key: string): Promise<void>; // invalidar o cache
}