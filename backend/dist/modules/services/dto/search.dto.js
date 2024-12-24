"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const service_schema_1 = require("../schema/service.schema");
class SearchDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(service_schema_1.ServiceEntity, [
    "category",
    "title",
])) {
}
exports.SearchDto = SearchDto;
//# sourceMappingURL=search.dto.js.map