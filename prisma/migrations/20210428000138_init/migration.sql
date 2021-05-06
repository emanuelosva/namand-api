-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Authentication" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "businessId" TEXT NOT NULL,
    FOREIGN KEY ("businessId") REFERENCES "Business" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "countryCode" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "businessId" TEXT NOT NULL,
    FOREIGN KEY ("businessId") REFERENCES "Business" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "priceLocal" INTEGER NOT NULL,
    "proceUSD" INTEGER NOT NULL DEFAULT -1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "staffId" TEXT NOT NULL,
    FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TimeOff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "staffId" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Agenda" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "staffId" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "slotSize" INTEGER NOT NULL,
    "advanceBookingMinutes" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "DayPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayName" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "agendaId" TEXT NOT NULL,
    FOREIGN KEY ("agendaId") REFERENCES "Agenda" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Break" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayName" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "dayPlanId" TEXT NOT NULL,
    FOREIGN KEY ("dayPlanId") REFERENCES "DayPlan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "businessId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "staffName" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "timezone" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "totalPayed" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "coupon" TEXT,
    "paymentDate" DATETIME,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "cancellReason" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Business.email_unique" ON "Business"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Business.slug_unique" ON "Business"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Authentication.key_unique" ON "Authentication"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Authentication.businessId_unique" ON "Authentication"("businessId");

-- CreateIndex
CREATE INDEX "Authentication.key_index" ON "Authentication"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Staff.slug_unique" ON "Staff"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Staff.businessId_email_unique" ON "Staff"("businessId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "DayPlan.dayName_agendaId_unique" ON "DayPlan"("dayName", "agendaId");

-- CreateIndex
CREATE UNIQUE INDEX "DayPlan.dayNumber_agendaId_unique" ON "DayPlan"("dayNumber", "agendaId");
