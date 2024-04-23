import { ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator'

export function IsBeforeDate(relatedPropertyName: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isBeforeDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [relatedPropertyName],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = args.object[relatedPropertyName]
          return new Date(value) <= new Date(relatedValue)
        },
        defaultMessage(args: ValidationArguments) {
          return `${propertyName} must be before ${relatedPropertyName}`
        }
      }
    })
  }
}
