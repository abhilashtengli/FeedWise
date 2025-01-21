const plans: Record<
  "paid" | "premium",
  { amount: number; tokens: number; billingCycle: string }
> = {
  paid: { amount: 799, tokens: 100000, billingCycle: "monthly" },
  premium: { amount: 2499, tokens: 300000, billingCycle: "3 months" }
};

export default plans;
