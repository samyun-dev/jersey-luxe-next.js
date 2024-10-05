-- Add order status to the Order model
ALTER TABLE "Order" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'processing';