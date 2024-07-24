// schemaTypes/coupon/couponType.ts
import { defineType } from 'sanity';
import { CouponInput } from '../components/CouponInput'; // Adjust path as per your project structure

export const couponType = defineType({
  name: 'coupon',
  title: 'Coupon',
  description: 'A unique, all uppercase, four-character alphanumeric code',
  type: 'string',
  validation: (rule) =>
    rule
      .min(4)
      .max(4)
      .regex(/^[A-Z0-9]+$/),
  components: { input: CouponInput },
});
