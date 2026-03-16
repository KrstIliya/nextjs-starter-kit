"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface OrderItem {
  label: string;
  amount: number;
}

interface Order {
  id: string;
  product?: {
    name: string;
  };
  createdAt: string;
  totalAmount: number;
  currency: string;
  status: string;
  subscription?: {
    status: string;
    endedAt?: string;
  };
  items: OrderItem[];
}

interface OrdersResponse {
  result: {
    items: Order[];
  };
}

export default function BillingPage() {
  const [orders, setOrders] = useState<OrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        try {
          const ordersResponse = await authClient.customer.orders.list({});

          if (ordersResponse.data) {
            setOrders(ordersResponse.data as unknown as OrdersResponse);
          } else {
            console.log("No orders found or customer not created yet");
            setOrders(null);
          }
        } catch (orderError) {
          console.log(
            "Orders fetch failed - customer may not exist in Polar yet:",
            orderError,
          );
          setOrders(null);
        }

        try {
          const { data: customerState } = await authClient.customer.state();
          console.log("customerState", customerState);
        } catch (customerError) {
          console.log("Customer state fetch failed:", customerError);
        }
      } catch (error) {
        console.error("Error fetching billing data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div>
          <Skeleton className="h-9 w-32 mb-2 bg-muted" />
          <Skeleton className="h-5 w-80 bg-muted" />
        </div>
        <div className="w-full max-w-4xl space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32 bg-muted" />
              <Skeleton className="h-4 w-56 bg-muted" />
            </div>
            <Skeleton className="h-10 w-44 bg-muted" />
          </div>
          <Card>
            <CardContent className="p-4 space-y-3">
              <Skeleton className="h-6 w-full bg-muted" />
              <Skeleton className="h-6 w-3/4 bg-muted" />
              <Skeleton className="h-6 w-1/2 bg-muted" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Billing</h1>
        <p className="text-muted-foreground mt-2">
          View your billing history and manage your subscription
        </p>
      </div>

      <div className="w-full max-w-4xl">
        <div className="space-y-4 mt-2">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Billing History</h3>
              <p className="text-sm text-muted-foreground">
                View your past and upcoming invoices
              </p>
            </div>
            <Button
              variant="outline"
              onClick={async () => {
                try {
                  await authClient.customer.portal();
                } catch (error) {
                  console.error("Failed to open customer portal:", error);
                }
              }}
              disabled={orders === null}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Manage Subscription
            </Button>
          </div>
          {orders?.result?.items && orders.result.items.length > 0 ? (
            <div className="space-y-4">
              {(orders.result.items || []).map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="px-4">
                    <div className="flex flex-col gap-3">
                      {/* Header Row */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex justify-center gap-2">
                            <h4 className="font-medium text-base">
                              {order.product?.name || "Subscription"}
                            </h4>
                            <div className="flex items-center gap-2">
                              {order.subscription?.status === "paid" ? (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs">
                                  Paid
                                </Badge>
                              ) : order.subscription?.status ===
                                "canceled" ? (
                                <Badge
                                  variant="destructive"
                                  className="text-xs"
                                >
                                  Canceled
                                </Badge>
                              ) : order.subscription?.status ===
                                "refunded" ? (
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs">
                                  Refunded
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs">
                                  {order.subscription?.status}
                                </Badge>
                              )}

                              {order.subscription?.status === "canceled" && (
                                <span className="text-xs text-muted-foreground">
                                  • Canceled on{" "}
                                  {order.subscription.endedAt
                                    ? new Date(
                                      order.subscription.endedAt,
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                    })
                                    : "N/A"}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-medium text-base">
                            ${(order.totalAmount / 100).toFixed(2)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {order.currency?.toUpperCase()}
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      {order.items?.length > 0 && (
                        <div className="mt-2 pt-3 border-t">
                          <ul className="space-y-1.5 text-sm">
                            {order.items.map((item, index: number) => (
                              <li
                                key={`${order.id}-${item.label}-${index}`}
                                className="flex justify-between"
                              >
                                <span className="text-muted-foreground truncate max-w-[200px]">
                                  {item.label}
                                </span>
                                <span className="font-medium">
                                  ${(item.amount / 100).toFixed(2)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    className="h-10 w-10 text-muted-foreground mb-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-semibold">
                    No orders found
                  </h3>
                  <p className="mb-4 mt-2 text-sm text-muted-foreground">
                    {orders === null
                      ? "Unable to load billing history. This may be because your account is not yet set up for billing."
                      : "You don't have any orders yet. Your billing history will appear here."}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
