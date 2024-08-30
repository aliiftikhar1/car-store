-- AlterTable
ALTER TABLE `company` ADD COLUMN `comp_details` TEXT NULL,
    ADD COLUMN `comp_other_details` TEXT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
