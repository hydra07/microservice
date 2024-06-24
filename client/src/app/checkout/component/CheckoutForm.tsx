"use client";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckoutFormType } from "CustomTypes";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InputFieldCustom } from "./InputFieldCustom";
import SelectFieldCustom from "./SelectFieldCustom";
import { useState, useEffect } from "react";
import { on } from "events";
import { useAddressData } from "@/hooks/useAddressData";

interface CheckoutFormProps {
  form: UseFormReturn<CheckoutFormType>;
  onSubmit: (data: CheckoutFormType) => void;
}

const CheckoutForm = ({ form, onSubmit }: CheckoutFormProps) => {
  const { districts, wards, fetchDistricts, fetchWards } = useAddressData();

  // const handleProvinceChange = (provinceId: string) => {
  //   fetchDistricts(provinceId);
  //   form.setValue('district', '');
  //   form.setValue('ward', '');
  // };

  const handleDistrictChange = (districtId: string) => {
    fetchWards(districtId);
    form.setValue("ward", "");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="text-lg font-semibold">Infomation</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <InputFieldCustom
            name="name"
            label="Name"
            placeholder="Enter your name"
            form={form}
          />
          <InputFieldCustom
            name="phone"
            label="Phone"
            placeholder="Enter your phone"
            form={form}
          />
        </div>
        <InputFieldCustom
          name="email"
          label="Email"
          placeholder="Enter your email"
          form={form}
        />
        <h3 className="text-lg font-semibold">Address</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {/* <SelectFieldCustom
            name="province"
            label="Province"
            options={provinces.map(p => ({ id: p.province_id, name: p.province_name }))}
            form={form}
            onChange={handleProvinceChange}

          /> */}

          <SelectFieldCustom
            name="district"
            label="District"
            options={districts.map((d) => ({
              id: d.district_id,
              name: d.district_name,
            }))}
            form={form}
            onChange={handleDistrictChange}
          />

          <SelectFieldCustom
            name="ward"
            label="Ward"
            options={wards.map((w) => ({ id: w.ward_id, name: w.ward_name }))}
            form={form}
          />

          <div className="md:col-span-2">
            <InputFieldCustom
              name="address"
              label="Address"
              placeholder="Enter your address"
              form={form}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="cod" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Cash on Delivery
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="vnpay" />
                    </FormControl>
                    <FormLabel className="font-normal">VNPay</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CheckoutForm;
