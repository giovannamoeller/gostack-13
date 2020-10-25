export default interface ICacheProvider {
    save(key: string, value: any): Promise<void>;
    recover<T>(key: string): Promise<T | null> // recuperar dados do cache
    invalidate(key: string): Promise<void>; // invalidar o cache
    invalidatePrefix(prefix: string): Promise<void>; // invalidar todos que começam com providers-list, por exemplo
}