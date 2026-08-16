import { Transform } from 'class-transformer';
import { ValidateIf, ValidationOptions, registerDecorator } from 'class-validator';
import { DateTime } from 'luxon';

export function IsNullable(): PropertyDecorator {
  return ValidateIf((object: unknown, value: unknown): boolean => value !== null);
}

export function IsValidDate(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      name: 'IsValidDateTime',
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean {
          return value instanceof Date && DateTime.fromJSDate(value).isValid;
        },
      },
    });
  };
}

export function IsValidDateTime(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      name: 'IsValidDateTime',
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean {
          return value instanceof DateTime && value.isValid;
        },
      },
    });
  };
}

export function TransformTrim(): PropertyDecorator {
  return Transform(({ value }): unknown => (typeof value === 'string' ? value.trim() : value));
}

export function TransformLowerCase(): PropertyDecorator {
  return Transform(({ value }): unknown => (typeof value === 'string' ? value.toLowerCase() : value));
}

export function TransformUpperCase(): PropertyDecorator {
  return Transform(({ value }): unknown => (typeof value === 'string' ? value.toUpperCase() : value));
}

export function TypeDate(): PropertyDecorator {
  return Transform(({ value }): unknown => {
    if (typeof value !== 'string') return value;

    return new Date(value);
  });
}

export function TypeDateTime(): PropertyDecorator {
  return Transform(({ value }): unknown => {
    if (typeof value !== 'string') return value;

    return DateTime.fromISO(value);
  });
}
