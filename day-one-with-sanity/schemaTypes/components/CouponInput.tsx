// components/CouponInput.tsx
"use client"; // This directive indicates that this file is a Client Component

import React from 'react';
import { Box, Button, Flex, TextInput, Code } from '@sanity/ui';
import { set, StringInputProps } from 'sanity';
import { useCallback } from 'react';

export function CouponInput(props: StringInputProps) {
  // Destructure onChange and value from props
  const { onChange, value } = props;

  // Generate a new coupon code
  const generateCoupon = useCallback(() => {
    const coupon = Math.random().toString(36).substring(2, 6).toUpperCase();
    // Use set() to update the field value
    onChange(set(coupon));
  }, [onChange]);

  // Copy coupon code to clipboard
  const copyToClipboard = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      alert('Coupon code copied to clipboard!');
    }
  };

  return (
    <Flex gap={3} align="center">
      <Box flex={1}>
        <TextInput
          readOnly
          value={value || ''}
          placeholder="Generate a coupon code"
        />
      </Box>
      <Button mode="ghost" onClick={generateCoupon} text="Generate coupon" />
      {value && (
        <Button mode="ghost" onClick={copyToClipboard} text="Copy coupon" />
      )}
    </Flex>
  );
}
