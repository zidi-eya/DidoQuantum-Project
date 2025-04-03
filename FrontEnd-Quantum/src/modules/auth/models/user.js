import { Expose, Transform } from 'class-transformer';
export class User {
    @Expose()
    id;
    @Expose({ name: 'full_name' })
    fullName;
    @Expose()
    email;
    @Expose({ name: 'is_active' })
    isActive;
    @Expose()
    @Transform(({ value }) => value.map((role) => role))
    roles;
    constructor(id, fullName, email, isActive, roles) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.isActive = isActive;
        this.roles = roles;
    }
}
//# sourceMappingURL=user.js.map