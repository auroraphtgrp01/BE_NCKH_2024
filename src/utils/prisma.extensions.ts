import { PrismaClient } from '@prisma/client'
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete'

export const extendedPrismaClient = new PrismaClient().$extends(
  createSoftDeleteExtension({
    models: {
      User: true,
      Contract: true,
      ContractAttribute: true,
      ContractAttributeValue: true,
      Suppliers: true,
      Products: true,
      TemplateContract: true
    },
    defaultConfig: {
      field: 'deletedAt',
      createValue: (deleted) => {
        if (deleted) return new Date()
        return null
      }
    }
  })
)

export type ExtendedPrismaClient = typeof extendedPrismaClient
