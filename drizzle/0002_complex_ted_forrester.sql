CREATE TABLE `pronunciation_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`word` varchar(255) NOT NULL,
	`moduleId` int,
	`lessonId` int,
	`accuracyScore` int,
	`userAudioUrl` text,
	`nativeAudioUrl` text,
	`userTranscription` text,
	`nativeTranscription` text,
	`feedback` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pronunciation_history_id` PRIMARY KEY(`id`)
);
