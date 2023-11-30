-- CreateTable
CREATE TABLE "user" (
    "forename" VARCHAR(16) NOT NULL,
    "surname" VARCHAR(32),
    "dob" DATE,
    "email" VARCHAR(255),
    "password" VARCHAR(32) NOT NULL,
    "gender" CHAR(1),
    "userID" CHAR(32) NOT NULL,
    "is_admin" INTEGER DEFAULT 0,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "allergies" (
    "AllergiesID" CHAR(32) NOT NULL,
    "Allergy Type" VARCHAR(45) NOT NULL,
    "Alternative Choice" VARCHAR(45) NOT NULL,

    CONSTRAINT "allergies_pkey" PRIMARY KEY ("AllergiesID")
);

-- CreateTable
CREATE TABLE "chronic_condition" (
    "ChronicID" CHAR(32) NOT NULL,
    "Condition Type" VARCHAR(45) NOT NULL DEFAULT 'IBS',

    CONSTRAINT "chronic_condition_pkey" PRIMARY KEY ("ChronicID")
);

-- CreateTable
CREATE TABLE "food" (
    "FoodID" CHAR(32) NOT NULL,
    "FoodName" VARCHAR(45) NOT NULL,
    "isDrink" BOOLEAN NOT NULL,
    "Protein" INTEGER NOT NULL,
    "Fat" INTEGER NOT NULL,
    "Carbohydrates" INTEGER NOT NULL,
    "Vitamins" INTEGER NOT NULL,
    "Calcium" INTEGER NOT NULL,
    "Iron" INTEGER NOT NULL,
    "Potassium" INTEGER NOT NULL,
    "user_userID" CHAR(32) NOT NULL,

    CONSTRAINT "food_pkey" PRIMARY KEY ("FoodID","user_userID")
);

-- CreateTable
CREATE TABLE "health" (
    "HealthID" CHAR(32) NOT NULL,
    "Height" INTEGER,
    "Weight" INTEGER,
    "Blood Pressure" INTEGER,
    "Blood Glucose Levels" INTEGER,
    "user_userID" CHAR(32) NOT NULL,
    "chronic_condition_ChronicID" CHAR(32) NOT NULL,
    "allergies_AllergiesID" CHAR(32) NOT NULL,

    CONSTRAINT "health_pkey" PRIMARY KEY ("HealthID","user_userID","chronic_condition_ChronicID","allergies_AllergiesID")
);

-- CreateTable
CREATE TABLE "preferences" (
    "Preference ID" CHAR(32) NOT NULL,
    "Font Size" INTEGER NOT NULL DEFAULT 20,
    "Bold Text" BOOLEAN NOT NULL DEFAULT false,
    "High Contrast Mode" BOOLEAN NOT NULL DEFAULT false,
    "Descriptive Links" BOOLEAN NOT NULL DEFAULT true,
    "Dark Mode" BOOLEAN NOT NULL DEFAULT false,
    "user_userID" CHAR(32) NOT NULL,

    CONSTRAINT "preferences_pkey" PRIMARY KEY ("Preference ID","user_userID")
);

-- CreateIndex
CREATE UNIQUE INDEX "AllergiesID_UNIQUE" ON "allergies"("AllergiesID");

-- CreateIndex
CREATE UNIQUE INDEX "ChronicID_UNIQUE" ON "chronic_condition"("ChronicID");

-- CreateIndex
CREATE UNIQUE INDEX "FoodID_UNIQUE" ON "food"("FoodID");

-- CreateIndex
CREATE UNIQUE INDEX "FoodName_UNIQUE" ON "food"("FoodName");

-- CreateIndex
CREATE INDEX "fk_Food Database_user1_idx" ON "food"("user_userID");

-- CreateIndex
CREATE UNIQUE INDEX "HeathID_UNIQUE" ON "health"("HealthID");

-- CreateIndex
CREATE INDEX "fk_Healrh Information_user1_idx" ON "health"("user_userID");

-- CreateIndex
CREATE INDEX "fk_health_allergies1_idx" ON "health"("allergies_AllergiesID");

-- CreateIndex
CREATE INDEX "fk_health_chronic_condition1_idx" ON "health"("chronic_condition_ChronicID");

-- CreateIndex
CREATE UNIQUE INDEX "Preference ID_UNIQUE" ON "preferences"("Preference ID");

-- CreateIndex
CREATE INDEX "fk_preferences_user1_idx" ON "preferences"("user_userID");

-- AddForeignKey
ALTER TABLE "food" ADD CONSTRAINT "fk_Food Database_user1" FOREIGN KEY ("user_userID") REFERENCES "user"("userID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "health" ADD CONSTRAINT "fk_Healrh Information_user1" FOREIGN KEY ("user_userID") REFERENCES "user"("userID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "health" ADD CONSTRAINT "fk_health_allergies1" FOREIGN KEY ("allergies_AllergiesID") REFERENCES "allergies"("AllergiesID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "health" ADD CONSTRAINT "fk_health_chronic_condition1" FOREIGN KEY ("chronic_condition_ChronicID") REFERENCES "chronic_condition"("ChronicID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "preferences" ADD CONSTRAINT "fk_preferences_user1" FOREIGN KEY ("user_userID") REFERENCES "user"("userID") ON DELETE NO ACTION ON UPDATE NO ACTION;
