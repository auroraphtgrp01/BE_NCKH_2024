"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendedPrismaClient = void 0;
const client_1 = require("@prisma/client");
const prisma_extension_soft_delete_1 = require("prisma-extension-soft-delete");
exports.extendedPrismaClient = new client_1.PrismaClient().$extends((0, prisma_extension_soft_delete_1.createSoftDeleteExtension)({
    models: {
        User: true,
    },
    defaultConfig: {
        field: 'deletedAt',
        createValue: (deleted) => {
            if (deleted)
                return new Date();
            return null;
        }
    }
}));
//# sourceMappingURL=prisma.extensions.js.map