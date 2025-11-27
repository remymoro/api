/*
  Warnings:

  - A unique constraint covering the columns `[address,city,codePostal]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Store_address_city_codePostal_key" ON "Store"("address", "city", "codePostal");
