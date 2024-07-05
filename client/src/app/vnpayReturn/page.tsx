"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { spaceMono } from "@/components/ui.custom/fonts";
import { STATUS_CONFIG } from "./statusConfig";
import { usePaymentStatus } from "@/hooks/usePaymentStatus";

// Define the PaymentStatus type
type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed' | 'error';

export default function VNPayReturnPage() {
  const searchParams = useSearchParams();
  const status = usePaymentStatus(searchParams.toString()) as PaymentStatus;
  const currentStatus = STATUS_CONFIG[status];
  const router = useRouter();

  useEffect(() => {
    if (status === "error") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className={`${spaceMono.className} flex flex-col items-center justify-center gap-6 p-8 sm:p-12 md:p-16 bg-[#ece3d4]`}>
      <div className={`flex h-16 w-16 items-center justify-center rounded-full ${currentStatus.color}`}>
        {currentStatus.icon}
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">{currentStatus.title}</h2>
        <p className="text-muted-foreground">{currentStatus.message}</p>
      </div>
      {status === "success" && (
        <Link href="/orderPurchase" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          View Order
        </Link>
      )}
      {["failed"].includes(status) && (
        <Link href="/" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          Return to Home
        </Link>
      )}
    </div>
  );
}
