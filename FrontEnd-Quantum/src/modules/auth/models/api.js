import { Expose, Transform } from 'class-transformer';
export class ApiKey {
    @Expose()
    id;
    @Expose()
    name;
    @Expose()
    key;
    @Expose({ name: 'prompt' })
    prompt;
    @Expose({ name: 'read_collections' })
    readCollections;
    @Expose({ name: 'collection_ids' })
    collectionScope;
    @Expose({ name: 'valid_until' })
    @Transform(({ value }) => (value ? new Date(value) : undefined))
    validUntil;
    constructor(id, name, key, prompt, readCollections, collectionScope, validUntil) {
        this.id = id;
        this.name = name;
        this.key = key;
        this.prompt = prompt;
        this.readCollections = readCollections;
        this.collectionScope = collectionScope;
        this.validUntil = validUntil;
    }
}
//# sourceMappingURL=api.js.map