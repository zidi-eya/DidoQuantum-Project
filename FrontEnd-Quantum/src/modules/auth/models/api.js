var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from 'class-transformer';
export class ApiKey {
    id;
    //@Expose()
    // name: string;
    key;
    prompt;
    validUntil;
    constructor(id, 
    //name: string,
    key, prompt, validUntil) {
        this.id = id;
        //this.name = name;
        this.key = key;
        this.prompt = prompt;
        this.validUntil = validUntil;
    }
}
__decorate([
    Expose(),
    __metadata("design:type", Number)
], ApiKey.prototype, "id", void 0);
__decorate([
    Expose(),
    __metadata("design:type", String)
], ApiKey.prototype, "key", void 0);
__decorate([
    Expose({ name: 'prompt' }),
    __metadata("design:type", Boolean)
], ApiKey.prototype, "prompt", void 0);
__decorate([
    Expose({ name: 'valid_until' }),
    Transform(({ value }) => (value ? new Date(value) : undefined)),
    __metadata("design:type", Date)
], ApiKey.prototype, "validUntil", void 0);
//# sourceMappingURL=api.js.map